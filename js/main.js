'use strict';

const AVATAR_ADDRESS = `img/avatars/user`;
const TITLES = [`Пять звёзд`, `Пентхаус`, `Роял-Сити`, `Парадайз`, `Вилла у моря`, `У тёщи`, `Видели ночь!`, `Релакс-Дрим`];
const TYPES = [`palace`, `flat`, `house`, `bungalow`];
const CHECKIN_OR_CHEKOUT = [`12:00`, `13:00`, `14:00`];
const FEATURES_ARRAY = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const PHOTOS_LINKS_ARRAY = [
  `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
];

const map = document.querySelector(`.map`);
map.classList.remove(`map--faded`);

const mapElement = document.querySelector(`.map__pins`);

const cardTemplate = document.querySelector(`#card`)
  .content
  .querySelector(`.map__card`);

const getRandomIntegerInRange = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getNewArray = (array, arrayLength) => {
  const newArray = [];
  for (let i = 0; i < arrayLength; i++) {
    newArray.push(array[getRandomIntegerInRange(0, array.length - 1)]);
  }
  return newArray;
};

const getRandomObjectsArray = function (arrLength) {
  const objectsArray = [];
  for (let i = 0; i < arrLength; i++) {
    const someObject = {
      author: {
        avatar: AVATAR_ADDRESS + `0` + (i + 1)
      },
      offer: {
        title: TITLES[i],
        address: ``,
        price: getRandomIntegerInRange(500, 5000),
        type: TYPES[getRandomIntegerInRange(0, 3)],
        rooms: getRandomIntegerInRange(1, 5),
        guests: getRandomIntegerInRange(1, 8),
        checkin: CHECKIN_OR_CHEKOUT[getRandomIntegerInRange(0, 2)],
        checkout: CHECKIN_OR_CHEKOUT[getRandomIntegerInRange(0, 2)],
        features: `${getNewArray(FEATURES_ARRAY, getRandomIntegerInRange(1, FEATURES_ARRAY.length))}`,
        description: `Описание объекта: "${TITLES[i]}"`,
        photos: `${getNewArray(PHOTOS_LINKS_ARRAY, getRandomIntegerInRange(1, 5))}`
      },
      location: {
        x: getRandomIntegerInRange(130, 750),
        y: getRandomIntegerInRange(130, 630)
      },
    };
    someObject[`offer`][`address`] = `${someObject.location.x}, ${someObject.location.y}`;
    objectsArray.push(someObject);
  }
  return objectsArray;
};

const cardObjectsArray = getRandomObjectsArray(8);

const renderCard = function (object) {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector(`.popup__avatar`).textContent = object.author.avatar;
  cardElement.querySelector(`.popup__title`).textContent = object.offer.title;
  cardElement.querySelector(`.popup__text--address`).textContent = object.offer.address;
  cardElement.querySelector(`.popup__text--price`).textContent = `${object.offer.price} $/ночь`;
  cardElement.querySelector(`.popup__type`).textContent = object.offer.type;
  cardElement.querySelector(`.popup__text--capacity`).textContent = `${object.offer.rooms} комнаты для ${object.offer.guests} гостей`;
  cardElement.querySelector(`.popup__text--time`).textContent = `Заезд после ${object.offer.checkin}, выезд до ${object.offer.checkout}`;
  cardElement.querySelector(`.popup__features`).textContent = object.offer.features;
  cardElement.querySelector(`.popup__description`).textContent = object.offer.description;
  cardElement.querySelector(`.popup__photos`).src = `http://o0.github.io/assets/images/tokyo/hotel1.jpg`;
  return cardElement;
};

const fillSimilarCard = function (cardsArray) {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < cardsArray.length; i++) {
    fragment.appendChild(renderCard(cardsArray[i]));
  }
  mapElement.appendChild(fragment);
};
fillSimilarCard(cardObjectsArray);
