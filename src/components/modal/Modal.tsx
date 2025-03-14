import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Modal.css';

interface ModalProps {
  title: string;
  children: React.ReactNode;
}

export default function Modal({ title, children }: ModalProps) {
  const navigate = useNavigate();

  return (
    <div className="modal-overlay">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        
        <div className="header">
          <div className="title">
            <h2>{title}</h2>
          </div>

          <button className="modal-close" onClick={() => navigate('/')}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        <div className="modal-body">
          {children}
        </div>

      </div>
    </div>
  );
}