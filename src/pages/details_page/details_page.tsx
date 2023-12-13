import { Link, useNavigate } from 'react-router-dom';
import './details_page copy.scss';
import { useHelmets } from '../../hooks/useHelmets';
import { useUsers } from '../../hooks/useUsers';

export default function DetailsPage() {
  const { deleteHelmet, currentHelmet } = useHelmets();
  const { loggedUser, token } = useUsers();
  const navigate = useNavigate();

  const handleDeleteButton = (helmetID: string) => {
    const isConfirmed = window.confirm('¿Está seguro que desea eliminar?');

    if (isConfirmed) {
      deleteHelmet(helmetID);
    }

    navigate('/helmets');
  };

  return (
    <>
      <div className="details">
        <div className="images">
          <img src={currentHelmet?.images.url} alt="" width={300} />
        </div>
        <div className="info">
          <h3 className="element-property">{currentHelmet?.reference}</h3>

          <p className="info-text">
            Categoría:{' '}
            <span className="element-property">{currentHelmet?.category}</span>
          </p>
          <p className="info-text">
            Precio:{' '}
            <span className="element-property">{currentHelmet?.price}</span>
          </p>
          <div className="buttons">
            {loggedUser?.role === 'Admin' ? (
              <div className="edit-and-delete-buttons">
                <Link
                  to={'/currentHelmet-edit-form/' + currentHelmet?.id}
                  style={{ textDecoration: 'none' }}
                >
                  <img src="/editar_icon.png" alt="edit button" width={30} />
                </Link>
                <img
                  role="button"
                  src="/delete_icon.png"
                  alt="delete button"
                  width={30}
                  onClick={() => handleDeleteButton(String(currentHelmet?.id))}
                />
              </div>
            ) : token ? (
              <div className="add-to-cart">
                <p>Añadir al carrito</p>
                <img
                  src="/shop_icon_white.png"
                  alt="add to cart button"
                  width={30}
                />
              </div>
            ) : (
              <Link to={'/user-login'} style={{ textDecoration: 'none' }}>
                <div className="add-to-cart">
                  <p>Añadir al carrito</p>
                  <img
                    src="/shop_icon_white.png"
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
