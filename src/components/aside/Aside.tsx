import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import logo from '../../../src/static/img/tecsus.png'
import ButtonAside from '../buttonAside/buttonAside';
import './aside.css';
import { faBell, faChartPie, faGear, faRightFromBracket, faRss, faSliders, faTriangleExclamation, faUser } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../contexts/auth/AuthContext';

export function Aside() {
  const authContext = useContext(AuthContext);
  const location = useLocation();
  const currentPath = location.pathname;

  const handleLogout = () => {
    authContext.logout()
  }

  if(authContext.user?.role === "FUNCIONARIO") {
    return (
      <div className='aside'>
        <div>
          <img src={logo} alt="Logo" />
          <ButtonAside icon={faChartPie} link='/dashboard' isActive={currentPath === '/dashboard'} />
          <ButtonAside icon={faRss} link='/estacao' isActive={currentPath === '/estacao'} />
          <ButtonAside icon={faSliders} link='/tipo-parametro' isActive={currentPath === '/tipo-parametro'} />
          <ButtonAside icon={faTriangleExclamation} link='/tipo-alerta' isActive={currentPath === '/tipo-alerta'} />
          <ButtonAside icon={faBell} link='/alertas' isActive={currentPath === '/alertas'} />
          <ButtonAside icon={faGear} link='/opcoes' isActive={currentPath === '/opcoes'} />
        </div>
        <div className='logout'>
          <ButtonAside icon={faRightFromBracket} onClick={handleLogout} link='' />
        </div>
      </div>
    );
  }
  
  if(authContext.user?.role === "ADMIN") {
    return (
      <div className='aside'>
        <div>
          <img src={logo} alt="Logo" />
          <ButtonAside icon={faChartPie} link='/dashboard' isActive={currentPath === '/dashboard'} />
          <ButtonAside icon={faUser} link='/usuario' isActive={currentPath === '/usuario'} />
          <ButtonAside icon={faRss} link='/estacao' isActive={currentPath === '/estacao'} />
          <ButtonAside icon={faSliders} link='/tipo-parametro' isActive={currentPath === '/tipo-parametro'} />
          <ButtonAside icon={faTriangleExclamation} link='/tipo-alerta' isActive={currentPath === '/tipo-alerta'} />
          <ButtonAside icon={faBell} link='/alertas' isActive={currentPath === '/alertas'} />
          <ButtonAside icon={faGear} link='/opcoes' isActive={currentPath === '/opcoes'} />
        </div>
        <div className='logout'>
          <ButtonAside icon={faRightFromBracket} onClick={handleLogout} link='' />
        </div>
      </div>
    );
  }
}