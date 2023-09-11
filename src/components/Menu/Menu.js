import { NavLink } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import './Menu.css';

function Menu({ isOpen, onClose }) {
  return (
    <section className={`menu ${isOpen ? 'menu_opened' : ''}`} aria-label="Мобильное меню">
      <div className={`menu__container ${isOpen ? 'menu__container_opened' : ''}`}>
        <button className="menu__close-button" type="button" onClick={onClose}></button>
        <Navigation name={'menu'}>
          <li className="navigation__links-item navigation__links-item_type_menu">
            <NavLink to="/" className="navigation__link navigation__link_type_menu">Главная</NavLink>
          </li>
          <li className="navigation__links-item navigation__links-item_type_menu">
            <NavLink to="/movies" className="navigation__link navigation__link_type_menu navigation__link_active">Фильмы</NavLink>
          </li>
          <li className="navigation__links-item navigation__links-item_type_menu">
            <NavLink to="/saved-movies" className="navigation__link navigation__link_type_menu">Сохранённые фильмы</NavLink>
          </li>
        </Navigation>
        <NavLink to="/profile" className="menu__button menu__button_type_account">Аккаунт</NavLink>
      </div>
    </section>
  );
}

export default Menu;