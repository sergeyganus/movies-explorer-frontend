import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import ComponentWithForm from '../ComponentWithForm/ComponentWithForm';
import MessageFromApi from '../MessageFromApi/MessageFromApi';
import { useFormWithValidation } from '../../utils/UseFormWithValidation';
import * as auth from '../../utils/Auth';

function Register({ onRegister, onLogin }) {
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

    auth.register(values.name, values.email, values.password)
      .then((userData) => {
        resetForm();
        auth.authorize(values.email, values.password)
          .then((userData) => {
            onRegister({
              ...userData,
              name: values.name,
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
      })
      .catch((errCode) => {
        if (errCode === 400) {
          setMessageFromApiText('Произошла ошибка валидации переданных данных');
        }

        if (errCode === 409) {
          setMessageFromApiText('Пользователь с данным email уже существует');
        }

        setCustomIsValid(false);
      });
  }

  return (
    <ComponentWithForm
      name={'register'}
      formName={'registerform'}
      title={'Добро пожаловать!'}
      onSubmit={handleSubmit}
    >
      <label className="component__label component__label_type_user-name" htmlFor="user-name-input">Имя</label>
      <input
        id="user-name-input"
        className={`component__input component__input_type_user-name`}
        name="name"
        type="text"
        value={values.name}
        onChange={customHandleChange}
        placeholder="Имя пользователя"
        minLength="2"
        maxLength="30"
        required
      />
      <span className="user-name-input-error component__input-error">{errors.name}</span>
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

      <div className="component__buttons-bar">
        <MessageFromApi message={messageFromApiText} />
        <button
          className={`component__button ${!(isValid && customIsValid) ? 'component__button_disabled' : ''} component__button_type_register`}
          type="submit"
          disabled={!(isValid && customIsValid)}
        >
          Зарегистрироваться
        </button>
        <div className="component__links">
          <span className="component__text">Уже зарегистрированы?</span>
          <NavLink to="/signin" className="component__link">Войти</NavLink>
        </div>
      </div>
    </ComponentWithForm>
  );
}

export default Register;