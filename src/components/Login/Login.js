import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import ComponentWithForm from '../ComponentWithForm/ComponentWithForm';
import MessageFromApi from '../MessageFromApi/MessageFromApi';
import { useFormWithValidation } from '../../utils/UseFormWithValidation';
import * as auth from '../../utils/Auth';

function Login({ onLogin }) {
  const [customIsValid, setCustomIsValid] = React.useState(true);
  const [messageFromApiText, setMessageFromApiText] = React.useState('');

  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();
  const navigate = useNavigate();

  function customHandleChange(e) {
    handleChange(e);
    setCustomIsValid(true);
    setMessageFromApiText('');
  }

  function handleSubmit(e) {
    e.preventDefault();

    auth.authorize(values.email, values.password)
      .then((userData) => {
        resetForm();
        onLogin({
          ...userData,
          email: values.email
        });
        navigate('/movies', { replace: true });
      })
      .catch((errCode) => {
        if (errCode === 401) {
          setMessageFromApiText('Неправильные почта или пароль');
        }
        setCustomIsValid(false);
      });
  }

  return (
    <ComponentWithForm
      name={'login'}
      formName={'loginform'}
      title={'Рады видеть!'}
      onSubmit={handleSubmit}
    >
      <label className="component__label component__label_type_user-email" htmlFor="user-email-input">E-mail</label>
      <input
        id="user-email-input"
        className={`component__input component__input_type_user-email`}
        name="email"
        type="text"
        value={values.email}
        onChange={customHandleChange}
        placeholder="E-mail пользователя"
        required
      />
      <span className="user-email-input-error component__input-error">{errors.email}</span>
      <label className="component__label component__label_type_user-password" htmlFor="user-password-input">Пароль</label>
      <input
        id="user-password-input"
        className={`component__input component__input_type_user-password`}
        name="password"
        autocomplete="new-password"
        type="password"
        value={values.password}
        onChange={customHandleChange}
        placeholder="Пароль пользователя"
        minLength="8"
        required
      />
      <span className="user-password-input-error component__input-error">{errors.password}</span>

      <div className="component__buttons-bar component__buttons-bar_type_login">
        <MessageFromApi message={messageFromApiText} />
        <button
          className={`component__button ${!(isValid && customIsValid) ? 'component__button_disabled' : ''} component__button_type_login`}
          type="submit"
          disabled={!(isValid && customIsValid)}
        >
          Войти
        </button>
        <div className="component__links">
          <span className="component__text">Ещё не зарегистрированы?</span>
          <NavLink to="/signup" className="component__link">Регистрация</NavLink>
        </div>
      </div>
    </ComponentWithForm>
  );
}

export default Login;