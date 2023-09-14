import { NavLink } from 'react-router-dom';
import ComponentWithForm from '../ComponentWithForm/ComponentWithForm';
import ErrorFromApi from '../ErrorFromApi/ErrorFromApi';

function Login() {
  // Временный обработчик, чтобы не было ошибки при сабмите
  function handleSubmit(evt) {
    evt.preventDefault();
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
        className="component__input component__input_type_user-password"
        name="password"
        type="password"
        placeholder="Пароль пользователя"
        required
      />
      <span className="user-password-input-error component__input-error">Некорректный пароль</span>
      <ErrorFromApi message="Что-то пошло не так..." isActive={false} />

      <div className="component__buttons-bar component__buttons-bar_type_login">
        <button className="component__button component__button_type_login" type="submit">Войти</button>
        <div className="component__links">
          <span className="component__text">Ещё не зарегистрированы?</span>
          <NavLink to="/signup" className="component__link">Регистрация</NavLink>
        </div>
      </div>
    </ComponentWithForm>
  );
}

export default Login;