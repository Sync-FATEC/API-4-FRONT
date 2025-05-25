import { useNavigate, useParams } from "react-router-dom";
import { useContext, useState } from "react";
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import "./ResetPassword.css";
import logo from "../../../src/static/img/tecsus-logo.png";
import { AuthContext } from "../../contexts/auth/AuthContext";
import { eventNames } from "node:process";
import { errorSwal } from "../../components/swal/errorSwal";

export default function ResetPassword() {
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    const { token } = useParams<{ token: string }>();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async (event?: React.FormEvent) => {
    if (event) event.preventDefault();

    // Verifica se as senhas são iguais
    if (password !== confirmPassword) {
        errorSwal("As senhas não coincidem.");
        return;
    }

    // Enviar senha para o servidor
    try {
        console.log(token);
        await authContext.changePassword(password, token!);
        navigate("/login");
    } catch (error) {
        alert("Erro ao alterar a senha. Tente novamente.");
    }
    }

    return (
        <main className="forget-password-container">
        <div className="forget-password-background"></div>
        <section className="forget-password-form-container">
            <form className="forget-password-form">
            <img src={logo} alt="Logo" className="forget-password-logo" />
            
            <div className="forget-password-content">
                <p className="forget-password-title">Alterar sua senha:</p>
                <p className="forget-password-text">
                Por favor, digite abaixo a sua nova senha:
                </p>

                <Input label="Digite sua senha:" type="password" onChange={e => setPassword(e.target.value)} value={password}/>
                <Input label="Confirme sua senha:" type="password" onChange={e => setConfirmPassword(e.target.value)} value={confirmPassword}/>

            </div>

            <div className="forget-password-button">
                <Button label="Criar Nova Senha" styleButton={3} onClick={handleSubmit}/>
            </div >
            </form>
        </section>
        </main>
    );
}
