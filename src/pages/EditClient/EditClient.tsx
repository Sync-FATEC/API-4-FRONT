import './EditClient.css';
import Modal from '../../components/modal/Modal';
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';

export default function EditClient() {
  const nameUser = 'Kaue'
  const emailUser = 'kaue@mail.com'
  const cpfUser = '123.456.789-00'
  const registrationDate = '01/01/2021'

  const description = (
    <div className='description'>
      <p>Cadastro em <span className='bold'>{registrationDate}</span></p>
    </div>
  );

  const children = (
    <div className='edit-modal'>
      <div className='personal-data'>
        <div className='subtitle'>
          <p>Dados pessoais</p>
        </div>

        <div className='input-container'>
          <Input label='Nome' value={nameUser} styleInput={2}/>
        </div>

        <div className='input-container'>
          <Input label='E-mail' value={emailUser} styleInput={2}/>
        </div>
      </div>

      <div className='identification-documents'>
        <div className='subtitle'>
          <p>Documentos de identificação</p>
        </div>

        <div className='input-container'>
          <Input label='CPF' value={cpfUser} styleInput={2}/>
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
