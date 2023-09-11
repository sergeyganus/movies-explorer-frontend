import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import searchIcon from '../../images/search-form/search-button.svg';
import './SearchForm.css';

function SearchForm({ onSubmit }) {
  return (
    <section className="search-form" aria-label="Панель поиска фильмов">
      <form className="search-form__form" name="searchform" method="post" onSubmit={onSubmit}>
        <div className="search-form__search-bar">
          <input
            id="search-input"
            className="search-form__input"
            name="search"
            type="text"
            placeholder="Фильм"
            required
          />
          <button className="search-form__button" type="submit">
            <img className="search-form__icon" src={searchIcon} alt="Кнопка поиска" title="Найти" />
          </button>
          <span className="search-input-error search-form__input-error">Некорректный ввод</span>
        </div>
        <FilterCheckbox />
      </form>
    </section>
  );
}

export default SearchForm;