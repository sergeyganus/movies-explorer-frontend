import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRouteElement from '../ProtectedRoute/ProtectedRoute';
import Preloader from '../Preloader/Preloader';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../PageNotFound/PageNotFound';
import * as auth from '../../utils/Auth';
import * as mainApi from '../../utils/MainApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function App() {
  const [currentUser, setCurrentUser] = React.useState({
    name: 'Ильф Петров',
    email: 'test@yandex.ru'
  });
  const [isLoading, setIsLoading] = React.useState(true);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [allMovies, setAllMovies] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [shortMovies, setShortMovies] = React.useState(false);
  const [searchedMovies, setSearchedMovies] = React.useState([]);
  const [shownSearchedMovies, setShownSearchedMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [searchedSavedMovies, setSearchedSavedMovies] = React.useState([]);

  function handleRegister(userData) {
    setCurrentUser({
      ...currentUser,
      name: userData.name,
      email: userData.email
    });
    setLoggedIn(true);
  }

  function handleLogin(userData) {
    setCurrentUser({
      ...currentUser,
      email: userData.email
    });
    setLoggedIn(true);
  }

  function handleLogout() {
    setLoggedIn(false);
    setAllMovies([]);
    setSearchedMovies([]);
    setSavedMovies([]);
    setSearchedSavedMovies([]);
    setSearchQuery('');
    setShortMovies(false);
    localStorage.removeItem('allMovies');
    localStorage.removeItem('searchedMovies');
    localStorage.removeItem('searchQuery');
    localStorage.removeItem('shortMovies');
  }

  function handleUpdateUserProfile(userData) {
    setCurrentUser({
      ...currentUser,
      name: userData.name,
      email: userData.email
    });
  }

  function handleGetAllMovies(movies) {
    setAllMovies([...movies]);
    localStorage.setItem('allMovies', JSON.stringify(movies));
  }

  function handleGetSearchedMovies(movies, searchQuery, shortMovies) {
    setSearchedMovies([...movies]);
    setSearchQuery(searchQuery);
    setShortMovies(shortMovies);
    localStorage.setItem('searchedMovies', JSON.stringify(movies));
    localStorage.setItem('searchQuery', JSON.stringify(searchQuery));
    localStorage.setItem('shortMovies', JSON.stringify(shortMovies));
  }

  function handleGetSavedMovies(movies) {
    setSavedMovies([...movies]);
    setSearchedSavedMovies([...movies]);
  }

  function handleGetSearchedSavedMovies(movies) {
    setSearchedSavedMovies([...movies]);
  }

  function handleAddMovie(movie) {
    const modifiedAllMovies = allMovies.map(m => m.id === movie.movieId ? { ...m, _id: movie._id, owner: currentUser._id } : m);
    setAllMovies([...modifiedAllMovies]);
    localStorage.setItem('allMovies', JSON.stringify(modifiedAllMovies));

    const modifiedSearchedMovies = searchedMovies.map(m => m.id === movie.movieId ? { ...m, _id: movie._id, owner: currentUser._id } : m);
    setSearchedMovies([...modifiedSearchedMovies]);
    localStorage.setItem('searchedMovies', JSON.stringify(modifiedSearchedMovies));
  }

  function handleRemoveMovie(movie) {
    const modifiedAllMovies = allMovies.map(m => m.id === movie.movieId ? { ...m, _id: '', owner: '' } : m);
    setAllMovies([...modifiedAllMovies]);
    localStorage.setItem('allMovies', JSON.stringify(modifiedAllMovies));

    const modifiedSearchedMovies = searchedMovies.map(m => m.id === movie.movieId ? { ...m, _id: '', owner: '' } : m);
    setSearchedMovies([...modifiedSearchedMovies]);
    localStorage.setItem('searchedMovies', JSON.stringify(modifiedSearchedMovies));

    const modifiedShownSearchedMovies = shownSearchedMovies.map(m => m.id === movie.movieId ? { ...m, _id: '', owner: '' } : m);
    setShownSearchedMovies([...modifiedShownSearchedMovies]);
  }

  function handleRemoveSavedMovie(movie) {
    setSavedMovies((state) => state.filter(m => m._id !== movie._id));
    setSearchedSavedMovies((state) => state.filter(m => m._id !== movie._id));
    if (allMovies.length !== 0) {
      handleRemoveMovie(movie);
    }
  }

  function handleSetShownSearchedMovies(movies) {
    setShownSearchedMovies([...movies]);
  }

  function printError(message) {
    console.log(message);
  }

  function checkToken() {
    auth.checkToken()
      .then((userData) => {
        if (userData) {
          setCurrentUser({
            ...currentUser,
            _id: userData._id,
            name: userData.name,
            email: userData.email
          });
          setLoggedIn(true);
          setIsLoading(true);
        }
      })
      .catch(() => printError('Пользователь не авторизован'))
      .finally(() => setIsLoading(false));
  }

  function getUserProfile() {
    mainApi.getUserProfile()
      .then((userData) => {
        setCurrentUser({
          ...currentUser,
          _id: userData._id,
          name: userData.name,
          email: userData.email
        });
      })
      .catch(() => printError('Не удалось получить данные пользователя'));
  }

  function getInitialSavedMovies() {
    mainApi.getSavedMovies()
      .then((currentMovies) => {
        setSavedMovies([...currentMovies.reverse()]);
      })
      .catch(() => printError('Не удалось получить сохраненные фильмы пользователя'));
  }

  function getFromLocalStorage() {
    if (allMovies.length === 0) {
      const allMoviesFromLocalStorage = JSON.parse(localStorage.getItem('allMovies'));
      if (allMoviesFromLocalStorage) {
        setAllMovies([...allMoviesFromLocalStorage]);
      }
    }

    if (searchedMovies.length === 0) {
      const searchedMoviesFromLocalStorage = JSON.parse(localStorage.getItem('searchedMovies'));
      if (searchedMoviesFromLocalStorage) {
        setSearchedMovies([...searchedMoviesFromLocalStorage]);
      }
    }

    if (searchQuery.length === 0) {
      const searchQueryFromLocalStorage = JSON.parse(localStorage.getItem('searchQuery'));
      if (searchQueryFromLocalStorage) {
        setSearchQuery(searchQueryFromLocalStorage);
      }
    }

    const shortMoviesFromLocalStorage = JSON.parse(localStorage.getItem('shortMovies'));
    if (shortMoviesFromLocalStorage) {
      setShortMovies(shortMoviesFromLocalStorage);
    }
  }

  React.useEffect(() => {
    if (!loggedIn) {
      checkToken();
    }
  }, []);

  React.useEffect(() => {
    if (loggedIn) {
      getUserProfile();
      getFromLocalStorage();
      if (savedMovies.length === 0) {
        getInitialSavedMovies();
      }
    }
  }, [loggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        {isLoading ? (
          <Preloader />
        ) : (
          <Routes>
            <Route
              path='/'
              element={<Main loggedIn={loggedIn} />}
            />
            <Route
              path='/signup'
              element={<Register onRegister={handleRegister} />}
            />
            <Route
              path='/signin'
              element={<Login onLogin={handleLogin} />}
            />
            <Route
              path='/movies'
              element={
                <ProtectedRouteElement
                  element={Movies}
                  loggedIn={loggedIn}
                  allMovies={allMovies}
                  savedMovies={savedMovies}
                  searchQuery={searchQuery}
                  shortMovies={shortMovies}
                  searchedMovies={searchedMovies}
                  shownSearchedMovies={shownSearchedMovies}
                  onGetAllMovies={handleGetAllMovies}
                  onGetSearchedMovies={handleGetSearchedMovies}
                  onSetShownSearchedMovies={handleSetShownSearchedMovies}
                  onAddMovie={handleAddMovie}
                  onRemoveMovie={handleRemoveMovie}
                />
              }
            />
            <Route
              path='/saved-movies'
              element={
                <ProtectedRouteElement
                  element={SavedMovies}
                  loggedIn={loggedIn}
                  savedMovies={savedMovies}
                  searchedSavedMovies={searchedSavedMovies}
                  onGetSavedMovies={handleGetSavedMovies}
                  onGetSearchedSavedMovies={handleGetSearchedSavedMovies}
                  onRemoveSavedMovie={handleRemoveSavedMovie}
                />
              }
            />
            <Route
              path='/profile'
              element={
                <ProtectedRouteElement
                  element={Profile}
                  loggedIn={loggedIn}
                  onUpdateUserProfile={handleUpdateUserProfile}
                  onLogout={handleLogout}
                />
              }
            />
            <Route
              path='*'
              element={<PageNotFound />}
            />
          </Routes>
        )}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
