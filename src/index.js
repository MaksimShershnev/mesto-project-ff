import './pages/index.css';

import { initialCards } from './components/cards.js';
import { renderCard } from './components/card.js';
import { handleShowPopup, handleClosePopup } from './components/modal.js';

const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const popupProfileEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
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
  renderCard(card);
  formNewCard.reset();
  handleClosePopup(popupNewCard);
}

editProfileButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  handleShowPopup(popupProfileEdit);
});

addCardButton.addEventListener('click', () => {
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
