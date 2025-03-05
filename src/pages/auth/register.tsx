import React, { useContext } from 'react';
import './auth.css';
import { AuthContext } from '../../contexts/auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import api, { links } from '../../api/api';
import { RegisterForm } from '../../type/auth';
import { errorSwal } from '../../components/swal/errorSwal';

export default function RegisterComponent() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  if (authContext.isAuthenticated) {
    navigate('/sidebar');
  }

  const handleSubmitRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    let cpf = (form.elements.namedItem('cpf') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;
    const role = 'USER';

    cpf = cpf.replace(/\D/g, '');

    const registerData: RegisterForm = {
      name,
      email,
      cpf,
      password,
      role
    };

    try {
      await links.registerUser(registerData);
      navigate('/login');
    } catch (error) {
      errorSwal((error as any).response.data.error);
    }
  };

  return (
    <main>
      <section className='formAuth Register'>
        <form onSubmit={handleSubmitRegister}>
          <img className='logo-mobile' src="/static/img/logo.svg" alt="" />
          <h1>Nome generico</h1>
          <p>Crie sua conta</p>
          <input type='text' id='text' name='name' placeholder='Nome' required />
          <input type='text' id='text' name='email' placeholder='Email' required />
          <input type='text' id='text' name='cpf' placeholder='CPF' required />
          <input type='password' id='password' name='password' required placeholder='Senha' />
          <button type='submit'>Registrar</button>
        </form>
        <div className="cardMobile">
          <h2>Já tem sua conta?</h2>
          <a href="/login">Acesse sua conta</a>
        </div>
        <div className='formAuthImg'>
          <div className="card">
            <h2>Já tem sua conta?</h2>
            <a href="/login">Acesse sua conta</a>
          </div>
        </div>
      </section>
    </main>
  );
}
