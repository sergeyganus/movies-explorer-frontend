import { NavLink } from 'react-router-dom';
import ComponentWithForm from '../ComponentWithForm/ComponentWithForm';
import ErrorFromApi from '../ErrorFromApi/ErrorFromApi';

function Register() {
  // Временный обработчик, чтобы не было ошибки при сабмите
  function handleSubmit(evt) {
    evt.preventDefault();
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
        className="component__input component__input_type_user-name"
        name="name"
        type="text"
        placeholder="Имя пользователя"
        required
      />
      <span className="user-name-input-error component__input-error">Некорректное имя</span>
      <label className="component__label component__label_type_user-email" htmlFor="user-email-input">E-mail</label>
      <input
        id="user-email-input"
        className="component__input component__input_type_user-email"
        name="email"
        type="email"
        placeholder="E-mail пользователя"
        required
      />
      <span className="user-email-input-error component__input-error">Некорректный e-mail</span>
      <label className="component__label component__label_type_user-password" htmlFor="user-password-input">Пароль</label>
      <input
        id="user-password-input"
        className="component__input component__input_type_user-password component__input_type_error"
        name="password"
        type="password"
        placeholder="Пароль пользователя"
        required
      />
      <span className="user-password-input-error component__input-error">Некорректный пароль</span>
      <ErrorFromApi message="Что-то пошло не так..." isActive={true} />

      <div className="component__buttons-bar">
        <button className="component__button component__button_type_register" type="submit">Зарегистрироваться</button>
        <div className="component__links">
          <span className="component__text">Уже зарегистрированы?</span>
          <NavLink to="/signin" className="component__link">Войти</NavLink>
        </div>
      </div>
    </ComponentWithForm>
  );
}

export default Register;