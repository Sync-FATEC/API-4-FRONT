import React, { useEffect, useState } from 'react';
import './EditClient.css';
import Modal from '../../../components/modal/Modal';
import Input from '../../../components/input/Input';
import Button from '../../../components/button/Button';
import userService from '../../../api/userService';
import { parseISO, format } from "date-fns";
import { jwtDecode } from 'jwt-decode';
import { successSwal } from '../../../components/swal/sucessSwal';
import { errorSwal } from '../../../components/swal/errorSwal';
import { useNavigate, useParams } from 'react-router-dom';

function formatCPF(cpf: string) {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

export default function EditClient() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string | null>(null);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    cpf: '',
    createdAt: '',
    role: ''
  });
  const [cpfOriginal, setCpfOrifinal] = useState('');
  const id = useParams().id;

  const handleSubmitEdit = async () => {
    const data = {
      id: userId,
      name: userData.name,
      email: userData.email,
      cpf: cpfOriginal,
      role: userData.role
    }

    try {
      await userService.editUser(data);
      navigate("/usuario");
      successSwal('Usuário atualizado com sucesso');
    } catch (error) {
      errorSwal((error as any)?.response?.data?.error || 'Erro desconhecido');
    }
  }

  useEffect(() => {
    async function fetchUserData() {
      if (!id) return;
  
      try {
        const response = await userService.getDataUser(id);
        const { name, email, cpf, createdAt, role } = response.data.model;
  
        setCpfOrifinal(cpf);
        const formattedDate = format(parseISO(createdAt), "dd/MM/yyyy");
        setUserId(id);
        setUserData({ name, email, cpf, createdAt: formattedDate, role });
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      }
    }
  
    fetchUserData();
  }, [userId]);

  const description = (
    <div className='description'>
      <p>Cadastro em <span className='bold'>{userData.createdAt}</span></p>
    </div>
  );

  const children = (
    <div className='edit-modal'>
      <div className='personal-data'>
        <div className='subtitle'>
          <p>Dados pessoais</p>
        </div>

        <div className='input-container'>
          <Input label='Nome' value={userData.name} styleInput={2} onChange={(e) => setUserData({...userData, name: e.target.value})}/>
        </div>

        <div className='input-container'>
          <Input label='E-mail' value={userData.email} styleInput={2} onChange={(e) => setUserData({...userData, email: e.target.value})}/>
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
          <Input label='CPF' value={formatCPF(userData.cpf || '12345678900')} styleInput={2} disabled/>
        </div>
      </div>
      
      <div className='Buttons'>
        <Button label='Cancelar' onClick={() => {navigate(-1)}} styleButton={2}/>
        <Button label='Editar' onClick={handleSubmitEdit} styleButton={1}/>
      </div>

    </div>
  );

  return (
    <main>
      <Modal 
      title='Detalhes do usuário'
      description={description}
      children={children}
      />
    </main>
  );
}
