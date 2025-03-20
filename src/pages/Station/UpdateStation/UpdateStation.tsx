import { useEffect, useState } from "react";
import Button from "../../../components/button/Button";
import Input from "../../../components/input/Input";
import Modal from "../../../components/modal/Modal";
import "./UpdateStation.css";
import { errorSwal } from "../../../components/swal/errorSwal";
import { CreateStationType } from "../../../types/station/CreateStationType";
import { successSwal } from "../../../components/swal/sucessSwal";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../../components/loading/loading";
import { UpdateStationType } from "../../../types/station/UpdateStationType";
import api from "../../../api/api";

export default function UpdateStation() {
  const [name, setName] = useState("");
  const [uuid, setUuid] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const id = useParams().id;

  useEffect(() => {
    const handleReadStation = async () => {
      if (!id) {
        errorSwal("ID inválido");
        return;
      }
      try {
        const response = await api.get(`/station/read/${id}`);
        setName(response.data.model.name);
        setUuid(response.data.model.uuid);
        setLatitude(response.data.model.latitude);
        setLongitude(response.data.model.longitude);
      } catch (error) {
        errorSwal((error as any)?.response?.data?.error || "Erro desconhecido");
      } finally {
        setLoading(false);
      }
    };
    handleReadStation();
  }, []);

  const handleUpdateStation = async () => {
    if (!id) {
      errorSwal("ID inválido");
      return;
    }
    const data: UpdateStationType = {
      id,
      name,
      uuid,
      latitude,
      longitude,
    };
    try {
      const response = await api.put("/station/update", data);
      successSwal("Estação atualizada com sucesso");
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
            onClick={handleUpdateStation}
            label="Atualizar"
            styleButton={1}
          />
        </div>
      </div>
    </div>
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <main className="station">
      <Modal title="Editar estação" children={children} />
    </main>
  );
}
