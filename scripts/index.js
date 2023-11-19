// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
const cardTemplate = document.querySelector('#card-template').content;
const content = document.querySelector('.content');
const cardContainer = content.querySelector('.places__list');
const addCardButton = content.querySelector('.profile__add-button');
const popupNewCard = document.querySelector('.popup_type_new-card');
const closePopupButton = document.querySelectorAll('.popup__close');
const popupProfileEdit = document.querySelector('.popup_type_edit');
const editProfileButton = content.querySelector('.profile__edit-button');
// const createCardButton = document.querySelector('.popup__button');

function cardRender() {
  initialCards.forEach((card) => {
    const cardElement = cardTemplate.cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');

    cardElement.querySelector('.card__image').src = card.link;
    cardElement.querySelector('.card__image').alt = card.name;
    cardElement.querySelector('.card__title').textContent = card.name;

    deleteButton.addEventListener('click', deleteCard);
    likeButton.addEventListener('click', likeCard);

    cardContainer.append(cardElement);
  });
}

function deleteCard(evt) {
  const cardItem = evt.target.closest('.card');
  cardItem.remove();
}

function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

function closePopup(evt) {
  evt.target.closest('.popup').classList.toggle('popup_is-opened');
}

function showPopup(popup) {
  popup.classList.toggle('popup_is-opened');
}

addCardButton.addEventListener('click', () => {
  showPopup(popupNewCard);
});

editProfileButton.addEventListener('click', () => {
  showPopup(popupProfileEdit);
});

closePopupButton.forEach((button) => {
  button.addEventListener('click', closePopup);
});

cardRender();
