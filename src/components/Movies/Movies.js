import React from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesNotFound from '../MoviesNotFound/MoviesNotFound';
import MoreMovies from '../MoreMovies/MoreMovies';
import Footer from '../Footer/Footer';
import { useResize } from '../../utils/UseResize';
import { screenSm, screenMd, screenLg } from '../../utils/constants';
import './Movies.css';

function Movies({ loggedIn,
  allMovies,
  savedMovies,
  searchQuery,
  shortMovies,
  searchedMovies,
  shownSearchedMovies,
  onGetAllMovies,
  onGetSearchedMovies,
  onSetShownSearchedMovies,
  onAddMovie,
  onRemoveMovie
}) {
  const [isSearchStarted, setIsSearchStarted] = React.useState(false);
  const [isMoviesNotFound, setIsMoviesNotFound] = React.useState(searchedMovies.length === 0);
  const [messageMoviesNotFound, setMessageMoviesNotFound] = React.useState('Поиск ещё не выполнялся');
  const [isApiError, setIsApiError] = React.useState(false);
  const [isMoreMoviesActive, setIsMoreMoviesActive] = React.useState(false);

  const { isScreenSm, isScreenMd, isScreenLg } = useResize();
  const initialQuantity = isScreenLg ? screenLg.initialQuantity : isScreenMd ? screenMd.initialQuantity : screenSm.initialQuantity;
  const [shownIndex, setShownIndex] = React.useState(initialQuantity);

  function handleSearchStarted(isStarted) {
    setIsSearchStarted(isStarted);
  }

  function handleMoviesNotFound(message, isNotFound) {
    setMessageMoviesNotFound(message);
    setIsMoviesNotFound(isNotFound);
  }

  function handleAddMoreMovies() {
    let missingAddQuantity = 0;
    let correctedShownIndex = 0;

    if (isScreenLg) {
      missingAddQuantity = 3 - shownIndex % 3;
      correctedShownIndex = (missingAddQuantity < 3) ? shownIndex + screenLg.addQuantity + missingAddQuantity : shownIndex + screenLg.addQuantity;
    }

    if (isScreenMd) {
      missingAddQuantity = 2 - shownIndex % 2;
      correctedShownIndex = (missingAddQuantity < 2) ? shownIndex + screenMd.addQuantity + missingAddQuantity : shownIndex + screenMd.addQuantity;
    }

    if (isScreenSm) {
      correctedShownIndex = shownIndex + screenSm.addQuantity;
    }

    if (searchedMovies.length <= correctedShownIndex) {
      correctedShownIndex = searchedMovies.length;
      setIsMoreMoviesActive(false);
    }

    onSetShownSearchedMovies([...searchedMovies.slice(0, correctedShownIndex)]);
    setShownIndex(correctedShownIndex);
  }

  function handleApiError(isError) {
    setIsApiError(isError);
  }

  React.useEffect(() => {
    setIsMoviesNotFound(searchedMovies.length === 0);
    if (searchQuery.length > 0) {
      setMessageMoviesNotFound('Ничего не найдено');
    }

    if (isApiError) {
      setMessageMoviesNotFound('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
    }
  }, [searchQuery, searchedMovies]);

  React.useEffect(() => {
    let currentShownIndex = shownIndex;

    if (searchedMovies.length > 0) {
      if (searchedMovies.length > currentShownIndex) {
        setIsMoreMoviesActive(true);
      } else {
        currentShownIndex = searchedMovies.length;
        setIsMoreMoviesActive(false);
      }
    }

    onSetShownSearchedMovies([...searchedMovies.slice(0, currentShownIndex)]);
  }, [searchedMovies]);

  React.useEffect(() => {
    let newShownIndex = initialQuantity;

    if (searchedMovies.length > 0) {
      if (searchedMovies.length > newShownIndex) {
        setIsMoreMoviesActive(true);
      } else {
        newShownIndex = searchedMovies.length;
        setIsMoreMoviesActive(false);
      }
    }

    setShownIndex(initialQuantity);
    onSetShownSearchedMovies([...searchedMovies.slice(0, newShownIndex)]);
  }, [searchQuery, shortMovies]);

  return (
    <>
      <Header loggedIn={loggedIn} />
      <main className="movies">
        <SearchForm
          allMovies={allMovies}
          savedMovies={savedMovies}
          searchQuery={searchQuery}
          shortMovies={shortMovies}
          onSearchStarted={handleSearchStarted}
          onGetAllMovies={onGetAllMovies}
          onGetSearchedMovies={onGetSearchedMovies}
          onMoviesNotFound={handleMoviesNotFound}
          onApiError={handleApiError}
        />
        {isSearchStarted && <Preloader />}
        <MoviesCardList movies={shownSearchedMovies} isActive={!isMoviesNotFound} onAddMovie={onAddMovie} onRemoveMovie={onRemoveMovie} />
        <MoviesNotFound message={messageMoviesNotFound} isActive={isMoviesNotFound && !isSearchStarted} />
        <MoreMovies isActive={isMoreMoviesActive} onAddMoreMovies={handleAddMoreMovies} />
      </main>
      <Footer />
    </>
  );
}

export default Movies;