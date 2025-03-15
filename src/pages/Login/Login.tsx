import React, { useContext } from "react";
import "./Login.css";
import { AuthContext } from "../../contexts/auth/AuthContext";
import { useNavigate } from "react-router-dom";
import logo from "./static/img/tecsus-logo.png";
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";

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
    <main className="login-container">
      <div className="login-background"></div>
      <section className="login-form-container">
        <form onSubmit={handleSubmitLogin} className="login-form">
          <img src={logo} alt="Logo" className="login-logo" />
          <div className="login-input">
            <Input label="Endereço de E-mail" styleInput={1}/>
            <Input label="Senha" styleInput={1}/>
          </div>
          <p className="login-forgot">
            Esqueceu sua senha? <a href="/esqueci-senha" className="login-link">Clique aqui</a>
          </p>
          <div className="login-buttons">
            <Button label="Entrar" styleButton={3} />
          </div>
          
          <div className="login-divider">
            <div className="divider-line"></div>
            <p className="divider-text">ou</p>
            <div className="divider-line"></div>
          </div>

          <div className="login-buttons">
            <Button label="Entrar apenas como leitor" onClick={() => navigate('/dashboard')} styleButton={3} />
          </div>

        </form>
      </section>
    </main>
  );
}
