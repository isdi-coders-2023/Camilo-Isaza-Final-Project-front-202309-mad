import { Link, useNavigate, useParams } from 'react-router-dom';
import './details_page copy.scss';
import { Helmet } from '../../model/helmet';
import { useHelmets } from '../../hooks/useHelmets';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';

export default function DetailsPage() {
  const { id } = useParams();
  const { helmets, deleteHelmet, updateHelmet, loadHelmets } = useHelmets();
  const helmet = helmets.find((item: Helmet) => item.id === String(id));
  const { loggedUser, token } = useSelector(
    (state: RootState) => state.usersState
  );
  const navigate = useNavigate();

  const handleAddToCart = () => {
    console.log('agregado al carro');
  };

  const handleDeleteButton = (helmetID: string) => {
    const isConfirmed = window.confirm('¿Está seguro que desea eliminar?');

    if (isConfirmed) {
      deleteHelmet(helmetID);
      loadHelmets();
    }

    navigate('/helmets');
  };

  return (
    <>
      <div className="details">
        <div className="images">
          <img src={helmet?.images.url} alt="" width={300} />
        </div>
        <div className="info">
          <h3 className="element-property">{helmet?.reference}</h3>

          <p className="info-text">
            Categoría:{' '}
            <span className="element-property">{helmet?.category}</span>
          </p>
          <p className="info-text">
            Precio: <span className="element-property">{helmet?.price}</span>
          </p>
          <div className="buttons">
            {loggedUser?.role === 'Admin' ? (
              <div className="edit-and-delete-buttons">
                <Link
                  to={'/helmet-edit-form/' + helmet?.id}
                  style={{ textDecoration: 'none' }}
                >
                  <img src="/editar_icon.png" alt="edit button" width={30} />
                </Link>
                <img
                  src="/delete_icon.png"
                  alt="delete button"
                  width={30}
                  onClick={() => handleDeleteButton(String(helmet?.id))}
                />
              </div>
            ) : token ? (
              <div className="add-to-cart">
                <p>Añadir al carrito</p>
                <img
                  src="./shop_icon.png"
                  alt="add to cart button"
                  width={30}
                  onClick={() => handleAddToCart()}
                />
              </div>
            ) : (
              <Link to={'/user-login'} style={{ textDecoration: 'none' }}>
                <div className="add-to-cart">
                  <p>Añadir al carrito</p>
                  <img
                    src="/shop_icon.png"
                    alt="add to cart button"
                    width={30}
                  />
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
