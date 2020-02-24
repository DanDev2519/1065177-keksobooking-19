'use strict';

var OFFER_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var OFFER_CHECKIN = ['12:00', '13:00', '14:00'];
var OFFER_CHECKOUT = ['12:00', '13:00', '14:00'];
var OFFER_FEATURE = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var NUMBER_OF_OFFERS = 8;
var WIDTH_PIN = 50;
var HEIGHT_PIN = 70;
var WIDTH_MAIN_PIN = 65;
var HEIGHT_MAIN_PIN = 65;
var VERTICAL_OFFSET_MAIN_PIN = 16;


var offerTypeMap = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};
var KeyCode = {
  ESC: 27,
  ENTER: 13
};

var map = document.querySelector('.map');
var mapPins = map.querySelector('.map__pins');
var pinButtonTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');
var cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.map__card');
var adForm = document.querySelector('.ad-form');
var mapFilters = document.querySelector('.map__filters');
var userMainPin = map.querySelector('.map__pin--main');
var userAddressInput = adForm.querySelector('#address');
var userRoomNumberSelect = adForm.querySelector('#room_number');
var userСapacitySelect = adForm.querySelector('#capacity');

// Функция создания строки из числа с ведущими нулями
var getLeadingZeros = function (num, size) {
  var s = num.toString();
  while (s.length < size) {
    s = '0' + s;
  }
  return s;
};
// Функция получения случайного целого числа из диапазона, не сключая max
var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};
// Функция получения случайного целого числа из диапазона, включительно
var getRandomIntInclusive = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
// Функция генерации массива случайной длины из другого массива с вариантам без повтора
var getArrayNoRepeatFrom = function (arrayIn) {
  var arrayOut = [];
  var length = getRandomIntInclusive(0, arrayIn.length);
  for (var i = 0; i < length; i++) {
    var arrayEl = arrayIn[getRandomInt(0, arrayIn.length)];
    while (arrayOut.indexOf(arrayEl) !== -1) {
      arrayEl = arrayIn[getRandomInt(0, arrayIn.length)];
    }
    arrayOut.push(arrayEl);
  }
  return arrayOut;
};
// Функция генерации массива строк с адресами фотографий для заказа
var getUrlOfferPhotos = function (quantity) {
  var urls = [];
  for (var i = 1; i <= quantity; i++) {
    urls.push('http://o0.github.io/assets/images/tokyo/hotel' + i + '.jpg');
  }
  return urls;
};
// функция для создания массива из N сгенерированных JS объектов - объявлений
var getAdList = function (quantity) {
  var ads = [];
  for (var i = 0; i < quantity; i++) {
    var ad = {};
    ad.author = {
      avatar: 'img/avatars/user' + getLeadingZeros(i + 1, 2) + '.png'
    };
    ad.location = {
      x: getRandomIntInclusive(0, map.clientWidth),
      y: getRandomIntInclusive(130, 630)
    };
    ad.offer = {
      title: 'Заголовок предложения №' + getLeadingZeros(getRandomIntInclusive(1, 500), 4),
      address: ad.location.x + ', ' + ad.location.y,
      price: getRandomIntInclusive(500, 10000),
      type: OFFER_TYPE[getRandomInt(0, OFFER_TYPE.length)],
      rooms: getRandomIntInclusive(1, 4),
      guests: getRandomIntInclusive(1, 4),
      checkin: OFFER_CHECKIN[getRandomInt(0, OFFER_CHECKIN.length)],
      checkout: OFFER_CHECKOUT[getRandomInt(0, OFFER_CHECKOUT.length)],
      features: getArrayNoRepeatFrom(OFFER_FEATURE),
      description: 'Описание предложения',
      photos: getUrlOfferPhotos(getRandomIntInclusive(1, 5))
    };
    ads.push(ad);
  }
  return ads;
};
// Функция создания DOM элемента - указаьель
var renderPin = function (ad) {
  var pinElement = pinButtonTemplate.cloneNode(true);
  pinElement.style.left = ad.location.x - WIDTH_PIN / 2 + 'px';
  pinElement.style.top = ad.location.y - HEIGHT_PIN + 'px';
  pinElement.querySelector('img').src = ad.author.avatar;
  pinElement.querySelector('img').alt = ad.offer.title;
  return pinElement;
};
// Функция изменения карточки с объявлением согласно удобвствам в объявлении
var renderCardFeatures = function (card, ad) {
  var popupFeatures = card.querySelector('.popup__features');
  var featureElement = popupFeatures.children;
  for (var i = 0; i < featureElement.length; i++) {
    var сlassesСompare = featureElement[i].getAttribute('class');
    var flag = 0;
    for (var j = 0; j < ad.offer.features.length; j++) {
      var feature = ad.offer.features[j];
      if (сlassesСompare.indexOf(feature) !== -1) {
        flag += 1;
      }
    }
    if (flag === 0) {
      popupFeatures.removeChild(featureElement[i]);
    }
  }
};
// Функция создания фото у карточки обявления и изменения его src
var renderCardPhotos = function (card, ad) {
  var popupPhotos = card.querySelector('.popup__photos');
  var photo = popupPhotos.children;
  photo[0].src = ad.offer.photos[0];
  if (ad.offer.photos.length > 1) {
    for (var i = 1; i < ad.offer.photos.length; i++) {
      popupPhotos.appendChild(photo[0].cloneNode(true));
      photo[i].src = ad.offer.photos[i];
    }
  }
};
// Функция создания DOM элемента - карточка объявления
var renderCardOfAd = function (ad) {
  var card = cardTemplate.cloneNode(true);
  card.querySelector('.popup__title').textContent = ad.offer.title;
  card.querySelector('.popup__text--address').textContent = ad.offer.address;
  card.querySelector('.popup__text--price').textContent = ad.offer.price;
  card.querySelector('.popup__text--price').insertAdjacentHTML('beforeEnd', '&#x20bd;<span>/ночь</span>');
  card.querySelector('.popup__type').textContent = offerTypeMap[ad.offer.type];
  card.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
  card.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
  renderCardFeatures(card, ad);
  card.querySelector('.popup__description').textContent = ad.offer.description;
  renderCardPhotos(card, ad);
  card.querySelector('.popup__avatar').src = ad.author.avatar;
  return card;
};
// Функция заплнения блока элементами - указатель
var drewPins = function (adverts) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < adverts.length; i++) {
    fragment.appendChild(renderPin(adverts[i]));
  }
  mapPins.appendChild(fragment);
};
// Функция заплнения блока элементами - карточка объявления
var drewCardOfAd = function (adverts) {
  mapPins.appendChild(renderCardOfAd(adverts[0]));
};
// Функция добавления атрибута disabled дочерним элементам
var setAttributeDisabledChildren = function (parent) {
  for (var i = 0; i < parent.children.length; i++) {
    parent.children[i].setAttribute('disabled', 'disabled');
  }
};
// Функция удаления атрибута disabled дочерним элементам
var removeAttributeDisabledChildren = function (parent) {
  for (var i = 0; i < parent.children.length; i++) {
    parent.children[i].removeAttribute('disabled', 'disabled');
  }
};
// Функция заания адреса по отпусканию мыши с main pin
var onMainPinMouseUp = function (evt) {
  var userMainPinX = Math.round(evt.pageX - mapPins.getBoundingClientRect().left);
  var userMainPinY = Math.round(evt.pageY + mapPins.getBoundingClientRect().top + window.scrollY);
  userAddressInput.value = userMainPinX + ', ' + userMainPinY;
};
// Функция активации страницы
var activation = function () {
  var adverts = getAdList(NUMBER_OF_OFFERS);
  map.classList.remove('map--faded');
  drewPins(adverts);
  drewCardOfAd(adverts);
  removeAttributeDisabledChildren(adForm);
  removeAttributeDisabledChildren(mapFilters);
  userMainPin.removeEventListener('mousedown', onMainPinMousePressInit);
  userMainPin.removeEventListener('keydown', onMainPinEnterPressInit);
};
// Функция инициализации
var init = function () {
  setAttributeDisabledChildren(adForm);
  setAttributeDisabledChildren(mapFilters);
  var userMainPinX = Math.round(parseInt(userMainPin.style.left.slice(0, -2), 10) + WIDTH_MAIN_PIN / 2);
  var userMainPinY = Math.round(parseInt(userMainPin.style.top.slice(0, -2), 10) + HEIGHT_MAIN_PIN / 2);
  userAddressInput.value = userMainPinX + ', ' + userMainPinY;
};
// Функция события нажатия ЛКМ по mainPin при инициализации
var onMainPinMousePressInit = function (evt) {
  if (evt.button === 0) {
    activation();
  }
};
// Функция события нажатия Enter по mainPin при инициализации
var onMainPinEnterPressInit = function (evt) {
  if (evt.keyCode === KeyCode.ENTER) {
    activation();
    var userMainPinX = Math.round(parseInt(userMainPin.style.left.slice(0, -2), 10) + WIDTH_MAIN_PIN / 2);
    var userMainPinY = Math.round(parseInt(userMainPin.style.top.slice(0, -2), 10) + HEIGHT_MAIN_PIN + VERTICAL_OFFSET_MAIN_PIN);
    userAddressInput.value = userMainPinX + ', ' + userMainPinY;
  }
};

