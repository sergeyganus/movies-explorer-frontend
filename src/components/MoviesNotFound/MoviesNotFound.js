import './MoviesNotFound.css';

function MoviesNotFound({ isActive }) {
  return (
    <section className={`movies-not-found ${isActive ? 'movies-not-found_active' : ''}`} aria-label="Фильмы не найдены">
      <p className="movies-not-found__info">По вашему запросу ничего не найдено...</p>
    </section>
  );
}

export default MoviesNotFound;