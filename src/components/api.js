const profileId = '4d4af040351ef3fedcc56ba9';

// авторизация
const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-4',
  headers: {
    authorization: '2f4cbd38-3be1-44cb-bef2-5713f6020638',
    'Content-Type': 'application/json',
  },
};

// получение данных пользователя
const getUserInfo = fetch(`${config.baseUrl}/users/me`, {
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
const setUserInfo = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name,
      about,
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

const addNewCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards `, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name,
      link,
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

const toggleLike = (cardId, method) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method,
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(
      `Ошибка при обработке лайка карточки. Ошибка ${res.status}`
    );
  });
};

const setUserAvatar = (avatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка при смене аватара. Ошибка ${res.status}`);
  });
};

export {
  profileId,
  setUserInfo,
  getInitialData,
  addNewCard,
  deleteCard,
  toggleLike,
  setUserAvatar,
};
