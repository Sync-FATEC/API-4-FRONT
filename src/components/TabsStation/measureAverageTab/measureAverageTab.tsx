import { useContext, useEffect, useState } from "react";
import { ReadStationType } from "../../../types/station/ReadStationType";
import "../shared/TabStyles.css";
import DynamicList from "../../list/DynamicList";
import api from "../../../api/api";
import { errorSwal } from "../../swal/errorSwal";
import Button from "../../button/Button";
import { AuthContext } from "../../../contexts/auth/AuthContext";
import Loading from "../../loading/loading";

// Interface para a medição original vinda da API
export interface MeasureResponseDTO {
  id: string;
  unixTime: string;
  value: string; // Agora vem como string com unidade (ex: "18.7 °C")
  parameterText: string;
}

// Interface para a média de medição calculada no frontend
export interface MeasureAverageDTO {
  id: string;
  typeAverage: string;
  name: string;
  value: string;
  createdAt: string;
}

interface MeasureTabProps {
  station: ReadStationType;
  onUpdateStation: () => void;
}

export default function MeasureAverageTab({
  station,
  onUpdateStation,
}: MeasureTabProps) {
  const [measures, setMeasures] = useState<MeasureAverageDTO[]>([]);
  const [allMeasures, setAllMeasures] = useState<MeasureResponseDTO[]>([]);
  const [filteredMeasures, setFilteredMeasures] = useState<MeasureResponseDTO[]>([]);
  const [filterType, setFilterType] = useState<string>("single");
  const [singleDate, setSingleDate] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [averageType, setAverageType] = useState<"hourly" | "daily">("hourly");
  const authContext = useContext(AuthContext);

  // Função para extrair o valor numérico e unidade de uma string
  const extractValueAndUnit = (valueString: string): { numericValue: number, unit: string } => {
    try {
      // Remover qualquer espaço no início e fim
      const trimmed = valueString.trim();

      // Encontrar o primeiro caractere não numérico (exceto ponto ou vírgula)
      const match = trimmed.match(/[^0-9.,]/);
      if (!match) {
        // Se não encontrou caracteres não numéricos, apenas retornar o valor como número
        return {
          numericValue: parseFloat(trimmed.replace(',', '.')),
          unit: ''
        };
      }

      const indexOfUnit = match.index || 0;

      // Extrair o valor numérico (substituindo vírgula por ponto, se houver)
      const numericPart = trimmed.substring(0, indexOfUnit).trim().replace(',', '.');
      // Extrair a unidade
      const unitPart = trimmed.substring(indexOfUnit).trim();

      const numericValue = parseFloat(numericPart);

      // Verificar se o valor numérico é válido
      if (isNaN(numericValue)) {
        console.warn(`Não foi possível extrair um valor numérico de "${valueString}"`);
        return { numericValue: 0, unit: unitPart };
      }

      return {
        numericValue,
        unit: unitPart
      };
    } catch (error) {
      console.error(`Erro ao processar o valor "${valueString}":`, error);
      return { numericValue: 0, unit: '' };
    }
  };

  // Busca todas as medições da estação
  const fetchAllMeasures = async () => {
    setLoading(true);
    try {
      let response;

      if (!authContext.isAuthenticated) {
        // Para usuários não autenticados
        response = await api.get("/measure/public", {
          params: {
            stationId: station.uuid
          },
        });
      } else {
        // Para usuários autenticados, buscar todas as medidas disponíveis
        response = await api.get("/measure/list", {
          params: {
            stationId: station.id
          },
        });
      }

      // Ordenar as medições por data
      const measures = response.data.model.sort(
        (a: MeasureResponseDTO, b: MeasureResponseDTO) =>
          parseInt(a.unixTime) - parseInt(b.unixTime)
      );

      setAllMeasures(measures);

      // Aplicar os filtros atuais (se houver)
      const filtered = applyDateFilters(measures);
      setFilteredMeasures(filtered);

      // Calcular as médias com os dados filtrados
      calculateAverages(filtered);
    } catch (error: any) {
      const errorMsg = error?.response?.data?.error || "Erro desconhecido";
      errorSwal(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // Aplicar filtros de data nas medições
  const applyDateFilters = (measures: MeasureResponseDTO[], dateFilter?: { startDate?: string; endDate?: string }) => {
    // Se não há medidas para filtrar ou não há filtro definido, retornar todas as medidas
    if (!measures || measures.length === 0) {
      return [];
    }

    if (!dateFilter) {
      // Usar os filtros do estado
      if (filterType === "single" && singleDate) {
        // Para data única, converter para timestamp e comparar
        const targetDate = new Date(singleDate + "T00:00:00");
        const nextDay = new Date(singleDate + "T00:00:00");
        nextDay.setDate(nextDay.getDate() + 1);

        // Converter para timestamp Unix (segundos)
        const targetTimestamp = Math.floor(targetDate.getTime() / 1000);
        const nextDayTimestamp = Math.floor(nextDay.getTime() / 1000);

        return measures.filter(measure => {
          const timestamp = parseInt(measure.unixTime);
          return timestamp >= targetTimestamp && timestamp < nextDayTimestamp;
        });
      } else if (filterType === "interval" && startDate && endDate) {
        // Para intervalo, converter datas para timestamps
        const startDateTime = new Date(startDate + "T00:00:00");
        const endDateTime = new Date(endDate + "T23:59:59");

        // Converter para timestamp Unix (segundos)
        const startTimestamp = Math.floor(startDateTime.getTime() / 1000);
        const endTimestamp = Math.floor(endDateTime.getTime() / 1000);

        return measures.filter(measure => {
          const timestamp = parseInt(measure.unixTime);
          return timestamp >= startTimestamp && timestamp <= endTimestamp;
        });
      }
    } else {
      // Usar o filtro passado como parâmetro
      if (dateFilter.startDate && dateFilter.endDate) {
        const startDateTime = new Date(dateFilter.startDate + "T00:00:00");
        const endDateTime = new Date(dateFilter.endDate + "T23:59:59");

        // Converter para timestamp Unix (segundos)
        const startTimestamp = Math.floor(startDateTime.getTime() / 1000);
        const endTimestamp = Math.floor(endDateTime.getTime() / 1000);

        return measures.filter(measure => {
          const timestamp = parseInt(measure.unixTime);
          return timestamp >= startTimestamp && timestamp <= endTimestamp;
        });
      }
    }

    // Caso não haja filtro aplicável, retornar os últimos 7 dias
    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7);

    const sevenDaysAgoTimestamp = Math.floor(sevenDaysAgo.getTime() / 1000);

    return measures.filter(measure => {
      const timestamp = parseInt(measure.unixTime);
      return timestamp >= sevenDaysAgoTimestamp;
    });
  };

  // Calcula médias horárias ou diárias baseado no tipo selecionado
  const calculateAverages = (measures: MeasureResponseDTO[]) => {
    if (!measures || measures.length === 0) {
      setMeasures([]);
      return;
    }

    // Agrupar medições por parâmetro
    const groupedByParameter: Record<string, MeasureResponseDTO[]> = {};

    measures.forEach(measure => {
      if (!groupedByParameter[measure.parameterText]) {
        groupedByParameter[measure.parameterText] = [];
      }
      groupedByParameter[measure.parameterText].push(measure);
    });

    const averages: MeasureAverageDTO[] = [];

    // Para cada tipo de parâmetro, calcular as médias
    Object.entries(groupedByParameter).forEach(([parameterName, paramMeasures]) => {
      if (paramMeasures.length === 0) return;

      // Armazenar a unidade de medida para este parâmetro
      const sampleValue = paramMeasures[0].value;
      const { unit } = extractValueAndUnit(sampleValue);

      // Agrupar por hora ou dia dependendo do tipo de média
      const groupedByTime: Record<string, MeasureResponseDTO[]> = {};

      paramMeasures.forEach(measure => {
        // Converter a string unixTime para timestamp em milissegundos
        const timestamp = parseInt(measure.unixTime);
        if (isNaN(timestamp)) {
          console.warn(`Timestamp inválido: ${measure.unixTime}`);
          return; // Pular esta medida
        }

        // Criar data local usando a API Date
        const date = new Date(timestamp * 1000);

        let timeKey;
        if (averageType === "hourly") {
          // Formato: "DD/MM/AAAA HH:00"
          const day = String(date.getDate()).padStart(2, '0');
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const year = date.getFullYear();
          const hour = String(date.getHours()).padStart(2, '0');

          timeKey = `${day}/${month}/${year} ${hour}:00`;
        } else {
          // Formato: "DD/MM/AAAA"
          const day = String(date.getDate()).padStart(2, '0');
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const year = date.getFullYear();

          timeKey = `${day}/${month}/${year}`;
        }

        if (!groupedByTime[timeKey]) {
          groupedByTime[timeKey] = [];
        }
        groupedByTime[timeKey].push(measure);
      });

      // Calcular a média para cada período de tempo
      Object.entries(groupedByTime).forEach(([timeKey, timeMeasures]) => {
        if (timeMeasures.length === 0) return;

        // Extrair valores numéricos para cálculo da média
        const numericValues = timeMeasures.map(m => {
          const { numericValue } = extractValueAndUnit(m.value);
          return numericValue;
        }).filter(value => !isNaN(value) && value !== 0); // Filtrar valores inválidos

        // Verificar se há valores válidos para calcular a média
        if (numericValues.length === 0) {
          console.warn(`Nenhum valor numérico válido para calcular média: ${parameterName} - ${timeKey}`);
          return;
        }

        // Calcular a média
        const sum = numericValues.reduce((acc, curr) => acc + curr, 0);
        const avg = sum / numericValues.length;

        // Formatar valor para exibição com a unidade
        // Determinar o número de casas decimais com base no tipo de parâmetro
        let decimalPlaces = 2;
        if (unit === '%' || parameterName.toLowerCase().includes('umidade')) {
          decimalPlaces = 0; // Umidade geralmente é exibida sem casas decimais
        } else if (unit.includes('hPa') || parameterName.toLowerCase().includes('pressão')) {
          decimalPlaces = 1; // Pressão geralmente com uma casa decimal
        }

        const formattedValue = `${avg.toFixed(decimalPlaces)}${unit ? ' ' + unit : ''}`;

        averages.push({
          id: `${parameterName}-${timeKey}`, // ID único para este grupo
          name: parameterName,
          typeAverage: averageType === "hourly" ? "Média horária" : "Média diária",
          value: formattedValue,
          createdAt: timeKey
        });
      });
    });

    // Ordenar por data e depois por nome do parâmetro
    const sortedAverages = averages.sort((a, b) => {
      // Primeiro comparar por data (mais recente primeiro)
      // Converter formato DD/MM/AAAA para Date
      const getDateFromString = (dateString: string) => {
        // Extrair a parte da data (antes do espaço, se houver)
        const datePart = dateString.split(' ')[0];
        // Separar dia, mês e ano
        const [day, month, year] = datePart.split('/').map(Number);
        // Mês em JavaScript é baseado em zero (0-11)
        return new Date(year, month - 1, day);
      };

      const dateA = getDateFromString(a.createdAt);
      const dateB = getDateFromString(b.createdAt);

      const dateComparison = dateB.getTime() - dateA.getTime();
      if (dateComparison !== 0) return dateComparison;

      // Se mesma data, comparar a hora (se presente)
      if (a.createdAt.includes(' ') && b.createdAt.includes(' ')) {
        const timeA = a.createdAt.split(' ')[1];
        const timeB = b.createdAt.split(' ')[1];
        const hourA = parseInt(timeA.split(':')[0]);
        const hourB = parseInt(timeB.split(':')[0]);

        if (hourA !== hourB) {
          return hourB - hourA; // Mais recente primeiro
        }
      }

      // Se mesma data e hora, ordenar por nome do parâmetro
      return a.name.localeCompare(b.name);
    });

    setMeasures(sortedAverages);
  };

  useEffect(() => {
    // Inicialmente, buscar todos os dados
    fetchAllMeasures();
  }, [station.id, station.uuid, authContext.isAuthenticated]);

  // Recalcular médias quando o tipo de média mudar
  useEffect(() => {
    calculateAverages(filteredMeasures);
  }, [averageType]);

  // Aplicar filtros automaticamente quando as datas mudarem
  useEffect(() => {
    if (allMeasures.length > 0) {
      setLoading(true);

      // Usando setTimeout para dar feedback visual de carregamento
      setTimeout(() => {
        try {
          const filtered = applyDateFilters(allMeasures);
          setFilteredMeasures(filtered);
          calculateAverages(filtered);
        } catch (error) {
          console.error("Erro ao aplicar filtros:", error);
          errorSwal("Erro ao aplicar filtros");
        } finally {
          setLoading(false);
        }
      }, 100);
    }
  }, [filterType, singleDate, startDate, endDate]);

    const isFiltering = 
    (filterType === 'single' && !!singleDate) ||
    (filterType === 'interval' && !!startDate && !!endDate);


  // Handler para atualizar a data única
  const handleSingleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSingleDate(e.target.value);
  };

  // Handler para atualizar a data inicial
  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
  };

  // Handler para atualizar a data final
  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
  };

  return (
    <div className="station-tab">
      <div className="station-tab__header">
        <h2 className="station-tab__title">Médias de medições</h2>
      </div>

      <div className="station-tab__filter">
        <div className="style-select-1 filter-type">
          <label>
            <input
              type="radio"
              checked={filterType === 'single'}
              onChange={() => setFilterType('single')}
            />{' '}
            Data única
          </label>
          <label>
            <input
              type="radio"
              checked={filterType === 'interval'}
              onChange={() => setFilterType('interval')}
            />{' '}
            Intervalo
          </label>
        </div>

        {filterType === 'single' ? (
          <div className="input-container style-input-2">
            <input
              type="date"
              value={singleDate}
              onChange={handleSingleDateChange}
            />
          </div>
        ) : (
          <div className="input-container style-input-2">
            <input
              type="date"
              value={startDate}
              onChange={handleStartDateChange}
            />
            <span className="list"> até </span>
            <input
              type="date"
              value={endDate}
              onChange={handleEndDateChange}
              min={startDate} // Evita selecionar data final antes da inicial
            />
          </div>
        )}


   <div className="station-tab__average-type">
        <div className="style-select-1 filter-type">
          <label>
            <input
              type="radio"
              checked={averageType === 'hourly'}
              onChange={() => setAverageType('hourly')}
            />{' '}
            Média horária
          </label>
          <label>
            <input
              type="radio"
              checked={averageType === 'daily'}
              onChange={() => setAverageType('daily')}
            />{' '}
            Média diária
          </label>
        </div>
      </div>
      </div>

   <div className="auto-filter-message" style={{
          marginLeft: '10px',
          fontSize: '14px',
          fontStyle: 'italic',
          color: loading ? '#ff9800' : '#4caf50'
        }}>
          {loading && (
            <Loading />
          )}
        </div>


      <div className="station-tab__content">
        {loading ? (
          <Loading />
        ) : measures.length > 0 ? (
          <DynamicList
            data={measures}
            fields={[
              { key: "createdAt", label: "Data" },
              { key: "value", label: "Valor" },
              { key: "name", label: "Parâmetro" },
              { key: "typeAverage", label: "Tipo de média" },
            ]}
            onDelete={() => { }}
            onUpdate={() => { }}
            isEditable={false}
            isDelete={false}
            text="médias de medições"
          />
        ) : (
          <p className="station-tab__empty-message">
            {isFiltering
              ? 'Nenhuma média de medição disponível para os filtros selecionados'
              : 'Nenhuma média registrada nos últimos 7 dias'}          </p>
        )}
      </div>
    </div>
  );
}
