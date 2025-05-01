import React, { useContext, useEffect, useState } from 'react';
import { ReadStationType } from '../../../types/station/ReadStationType';
import Dashboard, { Parameter } from '../../../components/dashboard/dashboard';
import dashboardService from '../../../api/dashboardService';
import '../shared/TabStyles.css';
import Button from '../../../components/button/Button';
import { AuthContext } from '../../../contexts/auth/AuthContext';
import Loading from '../../loading/loading';

export interface DashboardFilters {
    date?: string;
    startDate?: string;
    endDate?: string;
}

interface DashboardStationTabProps {
    station: ReadStationType;
    onUpdateStation?: () => Promise<void>;
}

// Novo tipo para resposta da API
type ApiMeasurement = {
    id: string;
    unixTime: string;
    value: string; // Agora é uma string que inclui o valor e a unidade
    parameterText: string;
};

type Measurement = {
    id: string;
    value: number;
    timestamp: string;
};

type ApiParameter = {
    id: string;
    name: string;
    type: { unit: string };
    measurements: Measurement[];
};

type ApiStation = {
    id: string;
    parameters: ApiParameter[];
};

export default function DashboardStationTab({ station }: DashboardStationTabProps) {
    const [parameters, setParameters] = useState<Parameter[]>([]);
    const [loading, setLoading] = useState(true);
    const [filterType, setFilterType] = useState<'single' | 'interval'>('single');
    const [singleDate, setSingleDate] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [chartType, setChartType] = useState<'line' | 'column' | 'area'>('line');
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

    // Função para converter timestamp Unix para timestamp em milissegundos local
    const convertUnixTimeToLocalTimestamp = (unixTime: string): number => {
        try {
            return parseInt(unixTime) * 1000;
        } catch (error) {
            console.error(`Erro ao converter timestamp unix: ${unixTime}`, error);
            return Date.now(); // Retornar timestamp atual como fallback
        }
    };

    // Função para processar os dados no novo formato
    const processApiData = (data: ApiMeasurement[]) => {
        if (!data || data.length === 0) {
            return [];
        }
        
        // Agrupar medições por parameterText
        const groupedByParameter = data.reduce((acc, measurement) => {
            // Se este parâmetro ainda não existe no acumulador, cria-o
            if (!acc[measurement.parameterText]) {
                // Extrair a unidade do valor
                const { unit } = extractValueAndUnit(measurement.value);
                
                // Determinar a unidade com base no valor ou nome do parâmetro se não houver unidade no valor
                let finalUnit = unit;
                if (!finalUnit) {
                    if (measurement.parameterText.toLowerCase().includes('temperatura')) {
                        finalUnit = '°C';
                    } else if (measurement.parameterText.toLowerCase().includes('umidade')) {
                        finalUnit = '%';
                    } else if (measurement.parameterText.toLowerCase().includes('pressão')) {
                        finalUnit = 'hPa';
                    } else if (measurement.parameterText.toLowerCase().includes('vento')) {
                        finalUnit = 'km/h';
                    }
                }
                
                acc[measurement.parameterText] = {
                    id: measurement.id,
                    name: measurement.parameterText,
                    type: { unit: finalUnit },
                    measurements: []
                };
            }
            
            try {
                // Extrair o valor numérico
                const { numericValue } = extractValueAndUnit(measurement.value);
                
                // Usar somente timestamp em milissegundos para o gráfico
                const timestamp = convertUnixTimeToLocalTimestamp(measurement.unixTime);
                
                // Adicionar medição ao parâmetro apenas se o valor for válido
                if (!isNaN(numericValue)) {
                    acc[measurement.parameterText].measurements.push({
                        id: measurement.id,
                        value: numericValue,
                        // Salvar como ISO string para o Highcharts interpretar corretamente
                        timestamp: new Date(timestamp).toISOString()
                    });
                }
            } catch (error) {
                console.error(`Erro ao processar medição: ${error}`);
            }
            
            return acc;
        }, {} as Record<string, ApiParameter>);
        
        // Converter o objeto agrupado em um array de parâmetros
        return Object.values(groupedByParameter);
    };

    const fetchData = async (filters?: DashboardFilters) => {
        setLoading(true);
        try {
            let apiData: ApiMeasurement[] = [];
            
            // Verificar o tipo de filtro e chamar o serviço apropriado
            if (!filters) {
                // Sem filtros - buscar dados padrão da estação
                if (!authContext.isAuthenticated) {
                    const response = await dashboardService.getDashboard(station.uuid);
                    apiData = response.data.model;
                } else {
                    const response = await dashboardService.listDashboard(station.uuid, "", "");
                    apiData = response.data.model;
                }
            } else if (filters.startDate && filters.endDate) {
                // Filtro por intervalo
                const response = await dashboardService.listDashboard(
                    station.uuid,
                    filters.startDate,
                    filters.endDate
                );
                apiData = response.data.model;
            } else if (filters.date) {
                // Filtro por data única - usar a mesma data como início e fim
                const response = await dashboardService.listDashboard(
                    station.uuid,
                    filters.date,
                    filters.date
                );
                apiData = response.data.model;
            }
            
            // Processar os dados no novo formato
            const params = processApiData(apiData);
            
            console.log('Dados recebidos da API:', params);
            
            setParameters(params as Parameter[]);
        } catch (err) {
            console.error('Erro ao carregar dados do dashboard:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [station.id, station.uuid]);

    const handleFilter = () => {
        const filters: DashboardFilters = {};
        if (filterType === 'single' && singleDate) {
            filters.date = singleDate;
        }
        if (filterType === 'interval' && startDate && endDate) {
            filters.startDate = startDate;
            filters.endDate = endDate;
        }
        fetchData(filters);
    };

    return (
        <div className="station-tab">
            <div className="station-tab__header">
                <h2 className="station-tab__title">Dashboard</h2>
            </div>

            <div className="chart-type-selector">
                <label className="chart-type-label">Tipo de gráfico:</label>
                <div className="chart-type-buttons">
                    <button 
                        className={`chart-type-button ${chartType === 'line' ? 'active' : ''}`}
                        onClick={() => setChartType('line')}
                    >
                        Linha
                    </button>
                    <button 
                        className={`chart-type-button ${chartType === 'column' ? 'active' : ''}`}
                        onClick={() => setChartType('column')}
                    >
                        Coluna
                    </button>
                    <button 
                        className={`chart-type-button ${chartType === 'area' ? 'active' : ''}`}
                        onClick={() => setChartType('area')}
                    >
                        Área
                    </button>
                </div>
            </div>

            <div className="station-tab__content">
                {loading ? (
                    <Loading />
                ) : parameters.length === 0 || parameters.every(p => p.measurements.length === 0) ? (
                    <p className="station-tab__empty-message">Nenhum dado encontrado para os filtros selecionados</p>
                ) : (
                    <Dashboard name={station.name} parameters={parameters} chartType={chartType} />
                )}
            </div>
        </div>
    );
}
