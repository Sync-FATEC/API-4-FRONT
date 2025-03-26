import React, { useEffect, useState } from "react";
import ModalAdmin from "../../../components/modalAdmin/ModalAdmin";
import api from "../../../api/api";
import { errorSwal } from "../../../components/swal/errorSwal";
import { useNavigate } from "react-router-dom";
import { successSwal } from "../../../components/swal/sucessSwal";

const ListTypeAlert: React.FC = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  interface TypeAlert {
    id: number;
    name: string;
    value: number;
    comparisonOperator: string;
    parameter: string;
  }

  const fields = [
    { key: "name" as keyof TypeAlert, label: "Nome" },
    { key: "value" as keyof TypeAlert, label: "Valor" },
    { key: "comparisonOperator" as keyof TypeAlert, label: "Comparador" },
    { key: "parameterText" as keyof TypeAlert, label: "Parâmetro" },
  ];

  const getTypeAlerts = async () => {
    try {
      const response = await api.get("/typeAlert");
      setData(response.data.model);
    } catch (error) {
      console.error(error);
      errorSwal("Erro ao buscar os tipos de alerta");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await api.delete(`/typeAlert/${id}`);
      if (response.status != 200)
        return errorSwal("Erro ao deletar o tipo de alerta");
      getTypeAlerts();
      successSwal("Tipo de alerta deletado com sucesso");
    } catch (error) {
      console.error(error);
      errorSwal("Erro ao deletar o tipo de alerta");
    }
  };

  useEffect(() => {
    getTypeAlerts();
  }, []);

  return (
    <ModalAdmin
      createlink="/tipo-alerta/criar"
      listProps={{
        data,
        fields,
        onDelete: (id) => {handleDelete(id)},
        onUpdate: (id) => {
          navigate("/tipo-alerta/editar/" + id);
        },
        isEditable: true,
      }}
      style={1}
      text="tipos de alerta"
    />
  );
};

export default ListTypeAlert;
