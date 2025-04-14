import React, { useState, useCallback, useEffect } from 'react';
import Toast from './Toast';
import './Toast.css';
import { NotificationMessage } from '../../hooks/useWebSocket';

interface Toast extends NotificationMessage {
  id: number;
}

const ToastContainer: React.FC = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  
  // Function to add a new toast
  const addToast = useCallback((notification: NotificationMessage) => {
    const id = Date.now();
    setToasts(prev => [...prev, { ...notification, id }]);
  }, []);
  
  // Function to remove a toast
  const removeToast = useCallback((id: number) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  // Expose the addToast function globally
  useEffect(() => {
    window.addToast = addToast;
    
    return () => {
      // Clean up when component unmounts
      delete window.addToast;
    };
  }, [addToast]);
  
  return (
    <div className="toast-container">
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type as 'info' | 'success' | 'warning' | 'error'}
          alertData={toast.data}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};

declare global {
  interface Window {
    addToast?: (notification: NotificationMessage) => void;
  }
}

export default ToastContainer;