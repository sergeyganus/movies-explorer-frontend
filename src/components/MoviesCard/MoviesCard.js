import React from 'react';
import { useLocation } from 'react-router-dom';
import tempImage from '../../images/temp/image-temp-1.jpg';
import './MoviesCard.css';

function MoviesCard() {
  const location = useLocation();
  const isCurrentPageMovies = location.pathname === '/movies';

  const [isSaveButtonActive, setIsSaveButtonActive] = React.useState(isCurrentPageMovies);
  const [isSavedButtonActive, setIsSavedButtonActive] = React.useState(false);
  const [isDeleteButtonActive, setIsDeleteButtonActive] = React.useState(!isCurrentPageMovies);

  function handleSaveButtonClick() {
    setIsSaveButtonActive(false);
    setIsSavedButtonActive(true);
  }

  return (
    <li className="movies-card">
      <img className="movies-card__image" src={tempImage} alt="Временное изображение фильма" title="Временное изображение фильма" />
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
        title="Фильм сохранен"
      >
      </button>
      <button
        className={`movies-card__image-button ${isDeleteButtonActive ? 'movies-card__image-button_active' : ''} movies-card__image-button_type_delete`}
        type="button"
        title="Удалить фильм"
      >
      </button>
      <div className="movies-card__info">
        <h2 className="movies-card__title">33 слова о дизайне</h2>
        <span className="movies-card__duration">1ч 17м</span>
      </div>
    </li>
  );
}

export default MoviesCard;