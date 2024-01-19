import { deleteCard, toggleLike } from './api.js';
import { handleShowPopup, handleClosePopup, showPopupError } from './modal.js';

const cardTemplate = document.querySelector('#card-template').content;
const cardContainer = document.querySelector('.places__list');
const popupConfirmDelete = document.querySelector('.popup_type_сonfirm-delete');
const confirmDeleteCardButton =
  popupConfirmDelete.querySelector('.popup__button');
let idCardToDelete;
let cardToDelete;

function getCardTemplate() {
  const cloneTemplateCard = cardTemplate.querySelector('.card').cloneNode(true);
  return cloneTemplateCard;
}

function createCard(card, handleLikeCard, handleClickImage, profileId) {
  const cardItem = getCardTemplate();
  const cardImage = cardItem.querySelector('.card__image');
  const cardTitle = cardItem.querySelector('.card__title');
  const likeButton = cardItem.querySelector('.card__like-button');
  const countOfLikes = cardItem.querySelector('.card__like-count');
  const deteleButton = cardItem.querySelector('.card__delete-button');

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;
  countOfLikes.textContent = card.likes.length;

  if (isLikedCard(card, profileId)) {
    likeButton.classList.add('card__like-button_is-active');
  }
  if (isOwnerCard(card.owner._id, deteleButton, profileId)) {
    deteleButton.addEventListener('click', (evt) => {
      idCardToDelete = card._id;
      cardToDelete = evt.target.closest('.card');
      handleShowPopup(popupConfirmDelete);
    });
  }

  likeButton.addEventListener('click', (evt) => {
    handleLikeCard(evt, card, countOfLikes, profileId);
  });
  cardImage.addEventListener('click', handleClickImage);

  return cardItem;
}

function handleDeleteCard() {
  deleteCard(idCardToDelete)
    .then(() => {
      cardToDelete.remove();
      handleClosePopup(popupConfirmDelete);
    })
    .catch((err) => {
      showPopupError(err);
      console.log(err);
    });
}

confirmDeleteCardButton.addEventListener('click', handleDeleteCard);

function isLikedCard(card, profileId) {
  const likedCard = card.likes.some((like) => {
    return like._id === profileId;
  });
  return likedCard;
}

function isOwnerCard(cardOwnerId, button, profileId) {
  if (cardOwnerId === profileId) {
    button.classList.add('card__delete-button_active');
    return true;
  }
}

function handleLikeCard(evt, card, countOfLikes, profileId) {
  switch (isLikedCard(card, profileId)) {
    case true:
      toggleLike(card._id, 'DELETE')
        .then(({ likes }) => {
          evt.target.classList.remove('card__like-button_is-active');
          card.likes = likes;
          countOfLikes.textContent = likes.length;
        })
        .catch((err) => console.log(err));
      break;
    case false:
      toggleLike(card._id, 'PUT')
        .then(({ likes }) => {
          evt.target.classList.add('card__like-button_is-active');
          card.likes = likes;
          countOfLikes.textContent = likes.length;
        })
        .catch((err) => {
          showPopupError(err);
          console.log(err);
        });
      break;
  }
}

function renderCard(card, handleClickImage, profileId, position) {
  const newCard = createCard(card, handleLikeCard, handleClickImage, profileId);
  switch (position) {
    case 'start':
      cardContainer.prepend(newCard);
      break;
    default:
      cardContainer.append(newCard);
  }
}

export { renderCard };
