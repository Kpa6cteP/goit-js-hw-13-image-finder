import css from "./css/style.css";
import apiService from './js/apiService';
import refs from './js/refs';
import debounce from 'lodash.debounce';
import templateGallery from './templates/templateGallery.hbs';
import showHide from './js/showHide';


refs.search.addEventListener('input', debounce((e) => {

  if (e.target.value === '') {
    refs.gallery.innerHTML = '';
    showHide.hideElement(refs.loadMoreBtn);
    return;
  }
  if (refs.loadMoreBtn.disabled === true) {
    refs.loadMoreBtn.disabled = false;
    refs.btnText.textContent = 'Показать еще';

}

  showHide.showElement(refs.loadMoreBtn);
  apiService.query = e.target.value;
  apiService.resetPage();

  apiService.toGetFetch().then(data =>
    refs.gallery.innerHTML = templateGallery(data),

    )

}, 500))

refs.loadMoreBtn.addEventListener("click", () => {
  apiService.setPage();

  refs.loadMoreBtn.disabled = true;

  apiService.toGetFetch().then(data =>
    refs.gallery.insertAdjacentHTML('beforeend', templateGallery(data)));

    refs.loadMoreBtn.disabled = false;
})


refs.backToTop.addEventListener('click', () => {
  scrollTo({
      top: 0,
      behavior: 'smooth'
  })
});

refs.goToBottom.addEventListener('click', () => {
  scrollTo({
      top: 1000,
      behavior: 'auto'
  })
})
