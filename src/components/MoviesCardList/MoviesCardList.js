import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesCardList() {
  return (
    <section className="movies-card-list" aria-label="Секция с фильмами">
      <ul className="movies-card-list__list">
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
      </ul>
    </section>
  );
}

export default MoviesCardList;