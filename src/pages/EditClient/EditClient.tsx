import React, { useEffect, useState } from 'react';
import './EditClient.css';
import Modal from '../../components/modal/Modal';
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';
import userService from '../../api/UserService';
import { parseISO, format } from "date-fns";

interface EditClientProps {
  id?: string;
}

function formatCPF(cpf: string) {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

export default function EditClient({id}: EditClientProps) {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    cpf: '',
    createdAt: '',
  });

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await userService.getDataUser(id || '1');
        const { name, email, cpf, createdAt } = response.data.model;
  
        // Formatando a data
        const formattedDate = format(parseISO(createdAt), "dd/MM/yyyy");
  
        setUserData({ name, email, cpf, createdAt: formattedDate });
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      }
    }
  
    fetchUserData();
  }, [id]);

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
          <Input label='Nome' value={userData.name} styleInput={2}/>
        </div>

        <div className='input-container'>
          <Input label='E-mail' value={userData.email} styleInput={2}/>
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
        <Button label='Cadastrar' styleButton={1}/>
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