userMainPin.addEventListener('mousedown', onMainPinMousePressInit);

userMainPin.addEventListener('keydown', onMainPinEnterPressInit);

userMainPin.addEventListener('mouseup', onMainPinMouseUp);

var adFormSubmitBtn = adForm.querySelector('.ad-form__submit');

adForm.addEventListener('submit', function (evt) {
  var condition1 = userСapacitySelect.value === '1' && userRoomNumberSelect.value === '1';
  var condition2 = (userСapacitySelect.value === '1' || userСapacitySelect.value === '2') && userRoomNumberSelect.value === '2';
  var condition3 = (userСapacitySelect.value === '1' || userСapacitySelect.value === '2' || userСapacitySelect.value === '3') && userRoomNumberSelect.value === '3';
  var condition4 = userСapacitySelect.value === '0' && userRoomNumberSelect.value === '100';

  if (!condition1 || !condition2 || !condition3 || !condition4) {
    adFormSubmitBtn.setCustomValidity('Количество комнат не соответствует количеству гостей');
    evt.preventDefault();
  } else {
    adFormSubmitBtn.setCustomValidity('');
  }
});

// __при пеализации непростой валидации метод setCustomValidity не срабатывает - не понял почему
// __alert работает - это для проверки кода
// userRoomNumberSelect.addEventListener('input', function (evt) {
//   var target = evt.target;
//   var room = userRoomNumberSelect.value;
//   var guest = userСapacitySelect.value;
//   if (guest === '1') {
//     if (target.value === '1' || target.value === '2' || target.value === '3') {
//       target.setCustomValidity('');
//     } else {
//       target.setCustomValidity('Для выбранного количества мест доступно только колическво комнат 1, 2 или 3');
//       alert('Для выбранного количества мест доступно только колическво комнат 1, 2 или 3');
//     }
//   } else if (guest === '2') {
//     if (target.value === '2' || target.value === '3') {
//       target.setCustomValidity('');
//     } else {
//       target.setCustomValidity('Для выбранного количества мест доступно только колическво комнат 2 или 3');
//       alert('Для выбранного количества мест доступно только колическво комнат 2 или 3');
//     }
//   } else if (guest === '3') {
//     if (target.value === '3') {
//       target.setCustomValidity('');
//     } else {
//       target.setCustomValidity('Для выбранного количества мест доступно только колическво комнат  3');
//       alert('Для выбранного количества мест доступно только колическво комнат 3');
//     }
//   } else if (guest === '0') {
//     if (target.value === '100') {
//       target.setCustomValidity('');
//     } else {
//       target.setCustomValidity('Для выбранного количества мест доступно только колическво комнат 100');
//       alert('Для выбранного количества мест доступно только колическво комнат 100');
//     }
//   }
// });

