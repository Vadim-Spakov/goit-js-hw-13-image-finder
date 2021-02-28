import ImageApiService from './apiService';
import photoCard from '../templates/photoCard.hbs';
import animateScrollTo from 'animated-scroll-to';
import { onOpenModal } from './modal';

const formSearch = document.querySelector('#search-form');
const articlesContainer = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('[data-action="load-more"]');
const noResultMessage = document.querySelector('.no-result');

formSearch.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);
articlesContainer.addEventListener('click', onOpenModal);

const imageApiService = new ImageApiService();

async function onSearch(event) {
  event.preventDefault();

  try {
    noResultMessage.classList.add('is-hidden');
    const inputSearchValue = event.currentTarget.elements.query.value;
    imageApiService.query = inputSearchValue;

    loadMoreBtn.classList.add('is-hidden');

    imageApiService.resetPage();
    clearArticlesContainer();
    const response = await imageApiService.fetchImages();

    if (response.length === 0) {
      noResultMessage.classList.remove('is-hidden');
    } else if (response.length > 0) {
      appendArticlesMarkup(response);
      loadMoreBtn.classList.remove('is-hidden');
    }
    if (response.length < 12) {
      loadMoreBtn.classList.add('is-hidden');
    }
  } catch (error) {
    console.log('Ошибка');
  }
}

async function onLoadMore() {
  try {
    const response = await imageApiService.fetchImages();
    console.log(response);

    appendArticlesMarkup(response);
    scrollToElement();
  } catch (error) {
    console.log('Ошибка');
  }
}

function appendArticlesMarkup(articles) {
  articlesContainer.insertAdjacentHTML('beforeend', photoCard(articles));
}

function clearArticlesContainer() {
  articlesContainer.innerHTML = '';
}

function scrollToElement() {
  const indexToScroll = 12 * (imageApiService.page - 1) - 11;
  const itemToScroll = articlesContainer.children[indexToScroll];
  const options = {
    speed: 500,
    verticalOffset: -10,
  };

  animateScrollTo(itemToScroll, options);
}

// Промисы

// function onSearch(event) {
//   event.preventDefault();

//   const inputSearchValue = event.currentTarget.elements.query.value;
//   imageApiService.query = inputSearchValue;

//   loadMoreBtn.classList.add('is-hidden');

//   imageApiService.resetPage();
//   clearArticlesContainer();
//   imageApiService.fetchImages().then(articles => {
//     if (articles.length > 0) {
//       appendArticlesMarkup(articles);
//       loadMoreBtn.classList.remove('is-hidden');
//     }
//   });
// }

// function onLoadMore() {
//   imageApiService
//     .fetchImages()
//     .then(appendArticlesMarkup)
//     .then(scrollToElement);
// }
