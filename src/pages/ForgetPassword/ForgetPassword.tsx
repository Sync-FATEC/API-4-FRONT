import "./ForgetPassword.css";
import logo from "./static/img/tecsus-logo.png";

export default function ForgetPasswordComponent() {
  return (
    <main className="forget-password-container">
      <div className="forget-password-background"></div>
      <section className="forget-password-form-container">
        <form className="forget-password-form">
          <img src={logo} alt="Logo" className="forget-password-logo" />
          <p className="forget-password-title">Esqueceu a senha?</p>
          <p className="forget-password-text">
            Insira seu e-mail corporativo e receba uma mensagem para redefinir
            sua senha
          </p>
          <label htmlFor="text" className="forget-password-label">Endereço de e-mail</label>
          <input type="text" id="text" name="text" className="forget-password-input" required />
          <p className="forget-password-back">
            Para voltar à tela de login: <a href="/login" className="forget-password-link">Clique aqui</a>
          </p>
          <button type="submit" className="forget-password-button">Enviar e-mail</button>
        </form>
      </section>
    </main>
  );
}
