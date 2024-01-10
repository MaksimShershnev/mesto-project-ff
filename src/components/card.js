import { deleteCard } from './api.js';

const cardTemplate = document.querySelector('#card-template').content;
const cardContainer = document.querySelector('.places__list');

function getCardTemplate() {
  const cloneTemplateCard = cardTemplate.querySelector('.card').cloneNode(true);
  return cloneTemplateCard;
}

function createCard(card, handleLikeCard, handleDeleteCard, handleClickImage) {
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

  if (card.owner._id !== '4d4af040351ef3fedcc56ba9') {
    deteleButton.classList.add('card__delete-button_inactive');
  } else {
    deteleButton.addEventListener('click', (evt) => {
      handleDeleteCard(evt, card._id);
    });
  }

  likeButton.addEventListener('click', handleLikeCard);
  cardImage.addEventListener('click', handleClickImage);

  return cardItem;
}

function renderCard(card, handleClickImage) {
  cardContainer.append(
    createCard(card, handleLikeCard, handleDeleteCard, handleClickImage)
  );
}

function handleDeleteCard(evt, cardId) {
  deleteCard(cardId)
    .then(() => evt.target.closest('.card').remove())
    .catch((err) => console.log(err));
}

function handleLikeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

export { renderCard };
