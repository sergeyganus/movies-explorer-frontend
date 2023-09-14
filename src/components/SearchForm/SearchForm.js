import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

function SearchForm() {
  // Временный обработчик, чтобы не было ошибки при сабмите
  function handleSubmit(evt) {
    evt.preventDefault();
  }

  return (
    <section className="search-form" aria-label="Панель поиска фильмов">
      <form className="search-form__form" name="searchform" method="post" onSubmit={handleSubmit}>
        <div className="search-form__search-bar">
          <input
            id="search-input"
            className="search-form__input"
            name="search"
            type="text"
            placeholder="Фильм"
            required
          />
          <button className="search-form__button" type="submit" title="Найти"></button>
          <span className="search-input-error search-form__input-error">Некорректный ввод</span>
        </div>
        <FilterCheckbox />
      </form>
    </section>
  );
}

export default SearchForm;