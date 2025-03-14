import React, { useContext } from 'react';
import './Register.css';
import { AuthContext } from '../../contexts/auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import api, { links } from '../../api/api';
import { RegisterForm } from '../../type/auth';
import { errorSwal } from '../../components/swal/errorSwal';
import Modal from '../../components/modal/Modal';

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

  const children = (
    <div className='register-modal'>
      <h2>Dados pessoais</h2>
      <label>Nome</label>
      <input type="text" />
      <label>Email</label>
      <input type="text" />
    </div>
  );

  return (
    <main>
      <Modal 
      title='Cadastro de usuário'
      children={children}
      />
    </main>
  );
}
