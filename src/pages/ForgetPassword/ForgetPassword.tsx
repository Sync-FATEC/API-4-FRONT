import "./ForgetPassword.css";
import logo from "./static/img/logo.svg";

export default function ForgetPasswordComponent() {
  return (
    <main>
      <div className="background"></div>
      <section className="formAuth">
        <form>
          <img src={logo} alt="" />
          <p className="Destaque" >Esqueceu a senha?</p>
          <p>
            Insira seu e-mail corporativo e receba uma mensagem para redefinir
            sua senha
          </p>
          <label htmlFor="text">Endereço de e-mail</label>
          <input type="text" id="text" name="text" placeholder="" required />
          <p>
            Para voltar a tela de login: <a href="/login">Clique aqui</a>
          </p>
          <button type="submit">Enviar e-mail</button>
        </form>
      </section>
    </main>
  );
}
