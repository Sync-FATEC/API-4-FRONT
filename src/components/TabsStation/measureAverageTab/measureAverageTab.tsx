import { useContext, useEffect, useState } from "react";
import { ReadStationType } from "../../../types/station/ReadStationType";
import "../shared/TabStyles.css";
import DynamicList from "../../list/DynamicList";
import api from "../../../api/api";
import { errorSwal } from "../../swal/errorSwal";
import { successSwal } from "../../swal/sucessSwal";
import { measureAverageService } from "../../../api/measureAverageService";
import Button from "../../button/Button";
import { AuthContext } from "../../../contexts/auth/AuthContext";

export interface ListMeasureAverageResponseDTO {
  id: string;
  typeAverage: number;
  name: string;
  value: string;
  createdAt: string;
}

interface MeasureTabProps {
  station: ReadStationType;
  onUpdateStation: () => void;
}

export default function measureAverageTab({
  station,
  onUpdateStation,
}: MeasureTabProps) {
  const [measures, setMeasures] = useState<ListMeasureAverageResponseDTO[]>([]);
  const [filterType, setFilterType] = useState<string>("single");
  const [singleDate, setSingleDate] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const authContenxt = useContext(AuthContext)

  const getAllMeasures = async () => {
    try {
      const response = await measureAverageService.getMeasureAverageLast7Days(station.id);
      setMeasures(transformResponse(response.data.model));
    } catch (error) {
    }
  };

  useEffect(() => {
    getAllMeasures();
  }, []);

  const transformTypeAverage = (typeAverage: number) => {
    return typeAverage === 0 ? "Média horária" : "Média diária";
  }

  const transformResponse = (response: any[]) => {
    return response.map((measure: any) => ({
      ...measure,
      createdAt: new Date(measure.createdAt).toLocaleString("pt-BR"),
      typeAverage: transformTypeAverage(measure.typeAverage),
    }));
  }

  const handleFilter = async () => {
    setLoading(true);
  
    try {
      let response;
  
      if (filterType === "single") {
        response = singleDate
          ? await measureAverageService.getMeasureAverageDate(station.id, singleDate)
          : await measureAverageService.getMeasureAverageLast7Days(station.id);
      } else {
        response = (startDate && endDate)
          ? await measureAverageService.getMeasureAverageBetweenDates(station.id, startDate, endDate)
          : await measureAverageService.getMeasureAverageLast7Days(station.id);
      }
  
      setMeasures(transformResponse(response.data.model));
    } catch (error: any) {
      const errorMsg = error?.response?.data?.error || "Erro desconhecido";
      errorSwal(errorMsg);
    } finally {
      setLoading(false);
    }
  };
  

  return (
      <div className="station-tab">
            <div className="station-tab__header">
                <h2 className="station-tab__title">Médias de medições</h2>
            </div>

            {authContenxt.isAuthenticated && (

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
                            onChange={e => setSingleDate(e.target.value)}
                        />
                    </div>
                ) : (
                    <div className="input-container style-input-2">
                        <input
                            type="date"
                            value={startDate}
                            onChange={e => setStartDate(e.target.value)}
                        />
                        <span className="list"> até </span>
                        <input
                            type="date"
                            value={endDate}
                            onChange={e => setEndDate(e.target.value)}
                        />
                    </div>
                )}       
                    <Button
                        label={loading ? 'Carregando...' : 'Filtrar'}
                        onClick={handleFilter}
                        styleButton={1}
                    />   
            </div>
            )}
      <div className="station-tab__content">
        {measures.length > 0 ? (
          <DynamicList
            data={measures}
            fields={[
              { key: "createdAt", label: "Data" },
              { key: "value", label: "Valor" },
              { key: "name", label: "Parâmetro" },
              { key: "typeAverage", label: "Tipo de média" },
            ]}
            onDelete={() => {}}
            onUpdate={() => {}}
            isEditable={false}
            isDelete={false}
            text="médias de medições"
          />
        ) : (
          <p className="station-tab__empty-message">
            Nenhuma média de medição registrada para esta estação
          </p>
        )}
      </div>
    </div>
  );
}
