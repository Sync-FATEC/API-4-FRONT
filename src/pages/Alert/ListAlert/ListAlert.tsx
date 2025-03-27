import React, { useEffect, useState } from "react";
import ModalAdmin from "../../../components/modalAdmin/ModalAdmin";
import api from "../../../api/api";
import { UnifiedAlertDTO, ListAlertDTO } from "../../../components/TabsStation/alertTab/AlertTab";

// filepath: c:\Users\erikc\OneDrive\Área de Trabalho\API.2025.1\API-4-FRONT\src\pages\Alert\ListAlert\ListAlert.tsx

export interface AlertProps {
  title: string;
  description: string;
  severity: string;
  status: string;
  lastUpdate: string;
  id: number;
}

const ListAlert: React.FC = () => {
  const [alerts, setAlerts] = useState<UnifiedAlertDTO[]>([]);

  const getAllAlerts = async () => {
    try {
      const response = await api.get("/alert/list");
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
    <ModalAdmin
      createlink=""
      text="alertas"
      listProps={{
        data: alerts,
        fields: [
            { key: "message", label: "Mensagem" },
            { key: "unixTime", label: "Data" },
            { key: "value", label: "Valor" },
            { key: "parameterText", label: "Parâmetro" },
          ],
        onDelete: () => {},
        onUpdate: () => {},
        isEditable: false,
      }}
      style={1}
    />
  );
};

export default ListAlert;
