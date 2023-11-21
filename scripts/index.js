function createCard(card, handleDeleteCard) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');

  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__image').alt = card.name;
  cardElement.querySelector('.card__title').textContent = card.name;

  deleteButton.addEventListener('click', handleDeleteCard);
  return cardElement;
}

function handleDeleteCard(evt) {
  const cardItem = evt.target.closest('.card');
  cardItem.remove();
}

function renderCard(card) {
  const cardContainer = document.querySelector('.places__list');

  cardContainer.prepend(createCard(card, handleDeleteCard));
}

initialCards.forEach((cards) => {
  renderCard(cards);
});
