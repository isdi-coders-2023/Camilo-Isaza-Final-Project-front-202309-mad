import { List } from '../../components/list/list';
import './helmets_page.scss';
import { Link } from 'react-router-dom';
import { useUsers } from '../../hooks/useUsers';
import { useHelmets } from '../../hooks/useHelmets';
import { Filter } from '../../components/filter/filter';

export default function HelmetsPage() {
  const { loggedUser } = useUsers();
  const { handleCurrentHelmet } = useHelmets();

  let emptyHelmet = {
    id: '',
    reference: '',
    inventory: 0,
    price: 0,
    category: '',
    images: {
      publicId: '',
      size: 0,
      width: 0,
      height: 0,
      format: '',
      url: '',
    },
    orders: [],
  };
  return (
    <>
      <div className="home-page">
        {loggedUser?.role === 'Admin' ? (
          <Link to={'/helmet-create-form'} style={{ textDecoration: 'none' }}>
            <div className="add-helmet">
              <button onClick={() => handleCurrentHelmet(emptyHelmet)}>
                Añadir Casco
              </button>
            </div>
          </Link>
        ) : (
          ''
        )}
        <Filter></Filter>
        <List></List>
      </div>
    </>
  );
}
