import './RegisterClient.css';
import Modal from '../../components/modal/Modal';
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';

export default function RegisterClient() {
  const children = (
    <div className='register-modal'>
      <div className='personal-data'>
        <div className='subtitle'>
          <p>Dados pessoais</p>
        </div>

        <div className='input-container'>
          <Input label='Nome' placeholder='Digite seu nome' styleInput={2}/>
        </div>

        <div className='input-container'>
          <Input label='E-mail'placeholder='usuario@mail.com' styleInput={2}/>
        </div>
      </div>

      <div className='identification-documents'>
        <div className='subtitle'>
          <p>Documentos de identificação</p>
        </div>

        <div className='input-container'>
          <Input label='CPF' placeholder='123.456.789-00' styleInput={2}/>
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
