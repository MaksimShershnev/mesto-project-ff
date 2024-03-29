import './pages/index.css';

import { renderCard } from './components/card.js';
import {
  handleShowPopup,
  handleClosePopup,
  showPopupError,
} from './components/modal.js';
import { clearValidation, enableValidation } from './components/validation.js';
import {
  setUserInfo,
  getInitialData,
  addNewCard,
  setUserAvatar,
  isLinkImage,
} from './components/api.js';

let profileId;
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const popupProfileEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const popupEditAvatar = document.querySelector('.popup_type_edit-avatar');
const image = popupImage.querySelector('.popup__image');
const imageСaption = popupImage.querySelector('.popup__caption');
const closePopupButtonList = document.querySelectorAll('.popup__close');
const formEditProfile = document.forms['edit-profile'];
const profileAvatar = document.querySelector('.profile__image');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const nameInput = formEditProfile.elements.name;
const jobInput = formEditProfile.elements.description;
const formNewCard = document.forms['new-place'];
const placeInput = formNewCard.elements['place-name'];
const linkInput = formNewCard.elements.link;
const formEditAvatar = document.forms['edit-avatar'];
const avatarLinkInput = formEditAvatar.elements.link;
const editAvatarSubmitButton = formEditAvatar.querySelector('.popup__button');
const editProfileSubmitButton = formEditProfile.querySelector('.popup__button');
const addCardSubmitButton = formNewCard.querySelector('.popup__button');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
};

function renderProfileInfo(userName, userAbout) {
  profileTitle.textContent = userName;
  profileDescription.textContent = userAbout;
}

function renderProfileAvatar(avatar) {
  profileAvatar.style['background-image'] = `url("${avatar}")`;
}

function handleClickImage(evt) {
  image.src = evt.target.src;
  image.alt = evt.target.alt;
  imageСaption.textContent = evt.target.alt;
  handleShowPopup(popupImage);
}

function changeSubmitButtonText(button) {
  switch (button.textContent) {
    case 'Сохранение...':
      setTimeout(() => {
        button.textContent = 'Сохранить';
      }, 500);
      break;
    default:
      button.textContent = 'Сохранение...';
  }
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  changeSubmitButtonText(editProfileSubmitButton);
  setUserInfo(nameInput.value, jobInput.value)
    .then((user) => {
      renderProfileInfo(user.name, user.about);
      handleClosePopup(popupProfileEdit);
      changeSubmitButtonText(editProfileSubmitButton);
    })
    .catch((err) => {
      changeSubmitButtonText(editProfileSubmitButton);
      showPopupError(err);
      console.log(err);
    });
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  changeSubmitButtonText(addCardSubmitButton);
  isLinkImage(linkInput.value)
    .then(() => {
      addNewCard(placeInput.value, linkInput.value)
        .then((cardData) => {
          const position = 'start';
          renderCard(cardData, handleClickImage, profileId, position);
          handleClosePopup(popupNewCard);
          changeSubmitButtonText(addCardSubmitButton);
          formNewCard.reset();
        })
        .catch((err) => {
          changeSubmitButtonText(addCardSubmitButton);
          showPopupError(err);
          console.log(err);
        });
    })
    .catch((err) => {
      changeSubmitButtonText(addCardSubmitButton);
      showPopupError(err);
      console.log(err);
    });
}

function handleEditAvatarFormSubmit(evt) {
  evt.preventDefault();
  changeSubmitButtonText(editAvatarSubmitButton);
  isLinkImage(avatarLinkInput.value)
    .then(() => {
      setUserAvatar(avatarLinkInput.value)
        .then(({ avatar }) => {
          renderProfileAvatar(avatar);
          handleClosePopup(popupEditAvatar);
          changeSubmitButtonText(editAvatarSubmitButton);
          formEditAvatar.reset();
        })
        .catch((err) => {
          changeSubmitButtonText(editAvatarSubmitButton);
          showPopupError(err);
          console.log(err);
        });
    })
    .catch((err) => {
      changeSubmitButtonText(editAvatarSubmitButton);
      showPopupError(err);
      console.log(err);
    });
}

profileAvatar.addEventListener('click', () => {
  formEditAvatar.reset();
  clearValidation(formEditAvatar, validationConfig);
  handleShowPopup(popupEditAvatar);
});

editProfileButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(formEditProfile, validationConfig);
  handleShowPopup(popupProfileEdit);
});

addCardButton.addEventListener('click', () => {
  formNewCard.reset();
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
formEditAvatar.addEventListener('submit', handleEditAvatarFormSubmit);

const InitialCards = (cards) => {
  cards.forEach((card) => {
    renderCard(card, handleClickImage, profileId);
  });
};

getInitialData()
  .then(([profile, cards]) => {
    profileId = profile._id;
    renderProfileInfo(profile.name, profile.about);
    renderProfileAvatar(profile.avatar);
    InitialCards(cards);
  })
  .catch((err) => {
    showPopupError(err);
    console.log(err);
  });

enableValidation(validationConfig);
