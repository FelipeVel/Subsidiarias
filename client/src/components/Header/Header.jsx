import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import './Header.scss';

const Header = () => {
  return (
    <header className="Header">
      <div className="Header-Container">
        <div className="Header-Title">
          <h1>Gestión</h1>
        </div>
        <div className="Header-Nav">
          <a href="/subsidiarias">Subsidiarias</a>
          <a href="/empleados">Empleados</a>
        </div>
        {localStorage.getItem('token') ? (
          <div className="Header-Auth">
            <div
              className="Header-Auth_logout"
              onClick={() => {
                localStorage.removeItem('token');
                window.location.href = '/login';
              }}>
              Logout
              <FontAwesomeIcon icon={faRightFromBracket} />
            </div>
          </div>
        ) : (
          <div className="Header-Auth">
            <a className="Header-Auth_login" href="/login">
              Login
              <FontAwesomeIcon icon={faRightToBracket} />
            </a>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
