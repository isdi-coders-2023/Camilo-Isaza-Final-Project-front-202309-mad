import { Link, useNavigate } from 'react-router-dom';
import './loginHeader.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useUsers } from '../../hooks/useUsers';

export function LoginHeader() {
  const { token, loggedUser } = useSelector(
    (state: RootState) => state.usersState
  );
  const { makeLogOut } = useUsers();

  const navigate = useNavigate();

  const handleLogOut = () => {
    makeLogOut();
    navigate('/home');
  };

  return (
    <>
      <div></div>
      {token ? (
        <>
          <div className="logout-header">
            <img src={loggedUser?.avatar.url} alt="" height={30} />
            <p className="username">{loggedUser?.name}</p>
            <img
              src="./logout_icon.png"
              alt="logout-button"
              height={30}
              onClick={() => handleLogOut()}
            />
          </div>
        </>
      ) : (
        <div className="login-header">
          <Link to={'/user-login'} style={{ textDecoration: 'none' }}>
            <p className="desktop-item">Iniciar sesión</p>
            <img className="mobile-item" src="./login.png" alt="Login icon" />
          </Link>
          <Link to={'/user-register'} style={{ textDecoration: 'none' }}>
            <p className="desktop-item">Registrarse</p>
          </Link>
        </div>
      )}
    </>
  );
}
