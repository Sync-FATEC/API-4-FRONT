import Modal from "../../../components/modal/Modal";
import "./CreateTypeAlert.css";
import TypeAlertForm, { TypeAlertData } from "../../../components/typeAlert/TypeAlertForm";
import api from "../../../api/api";
import { errorSwal } from "../../../components/swal/errorSwal";
import { useNavigate } from "react-router-dom";

const CreateTypeAlert = () => {
  const navigate = useNavigate();

  const handleSubmit = async (data: TypeAlertData) => {
    try {
      const response = await api.post('/typeAlert', data);
      if(response.status === 201) {
        navigate(-1);
      }
    } catch (error) {
      errorSwal("Erro ao criar tipo de alerta");
    }
  };

  const children = <TypeAlertForm onSubmit={handleSubmit} edit={false} />;

  return (
    <main>
      <Modal title="Cadastro de tipo de alerta" children={children} />
    </main>
  );
};

export default CreateTypeAlert;
