import React, { createContext, useState, useCallback, useEffect } from "react";
import api from "../../api/api";
import { errorSwal } from "../../components/swal/errorSwal";
import { jwtDecode } from 'jwt-decode';
import { AuthContextType, AuthProviderProps, UserInfo } from "../../types/auth/auth";
import { useNavigate } from "react-router-dom";

// Função auxiliar para decodificar e validar o token
const decodeAndValidateToken = (token: string): UserInfo => {
  if (!token.includes('.') || token.split('.').length !== 3) {
    throw new Error("Token inválido");
  }

  const decodedToken: any = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    throw new Error("Token expirado");
  }

  return {
    name: decodedToken?.name || "Usuário desconhecido",
    role: decodedToken?.role || "Sem função",
    email: decodedToken?.email || "Usuário sem email"
  };
};

// Função auxiliar para configurar o token na API
const setApiToken = (token: string) => {
  api.defaults.headers["Authorization"] = `Bearer ${token}`;
};

// Crie o contexto de autenticação
export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  validateToken: () => {},
  resetPassword: () => {},
  validateTokenChangePassword: () => {},
  changePassword: () => {},
});

// Crie o provedor do contexto de autenticação
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserInfo>();
  const navigate = useNavigate();

  const setAuthState = (userInfo: UserInfo | undefined, authenticated: boolean) => {
    setUser(userInfo);
    setIsAuthenticated(authenticated);
  };

  const handleAuthSuccess = (token: string) => {
    const userInfo = decodeAndValidateToken(token);
    setApiToken(token);
    localStorage.setItem('token', token);
    setAuthState(userInfo, true);
  };

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          handleAuthSuccess(token);
        } catch (error) {
          console.error("Erro ao inicializar autenticação:", error);
          localStorage.removeItem('token');
        }
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, senha: string) => {
    try {
      const response = await api.post('/auth/login', {
        email: email,
        password: senha
      });

      const token = response.data.model.token;
      if (!token) {
        throw new Error("Token inválido ou inexistente");
      }

      handleAuthSuccess(token);
      navigate('/estacao');
    } catch (error) {
      errorSwal((error as any)?.response?.data?.error || "Erro desconhecido");
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const response = await api.post('/password-reset/request', {
        email: email
      });

      if (response.status === 200) {
        return true;
      } else {
        throw new Error("Erro ao redefinir senha");
      }
    } catch (error) {
      errorSwal((error as any)?.response?.data?.error || "Erro desconhecido");
      return false;
    }
  }

  const changePassword = async (password: string, token: string) => {
    try {
      const response = await api.post(`/password-reset/reset/${token}`, {
        password: password
      });

      console.log("response", response);

      if (response.status === 200) {
        return true;
      } else {
        throw new Error("Erro ao alterar senha");
      }
    } catch (error) {
      console.error("Erro ao alterar senha:", error);
      errorSwal((error as any)?.response?.data?.error || "Erro desconhecido");
      return false;
    }
  };

  const validateTokenChangePassword = async (token: string) => {
    try {
      const response = await api.get(`/password-reset/validate/${token}`);
      if (response.status === 200) {
        return true;
      } else {
        navigate('/login');
      }
    } catch (error) {
      errorSwal((error as any)?.response?.data?.error || "Erro desconhecido");
      navigate('/login');
      return false;
    }
  }

  const logout = () => {
    setApiToken('');
    localStorage.removeItem('token');
    setAuthState(undefined, false);
    navigate('/login');
  };

  const validateToken = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        handleAuthSuccess(token);
      } catch (error) {
        console.error("Erro ao validar token:", error);
        setAuthState(undefined, false);
        localStorage.removeItem('token');
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user, validateToken, resetPassword, changePassword, validateTokenChangePassword }}>
      {children}
    </AuthContext.Provider>
  );
};