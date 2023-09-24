import { NavLink } from 'react-router-dom';
import Logo from '../Logo/Logo';
import './ComponentWithForm.css';

function ComponentWithForm({ name, formName, title, children, onSubmit }) {
  return (
    <main className={`component component_type_${name}`}>
      <NavLink to="/" className="component__logo-link">
        <Logo />
      </NavLink>
      <h1 className={`component__title component__title_type_${name}`}>{title}</h1>
      <form className={`component__form component__form_type_${name}`} name={formName} method="post" onSubmit={onSubmit} noValidate>
        {children}
      </form>
    </main>
  );
}

export default ComponentWithForm;