import React from 'react';
import Header from '../Header/Header';
import ErrorFromApi from '../ErrorFromApi/ErrorFromApi';
import './Profile.css';

function Profile({ loggedIn }) {
  const [isInputsDisabled, setIsInputsDisabled] = React.useState(true);
  const [isEditProfileBarActive, setIsEditProfileBarActive] = React.useState(true);
  const [isSaveButtonActive, setIsSaveButtonActive] = React.useState(false);

  // Временный обработчик, чтобы не было ошибки при сабмите
  function handleSubmit(evt) {
    evt.preventDefault();
    setIsInputsDisabled(true);
    setIsEditProfileBarActive(true);
    setIsSaveButtonActive(false);
  }

  function handleEditProfileButtonClick() {
    setIsInputsDisabled(false);
    setIsEditProfileBarActive(false);
    setIsSaveButtonActive(true);
  }

  return (
    <>
      <Header loggedIn={loggedIn} />
      <main className="profile">
        <h1 className="profile__title">Привет, Виталий!</h1>
        <form className="profile__form" name="profileform" method="post" onSubmit={handleSubmit}>
          <div className="profile__field">
            <label className="profile__label profile__label_type_user-name" htmlFor="user-name-input">Имя</label>
            <input
              id="user-name-input"
              className="profile__input profile__input_type_user-name"
              name="name"
              type="text"
              placeholder="Имя пользователя"
              required
              disabled={isInputsDisabled}
            />
            <span className="user-name-input-error profile__input-error">Некорректное имя</span>
          </div>
          <div className="profile__field">
            <label className="profile__label profile__label_type_user-email" htmlFor="user-email-input">E-mail</label>
            <input
              id="user-email-input"
              className="profile__input profile__input_type_user-email"
              name="email"
              type="email"
              placeholder="E-mail пользователя"
              required
              disabled={isInputsDisabled}
            />
            <span className="user-email-input-error profile__input-error">Некорректный e-mail</span>
          </div>
          <ErrorFromApi message="При обновлении профиля произошла ошибка." isActive={false} />

          <div className="profile__buttons-bar">
            <div className={`profile__edit-profile-bar ${isEditProfileBarActive ? 'profile__edit-profile-bar_active' : ''}`}>
              <button
                className="profile__button profile__button_active profile__button_type_edit-profile"
                type="button"
                onClick={handleEditProfileButtonClick}
              >
                Редактировать
              </button>
              <button
                className="profile__button profile__button_active profile__button_type_logout"
                type="button"
              >
                Выйти из аккаунта
              </button>
            </div>
            <button
              className={`profile__button ${isSaveButtonActive ? 'profile__button_active' : ''} profile__button_type_save-profile`}
              type="submit"
            >
              Сохранить
            </button>
          </div>
        </form>
      </main>
    </>
  );
}

export default Profile;