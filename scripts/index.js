const cardTemplate = document.querySelector('#card-template').content;
const content = document.querySelector('.content');
const cardContainer = content.querySelector('.places__list');
const editProfileButton = content.querySelector('.profile__edit-button');
const addCardButton = content.querySelector('.profile__add-button');
const closePopupButton = document.querySelectorAll('.popup__close');

function cardRender() {
  initialCards.forEach((card) => {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');

    cardElement.querySelector('.card__image').src = card.link;
    cardElement.querySelector('.card__image').alt = card.name;
    cardElement.querySelector('.card__title').textContent = card.name;

    deleteButton.addEventListener('click', deleteCard);
    likeButton.addEventListener('click', likeCard);

    cardContainer.append(cardElement);
  });
  showPopupCardImage();
}

cardRender();

function showPopupCardImage() {
  const cardImage = content.querySelectorAll('.card__image');
  const popupImage = document.querySelector('.popup_type_image');

  cardImage.forEach((image) => {
    image.addEventListener('click', (evt) => {
      popupImage.querySelector('.popup__image').src = evt.target.src;
      popupImage.querySelector('.popup__image').alt = evt.target.alt;
      popupImage.querySelector('.popup__caption').textContent = evt.target.alt;
      showPopup(popupImage);
    });
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
  const popupItem = evt.target.closest('.popup');
  popupItem.classList.remove('popup_is-opened');
}

function showPopup(popup) {
  popup.classList.add('popup_is-opened');
}

editProfileButton.addEventListener('click', () => {
  const popupProfileEdit = document.querySelector('.popup_type_edit');
  showPopup(popupProfileEdit);
});

addCardButton.addEventListener('click', () => {
  const popupNewCard = document.querySelector('.popup_type_new-card');
  showPopup(popupNewCard);
});

closePopupButton.forEach((closeButton) => {
  closeButton.addEventListener('click', closePopup);
});
