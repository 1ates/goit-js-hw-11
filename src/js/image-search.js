import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox/dist/simple-lightbox.esm.js';
import 'simplelightbox/dist/simple-lightbox.min.css';

const KEY = import.meta.env.VITE_PIXABAY_API_KEY;

const input = document.querySelector('.input');
const submitBtn = document.querySelector('.btn');

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
loader.style.display = 'none';

let searchText;
let lightbox;
let page = 1;
let perPage = 9;
let totalPages = 0;

submitBtn.addEventListener('click', e => {
  e.preventDefault();

  searchText = input.value.trim().replace(' ', '+');
  page = 1;
  gallery.innerHTML = '';
  loader.style.display = 'inline-block';

  Promise.all([
    fetchGallery(page),
    new Promise(resolve => setTimeout(resolve, 2000)),
  ])
    .then(([images]) => {
      if (images.hits.length === 0) {
        loader.style.display = 'none';
        return iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
      }

      totalPages = Math.ceil(images.totalHits / perPage);
      renderGallery(images);
      loadMoreBtn.style.display = 'block';
      if (page >= totalPages) {
        loadMoreBtn.style.display = 'none';
      }
      loader.style.display = 'none';
    })
    .catch(error => {
      loader.style.display = 'none';
      console.log(error);
    });
});

const loadMoreBtn = document.querySelector('.load-more');
loadMoreBtn.style.display = 'none';

loadMoreBtn.addEventListener('click', () => {
  page += 1;

  Promise.all([
    fetchGallery(page),
    new Promise(resolve => setTimeout(resolve, 2000)),
  ])
    .then(([images]) => {
      renderGallery(images);

      if (page >= totalPages) {
        loadMoreBtn.style.display = 'none';
      }
      const { height } = gallery.firstElementChild.getBoundingClientRect();
      window.scrollBy({
        top: height * 4,
        behavior: 'smooth',
      });
    })
    .catch(error => {
      console.log(error);
    });
});

function fetchGallery(page) {
  return fetch(`
https://pixabay.com/api/?key=${KEY}&q=${searchText}&image_type=photo&per_page=${perPage}&page=${page}`).then(
    response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    }
  );
}

function renderGallery(images) {
  const markup = images.hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
      <li class="gallery-item">
        <a class="gallery-link" href="${largeImageURL}">
          <img
          class="gallery-image"
          src="${webformatURL}"
          alt="${tags}" />
        </a>
        <div class="features">
          <ul>
            <li class="feature-header">Likes</li>
            <li class="feature-text">${likes}</li>
          </ul>
          <ul>
            <li class="feature-header">Views</li>
            <li class="feature-text">${views}</li>
          </ul>
          <ul>
            <li class="feature-header">Comments</li>
            <li class="feature-text">${comments}</li>
          </ul>
          <ul>
            <li class="feature-header">Downloads</li>
            <li class="feature-text">${downloads}</li>
          </ul>
        </div>
      </li>`;
      }
    )
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);

  if (!lightbox) {
    lightbox = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
    });
  } else {
    lightbox.destroy();
    lightbox = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
    });
  }
}
