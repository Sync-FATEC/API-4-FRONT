import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import "./ForgetPassword.css";
import logo from "./static/img/tecsus-logo.png";

export default function ForgetPasswordComponent() {
  return (
    <main className="forget-password-container">
      <div className="forget-password-background"></div>
      <section className="forget-password-form-container">
        <form className="forget-password-form">
          <img src={logo} alt="Logo" className="forget-password-logo" />
          
          <div className="forget-password-content">
            <p className="forget-password-title">Esqueceu a senha?</p>
            <p className="forget-password-text">
              Insira seu e-mail corporativo e receba uma mensagem para redefinir
              sua senha
            </p>

            <Input label="Digite seu e-mail" />
            <p className="forget-password-back">
              Para voltar à tela de login: <a href="/login" className="forget-password-link">Clique aqui</a>
            </p>
          </div>

          <div className="forget-password-button">
            <Button label="Enviar e-mail" styleButton={3} />
          </div >
        </form>
      </section>
    </main>
  );
}
