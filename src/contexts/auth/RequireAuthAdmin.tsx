import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import Loading from "../../components/loading/loading";

interface RequireAuthProps {
  children: React.ReactNode;
}

const RequireAuthAdmin: React.FC<RequireAuthProps> = ({ children }) => {
  const { isAuthenticated, user, validateToken } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

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
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default RequireAuthAdmin;
