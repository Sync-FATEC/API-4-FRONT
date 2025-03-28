import './RegisterClient.css';
import Modal from '../../../components/modal/Modal';
import Input from '../../../components/input/Input';
import Button from '../../../components/button/Button';
import { useState } from 'react';
import userService from '../../../api/userService';
import { useNavigate } from 'react-router-dom';
import { successSwal } from '../../../components/swal/sucessSwal';
import { errorSwal } from '../../../components/swal/errorSwal';

function formatCPF(cpf: string) {
  cpf = cpf.replace(/\D/g, ''); // Remove tudo que não for número
  cpf = cpf.slice(0, 11); // Garante no máximo 11 dígitos

  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, (match, p1, p2, p3, p4) => 
    p4 ? `${p1}.${p2}.${p3}-${p4}` : `${p1}.${p2}.${p3}`
  );
}

// Função para validar o formato do e-mail
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export default function RegisterClient() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    cpf: '',
    role: ''
  });

  function handleCPFChange(e: React.ChangeEvent<HTMLInputElement>) {
    const rawCPF = e.target.value.replace(/\D/g, '');
    setUserData({ ...userData, cpf: rawCPF });
  }

  const handleSubmit = async () => {
    if (!isValidEmail(userData.email)) {
      errorSwal('Por favor, insira um e-mail válido.');
      return;
    }

    try {
      const response = await userService.registerUser(userData);
      successSwal('Usuário cadastrado com sucesso');
      navigate("/usuario");
    } catch (error) {
      errorSwal((error as any)?.response?.data?.error || 'Erro desconhecido');
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

        <div className='input-container'>
          <label className='input-label'>Tipo de Usuário</label>
          <select 
            className='input-select'
            value={userData.role}
            onChange={(e) => setUserData({...userData, role: e.target.value})}
          >
            <option value="FUNCIONARIO">Funcionário</option>
            <option value="ADMIN">Administrador</option>
          </select>
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
        <Button label='Cancelar' onClick={() => {navigate(-1)}} styleButton={2}/>
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