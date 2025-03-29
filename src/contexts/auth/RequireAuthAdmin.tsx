import React, { useContext, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import Loading from "../../components/loading/loading";

interface RequireAuthProps {
  children: React.ReactNode;
}

const RequireAuthAdmin: React.FC<RequireAuthProps> = ({ children }) => {
  const { isAuthenticated, user, validateToken } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const validate = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          await validateToken();
        }
      } catch (error) {
        console.error("Erro na validação de autenticação:", error);
      } finally {
        setLoading(false);
      }
    };
    validate();
  }, [validateToken]);

  if (loading) {
    return <Loading />;
  }

  // Lista de rotas que requerem autenticação
  const protectedRoutes = [
    '/usuario',
    '/usuario/criar',
    '/usuario/atualizar',
    '/estacao/atualizar',
    '/estacao/criar',
    '/tipo-parametro/criar',
    '/tipo-parametro/atualizar',
    '/medidas/criar'
  ];

  const isProtectedRoute = protectedRoutes.some(route => 
    location.pathname.startsWith(route)
  );

  if (isProtectedRoute && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default RequireAuthAdmin;
