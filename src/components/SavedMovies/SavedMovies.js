import React from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesNotFound from '../MoviesNotFound/MoviesNotFound';
import Footer from '../Footer/Footer';
import * as mainApi from '../../utils/MainApi';
import './SavedMovies.css';

function SavedMovies({ loggedIn, savedMovies, searchedSavedMovies, onGetSavedMovies, onGetSearchedSavedMovies, onRemoveSavedMovie }) {
  const [isSearchStarted, setIsSearchStarted] = React.useState(false);
  const [isMoviesNotFound, setIsMoviesNotFound] = React.useState(true);
  const [messageMoviesNotFound, setMessageMoviesNotFound] = React.useState('');
  const [isApiError, setIsApiError] = React.useState(false);

  function handleSearchStarted(isStarted) {
    setIsSearchStarted(isStarted);
  }

  function handleMoviesNotFound(message, isNotFound) {
    setMessageMoviesNotFound(message);
    setIsMoviesNotFound(isNotFound);
  }

  function handleApiError(isError) {
    setIsApiError(isError);
  }

  function getSavedMovies() {
    handleSearchStarted(true);
    mainApi.getSavedMovies()
      .then((currentMovies) => {
        onGetSavedMovies([...currentMovies.reverse()]);
        handleMoviesNotFound('', false);
        handleApiError(false);
      })
      .catch(() => handleApiError(true))
      .finally(() => {
        handleSearchStarted(false);
      });
  }

  React.useEffect(() => {
    getSavedMovies();
  }, []);

  React.useEffect(() => {
    if (searchedSavedMovies.length === 0) {
      handleMoviesNotFound('Ничего не найдено', true);
    }

    if (savedMovies.length === 0) {
      handleMoviesNotFound('Сохранённых фильмов не найдено', true);
    }

    if (isApiError) {
      handleMoviesNotFound(
        'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз',
        true);
    }
  }, [savedMovies, searchedSavedMovies, isApiError]);

  return (
    <>
      <Header loggedIn={loggedIn} />
      <main className="saved-movies">
        <SearchForm
          savedMovies={savedMovies}
          onGetSearchedSavedMovies={onGetSearchedSavedMovies}
          onSearchStarted={handleSearchStarted}
          onMoviesNotFound={handleMoviesNotFound}
          onApiError={handleApiError}
        />
        {isSearchStarted && <Preloader />}
        <MoviesCardList movies={searchedSavedMovies} isActive={!isMoviesNotFound} onRemoveSavedMovie={onRemoveSavedMovie} />
        <MoviesNotFound message={messageMoviesNotFound} isActive={isMoviesNotFound && !isSearchStarted} />
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;