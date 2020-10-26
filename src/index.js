import css from "./css/style.css";
import apiService from './js/apiService';
import refs from './js/refs';
import debounce from 'lodash.debounce';
import templateGallery from './templates/templateGallery.hbs';

import * as basicLightbox from 'basiclightbox';
import '../node_modules/basiclightbox/dist/basicLightbox.min.css';

refs.search.addEventListener('input', debounce((e) => {

  if (e.target.value === '') {
    refs.gallery.innerHTML = '';
    refs.loadMoreBtn.classList.add('is-hidden');
    return;
  }

  refs.loadMoreBtn.classList.remove('is-hidden')
  apiService.query = e.target.value;

  apiService.toGetFetch().then(data =>
    refs.gallery.innerHTML = templateGallery(data));

}, 500))

refs.loadMoreBtn.addEventListener('click', () => {
  apiService.setPage();

  refs.loadMoreBtn.disabled = true;

  apiService.toGetFetch().then(data =>
    refs.gallery.insertAdjacentHTML('beforeend', templateGallery(data)));

    refs.loadMoreBtn.disabled = false;
})

// refs.gallery.addEventListener('click', (e) => {
//   console.log(e.target);

//   let bigImage = e.target.dataset.largeImage;
//   console.log(bigImage);
//   refs.jsLightbox.classList.add('is-open');
//   refs.lightboxImage.src = bigImage;
// })

