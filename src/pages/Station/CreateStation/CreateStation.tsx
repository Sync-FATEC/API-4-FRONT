import { useState } from "react";
import Button from "../../../components/button/Button";
import Input from "../../../components/input/Input";
import Modal from "../../../components/modal/Modal";
import "./CreateStation.css";
import { errorSwal } from "../../../components/swal/errorSwal";
import { CreateStationType } from "../../../types/station/CreateStationType";
import { successSwal } from "../../../components/swal/sucessSwal";
import { useNavigate } from "react-router-dom";
import api from "../../../api/api";

export default function CreateStation() {
  const [name, setName] = useState("");
  const [uuid, setUuid] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const navigate = useNavigate();

  const handleCreateStation = async () => {
    const data: CreateStationType = {
      name,
      uuid,
      latitude,
      longitude,
    };
    try {
      const response = await api.post("/station/create", data);
      successSwal("Estação cadastrada com sucesso");
    } catch (error) {
      errorSwal((error as any)?.response?.data?.error || "Erro desconhecido");
    }
  };

  const children = (
    <div className="register-modal">
      <div className="personal-data">
        <div className="subtitle">
          <p>Dados da estação</p>
        </div>

        <div className="input-container">
          <Input
            label="Nome"
            placeholder="Digite o nome da estação"
            styleInput={2}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="input-container">
          <Input
            label="UUID"
            placeholder="UUID da estação"
            styleInput={2}
            value={uuid}
            onChange={(e) => setUuid(e.target.value)}
          />
        </div>

        <div className="input-container">
          <Input
            label="Latitude"
            placeholder="-99.999999"
            styleInput={2}
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
          />
        </div>

        <div className="input-container">
          <Input
            label="Longitude"
            placeholder="-99.999999"
            styleInput={2}
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
          />
        </div>

        <div className="Buttons">
          <Button
            onClick={() => {
              navigate(-1);
            }}
            label="Cancelar"
            styleButton={2}
          />
          <Button
            onClick={handleCreateStation}
            label="Cadastrar"
            styleButton={1}
          />
        </div>
      </div>
    </div>
  );

  return (
    <main className="station">
      <Modal title="Cadastro de estações" children={children} />
    </main>
  );
}
