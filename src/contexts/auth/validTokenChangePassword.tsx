import React, { useContext, useEffect, useState } from "react";
import { Navigate, useLocation, useParams } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import Loading from "../../components/loading/loading";

interface validTokenChangePasswordProps {
  children: React.ReactNode;
}

const ValidTokenPasswordAuth: React.FC<validTokenChangePasswordProps> = ({ children }) => {
    const { isAuthenticated, user, validateTokenChangePassword } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const location = useLocation(); 
    const { token } = useParams<{ token: string }>(); // <-- Mova para cá

    useEffect(() => {
        const validate = async () => {
            try {
                console.log(token)
                if (token) {
                    await validateTokenChangePassword(token);
                }
            } catch (error) {
                console.error("Erro na validação de autenticação:", error);
            } finally {
                setLoading(false);
            }
        };
        validate();
    }, [validateTokenChangePassword, token]); // inclua token nas dependências

    if (loading) {
        return <Loading />;
    }

    const protectedRoutes = [
        '/reset-password/:token'
    ];

    if (protectedRoutes.some(route => location.pathname.startsWith(route)) && !isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return <>{children}</>;

}

export default ValidTokenPasswordAuth;