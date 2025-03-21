import './RegisterClient.css';
import Modal from '../../components/modal/Modal';
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';
import { useState } from 'react';
import userService from '../../api/UserService';

function formatCPF(cpf: string) {
  cpf = cpf.replace(/\D/g, ''); // Remove tudo que não for número
  cpf = cpf.slice(0, 11); // Garante no máximo 11 dígitos

  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, (match, p1, p2, p3, p4) => 
    p4 ? `${p1}.${p2}.${p3}-${p4}` : `${p1}.${p2}.${p3}`
  );
}


export default function RegisterClient() {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    cpf: '', // Armazena CPF sem formatação
  });

  function handleCPFChange(e: React.ChangeEvent<HTMLInputElement>) {
    const rawCPF = e.target.value.replace(/\D/g, '');
    setUserData({ ...userData, cpf: rawCPF });
  }

  const handleSubmit = async () => {
    try {
      const response = await userService.registerUser(userData);
      console.log('Usuário cadastrado com sucesso:', response.data);
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
    }
  };

  const children = (
    <div className='register-modal'>
      <div className='personal-data'>
        <div className='subtitle'>
          <p>Dados pessoais</p>
        </div>

        <div className='input-container'>
          <Input label='Nome' placeholder='Digite seu nome' styleInput={2} onChange={(e) => setUserData({...userData, name: e.target.value})}/>
        </div>

        <div className='input-container'>
          <Input label='E-mail' placeholder='usuario@mail.com' styleInput={2} onChange={(e) => setUserData({...userData, email: e.target.value})}/>
        </div>
      </div>

      <div className='identification-documents'>
        <div className='subtitle'>
          <p>Documentos de identificação</p>
        </div>

        <div className='input-container'>
          <Input label='CPF' placeholder='123.456.789-00' styleInput={2} value={formatCPF(userData.cpf)} onChange={handleCPFChange}/>
        </div>
      </div>

      <div className='Buttons'>
        <Button label='Cancelar' styleButton={2}/>
        <Button label='Cadastrar' onClick={handleSubmit} styleButton={1}/>
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
