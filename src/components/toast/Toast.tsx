import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Toast.css';
import { AlertMessageData } from '../../hooks/useWebSocket';

interface ToastProps {
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  alertData?: AlertMessageData;
  duration?: number;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ 
  message, 
  type = 'info', 
  alertData, 
  duration = 5000, 
  onClose 
}) => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300); // Wait for fade out animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const handleClick = () => {
    if (alertData) {
      navigate(`/alerts/details/${alertData.alertId}`);
      onClose();
    }
  };

  return (
    <div 
      className={`toast toast-${type} ${visible ? 'visible' : 'hidden'}`}
      onClick={alertData ? handleClick : undefined}
      style={{ cursor: alertData ? 'pointer' : 'default' }}
    >
      <div className="toast-content">
        <div className="toast-message">{message}</div>
        {alertData && (
          <div className="toast-alert-info">
            <div>Alerta: {alertData.alertName}</div>
            <div>Valor: {alertData.value}</div>
          </div>
        )}
      </div>
      <button className="toast-close" onClick={(e) => { e.stopPropagation(); onClose(); }}>
        ×
      </button>
    </div>
  );
};

export default Toast;