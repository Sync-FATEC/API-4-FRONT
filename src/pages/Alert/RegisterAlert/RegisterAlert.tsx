import './RegisterAlert.css';
import Modal from '../../components/modal/Modal';
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';
import Select from '../../components/Select/Select';

export default function RegisterAlert() {
  const children = (
    <div className='register-modal'>
      <div className='personal-data'>
        <div className='subtitle'>
          <p>Dados</p>
        </div>

        <div className='input-container'>
          <Input label='Nome' styleInput={2}/>
        </div>

        <div className='input-container'>
          <Input label='Tipo' styleInput={2}/>
        </div>

        <div className='input-container'>
          <Input label='Descrição' styleInput={2}/>
        </div>

        <div className='input-container'>
          <Select label='Tipo de alerta' options={[{value: '1', label: 'Alerta 1'}, {value: '2', label: 'Alerta 2'}]} styleSelect={2}/>
        </div>

        <div className='input-container'>
        <Select label='Selecione a estação' options={[{value: '1', label: 'Estação 1'}, {value: '2', label: 'Estação 2'}]} styleSelect={2}/>
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
      title='Cadastrar alerta'
      children={children}
      />
    </main>
  );
}
