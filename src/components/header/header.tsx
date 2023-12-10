import { LoginHeader } from '../loginHeader/loginHeader';
import './header.scss';

type Props = {
  children: JSX.Element;
};

export function Header({ children }: Props) {
  return (
    <header>
      <div className="header">
        <h1>SUPERKASKOS</h1>
        <img src="./logo_icon.png" alt="" />
        <img src="./logo.png" alt="" />
      </div>
      {children}
      <section className="login-header">
        <LoginHeader></LoginHeader>
      </section>
    </header>
  );
}
