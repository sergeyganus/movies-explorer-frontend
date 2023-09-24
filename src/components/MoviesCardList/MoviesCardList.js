import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesCardList({ movies, isActive, onAddMovie, onRemoveMovie, onRemoveSavedMovie }) {
  return (
    <section className={`movies-card-list ${isActive ? 'movies-card-list_active' : ''}`} aria-label="Секция с фильмами">
      <ul className="movies-card-list__list">
        {movies.map((movie) => (
          <MoviesCard key={movie.id || movie._id} movie={movie} onAddMovie={onAddMovie} onRemoveMovie={onRemoveMovie} onRemoveSavedMovie={onRemoveSavedMovie} />
        ))}
      </ul>
    </section>
  );
}

export default MoviesCardList;