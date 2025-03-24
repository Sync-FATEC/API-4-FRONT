import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import userService from "../../../api/userService";
import Button from "../../../components/button/Button";
import Input from "../../../components/input/Input";
import { errorSwal } from "../../../components/swal/errorSwal";
import { successSwal } from "../../../components/swal/sucessSwal";
import './CreatePassword.css';
import Modal from "../../../components/modal/Modal";

export default function CreatePassword() {
    const email = useParams().email;
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const handleCreatePassword = async () => {
        const data = {
            email,
            password,
            confirmPassword,
        };
        try {
            const response = await userService.createPassword(data);
            successSwal("Senha criada com sucesso");
            navigate("/login");
        } catch (error) {
            errorSwal((error as any)?.response?.data?.error || "Erro desconhecido");
        }
    };

    const children = (
        <div className="register-modal">
            <div className="personal-data">
                <div className="subtitle">
                    <p>Criar senha</p>
                </div>

                <div className="input-container">
                    <Input
                        label="Senha"
                        placeholder="Digite a senha"
                        styleInput={2}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="input-container">
                    <Input
                        label="Confirmar senha"
                        placeholder="Confirme a senha"
                        styleInput={2}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
            </div>

            <div className="button-container">
                <Button
                    label="Criar senha"
                    onClick={handleCreatePassword}
                    styleButton={1}
                />
            </div>
        </div>
    );

return (
    <main>
      <Modal
      title='Cadastrar senha do usuário'
      children={children}
      />
    </main>
  );
}