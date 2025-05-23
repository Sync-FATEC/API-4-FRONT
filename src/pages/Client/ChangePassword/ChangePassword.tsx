import React, { useState, useContext } from 'react';
import './ChangePassword.css';
import { useNavigate } from 'react-router-dom';
import userService from '../../../api/userService';
import { errorSwal } from '../../../components/swal/errorSwal';
import { successSwal } from '../../../components/swal/sucessSwal';
import Input from '../../../components/input/Input';
import Button from '../../../components/button/Button';
import { AuthContext } from '../../../contexts/auth/AuthContext';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { logout, user } = useContext(AuthContext);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!user?.email) {
      errorSwal('Erro ao identificar usuário. Por favor, faça login novamente.');
      logout();
      navigate('/login');
      return;
    }

    if (newPassword !== confirmPassword) {
      errorSwal('As senhas não coincidem');
      setLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      errorSwal('A nova senha deve ter pelo menos 6 caracteres');
      setLoading(false);
      return;
    }

    try {
      await userService.changePassword(currentPassword, newPassword, user.email);
      successSwal('Senha alterada com sucesso!');
      logout();
      navigate('/login');
    } catch (error: any) {
      console.error('Erro ao alterar senha:', error);
      const errorMessage = error.response?.data?.message;
      
      if (errorMessage === 'Senha atual incorreta') {
        errorSwal('A senha atual está incorreta');
      } else if (errorMessage === 'Nova senha não pode ser igual à senha atual') {
        errorSwal('A nova senha não pode ser igual à senha atual');
      } else if (errorMessage === 'Usuário não autenticado') {
        errorSwal('Sua sessão expirou. Por favor, faça login novamente');
        logout();
        navigate('/login');
      } else {
        errorSwal(errorMessage || 'Erro ao alterar senha. Tente novamente mais tarde');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="change-password-container">
      <div className="change-password-content">
        <h1>Alterar Senha</h1>
        <form onSubmit={handleSubmit}>
          <Input
            type="password"
            placeholder="Senha atual"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
            styleInput={2}
          />
          <Input
            type="password"
            placeholder="Nova senha"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            styleInput={2}
          />
          <Input
            type="password"
            placeholder="Confirmar nova senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            styleInput={2}
          />
          <div className="button-container">
            <Button 
              type="submit" 
              disabled={loading}
              styleButton={1}
            >
              {loading ? 'Alterando...' : 'Alterar Senha'}
            </Button>
            <Button 
              type="button" 
              onClick={() => navigate(-1)}
              styleButton={2}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
