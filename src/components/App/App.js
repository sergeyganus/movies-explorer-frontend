import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../PageNotFound/PageNotFound';

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);

  return (
    <div className="page">
      <Routes>
        <Route
          path='/'
          element={<Main loggedIn={loggedIn} />}
        />
        <Route
          path='/signup'
          element={<Register />}
        />
        <Route
          path='/signin'
          element={<Login />}
        />
        <Route
          path='/movies'
          element={<Movies loggedIn={loggedIn} />}
        />
        <Route
          path='/saved-movies'
          element={<SavedMovies loggedIn={loggedIn} />}
        />
        <Route
          path='/profile'
          element={<Profile loggedIn={loggedIn} />}
        />
        <Route
          path='*'
          element={<PageNotFound />}
        />
      </Routes>
    </div>
  );
}

export default App;
