import React from 'react';
import { useLocation } from 'react-router-dom';
import { moviesApiSettings } from '../../utils/constants';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import * as mainApi from '../../utils/MainApi';
import './MoviesCard.css';

function MoviesCard({ movie, onAddMovie, onRemoveMovie, onRemoveSavedMovie }) {
  const currentUser = React.useContext(CurrentUserContext);
  const location = useLocation();
  const isCurrentPageMovies = location.pathname === '/movies';
  const BASE_IMAGES_URL = moviesApiSettings.baseImagesUrl;
  const isLiked = movie.owner === currentUser._id;
  const imageUrl = isCurrentPageMovies ? `${BASE_IMAGES_URL}${movie.image.url}` : movie.image;
  const duration = movie.duration;
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;

  const [isSaveButtonActive, setIsSaveButtonActive] = React.useState(!isLiked && isCurrentPageMovies);
  const [isSavedButtonActive, setIsSavedButtonActive] = React.useState(isLiked && isCurrentPageMovies);
  const [isDeleteButtonActive, setIsDeleteButtonActive] = React.useState(!isCurrentPageMovies);

  function handleSaveButtonClick() {
    mainApi.addMovie({
      ...movie,
      image: `${BASE_IMAGES_URL}${movie.image.url}`,
      trailerLink: movie.trailerLink,
      thumbnail: `${BASE_IMAGES_URL}${movie.image.formats.thumbnail.url}`,
      movieId: movie.id
    })
      .then((addedMovie) => {
        onAddMovie(addedMovie);
        setIsSaveButtonActive(false);
        setIsSavedButtonActive(true);
      })
      .catch(() => printError('Не удалось сохранить фильм в избранное'));
  }

  function handleLikedButtonClick() {
    mainApi.removeMovie(movie._id)
      .then((removedMovie) => {
        onRemoveMovie(removedMovie);
        setIsSaveButtonActive(true);
        setIsSavedButtonActive(false);
      })
      .catch(() => printError('Не удалось удалить фильм из избранного'));
  }

  function handleDeleteButtonClick() {
    mainApi.removeMovie(movie._id)
      .then((removedMovie) => {
        onRemoveSavedMovie(removedMovie);
      })
      .catch(() => printError('Не удалось удалить фильм из избранного'));
  }

  function printError(message) {
    console.log(message);
  }

  return (
    <li key={movie.id || movie._id} className="movies-card">
      <a className='movies-card__image-link' href={movie.trailerLink} target="_blank" rel="noopener noreferrer">
        <img className="movies-card__image" src={imageUrl} alt={movie.nameRU} title={movie.nameRU} />
      </a>
      <button
        className={`movies-card__save-button ${isSaveButtonActive ? 'movies-card__save-button_active' : ''}`}
        type="button"
        onClick={handleSaveButtonClick}
      >
        Сохранить
      </button>
      <button
        className={`movies-card__image-button ${isSavedButtonActive ? 'movies-card__image-button_active' : ''} movies-card__image-button_type_saved`}
        type="button"
        title="Удалить из избранного"
        onClick={handleLikedButtonClick}
      >
      </button>
      <button
        className={`movies-card__image-button ${isDeleteButtonActive ? 'movies-card__image-button_active' : ''} movies-card__image-button_type_delete`}
        type="button"
        title="Удалить из избранного"
        onClick={handleDeleteButtonClick}
      >
      </button>
      <div className="movies-card__info">
        <h2 className="movies-card__title">{movie.nameRU}</h2>
        <span className="movies-card__duration">{`${hours}ч ${minutes}м`}</span>
      </div>
    </li>
  );
}

export default MoviesCard;