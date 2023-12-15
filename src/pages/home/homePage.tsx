import { Link } from 'react-router-dom';

import { HomeList } from '../../components/home/homeList/home_list';
import { useHelmets } from '../../hooks/useHelmets';
import './homePage.scss';
import { useEffect } from 'react';
import { HomeImages } from '../../components/home/homeImages/home_images';

export default function HomePage() {
  const { favorites, loadFavoriteHelmets } = useHelmets();

  useEffect(() => {
    loadFavoriteHelmets();
  }, [loadFavoriteHelmets]);

  return (
    <>
      <HomeImages></HomeImages>
      {favorites.length > 0 ? <HomeList></HomeList> : 'nada'}
      <div className="certificate-container">
        <div className="more-helmets">
          <Link to={'/helmets'} style={{ textDecoration: 'none' }}>
            <p>!Ver Todos los cascos!</p>
          </Link>
        </div>
        <div className="certificate_banner">
          <img src="/descargar_certificado.png" alt="" />
        </div>
        <div className="certificate">
          <img src="/ya_tienes_casco2.png" alt="" />
          <div className="get-certificate">
            <p className="other-p">¡Descarga tu certificado!</p>
            <p className="here">AQUÍ</p>
          </div>
        </div>
      </div>
    </>
  );
}
