import { mainApiSettings } from './constants';

const BASE_URL = mainApiSettings.baseUrl;
const headers = mainApiSettings.headers;

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(res.status);
}

export function register(name, email, password) {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      name,
      email,
      password
    })
  })
    .then(checkResponse)
    .then((userData) => userData);
}

export function authorize(email, password) {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers: headers,
    body: JSON.stringify({
      email,
      password
    })
  })
    .then(checkResponse)
    .then((userData) => userData);
}

export function signOut() {
  return fetch(`${BASE_URL}/signout`, {
    method: 'POST',
    credentials: 'include',
    headers
  })
    .then(checkResponse)
    .then((data) => data);
}

export function checkToken() {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    credentials: 'include',
    headers
  })
    .then(checkResponse)
    .then((userData) => userData);
}
