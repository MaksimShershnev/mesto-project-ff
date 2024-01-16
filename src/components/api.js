const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-4',
  headers: {
    authorization: '2f4cbd38-3be1-44cb-bef2-5713f6020638',
    'Content-Type': 'application/json',
  },
};

const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(
    `Ошибка при получении данных с сервера. Ошибка ${res.status}`
  );
};

const getUserInfo = fetch(`${config.baseUrl}/users/me`, {
  headers: config.headers,
}).then(handleResponse);

const getInitialCards = fetch(`${config.baseUrl}/cards`, {
  headers: config.headers,
}).then(handleResponse);

const getInitialData = () => {
  const loadCardsSuccess = [getUserInfo, getInitialCards];
  return Promise.all(loadCardsSuccess);
};

const setUserInfo = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name,
      about,
    }),
  }).then(handleResponse);
};

const addNewCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards `, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name,
      link,
    }),
  }).then(handleResponse);
};

const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  }).then(handleResponse);
};

const toggleLike = (cardId, method) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method,
    headers: config.headers,
  }).then(handleResponse);
};

const setUserAvatar = (avatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar,
    }),
  }).then(handleResponse);
};

const isLinkImage = (url) => {
  return fetch(`${url}`, {
    method: 'HEAD',
  }).then((res) => {
    if (res.ok) {
      return res.headers.get('Content-Type').startsWith('image');
    }
    return Promise.reject(
      `Ссылка на изображение недействительна. Ошибка ${res.status}`
    );
  });
};

export {
  setUserInfo,
  getInitialData,
  addNewCard,
  deleteCard,
  toggleLike,
  setUserAvatar,
  isLinkImage,
};
