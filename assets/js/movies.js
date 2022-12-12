import {
  addMovieToList,
  createMarkup,
  createStyle,
  moviesList,
  inputSearch,
} from './dom.js';

const getData = (url) => fetch(url)
  .then((res) => res.json())
  .then((data) => data.Search);

const search = '123';


getData(`http://www.omdbapi.com/?apikey=6172774&s=${search}`)
  .then((movies) => movies.forEach((movie) => addMovieToList(movie)))
  .catch(console.log);
  
  export const appInit = () => {
  createStyle();
  createMarkup();
};