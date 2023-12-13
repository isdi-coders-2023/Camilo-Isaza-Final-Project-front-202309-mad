import { useSelector } from 'react-redux';
import { Helmet } from '../../model/helmet';
import './card.scss';
import { RootState } from '../../store/store';

import { Link } from 'react-router-dom';
import { useHelmets } from '../../hooks/useHelmets';

type PropsType = {
  helmet: Helmet;
};

export function Card({ helmet }: PropsType) {
  const { handleCurrentHelmet } = useHelmets();
  const { loggedUser, token } = useSelector(
    (state: RootState) => state.usersState
  );

  return (
    <>
      <div className="card-container">
        <li className="card">
          <Link
            to={'/details-page/' + helmet.id}
            style={{ textDecoration: 'none' }}
          >
            <img
              role="button"
              src={helmet.images.url}
              alt={`${helmet.reference} image`}
              height={140}
              width={140}
              onClick={() => handleCurrentHelmet(helmet)}
            />
          </Link>
        </li>
        <div className="card-info">
          <p>{helmet.reference}</p>
          <p className="price">{`$ ${helmet.price}`}</p>
          <div className="card-buttons">
            {loggedUser?.role === 'Admin' ? (
              <div className="edit-and-delete-buttons">
                <Link
                  to={'/helmet-edit-form/' + helmet.id}
                  style={{ textDecoration: 'none' }}
                >
                  <img
                    src="./editar_icon.png"
                    alt="edit button"
                    width={30}
                    onClick={() => handleCurrentHelmet(helmet)}
                  />
                </Link>
                <Link
                  to={'/details-page/' + helmet.id}
                  style={{ textDecoration: 'none' }}
                >
                  <img
                    src="./delete_icon.png"
                    alt="delete button"
                    width={30}
                    onClick={() => handleCurrentHelmet(helmet)}
                  />
                </Link>
              </div>
            ) : token ? (
              <div className="add-to-cart">
                <p>Añadir al carrito</p>
                <img
                  src="/shop_icon_white.png"
                  alt="add to cart button"
                  width={20}
                />
              </div>
            ) : (
              <Link to={'/user-login'} style={{ textDecoration: 'none' }}>
                <div className="add-to-cart">
                  <p>Añadir al carrito</p>
                  <img
                    src="/shop_icon_white.png"
                    alt="add to cart button"
                    width={20}
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
