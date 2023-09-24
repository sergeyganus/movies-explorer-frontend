import React from 'react';
import { useLocation } from 'react-router-dom';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import * as moviesApi from '../../utils/MoviesApi';
import './SearchForm.css';

function SearchForm({
  allMovies,
  savedMovies,
  searchQuery,
  shortMovies,
  onSearchStarted,
  onGetAllMovies,
  onGetSearchedMovies,
  onGetSearchedSavedMovies,
  onMoviesNotFound,
  onApiError
}) {
  const currentUser = React.useContext(CurrentUserContext);
  const [values, setValues] = React.useState({
    searchQuery: '',
    shortMovies: false
  });
  const [error, setError] = React.useState('');
  const [isValid, setIsValid] = React.useState(true);
  const [isFirstLoading, setIsFirstLoading] = React.useState(true);

  const location = useLocation();
  const isCurrentPageMovies = location.pathname === '/movies';
  const handleSubmit = isCurrentPageMovies ? handleOnMoviesSubmit : handleOnSavedMoviesSubmit;

  function handleChange(e) {
    const target = e.target;
    const name = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    setValues({ ...values, [name]: value });
    setIsValid(true);
    setError('');
  }

  function validate() {
    let validationMessage = '';
    let isValid = true;

    if (values.searchQuery.trim().length === 0) {
      validationMessage = 'Нужно ввести ключевое слово';
      setValues({ ...values, searchQuery: '' });
      isValid = false;
    }

    setIsValid(isValid);
    setError(validationMessage);

    return isValid;
  }

  async function handleOnMoviesSubmit(e) {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    onSearchStarted(true);
    let currentAllMovies = [];
    let currentSearchedMovies = [];

    if (allMovies.length === 0) {
      const allMoviesFromStorage = JSON.parse(localStorage.getItem('allMovies'));
      if (!allMoviesFromStorage) {
        currentAllMovies = await getAllMovies();
      } else {
        currentAllMovies = allMoviesFromStorage;
      }
    } else {
      currentAllMovies = allMovies;
    }

    currentSearchedMovies = searchMovies(currentAllMovies, values.searchQuery, values.shortMovies);
    onGetSearchedMovies([...currentSearchedMovies], values.searchQuery, values.shortMovies);
    onSearchStarted(false);
  }

  async function getAllMovies() {
    let allMovies = [];

    await moviesApi.getAllMovies()
      .then((currentMovies) => {
        let modifiedCurrentMovies = currentMovies;
        if (savedMovies.length > 0) {
          if (currentMovies.length > 0) {
            modifiedCurrentMovies = currentMovies.map((movie) => {
              const findedMovie = savedMovies.find((savedMovie) => movie.id === savedMovie.movieId);
              return findedMovie ? { ...movie, _id: findedMovie._id, owner: currentUser._id } : movie;
            });
          }
        }
        onGetAllMovies([...modifiedCurrentMovies]);
        allMovies = modifiedCurrentMovies;
        onApiError(false);
      })
      .catch(() => onApiError(true));

    return allMovies;
  }

  function handleOnSavedMoviesSubmit(e) {
    e.preventDefault();

    handleSearchSavedMovies();
  }

  function handleSearchMovies() {
    if (!validate()) {
      return;
    }

    onSearchStarted(true);
    const currentSearchedMovies = searchMovies(allMovies, values.searchQuery, values.shortMovies);
    onGetSearchedMovies([...currentSearchedMovies], values.searchQuery, values.shortMovies);
    onSearchStarted(false);
  }

  function handleSearchSavedMovies() {
    if (!validate()) {
      return;
    }

    onSearchStarted(true);
    const currentSearchedSavedMovies = searchMovies(savedMovies, values.searchQuery, values.shortMovies);
    onGetSearchedSavedMovies([...currentSearchedSavedMovies]);
    if (currentSearchedSavedMovies.length > 0) {
      onMoviesNotFound('', false);
    }
    onSearchStarted(false);
  }

  function searchMovies(allMovies, searchQuery, shortMovies) {
    searchQuery = searchQuery.toLowerCase();

    return allMovies.filter((movie) => {
      const nameRU = movie.nameRU.toLowerCase();
      const nameEN = movie.nameEN.toLowerCase();
      const duration = movie.duration;

      const isMatch = shortMovies
        ? ((nameRU.includes(searchQuery) || nameEN.includes(searchQuery)) && (duration <= 40))
        : (nameRU.includes(searchQuery) || nameEN.includes(searchQuery));

      return isMatch;
    });
  }

  React.useEffect(() => {
    if (isCurrentPageMovies) {
      setValues({
        ...values,
        searchQuery: searchQuery,
        shortMovies: shortMovies
      });
    }
  }, [searchQuery, shortMovies]);

  React.useEffect(() => {
    if (isCurrentPageMovies && !isFirstLoading) {
      if (allMovies.length > 0) {
        handleSearchMovies();
      }
    }

    if (!isCurrentPageMovies && !isFirstLoading) {
      handleSearchSavedMovies();
    }

    setIsFirstLoading(false);
  }, [values.shortMovies]);

  return (
    <section className="search-form" aria-label="Панель поиска фильмов">
      <form className="search-form__form" name="searchform" method="post" onSubmit={handleSubmit} noValidate>
        <div className="search-form__search-bar">
          <input
            id="search-input"
            className="search-form__input"
            name="searchQuery"
            type="text"
            value={values.searchQuery}
            onChange={handleChange}
            placeholder="Фильм"
            required
          />
          <button
            className={`search-form__button ${!isValid ? 'search-form__button_disabled' : ''}`}
            type="submit"
            title="Найти"
            disabled={!isValid}
          >
          </button>
          <span className="search-input-error search-form__input-error">{error}</span>
        </div>
        <FilterCheckbox shortMovies={values.shortMovies} onChange={handleChange} />
      </form>
    </section>
  );
}

export default SearchForm;