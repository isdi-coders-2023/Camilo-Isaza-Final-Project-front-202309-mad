import './footer.scss';

export function Footer() {
  return (
    <footer>
      <div className="footer">
        <img className="logo-name" src="./logo.png" alt="Superkaskos" />
        <img
          className="logo-icon"
          src="./logo_icon.png"
          alt="Superkaskos logo"
        />
        <address>calle 67</address>
        <p>Derechos reservados: Camiloisazag@hotmail.com</p>
      </div>
    </footer>
  );
}
