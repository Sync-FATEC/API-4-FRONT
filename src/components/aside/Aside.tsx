import { useContext } from 'react';
import logo from '../../../src/static/img/tecsus.png'
import ButtonAside from '../buttonAside/buttonAside';
import './aside.css';
import { faBell, faChartPie, faGear, faRightFromBracket, faRss, faSliders, faTriangleExclamation, faUser } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../contexts/auth/AuthContext';

export function Aside() {
  const authContext = useContext(AuthContext);

  const handleLogout = () => {
    authContext.logout()
  }
  
  return (
    <div className='aside'>
      <div>
        <img src={logo} alt="Logo" />
        <ButtonAside icon={faChartPie} link='/dashboard' />
        <ButtonAside icon={faUser} link='/dashboard' />
        <ButtonAside icon={faRss} link='/dashboard' />
        <ButtonAside icon={faSliders} link='/dashboard' />
        <ButtonAside icon={faTriangleExclamation} link='/dashboard' />
        <ButtonAside icon={faBell} link='/dashboard' />
        <ButtonAside icon={faGear} link='/dashboard' />
      </div>
      <div className='logout'>
        <ButtonAside icon={faRightFromBracket} onClick={handleLogout}  link=''/>
      </div>
    </div>
  );
}