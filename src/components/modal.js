const popupList = document.querySelectorAll('.popup');

function handleShowPopup(popup) {
  popup.classList.add('popup_is-opened');
}

function handleClosePopup(popup) {
  popup.classList.remove('popup_is-opened');
}

function keyHandler(evt) {
  popupList.forEach((popup) => {
    if (popup.classList.contains('popup_is-opened') && evt.key === 'Escape') {
      handleClosePopup(popup);
    }
  });
}

function mouseHandler(evt) {
  if (evt.target.classList.contains('popup_is-opened')) {
    handleClosePopup(evt.target);
  }
}

document.addEventListener('keydown', keyHandler);
document.addEventListener('mousedown', mouseHandler);

export { handleShowPopup, handleClosePopup };
