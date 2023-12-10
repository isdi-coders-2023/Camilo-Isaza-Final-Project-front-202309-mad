import { useSelector } from 'react-redux';
import { List } from '../../components/list/list';
import './helmets_page.scss';
import { RootState } from '../../store/store';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const { loggedUser } = useSelector((state: RootState) => state.usersState);

  return (
    <>
      <div className="home-page">
        {loggedUser?.role === 'Admin' ? (
          <Link to={'/helmet-create-form'} style={{ textDecoration: 'none' }}>
            <div className="add-helmet">
              <button>Añadir Casco</button>
            </div>
          </Link>
        ) : (
          ''
        )}

        <List></List>
      </div>
    </>
  );
}
