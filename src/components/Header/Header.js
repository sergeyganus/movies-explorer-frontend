import { NavLink } from 'react-router-dom';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import HeaderProfile from '../HeaderProfile/HeaderProfile';
import './Header.css';

function Header({ loggedIn }) {
  return (
    <header className="header">
      <NavLink to="/" className="header__logo-link">
        <Logo />
      </NavLink>
      {loggedIn &&
        <Navigation name={'header'}>
          <li className="navigation__links-item navigation__links-item_type_header">
            <NavLink to="/movies" className="navigation__link navigation__link_type_header navigation__link_active">Фильмы</NavLink>
          </li>
          <li className="navigation__links-item navigation__links-item_type_header">
            <NavLink to="/saved-movies" className="navigation__link navigation__link_type_header">Сохранённые фильмы</NavLink>
          </li>
        </Navigation>
      }
      <HeaderProfile loggedIn={loggedIn} />
    </header >
  );
}

export default Header;