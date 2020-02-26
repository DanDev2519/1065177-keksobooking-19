'use strict';

(function () {
  var OFFER_TYPE = ['palace', 'flat', 'house', 'bungalo'];
  var OFFER_CHECKIN = ['12:00', '13:00', '14:00'];
  var OFFER_CHECKOUT = ['12:00', '13:00', '14:00'];
  var OFFER_FEATURE = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  var map = document.querySelector('.map');

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
        avatar: 'img/avatars/user' + window.utils.getLeadingZeros(i + 1, 2) + '.png'
      };
      ad.location = {
        x: window.utils.getRandomIntInclusive(0, map.clientWidth),
        y: window.utils.getRandomIntInclusive(130, 630)
      };
      ad.offer = {
        title: 'Заголовок предложения №' + window.utils.getLeadingZeros(window.utils.getRandomIntInclusive(1, 500), 4),
        address: ad.location.x + ', ' + ad.location.y,
        price: window.utils.getRandomIntInclusive(500, 10000),
        type: OFFER_TYPE[window.utils.getRandomInt(0, OFFER_TYPE.length)],
        rooms: window.utils.getRandomIntInclusive(1, 4),
        guests: window.utils.getRandomIntInclusive(1, 4),
        checkin: OFFER_CHECKIN[window.utils.getRandomInt(0, OFFER_CHECKIN.length)],
        checkout: OFFER_CHECKOUT[window.utils.getRandomInt(0, OFFER_CHECKOUT.length)],
        features: window.utils.getArrayNoRepeatFrom(OFFER_FEATURE),
        description: 'Описание предложения',
        photos: getUrlOfferPhotos(window.utils.getRandomIntInclusive(1, 5))
      };
      ads.push(ad);
    }
    return ads;
  };

  window.data = {
    // window.data.
    getAdList: getAdList
  };
})();
