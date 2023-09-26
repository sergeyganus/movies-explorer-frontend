import { NavLink, useNavigate } from 'react-router-dom';
import './PageNotFound.css';

function PageNotFound() {
  const navigate = useNavigate();

  function handleBackLinkClick(e) {
    e.preventDefault();

    navigate(-1);
  }

  return (
    <main className="page-not-found">
      <div className="page-not-found__container">
        <h1 className="page-not-found__title">404</h1>
        <p className="page-not-found__description">Страница не найдена</p>
      </div>
      <NavLink to="/" className="page-not-found__link" onClick={handleBackLinkClick}>Назад</NavLink>
    </main>
  );
}

export default PageNotFound;