'use strict';

var OFFER_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var OFFER_TYPE_MAP = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};
var OFFER_CHECKIN = ['12:00', '13:00', '14:00'];
var OFFER_CHECKOUT = ['12:00', '13:00', '14:00'];
var OFFER_FEATURE = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var NUMBER_OF_OFFERS = 8;
var WIDTH_PIN = 50;
var HEIGHT_PIN = 70;

var map = document.querySelector('.map');
var mapPins = map.querySelector('.map__pins');
var pinButtonTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');
var cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.map__card');

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
  // return Math.ceil(Math.random() * (max - min) + min);
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
// Функция создания DOM элемента - карточка объявления
var renderCardOfAd = function (ad) {
  var card = cardTemplate.cloneNode(true);
  // __все доступные удобства в объявлении
  var renderCardFeatures = function () {
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
  // __все фотографии из объявлений
  var renderCardPhotos = function () {
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
  card.querySelector('.popup__title').textContent = ad.offer.title;
  card.querySelector('.popup__text--address').textContent = ad.offer.address;
  card.querySelector('.popup__text--price').textContent = ad.offer.price;
  card.querySelector('.popup__text--price').insertAdjacentHTML('beforeEnd', '&#x20bd;<span>/ночь</span>');
  card.querySelector('.popup__type').textContent = OFFER_TYPE_MAP[ad.offer.type];
  card.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
  card.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
  renderCardFeatures();
  card.querySelector('.popup__description').textContent = ad.offer.description;
  renderCardPhotos();
  card.querySelector('.popup__avatar').src = ad.author.avatar;
  return card;
};
// Функция заплнения блока элементами - указатель
var drewPins = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < adverts.length; i++) {
    fragment.appendChild(renderPin(adverts[i]));
  }
  fragment.appendChild(renderCardOfAd(adverts[0]));
  mapPins.appendChild(fragment);
};
// Функция заплнения блока элементами - указатель
var drewCardOfAd = function () {
  var fragment = document.createDocumentFragment();
  fragment.appendChild(renderCardOfAd(adverts[0]));
  mapPins.appendChild(fragment);
};

var adverts = getAdList(NUMBER_OF_OFFERS);
map.classList.remove('map--faded');
drewPins();
drewCardOfAd();
