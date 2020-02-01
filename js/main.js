'use strict';

var offerType = ['palace', 'flat', 'house', 'bungalo'];
var offerCheckin = ['12:00', '13:00', '14:00'];
var offerCheckout = ['12:00', '13:00', '14:00'];
var offerFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var numberOfOffers = 8;

var map = document.querySelector('.map');
var mapPins = map.querySelector('.map__pins');
var pinButtonTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

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
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

// Функция получения случайного целого числа из диапазона, включительно
var getRandomIntInclusive = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
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
      type: offerType[getRandomInt(0, offerType.length)],
      rooms: getRandomIntInclusive(1, 4),
      guests: getRandomIntInclusive(1, 4),
      checkin: offerCheckin[getRandomInt(0, offerCheckin.length)],
      checkout: offerCheckout[getRandomInt(0, offerCheckout.length)],
      features: getArrayNoRepeatFrom(offerFeatures),
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
  // __Как их получить?
  var widthPin = 50;
  var heightPin = 70;

  pinElement.style.left = ad.location.x - widthPin / 2 + 'px';
  pinElement.style.top = ad.location.y - heightPin + 'px';
  pinElement.querySelector('img').src = ad.author.avatar;
  pinElement.querySelector('img').alt = ad.offer.title;

  return pinElement;
};

// Функция заплнения блока элементами - указатель
var initPins = function () {
  map.classList.remove('map--faded');

  var adverts = getAdList(numberOfOffers);

  var fragment = document.createDocumentFragment();
  for (var i = 0; i < adverts.length; i++) {
    fragment.appendChild(renderPin(adverts[i]));
  }
  mapPins.appendChild(fragment);
};

initPins();
