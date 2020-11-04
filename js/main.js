'use strict';

const AVATAR_ADDRESS = `img/avatars/user`;
const TITLES = [`Пять звёзд`, `Пентхаус`, `Роял-Сити`, `Парадайз`, `Вилла у моря`, `У тёщи`, `Видели ночь!`, `Релакс-Дрим`];
const TYPES = [`palace`, `flat`, `house`, `bungalow`];
const CHECKIN_OR_CHEKOUT = [`12:00`, `13:00`, `14:00`];
const FEATURES_ARRAY = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const POPUP_PHOTOS_ARRAY = [
  `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
];

const pinSize = {
  X: 50,
  Y: 70,
};

const map = document.querySelector(`.map`);
const adForm = document.querySelector(`.ad-form`);
const adFormFields = adForm.querySelectorAll(`fieldset`);
const mapFilters = document.querySelector(`.map__filters`);
mapFilters.setAttribute(`disabled`, `disabled`);
const mapPinMain = document.querySelector(`.map__pin--main`);
const mapElement = document.querySelector(`.map__pins`);
const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const pinMainInput = document.querySelector(`#address`);
// const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
const guestCapacity = document.querySelector(`#capacity`);
const roomNumber = document.querySelector(`#room_number`);

const getRandomIntegerInRange = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getNewArray = (array, arrayLength) => {
  const newArray = [];
  for (let i = 0; i < arrayLength; i++) {
    newArray.push(array[i]);
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
        features: getNewArray(FEATURES_ARRAY, getRandomIntegerInRange(1, FEATURES_ARRAY.length)),
        description: `Описание объекта: "${TITLES[i]}"`,
        photos: getNewArray(POPUP_PHOTOS_ARRAY, getRandomIntegerInRange(1, POPUP_PHOTOS_ARRAY.length))
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
  pin.querySelector(`img`).src = object.author.avatar;
  pin.querySelector(`img`).alt = object.offer.title;

  return pin;
};

const fillMapElement = function (objectsArray) {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < objectsArray.length; i++) {
    fragment.appendChild(renderPin(objectsArray[i]));
  }
  mapElement.appendChild(fragment);
};

// const renderCard = function (object) {
//   const cardElement = cardTemplate.cloneNode(true);
//   const imgContainer = cardElement.querySelector(`.popup__photos`);
//   cardElement.querySelector(`.popup__avatar`).src = object.author.avatar;
//   cardElement.querySelector(`.popup__title`).textContent = object.offer.title;
//   cardElement.querySelector(`.popup__text--address`).textContent = object.offer.address;
//   cardElement.querySelector(`.popup__text--price`).textContent = `${object.offer.price} ₽/ночь`;
//   switch (object.offer.type) {
//     case `palace`:
//       cardElement.querySelector(`.popup__type`).textContent = `Дворец`;
//       break;
//     case `flat`:
//       cardElement.querySelector(`.popup__type`).textContent = `Квартира`;
//       break;
//     case `house`:
//       cardElement.querySelector(`.popup__type`).textContent = `Дом`;
//       break;
//     case `bungalow`:
//       cardElement.querySelector(`.popup__type`).textContent = `Бунгало`;
//   }
//   cardElement.querySelector(`.popup__text--capacity`).textContent = `${object.offer.rooms} комнаты для ${object.offer.guests} гостей`;
//   cardElement.querySelector(`.popup__text--time`).textContent = `Заезд после ${object.offer.checkin}, выезд до ${object.offer.checkout}`;
//   cardElement.querySelectorAll(`.popup__feature`).forEach((n) => {
//     n.className = ``;
//     return n;
//   });
//   for (let i = 0; i < object.offer.features.length; i++) {
//     cardElement.querySelector(`.popup__features`).children[i].className = `popup__feature popup__feature--${object.offer.features[i]}`;
//   }
//   cardElement.querySelector(`.popup__description`).textContent = object.offer.description;

//   for (let i = 0; i < object.offer.photos.length; i++) {
//     const imgElement = cardElement.querySelector(`.popup__photo`).cloneNode();
//     imgContainer.appendChild(imgElement).src = object.offer.photos[i];
//   }
//   imgContainer.removeChild(imgContainer.children[0]);

//   return cardElement;
// };

// map.insertBefore(renderCard(cardObjectsArray[0]), document.querySelector(`.map__filters-container`));
for (let fields of adFormFields) {
  fields.setAttribute(`disabled`, `disabled`);
}
const enableMap = function () {
  map.classList.remove(`map--faded`);
  adForm.classList.remove(`ad-form--disabled`);
  for (let fields of adFormFields) {
    fields.removeAttribute(`disabled`, `disabled`);
  }
  mapFilters.removeAttribute(`disabled`, `disabled`);
  fillMapElement(cardObjectsArray);
};
const fillMainPinInput = function () {
  const mapPinMainLeft = mapPinMain.style.left.replace(/px/gi, ``);
  const mapPinMainTop = mapPinMain.style.top.replace(/px/gi, ``);
  pinMainInput.value = `${+mapPinMainLeft + pinSize.X}, ${+mapPinMainTop + pinSize.Y}`;
};

mapPinMain.addEventListener(`mousedown`, function (evt) {
  if (evt.button === 0) {
    enableMap();
    fillMainPinInput();
  }
});
mapPinMain.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Enter`) {
    enableMap();
    fillMainPinInput();
  }
});

const validityCapacity = function () {
  switch (true) {
    case roomNumber.value === `100` && guestCapacity.value !== `0`:
      guestCapacity.setCustomValidity(`Не для гостей`);
      break;
    case roomNumber.value === `1` && guestCapacity.value !== `1`:
      guestCapacity.setCustomValidity(`Максимум 1 гость`);
      break;
    case roomNumber.value === `2` && (guestCapacity.value !== `1` && guestCapacity.value !== `2`):
      guestCapacity.setCustomValidity(`Максимум 2 гостей`);
      break;
    case roomNumber.value === `3` && guestCapacity.value === `0`:
      guestCapacity.setCustomValidity(`Выберите количество гостей`);
      break;
    default:
      guestCapacity.setCustomValidity(``);
  }
  guestCapacity.reportValidity();
};

roomNumber.addEventListener(`change`, function () {
  validityCapacity();
});
guestCapacity.addEventListener(`change`, function () {
  validityCapacity();
});
