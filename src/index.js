import './pages/index.css';

// import { initialCards } from './components/cards.js';
import { renderCard } from './components/card.js';
import { handleShowPopup, handleClosePopup } from './components/modal.js';
import { clearValidation, enableValidation } from './components/validation.js';
import { setUserInfo, getInitialData, addNewCard } from './components/api.js';

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

function handleClickImage(evt) {
  image.src = evt.target.src;
  image.alt = evt.target.alt;
  imageСaption.textContent = evt.target.alt;
  handleShowPopup(popupImage);
}

const renderProfileInfo = (userName, userAbout) => {
  profileTitle.textContent = userName;
  profileDescription.textContent = userAbout;
};

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  setUserInfo(nameInput.value, jobInput.value)
    .then((user) => {
      renderProfileInfo(user.name, user.about);
      handleClosePopup(popupProfileEdit);
    })
    .catch((err) => console.log(err));
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  addNewCard(placeInput.value, linkInput.value)
    .then((cardData) => {
      // console.log(cardData);
      renderCard(cardData, handleClickImage);
      formNewCard.reset();
      handleClosePopup(popupNewCard);
    })
    .catch((err) => console.log(err));
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

const InitialCards = (cards) => {
  cards.forEach((card) => {
    renderCard(card, handleClickImage);
  });
};

getInitialData()
  .then((data) => {
    renderProfileInfo(data[0].name, data[0].about);
    InitialCards(data[1]);
    // console.log(data[1]);
  })
  .catch((err) => console.log(err));

enableValidation(validationConfig);
