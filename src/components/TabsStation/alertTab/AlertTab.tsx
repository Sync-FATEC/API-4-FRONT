import { useEffect, useState } from "react";
import { ReadStationType } from "../../../types/station/ReadStationType";
import "../shared/TabStyles.css";
import DynamicList from "../../list/DynamicList";
import api from "../../../api/api";

export interface ListAlertDTO {
  id: string;
  message: string;
  measure: ListMeasureResponseDTO;
}

export interface ListMeasureResponseDTO {
  id: string;
  unixTime: number;
  value: number;
  parameterText: string;
}

interface AlertTabProps {
  station: ReadStationType;
  onUpdateStation: () => void;
}

export interface UnifiedAlertDTO {
  id: string;
  message: string;
  unixTime: string;
  value: number;
  parameterText: string;
}

export default function AlertTab({ station, onUpdateStation }: AlertTabProps) {
  const [alerts, setAlerts] = useState<UnifiedAlertDTO[]>([]);

  const getAllAlerts = async () => {
    try {
      const response = await api.get("/alert/list", {
        params: { stationId: station.id },
      });
      let alerts: ListAlertDTO[] = response.data.model;
      setAlerts(
        alerts.map((alert) => ({
          id: alert.id,
          message: alert.message,
          unixTime: new Date(alert.measure.unixTime * 1000).toLocaleString(
            "pt-BR"
          ),
          value: alert.measure.value,
          parameterText: alert.measure.parameterText,
        }))
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllAlerts();
  }, []);

  return (
    <div className="station-tab">
      <h2 className="station-tab__title">Alertas</h2>

      <div className="station-tab__content">
        {alerts.length > 0 ? (
          <DynamicList
            data={alerts}
            fields={[
              { key: "message", label: "Mensagem" },
              { key: "unixTime", label: "Data" },
              { key: "value", label: "Valor" },
              { key: "parameterText", label: "Parâmetro" },
            ]}
            onDelete={(id) => {}}
            onUpdate={(id) => {}}
            isEditable={false}
            text="alertas"
          />
        ) : (
          <p className="station-tab__empty-message">
            Nenhum alerta registrado para esta estação
          </p>
        )}
      </div>
    </div>
  );
}
