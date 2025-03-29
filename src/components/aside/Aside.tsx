import { useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import logo from '../../../src/static/img/tecsus.png'
import ButtonAside from '../buttonAside/buttonAside';
import './Aside.css';
import { faBell, faChartPie, faGear, faRightFromBracket, faRss, faSliders, faTriangleExclamation, faUser, faBars, faXmark, faMap, faDatabase } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../contexts/auth/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function Aside() {
  const authContext = useContext(AuthContext);
  const location = useLocation();
  const currentPath = location.pathname;
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    authContext.logout()
  }

  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  }

  const closeMenu = () => {
    setIsOpen(false);
  }

  // Previne o scroll quando o menu está aberto em mobile
  useEffect(() => {
    if (isOpen && window.innerWidth <= 1100) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Fecha o menu quando a rota muda
  useEffect(() => {
    closeMenu();
  }, [location.pathname]);
  
  return (
    <>
      <button 
        className="menu-toggle" 
        onClick={toggleMenu}
        aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
      >
        <FontAwesomeIcon icon={isOpen ? faXmark : faBars} />
      </button>
      <div className={`aside ${isOpen ? 'open' : ''}`}>
        <div className="aside-content">
          <img src={logo} alt="Logo" />
          {/* <ButtonAside icon={faChartPie} link='/dashboard' isActive={currentPath === '/dashboard'} title="Dashboard" /> */}
          {authContext.user?.role === "ADMIN" && (
            <ButtonAside icon={faUser} link='/usuario' isActive={currentPath === '/usuario'} title="Usuários" />
          )}
          <ButtonAside icon={faRss} link='/estacao' isActive={currentPath === '/estacao'} title="Estação" />
          <ButtonAside icon={faSliders} link='/tipo-parametro' isActive={currentPath === '/tipo-parametro'} title="Tipo de Parâmetro" />
          <ButtonAside icon={faBell} link='/alertas' isActive={currentPath === '/alertas'} title="Alertas" />
          <ButtonAside icon={faMap} link='/estacao/mapa' isActive={currentPath === '/estacao/mapa'} title="Localização das estações" />
          {authContext.user !== undefined && (
            <ButtonAside icon={faDatabase} link='/medidas/criar' isActive={currentPath === '/medidas/criar'} title="Enviar medidas estações" />
          )}

          {/* <ButtonAside icon={faGear} link='/opcoes' isActive={currentPath === '/opcoes'} title="Opções" /> */}
        </div>
        <div className='logout'>
          <ButtonAside icon={faRightFromBracket} onClick={handleLogout} link='' title="Sair" />
        </div>
      </div>
      <div 
        className={`overlay ${isOpen ? 'visible' : ''}`} 
        onClick={closeMenu}
      />
    </>
  );
}
