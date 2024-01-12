const popupError = document.querySelector('.popup-error');
const popupErrorDesctiption = popupError.querySelector(
  '.popup-error__description'
);

function handleShowPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', keyHandler);
  document.addEventListener('mousedown', mouseHandler);
}

function handleClosePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', keyHandler);
  document.removeEventListener('mousedown', mouseHandler);
}

function keyHandler(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_is-opened');
    handleClosePopup(popup);
  }
}

function mouseHandler(evt) {
  if (evt.target.classList.contains('popup_is-opened')) {
    handleClosePopup(evt.target);
  }
}

function showPopupError(description) {
  popupErrorDesctiption.textContent = description;
  setTimeout(() => popupError.classList.add('popup-error_is-opened'), 400);
  setTimeout(() => popupError.classList.remove('popup-error_is-opened'), 4000);
}

export { handleShowPopup, handleClosePopup, showPopupError };
