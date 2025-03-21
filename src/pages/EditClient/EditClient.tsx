import React, { useEffect, useState } from 'react';
import './EditClient.css';
import Modal from '../../components/modal/Modal';
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';
import userService from '../../api/userService';
import { parseISO, format } from "date-fns";
import { jwtDecode } from 'jwt-decode';

function formatCPF(cpf: string) {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

function getUserIdFromToken(): string | null {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const decoded: { id: string } = jwtDecode(token);
    return decoded.id;
  } catch (error) {
    console.error('Erro ao decodificar o token:', error);
    return null;
  }
}

export default function EditClient() {
  const [userId, setUserId] = useState<string | null>(null);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    cpf: '',
    createdAt: '',
  });
  const [cpfOriginal, setCpfOrifinal] = useState('');

  useEffect(() => {
    const id = getUserIdFromToken();
    setUserId(id);
  }, []);

  const handleSubmitEdit = async () => {
    const data = {
      id: userId,
      name: userData.name,
      email: userData.email,
      cpf: cpfOriginal
    }

    try {
      await userService.editUser(data);
      alert('Usuário atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      alert('Erro ao atualizar usuário')
    }
  }

  useEffect(() => {
    async function fetchUserData() {
      if (!userId) return;
  
      try {
        const response = await userService.getDataUser(userId);
        const { name, email, cpf, createdAt } = response.data.model;
  
        setCpfOrifinal(cpf); // Ensure cpfOriginal is updated here
        const formattedDate = format(parseISO(createdAt), "dd/MM/yyyy");
  
        setUserData({ name, email, cpf, createdAt: formattedDate });
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
        <Button label='Cancelar' styleButton={2}/>
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
