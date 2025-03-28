import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Modal.css';

interface ModalProps {
  title: string;
  description?: React.ReactNode;
  children: React.ReactNode;
}

export default function Modal({ title, description,children }: ModalProps) {
  const navigate = useNavigate();

  return (
    <div className="modal-overlay">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        
        <div className="header">
          <div className="title">
            <h2>{title}</h2>
          </div>

          <button className="modal-close" onClick={() => navigate(-1)}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        {description && 
          <div>
            {description}
          </div>
        }

        <div className="modal-body">
          {children}
        </div>

      </div>
    </div>
  );
}