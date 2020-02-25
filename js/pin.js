'use strict';

(function () {
  var WIDTH_PIN = 50;
  var HEIGHT_PIN = 70;

  var pinButtonTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

  // Функция создания DOM элемента - указаьель
  var renderPin = function (ad) {
    var pinElement = pinButtonTemplate.cloneNode(true);
    pinElement.style.left = ad.location.x - WIDTH_PIN / 2 + 'px';
    pinElement.style.top = ad.location.y - HEIGHT_PIN + 'px';
    pinElement.querySelector('img').src = ad.author.avatar;
    pinElement.querySelector('img').alt = ad.offer.title;
    return pinElement;
  };

  window.pin = {
    // window.pin.
    renderPin: renderPin
  };
})();
