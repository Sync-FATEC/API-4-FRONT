import React, { useContext } from "react";
import "./auth.css";
import { AuthContext } from "../../contexts/auth/AuthContext";
import { useNavigate } from "react-router-dom";
import logo from "./img/logo.svg";

export default function LoginComponent() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmitLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const email = form.text.value;
    const password = form.password.value;

    try {
      await authContext.login(email, password);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main>
      <div className="background"></div>
      <section className="formAuth Login">
        <form onSubmit={handleSubmitLogin}>
          <img src={logo} alt="" />
          <label htmlFor="text">Endereço de e-mail</label>
          <input type="text" id="text" name="text" placeholder="" required />
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            placeholder=""
          />
          <p>
            Esqueceu sua senha? <a href="/esqueci-senha">Clique aqui</a>
          </p>
          <button type="submit">Entrar</button>
        </form>
        <div className="ou-line">
          <div className="line"></div>
          <p>ou</p>
          <div className="line"></div>
        </div>
        <button>Entrar apenas como leitor</button>
      </section>
    </main>
  );
}
