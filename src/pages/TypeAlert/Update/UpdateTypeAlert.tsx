import Modal from "../../../components/modal/Modal";
import TypeAlertForm, {
  TypeAlertData,
} from "../../../components/typeAlert/TypeAlertForm";
import { useNavigate, useParams } from "react-router-dom";
import { log } from "node:console";
import api from "../../../api/api";
import { errorSwal } from "../../../components/swal/errorSwal";

const UpdateTypeAlert = () => {
  const { id } = useParams();
  const navigate = useNavigate();	

  const handleSubmit = async (data: TypeAlertData) => {
    try {
      data.id = id;
      const response = await api.put("/typeAlert", data);
      if(response.status === 200) {
        navigate(-1);
      }
    } catch (error) {
      errorSwal("Erro ao criar tipo de alerta");
    }
  };

  const children = (
    <TypeAlertForm onSubmit={handleSubmit} edit={true} id={id} />
  );

  return (
    <main>
      <Modal title="Edição de tipo de alerta" children={children} />
    </main>
  );
};

export default UpdateTypeAlert;
