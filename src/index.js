import './pages/index.css';
import { initialCards } from './scripts/cards.js';

const cardTemplate = document.querySelector('#card-template').content;
const cardContainer = document.querySelector('.places__list');
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const popupProfileEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const closePopupButtonList = document.querySelectorAll('.popup__close');
const popupList = document.querySelectorAll('.popup');

const formEditProfile = document.forms['edit-profile'];
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const nameInput = formEditProfile.elements.name;
const jobInput = formEditProfile.elements.description;

const formNewCard = document.forms['new-place'];
const placeInput = formNewCard.elements['place-name'];
const linkInput = formNewCard.elements.link;

function createCard(card, handleCard) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__image').alt = card.name;
  cardElement.querySelector('.card__title').textContent = card.name;

  cardElement.addEventListener('click', handleCard);
  return cardElement;
}

function handleCard(evt) {
  const elem = evt.target;
  if (elem.classList.contains('card__like-button')) {
    elem.classList.toggle('card__like-button_is-active');
  } else if (elem.classList.contains('card__delete-button')) {
    elem.closest('.card').remove();
  } else if (elem.classList.contains('card__image')) {
    createPopupImage(elem);
    handleShowPopup(popupImage);
  }
}

function createPopupImage(card) {
  popupImage.querySelector('.popup__image').src = card.src;
  popupImage.querySelector('.popup__image').alt = card.alt;
  popupImage.querySelector('.popup__caption').textContent = card.alt;

  return popupImage;
}

function renderCard(card) {
  cardContainer.prepend(createCard(card, handleCard));
}

initialCards.forEach((cards) => {
  renderCard(cards);
});

// -----------------------------------------------------------------

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

function handleShowPopup(popup) {
  if (popup.classList.contains('popup_type_edit')) {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
  }
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

editProfileButton.addEventListener('click', () => {
  handleShowPopup(popupProfileEdit);
});

addCardButton.addEventListener('click', () => {
  handleShowPopup(popupNewCard);
});

closePopupButtonList.forEach((closeButton) => {
  closeButton.addEventListener('click', function (evt) {
    const popup = evt.target.closest('.popup');
    handleClosePopup(popup);
  });
});


formEditProfile.addEventListener('submit', handleFormSubmit);
formNewCard.addEventListener('submit', handleFormSubmit);
document.addEventListener('keydown', keyHandler);
document.addEventListener('mousedown', mouseHandler);
