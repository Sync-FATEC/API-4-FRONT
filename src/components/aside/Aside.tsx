import logo from '../../../src/static/img/tecsus.png'
import ButtonAside from '../buttonAside/buttonAside';
import './aside.css';

import dash from '../../static/img/aside/dash.png'
import alert from '../../static/img/aside/alert.png'
import user from '../../static/img/aside/user.png'
import alertN from '../../static/img/aside/alertN.png'
import config from '../../static/img/aside/config.png'
import parameter from '../../static/img/aside/parameter.png'
import station from '../../static/img/aside/station.png'
import logout from '../../static/img/aside/logout.png'

export function Aside() {
  return (
    <div className='aside'>
        <div>
          <img src={logo} alt="Logo"/>
          <ButtonAside img={dash} link='/dashboard' />
          <ButtonAside img={user} link='/dashboard' />
          <ButtonAside img={station} link='/dashboard' />
          <ButtonAside img={parameter} link='/dashboard' />
          <ButtonAside img={alert} link='/dashboard' />
          <ButtonAside img={alertN} link='/dashboard' />
          <ButtonAside img={config} link='/dashboard' />
        </div>
        <div className='logout'>
          <ButtonAside img={logout} link='/dashboard' />
        </div>
    </div>
  );
}