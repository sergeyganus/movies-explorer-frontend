import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import MessageFromApi from '../MessageFromApi/MessageFromApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormWithValidation } from '../../utils/UseFormWithValidation';
import * as auth from '../../utils/Auth';
import * as mainApi from '../../utils/MainApi';
import './Profile.css';

function Profile({ loggedIn, onUpdateUserProfile, onLogout }) {
  const currentUser = React.useContext(CurrentUserContext);

  const [customIsValid, setCustomIsValid] = React.useState(true);
  const [isEditProfileBarActive, setIsEditProfileBarActive] = React.useState(true);
  const [messageFromApi, setMessageFromApi] = React.useState({
    message: '',
    isSuccess: false
  });
  const { values, handleChange, setValues, errors, isNameValid, isEmailValid, isValid } = useFormWithValidation();
  const isFormValid = isNameValid && isEmailValid && isValid;


  function customHandleChange(e) {
    handleChange(e);
    setCustomIsValid(true);
    const { name, value } = e.target;
    if ((name === 'name') && (value === currentUser.name) && (values.email === currentUser.email)) {
      setCustomIsValid(false);
    }
    if ((name === 'email') && (values.name === currentUser.name) && (value === currentUser.email)) {
      setCustomIsValid(false);
    }

    setMessageFromApi({
      ...messageFromApi,
      message: '',
      isSuccess: false
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    mainApi.updateUserProfile(values.name, values.email)
      .then((userData) => {
        onUpdateUserProfile({
          ...userData,
          name: values.name,
          email: values.email
        });
        setMessageFromApi({
          ...messageFromApi,
          message: 'Профиль пользователя успешно обновлен',
          isSuccess: true
        });
        setIsEditProfileBarActive(true);
      })
      .catch((errCode) => {
        if (errCode === 400) {
          setMessageFromApi({
            ...messageFromApi,
            message: 'Произошла ошибка валидации переданных данных'
          });
        }

        if (errCode === 409) {
          setMessageFromApi({
            ...messageFromApi,
            message: 'Пользователь с данным email уже существует'
          });
        }

        setCustomIsValid(false);
      });
  }

  function handleEditProfileButtonClick() {
    setMessageFromApi({
      ...messageFromApi,
      message: '',
      isSuccess: false
    });
    setCustomIsValid(false);
    setIsEditProfileBarActive(false);
  }

  function signOut() {
    auth.signOut()
      .catch(() => console.log('При выходе из аккаунта произошла ошибка'));
    onLogout();
    navigate('/', { replace: true });
  }

  const navigate = useNavigate();

  React.useEffect(() => {
    setValues({
      ...values,
      name: currentUser.name,
      email: currentUser.email
    });
  }, []);

  return (
    <>
      <Header loggedIn={loggedIn} />
      <main className="profile">
        <h1 className="profile__title">Привет, {currentUser.name}!</h1>
        <form className="profile__form" name="profileform" method="post" onSubmit={handleSubmit}>
          <div className="profile__field">
            <label className="profile__label profile__label_type_user-name" htmlFor="user-name-input">Имя</label>
            <input
              id="user-name-input"
              className="profile__input profile__input_type_user-name"
              name="name"
              type="text"
              value={values.name}
              onChange={customHandleChange}
              placeholder="Имя пользователя"
              minLength="2"
              maxLength="30"
              required
              disabled={isEditProfileBarActive}
            />
            <span className="user-name-input-error profile__input-error">{errors.name}</span>
          </div>
          <div className="profile__field">
            <label className="profile__label profile__label_type_user-email" htmlFor="user-email-input">E-mail</label>
            <input
              id="user-email-input"
              className="profile__input profile__input_type_user-email"
              name="email"
              type="text"
              value={values.email}
              onChange={customHandleChange}
              placeholder="E-mail пользователя"
              required
              disabled={isEditProfileBarActive}
            />
            <span className="user-email-input-error profile__input-error">{errors.email}</span>
          </div>

          <div className="profile__buttons-bar">
            <MessageFromApi message={messageFromApi.message} isSuccess={messageFromApi.isSuccess} />
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
                onClick={signOut}
              >
                Выйти из аккаунта
              </button>
            </div>
            <button
              className={`profile__button ${!isEditProfileBarActive ? 'profile__button_active' : ''} ${!(isFormValid && customIsValid) ? 'profile__button_disabled' : ''} profile__button_type_save-profile`}
              type="submit"
              disabled={!(isFormValid && customIsValid)}
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