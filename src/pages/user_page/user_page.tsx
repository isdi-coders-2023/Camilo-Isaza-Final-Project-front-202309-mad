import { useNavigate } from 'react-router-dom';
import { useUsers } from '../../hooks/useUsers';
import './user_page.scss';

export default function HomePage() {
  const { loggedUser } = useUsers();

  const { makeLogOut } = useUsers();

  const navigate = useNavigate();
  const handleLogOut = () => {
    makeLogOut();
    navigate('/home');
  };
  return (
    <section className="user-info">
      <p className="your-info">TU INFORMACIÓN</p>
      <img src={loggedUser?.avatar.url} alt="User Image" height={200} />
      <p>
        Nombre: <span className="user-data">{loggedUser?.name}</span>
      </p>
      <p>
        Apellido: <span className="user-data">{loggedUser?.surname}</span>
      </p>
      <p>
        Email: <span className="user-data">{loggedUser?.email}</span>
      </p>
      <p>
        Dirección: <span className="user-data">{loggedUser?.address}</span>
      </p>
      <p>
        Número: <span className="user-data">{loggedUser?.number}</span>
      </p>
      <div className="logout">
        <p>Log Out</p>
        <img
          src="/logout_icon.png"
          alt="logout-button"
          height={30}
          onClick={() => handleLogOut()}
        />
      </div>
    </section>
  );
}
