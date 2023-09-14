import logo from '../../images/logo.svg';
import './Logo.css';

function Logo() {
  return (
    <img className="logo" src={logo} alt="Логотип проекта Movies Explorer" title="Логотип проекта Movies Explorer" />
  );
}

export default Logo;