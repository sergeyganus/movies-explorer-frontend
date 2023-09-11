import { NavLink } from 'react-router-dom';
import './PageNotFound.css';

function PageNotFound() {
  return (
    <main className="page-not-found">
      <div className="page-not-found__container">
        <h2 className="page-not-found__title">404</h2>
        <p className="page-not-found__description">Страница не найдена</p>
      </div>
      <NavLink to="/" className="page-not-found__link">Назад</NavLink>
    </main>
  );
}

export default PageNotFound;