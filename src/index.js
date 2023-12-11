import './pages/index.css';

import { initialCards } from './components/cards.js';
import { renderCard, cardContainer } from './components/card.js';
import { handleShowPopup, handleClosePopup } from './components/modal.js';

const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const popupProfileEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const closePopupButtonList = document.querySelectorAll('.popup__close');

const formEditProfile = document.forms['edit-profile'];
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const nameInput = formEditProfile.elements.name;
const jobInput = formEditProfile.elements.description;
const formNewCard = document.forms['new-place'];
const placeInput = formNewCard.elements['place-name'];
const linkInput = formNewCard.elements.link;

initialCards.forEach((cards) => {
  renderCard(cards);
});

function createPopupImage(card) {
  popupImage.querySelector('.popup__image').src = card.src;
  popupImage.querySelector('.popup__image').alt = card.alt;
  popupImage.querySelector('.popup__caption').textContent = card.alt;

  return popupImage;
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  if (evt.target === formEditProfile) {
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
  } else if (evt.target === formNewCard) {
    const card = [];
    card.name = placeInput.value;
    card.link = linkInput.value;
    renderCard(card);
    formNewCard.reset();
  }
  handleClosePopup(evt.target.closest('.popup'));
}

editProfileButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  handleShowPopup(popupProfileEdit);
});

addCardButton.addEventListener('click', () => {
  handleShowPopup(popupNewCard);
});

cardContainer.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('card__image')) {
    createPopupImage(evt.target);
    handleShowPopup(popupImage);
  }
});

closePopupButtonList.forEach((closeButton) => {
  closeButton.addEventListener('click', function (evt) {
    const popup = evt.target.closest('.popup');
    handleClosePopup(popup);
  });
});

formEditProfile.addEventListener('submit', handleFormSubmit);
formNewCard.addEventListener('submit', handleFormSubmit);
