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
  const deteleButton = cardItem.querySelector('.card__delete-button');

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;

  likeButton.addEventListener('click', handleLikeCard);
  deteleButton.addEventListener('click', handleDeleteCard);
  cardImage.addEventListener('click', handleClickImage);

  return cardItem;
}

function renderCard(card, handleClickImage) {
  cardContainer.prepend(
    createCard(card, handleLikeCard, handleDeleteCard, handleClickImage)
  );
}

function handleDeleteCard(evt) {
  evt.target.closest('.card').remove();
}

function handleLikeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

export { renderCard };
