import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Modal.css';

export default function Modal({ }) {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="modal-overlay" >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className='header'>
            <h2>Cadastrar usuário</h2>
            <button className="modal-close" onClick={() => navigate('/')}><FontAwesomeIcon icon={faXmark} /></button>
        </div>
        <div className="modal-body">childrenchildrenchildrenchildrenchildrenchildrenchildrenchildrenchildrenchildrenchildrenchildren</div>
      </div>
    </div>
  );
}