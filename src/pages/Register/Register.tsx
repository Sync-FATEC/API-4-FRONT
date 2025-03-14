import React, { useContext } from 'react';
import './Register.css';
import { AuthContext } from '../../contexts/auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import api, { links } from '../../api/api';
import { RegisterForm } from '../../type/auth';
import { errorSwal } from '../../components/swal/errorSwal';
import Modal from '../../components/modal/Modal';
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';

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
      <div className='personal-data'>
        <div className='subtitle'>
          <p>Dados pessoais</p>
        </div>

        <div className='input-container'>
          <Input label='Nome' placeholder='Digite seu nome'/>
        </div>

        <div className='input-container'>
          <Input label='E-mail'placeholder='usuario@mail.com'/>
        </div>
      </div>

      <div className='identification-documents'>
        <div className='subtitle'>
          <p>Documentos de identificação</p>
        </div>

        <div className='input-container'>
          <Input label='CPF' placeholder='123.456.789-00'/>
        </div>
      </div>
      
      <div className='Buttons'>
        <Button label='Cancelar' styleButton={2}/>
        <Button label='Cadastrar' styleButton={1}/>
      </div>

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
