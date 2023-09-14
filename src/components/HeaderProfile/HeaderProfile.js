import React from 'react';
import { NavLink } from 'react-router-dom';
import Menu from '../Menu/Menu';
import './HeaderProfile.css';

function HeaderProfile({ loggedIn }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  function handleMenuButtonClick() {
    setIsMenuOpen(true);
  }

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <div className="header-profile">
      {loggedIn ?
        <>
          <NavLink to="/profile" className="header-profile__button header-profile__button_type_account">Аккаунт</NavLink>
          <button className="header-profile__button header-profile__button_type_menu" type="button" onClick={handleMenuButtonClick}></button>
          <Menu isOpen={isMenuOpen} onClose={closeMenu} />
        </>
        :
        <>
          <NavLink to="/signup" className="header-profile__link">Регистрация</NavLink>
          <NavLink to="/signin" className="header-profile__button header-profile__button_type_login">Войти</NavLink>
        </>
      }
    </div>
  );
}

export default HeaderProfile;