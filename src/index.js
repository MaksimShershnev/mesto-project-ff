import './pages/index.css';

import { initialCards } from './components/cards.js';
import { renderCard } from './components/card.js';
import { handleShowPopup, handleClosePopup } from './components/modal.js';
import { clearValidation, enableValidation } from './components/validation.js';

const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const popupProfileEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const image = popupImage.querySelector('.popup__image');
const imageСaption = popupImage.querySelector('.popup__caption');
const closePopupButtonList = document.querySelectorAll('.popup__close');
const formEditProfile = document.forms['edit-profile'];
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const nameInput = formEditProfile.elements.name;
const jobInput = formEditProfile.elements.description;
const formNewCard = document.forms['new-place'];
const placeInput = formNewCard.elements['place-name'];
const linkInput = formNewCard.elements.link;

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
};

initialCards.forEach((cards) => {
  renderCard(cards, handleClickImage);
});

function handleClickImage(evt) {
  image.src = evt.target.src;
  image.alt = evt.target.alt;
  imageСaption.textContent = evt.target.alt;
  handleShowPopup(popupImage);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  handleClosePopup(popupProfileEdit);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const card = [];
  card.name = placeInput.value;
  card.link = linkInput.value;
  renderCard(card, handleClickImage);
  formNewCard.reset();
  handleClosePopup(popupNewCard);
}

editProfileButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(formEditProfile, validationConfig);
  handleShowPopup(popupProfileEdit);
});

addCardButton.addEventListener('click', () => {
  placeInput.value = '';
  linkInput.value = '';
  clearValidation(formNewCard, validationConfig);
  handleShowPopup(popupNewCard);
});

closePopupButtonList.forEach((closeButton) => {
  closeButton.addEventListener('click', (evt) => {
    const popup = evt.target.closest('.popup');
    handleClosePopup(popup);
  });
});

formEditProfile.addEventListener('submit', handleProfileFormSubmit);
formNewCard.addEventListener('submit', handleAddCardFormSubmit);

enableValidation(validationConfig);
