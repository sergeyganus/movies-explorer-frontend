export const mainApiSettings = {
  baseUrl: 'https://api.creative.movies.nomoredomainsicu.ru',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
};

export const moviesApiSettings = {
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
  baseImagesUrl: 'https://api.nomoreparties.co',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
};

export const screenSm = {
  width: 320,
  initialQuantity: 5,
  addQuantity: 2
};

export const screenMd = {
  width: 591,
  initialQuantity: 8,
  addQuantity: 2
};

export const screenLg = {
  width: 1041,
  initialQuantity: 12,
  addQuantity: 3
};