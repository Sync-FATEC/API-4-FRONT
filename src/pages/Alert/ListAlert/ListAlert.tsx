import React, { useEffect, useState } from "react";
import ModalAdmin from "../../../components/modalAdmin/ModalAdmin";
import api from "../../../api/api";
import { UnifiedAlertDTO, ListAlertDTO } from "../../../components/TabsStation/alertTab/AlertTab";
import { alertService } from "../../../api/alertService";
import { successSwal } from "../../../components/swal/sucessSwal";
import { errorSwal } from "../../../components/swal/errorSwal";
import Loading from "../../../components/loading/loading";
import { transformCriticality } from "../../../utils/transformCriticality";
// filepath: c:\Users\erikc\OneDrive\Área de Trabalho\API.2025.1\API-4-FRONT\src\pages\Alert\ListAlert\ListAlert.tsx

export interface AlertProps {
  title: string;
  description: string;
  severity: string;
  status: string;
  lastUpdate: string;
  id: number;
  criticality: string;
}

const ListAlert: React.FC = () => {
  const [alerts, setAlerts] = useState<UnifiedAlertDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);

    const handleDelete = async (id: string) => {
      try {
        await alertService.deleteAlert(id);
        setAlerts(alerts.filter((alert) => alert.id !== id));
        successSwal("Alerta deletado com sucesso");
      } catch (error) {
        errorSwal((error as any)?.response?.data?.error || "Erro desconhecido");
      }
    }

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
          criticality: transformCriticality(alert.measure.criticality),
        }))
      );
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllAlerts();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

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
            { key: "criticality", label: "Criticidade" },
          ],
        onDelete: handleDelete,
        onUpdate: () => {},
        isEditable: false,
        isDelete: true,
      }}
      style={1}
    />
  );
};

export default ListAlert;
