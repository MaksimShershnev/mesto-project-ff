// авторизация
const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-4',
  headers: {
    authorization: '2f4cbd38-3be1-44cb-bef2-5713f6020638',
    'Content-Type': 'application/json',
  },
};

// получение данных пользователя
export const getUserInfo = fetch(`${config.baseUrl}/users/me`, {
  headers: config.headers,
}).then((res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(
    `Ошибка загрузки данных пользователя. Ошибка ${res.status}`
  );
});

// получение данных карточек
const getInitialCards = fetch(`${config.baseUrl}/cards`, {
  headers: config.headers,
}).then((res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка загрузки карточек. Ошибка ${res.status}`);
});

const getInitialData = () => {
  const loadCardsSuccess = [getUserInfo, getInitialCards];
  return Promise.all(loadCardsSuccess);
};

// отправка данных о пользователе на сервер
const setUserInfo = (userName, userAbout) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: userName,
      about: userAbout,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(
      `Ошибка обновления данных профиля на сервере. Ошибка ${res.status}`
    );
  });
};

const addNewCard = (cardName, cardLink) => {
  return fetch(`${config.baseUrl}/cards `, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: cardName,
      link: cardLink,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(
      `Ошибка при добавлении карточки на сервер. Ошибка ${res.status}`
    );
  });
};

const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return 'Успешное удаление';
    }
    return Promise.reject(
      `Ошибка при удалении карточки с сервера. Ошибка ${res.status}`
    );
  });
};

export { setUserInfo, getInitialData, addNewCard, deleteCard };
