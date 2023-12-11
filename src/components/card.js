const cardTemplate = document.querySelector('#card-template').content;
const cardContainer = document.querySelector('.places__list');

function createCard(card, handleCard) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__image').alt = card.name;
  cardElement.querySelector('.card__title').textContent = card.name;

  cardContainer.addEventListener('click', handleCard);
  return cardElement;
}

function renderCard(card) {
  cardContainer.prepend(createCard(card, handleCard));
}

function handleCard(evt) {
  if (evt.target.classList.contains('card__like-button')) {
    evt.target.classList.toggle('card__like-button_is-active');
  } else if (evt.target.classList.contains('card__delete-button')) {
    evt.target.closest('.card').remove();
  }
}

export { renderCard, cardContainer };
