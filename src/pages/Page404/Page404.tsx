import './Page404.css';
import { useNavigate } from 'react-router-dom';

export default function Page404() {
    const navigate = useNavigate();

    const handleBackToHome = () => {
        navigate('/');
    };

    return (
        <div className="page-404-container">
            <div className="page-404-content">
                <h1 className="page-404-title">404</h1>
                <h2 className="page-404-subtitle">Página não encontrada</h2>
                <p className="page-404-text">
                    A página que você está procurando não existe ou foi movida.
                </p>
                <button 
                    className="custom-button custom-button-type-3"
                    onClick={handleBackToHome}
                >
                    Voltar para a página inicial
                </button>
            </div>
        </div>
    );
}