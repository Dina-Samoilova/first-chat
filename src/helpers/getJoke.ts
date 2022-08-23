import { request } from './api';

const urlChuckNorrisAPI = 'https://api.chucknorris.io/jokes/random';

export const getJoke = () => {
  return request(urlChuckNorrisAPI);
};