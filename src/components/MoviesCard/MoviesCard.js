import tempImage from '../../images/temp/image-temp-1.jpg';
import './MoviesCard.css';

function MoviesCard() {
  return (
    <li className="movies-card">
      <img className="movies-card__image" src={tempImage} alt="Временное изображение фильма" title="Временное изображение фильма" />
      <button className="movies-card__save-button movies-card__save-button_active" type="button">Сохранить</button>
      <button className="movies-card__image-button movies-card__image-button_type_saved" type="button" title="Фильм сохранен"></button>
      <button className="movies-card__image-button movies-card__image-button_type_delete" type="button" title="Удалить фильм"></button>
      <div className="movies-card__info">
        <h2 className="movies-card__title">33 слова о дизайне</h2>
        <span className="movies-card__duration">1ч 17м</span>
      </div>
    </li>
  );
}

export default MoviesCard;