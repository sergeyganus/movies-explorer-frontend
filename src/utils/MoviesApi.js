import { moviesApiSettings } from './constants';

const BASE_URL = moviesApiSettings.baseUrl;
const headers = moviesApiSettings.headers;

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(res.status);
}

export function getAllMovies() {
  return fetch(`${BASE_URL}`, {
    method: 'GET',
    headers
  })
    .then(checkResponse)
    .then((movies) => movies);
}