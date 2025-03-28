import { useEffect, useState } from "react";
import { ReadStationType } from "../../../types/station/ReadStationType";
import "../shared/TabStyles.css";
import DynamicList from "../../list/DynamicList";
import api from "../../../api/api";
import { errorSwal } from "../../swal/errorSwal";
import { successSwal } from "../../swal/sucessSwal";

export interface ListMeasureResponseDTO {
  id: string;
  unixTime: number;
  value: number;
  parameterText: string;
}

export interface ListMeasure {
  id: string;
  unixTime: string;
  value: number;
  parameterText: string;
}

interface MeasureTabProps {
  station: ReadStationType;
  onUpdateStation: () => void;
}

export default function MeasureTab({
  station,
  onUpdateStation,
}: MeasureTabProps) {
  const [measures, setMeasures] = useState<ListMeasure[]>([]);

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/measure/delete/${id}`);
      setMeasures(measures.filter((measure) => measure.id !== id));
      successSwal("Medição deletada com sucesso");
    } catch (error) {
      errorSwal((error as any)?.response?.data?.error || "Erro desconhecido");
    }
  }

  const getAllMeasures = async () => {
    try {
      const response = await api.get("/measure/list", {
        params: { stationId: station.id },
      });
      setMeasures(
        response.data.model.map((measure: ListMeasureResponseDTO) => ({
          ...measure,
          unixTime: new Date(measure.unixTime * 1000).toLocaleString("pt-BR"),
        }))
      );
    } catch (error) {
      errorSwal((error as any)?.response?.data?.error || 'Erro desconhecido');
    }
  };

  useEffect(() => {
    getAllMeasures();
  }, []);

  return (
    <div className="station-tab">
      <h2 className="station-tab__title">Medições</h2>

      <div className="station-tab__content">
        {measures.length > 0 ? (
          <DynamicList
            data={measures}
            fields={[
              { key: "unixTime", label: "Data" },
              { key: "value", label: "Valor" },
              { key: "parameterText", label: "Parâmetro" },
            ]}
            onDelete={handleDelete}
            onUpdate={(id) => {}}
            isEditable={false}
            isDelete={true}
            text="medições"
          />
        ) : (
          <p className="station-tab__empty-message">
            Nenhuma medição registrada para esta estação
          </p>
        )}
      </div>
    </div>
  );
}
