/* eslint no-nested-ternary: [0] */
module.exports = {
  ENV: process.env.NODE_ENV,
  FRONT_URL: process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : (process.env.NODE_ENV === 'test') ? 'https://qa.transit.cl' : 'https://transit.cl',
  API_URL: process.env.NODE_ENV === 'development' ? 'http://localhost' : (process.env.NODE_ENV === 'test') ? 'https://qa.transit.cl/api' : 'https://transit.cl/api',
  GOOGLE_MAPS_ID: process.env.GOOGLE_MAPS_ID || '',
};
