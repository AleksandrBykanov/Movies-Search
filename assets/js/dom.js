export let moviesList = null;
export let inputSearch = null;
export let triggerMode = false;

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
  if (evt && handler && typeof handler === 'function') el.addEventListener(evt, handler);

  return el;
};

export const createStyle = () => {
  createElement({
    type: 'style',
    attrs: {
      innerHTML: `
      * {
      box-sizing: border-box;
    }
    
    body {
      margin: 0;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      font-family: Arial, Helvetica, sans-serif;
      background-image: url(assets/img/bg.jpg);
      background-repeat: no-repeat;
      background-position: center;
      background-color: black;
      color: beige;
    }
    
    .header {
      height: 150px;
      background-image: url(assets/img/header.png);
      background-repeat: no-repeat;
      background-position: center;
      width: 100%;
    }
    
    .footer {
      min-height: 50px;
      padding: 20px 0;
      margin-top: auto;
      flex-shrink: 0;
      text-align: center;
      color: beige;
    }
    
    .container {
      width: min(100% - 40px, 1180px);
      margin-inline: auto;
      text-align: center;
      flex-grow: 1;
    }
    
    .movies {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 20px;
      padding-bottom: 20px;
    }
    
    .movie {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    
    .movie__image {
      width: 100%;
      object-fit: cover;
    }
    
    .search {
      margin-bottom: 30px;
    }
    
    .search__label-input {
      display: block;
      margin-bottom: 7px;
    }
    
    .search__input {
      display: block;
      margin-left: auto;
      margin-right: auto;
      max-width: 400px;
      width: 100%;
      padding: 10px 15px;
      margin-bottom: 10px;
      border: 1px solid lightgray;
      border-radius: 4px;
    }
    
    .search__label-checkbox {
      font-size: 12px;
      display: inline-block;
      transform: translate(7px, -2px);
    }
    `
    },
    container: document.head
  });
};

export const createMarkup = () => {
    const footer = createElement({
    type: 'div',
    attrs: {class: 'footer'},
    container: document.body,
    position: 'prepend',
  });

  createElement({
    type: 'span',
    attrs: {innerHTML: 'Alexandr Bykanov'},
    container: footer,
  });
    
  const container = createElement({
    type: 'div',
    attrs: {class: 'container'},
    container: document.body,
    position: 'prepend',
  });

  const header = createElement({
    type: 'div',
    attrs: {class: 'header'},
    container: document.body,
    position: 'prepend',
  });

  createElement({
    type: 'h1',
    attrs: {innerHTML: 'Приложение для поиска фильмов'},
    container,
  });

  const searchBox = createElement({
    type: 'div',
    attrs: {class: 'search'},
    container
  });

  const inputBox = createElement({
    type: 'div',
    attrs: {class: 'search__group search__group--input'},
    container: searchBox,
  });

  const checkBox = createElement({
    type: 'div',
    attrs: {class: 'search__group search__group--checkbox'},
    container: searchBox,
  });

  createElement({
    type: 'label',
    attrs: {
      class: 'search__label-input',
      for: 'search',
      innerHTML: 'Поиск фильмов'
    },
    container: inputBox
  });

  inputSearch = createElement({
    type: 'input',
    attrs: {
      class: 'search__input',
      id: 'search',
      type: 'search',
      placeholder: 'Начните вводить текст...'
    },
    container: inputBox
  });

  createElement({
    type: 'input',
    attrs: {
      class: 'search__checkbox',
      id: 'checkbox',
      type: 'checkbox',
    },
    container: checkBox,
    evt: 'click',
    handler: () => triggerMode = !triggerMode
  });

  const movies = createElement({
    type: 'div',
    attrs: {class: 'movies'},
    container
  });

  createElement({
    type: 'label',
    attrs: {
      class: 'search__label-checkbox',
      for: 'checkbox',
      innerHTML: 'Добавлять фильмы к существующим спискам'
    },
    container: checkBox
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

export const clearMoviesMarkup = (el) => el && (el.innerHTML = '');
