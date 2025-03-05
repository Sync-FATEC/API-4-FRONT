import React, { createContext, useState, useCallback } from "react";
import api from "../../api/api";
import { errorSwal } from "../../components/swal/errorSwal";
import { jwtDecode } from 'jwt-decode';
import { AuthContextType, AuthProviderProps, UserInfo } from "../../type/auth";
import { useNavigate } from "react-router-dom";



// Crie o contexto de autenticação
export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  validateToken: () => {}
});

// Crie o provedor do contexto de autenticação
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserInfo>();
  const navigate = useNavigate(); 

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
  
      api.defaults.headers["Authorization"] = `Bearer ${token}`;
      localStorage.setItem('token', token);
      
      const decodedToken: any = jwtDecode(token);
  
      const name = decodedToken?.name || "Usuário desconhecido";
      const role = decodedToken?.role || "Sem função";
  
      const jsonUserInfo = { name, role };
      setUser(jsonUserInfo);
      setIsAuthenticated(true);
      
      navigate('/');
    } catch (error) {
      errorSwal((error as any)?.response?.data?.error || "Erro desconhecido");
    }
  };
  

  const logout = () => {
    api.defaults.headers.common.Authorization = ``;
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login')
  };

  const validateToken = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        if (!token.includes('.') || token.split('.').length !== 3) {
          throw new Error("Token inválido");
        }
        
        const decodedToken: any = jwtDecode(token);
        if (decodedToken.exp * 1000 < Date.now()) {
          throw new Error("Token expirado");
        }
        api.defaults.headers["Authorization"] = `Bearer ${token}`;

        const name = decodedToken?.name || "Usuário desconhecido";
        const role = decodedToken?.role || "Sem função";
    
        const jsonUserInfo = { name, role };

        setUser(jsonUserInfo);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Erro ao validar token:", error);
        setIsAuthenticated(false);
        localStorage.removeItem('token');
      }
    }
  }, []);
  

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user, validateToken }}>
      {children}
    </AuthContext.Provider>
  );
};