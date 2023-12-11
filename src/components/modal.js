const popupList = document.querySelectorAll('.popup');

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
  popupList.forEach((popup) => {
    if (evt.key === 'Escape') {
      handleClosePopup(popup);
    }
  });
}

function mouseHandler(evt) {
  if (evt.target.classList.contains('popup_is-opened')) {
    handleClosePopup(evt.target);
  }
}

export { handleShowPopup, handleClosePopup };
