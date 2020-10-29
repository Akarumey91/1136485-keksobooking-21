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
const pinSize = {
  X: 50,
  Y: 70,
};

const map = document.querySelector(`.map`);
map.classList.remove(`map--faded`);

const mapElement = document.querySelector(`.map__pins`);
const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

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
        avatar: `${AVATAR_ADDRESS}0${(i + 1)}.png`
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

const renderPin = function (object) {
  const pin = pinTemplate.cloneNode(true);
  pin.style = `left: ${object.location.x - pinSize.X / 2}px; top: ${object.location.y - pinSize.Y}px`;
  pin.children[0].src = object.author.avatar;
  pin.children[0].alt = object.offer.title;

  return pin;
};

const fillMapElement = function (objectsArray) {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < objectsArray.length; i++) {
    fragment.appendChild(renderPin(objectsArray[i]));
  }
  mapElement.appendChild(fragment);
};

fillMapElement(cardObjectsArray);
