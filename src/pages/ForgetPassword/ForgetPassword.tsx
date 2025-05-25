import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import "./ForgetPassword.css";
import logo from "../../../src/static/img/tecsus-logo.png";
import { AuthContext } from "../../contexts/auth/AuthContext";
import { successSwal } from "../../components/swal/sucessSwal";

export default function ForgetPasswordComponent() {
  const authContext = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    try {
      await authContext.resetPassword(email);
      // Para mostrar o swal até o usuário clicar em OK:
      successSwal("Um e-mail com o link para redefinição de senha foi enviado para você!", false);
    } catch (error) {
      console.error("Erro ao redefinir a senha:", error);
    }
  }

  return (
    <main className="forget-password-container">
      <div className="forget-password-background"></div>
      <section className="forget-password-form-container">
        <form className="forget-password-form" onSubmit={handleSubmit}>
          <img src={logo} alt="Logo" className="forget-password-logo" />
          
          <div className="forget-password-content">
            <p className="forget-password-title">Esqueceu a senha?</p>
            <p className="forget-password-text">
              Insira seu e-mail corporativo e receba uma mensagem para redefinir
              sua senha
            </p>

            <Input label="Digite seu e-mail" onChange={e => setEmail(e.target.value)} value={email}/>
            <p className="forget-password-back">
              Para voltar à tela de login: <a href="/login" className="forget-password-link">Clique aqui</a>
            </p>
          </div>

          <div className="forget-password-button">
            <Button label="Enviar e-mail" styleButton={3} onClick={handleSubmit}/>
          </div >
        </form>
      </section>
    </main>
  );
}