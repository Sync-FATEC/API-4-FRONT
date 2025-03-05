import React, { useContext } from 'react';
import './auth.css';
import { AuthContext } from '../../contexts/auth/AuthContext';
import { useNavigate } from 'react-router-dom';

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
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  }
  
  return (
    <main>
      <section className='formAuth Login'>
        <form onSubmit={handleSubmitLogin}>
        <img className='logo-mobile' src="/static/img/logo.svg" alt="" />
          <h1>Nome generico</h1>
          <p>Acesse sua conta</p>
          <input type='text' id='text' name='text' placeholder='Email' required />
          <input type='password' id='password' name='password' required placeholder='Senha' />
          <button type='submit'>Login</button>
        </form>
        <div className='cardMobile'>
          <h2>Não tem uma conta?</h2>
          <a href="/register">Registre-se para ter acesso ao site</a>
        </div>
        <div className='formAuthImg'>
          <div className='card'>
            <h2>Não tem uma conta?</h2>
            <a href="/register">Registre-se para ter acesso ao site</a>
          </div>
        </div>
      </section>
    </main>
  );
}
