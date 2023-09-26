import './MoviesNotFound.css';

function MoviesNotFound({ message, isActive }) {
  return (
    <section className={`movies-not-found ${isActive ? 'movies-not-found_active' : ''}`} aria-label="Фильмы не найдены">
      <p className="movies-not-found__info">{message}</p>
    </section>
  );
}

export default MoviesNotFound;