import { mainApiSettings } from './constants';

const BASE_URL = mainApiSettings.baseUrl;
const headers = mainApiSettings.headers;

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(res.status);
}

export function getUserProfile() {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    credentials: 'include',
    headers
  })
    .then(checkResponse)
    .then((userData) => userData);
}

export function updateUserProfile(name, email) {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'PATCH',
    credentials: 'include',
    headers,
    body: JSON.stringify({
      name,
      email
    })
  })
    .then(checkResponse)
    .then((userData) => userData);
}

export function getSavedMovies() {
  return fetch(`${BASE_URL}/movies`, {
    method: 'GET',
    credentials: 'include',
    headers
  })
    .then(checkResponse)
    .then((savedMovies) => savedMovies);
}

export function addMovie({
  country,
  director,
  duration,
  year,
  description,
  image,
  trailerLink,
  thumbnail,
  movieId,
  nameRU,
  nameEN
}) {
  return fetch(`${BASE_URL}/movies`, {
    method: 'POST',
    credentials: 'include',
    headers,
    body: JSON.stringify({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      movieId,
      nameRU,
      nameEN
    })
  })
    .then(checkResponse)
    .then((addedMovie) => addedMovie);
}

export function removeMovie(_id) {
  return fetch(`${BASE_URL}/movies/${_id}`, {
    method: 'DELETE',
    credentials: 'include',
    headers
  })
    .then(checkResponse)
    .then((removedMovie) => removedMovie);
}