// userСapacitySelect.addEventListener('input', function (evt) {
//   var target = evt.target;
//   var room = userRoomNumberSelect.value;
//   if (room === '1') {
//     if (target.value !== '1') {
//       target.setCustomValidity('Для выбранного количества комнат доступно только колическво мест 1');
//       alert('Для выбранного количества комнат доступно только колическво мест 1');
//     } else {
//       target.setCustomValidity('');
//     }
//   } else if (room === '2') {
//     if (target.value !== '1' && target.value !== '2') {
//       target.setCustomValidity('Для выбранного количества комнат доступно только колическво мест 1 или 2');
//       alert('Для выбранного количества комнат доступно только колическво мест 1 или 2');
//     } else {
//       target.setCustomValidity('');
//     }
//   } else if (room === '3') {
//     if (target.value !== '1' && target.value !== '2' && target.value !== '3') {
//       target.setCustomValidity('Для выбранного количества комнат доступно только колическво мест 1, 2 или 3');
//       alert('Для выбранного количества комнат доступно только колическво мест 1, 2 или 3');
//     } else {
//       target.setCustomValidity('');
//     }
//   } else if (room === '100') {
//     if (target.value !== '0') {
//       target.setCustomValidity('Для выбранного количества комнат доступно только \'не для гостей\'');
//       alert('Для выбранного количества комнат доступно только \'не для гостей\'');
//     } else {
//       target.setCustomValidity('');
//     }
//   }
// });

init();
