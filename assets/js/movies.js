import {
  addMovieToList,
  createMarkup,
  createStyle,
  moviesList,
  inputSearch,
  triggerMode,
  clearMoviesMarkup,
} from './dom.js';

const getData = (url) => fetch(url)
  .then((res) => res.json())
  .then((data) => data.Search);

let searchLast = null;

const debounce = (() =>{
  let timer = null;

  return (cb, ms) => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(cb, ms);
  }
})();

const inputSearchHandler = (e) => {
  debounce(() => {
    const searchString = e.target.value.trim();

    if (searchString && searchString.length > 3 && searchLast !== searchString ) {
      if (!triggerMode) clearMoviesMarkup(moviesList);
      getData(`https://www.omdbapi.com/?apikey=6172774&s=${searchString}`)
      .then((movies) => movies.forEach((movie) => addMovieToList(movie)))
      .catch(console.log);
    };
    searchLast = searchString;
  }, 2000);
};
 
export const appInit = () => {
  createStyle();
  createMarkup();
  inputSearch.addEventListener('keyup', inputSearchHandler);
};