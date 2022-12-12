export let moviesList = null;
export let inputSearch = null;
const createElement = ({
  type,
  attrs, 
  container = null, 
  position = 'append', 
  evt, 
  handler
}) => {
  const el = document.createElement(type);

  Object.keys(attrs).forEach((key) => {
    if (key !== 'innerHTML')el.setAttribute(key, attrs[key]);
    else el.innerHTML = attrs[key]
  });
 
  if (container && position === 'append') container.append(el);
  if (container && position === 'prepend') container.prepend(el);

  return el;
};

export const createStyle = () => {
  const headStyle = document.createElement('style');

  headStyle.innerHTML = `
  * {
  box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: Arial, Helvetica, sans-serif;
  }

  .container {
    padding: 20px;
  }

  .movies {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
  }

  .movie {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .movie__image {
    width: 100%;
    object-fit: cover;
  }`;
  document.head.append(headStyle);
};

export const createMarkup = () => {
  const container = createElement({
    type: 'div',
    attrs: {class: 'containet'},
    container: document.body,
    position: 'prepend',
  });

  createElement({
    type: 'h1',
    attrs: {innerHTML: 'Приложение для поиска фильмов'},
    container,
  });

  const searchbox = createElement({
    type: 'div',
    attrs: {class: 'search'},
    container
  });

  const inputbox = createElement({
    type: 'div',
    attrs: {class: 'search__group search__group--input'},
    container: searchbox,
  });

  const checkbox = createElement({
    type: 'div',
    attrs: {class: 'search__group search__group--checkbox'},
    container: searchbox,
  });

  createElement({
    type: 'label',
    attrs: {
      class: 'search__label-input',
      for: 'search',
      innerHTML: 'Поиск фильмов'
    },
    container: inputbox
  });

  inputSearch = createElement({
    type: 'input',
    attrs: {
      class: 'search__input',
      id: 'search',
      type: 'search',
      placeholder: 'Начните вводить текст...'
    },
    container: inputbox
  });

  createElement({
    type: 'input',
    attrs: {
      class: 'search__checkbox',
      id: 'checkbox',
      type: 'checkbox',
    },
    container: inputbox
  });

  const movies = createElement({
    type: 'div',
    attrs: {class: 'movies'},
    container
  });
 
  moviesList = document.querySelector('.movies');
};

export const addMovieToList = (movie) => {
  const item = createElement({
    type: 'div',
    attrs: {class: 'movie'},
    container: moviesList
  });

  createElement({
    type: 'img',
    attrs: {
      class: 'movie__image',
      src: /(http|https):\/\//i.test(movie.Poster) ? movie.Poster : 'assets/img/img.jpg',
      alt: movie.Title,
      title: movie.Title,
    },
    container: item
  });
};
