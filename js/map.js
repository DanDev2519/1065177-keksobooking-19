'use strict';

(function () {
  var VERTICAL_OFFSET_MAIN_PIN = 16;

  var map = document.querySelector('.map');
  var mapFilters = document.querySelector('.map__filters');
  var mapPins = map.querySelector('.map__pins');
  var userMainPin = map.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');

  // Функция показывающая подробную информацию объявления по нажатию
  var showCard = function (pin, advert) {
    pin.addEventListener('click', function (evt) {
      evt.preventDefault();
      drewCardOfAd(advert);
    });
  };
  // Функция заполнения блока элементами - указатель
  var drewPins = function (adverts) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < adverts.length; i++) {
      var pin = window.pin.render(adverts[i]);
      showCard(pin, adverts[i]);
      fragment.appendChild(pin);
    }
    mapPins.appendChild(fragment);
  };
  // Функция заплнения блока элементами - карточка объявления
  var drewCardOfAd = function (advert) {
    if (!mapPins.querySelector('.map__card')) {
      mapPins.appendChild(window.card.renderOfAd(advert));
    }
  };
  // Функция активации страницы по нажатию на главный pin на карте
  var activation = function () {
    window.load.getData(onSuccessLoad, onErrorLoad);

    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    window.utils.removeAttributeDisabledChildren(adForm);
    window.utils.removeAttributeDisabledChildren(mapFilters);
    userMainPin.removeEventListener('mousedown', onMainPinMousePressInit);
    userMainPin.removeEventListener('keydown', onMainPinEnterPressInit);
    userMainPin.addEventListener('mousedown', onMainPinMousDown);
  };

  // Функция события нажатия ЛКМ по mainPin при инициализации
  var onMainPinMousePressInit = function (evt) {
    if (evt.button === 0) {
      evt.preventDefault();
      activation();
      onMainPinMousDown(evt);
    }
  };
  // Функция события нажатия Enter по mainPin при инициализации
  var onMainPinEnterPressInit = function (evt) {
    window.utils.isEnterEvent(evt, function () {
      activation();
      window.form.setInitUserAdressInput(true);
    });
  };
  // Функция перемещения mainPin по нажатию
  var onMainPinMousDown = function (evt) {
    var userMainPinPressX = Math.round(evt.pageX - userMainPin.getBoundingClientRect().left);
    var userMainPinPressY = Math.round(evt.pageY - userMainPin.getBoundingClientRect().top - window.scrollY);

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var mapPinsProperties = mapPins.getBoundingClientRect();
      var userMainPinProperties = userMainPin.getBoundingClientRect();
      var maxX = mapPinsProperties.right - userMainPinProperties.width / 2;
      var minX = mapPinsProperties.left - userMainPinProperties.width / 2;
      var maxY = 630 - (userMainPinProperties.height + VERTICAL_OFFSET_MAIN_PIN);
      var minY = 130 - (userMainPinProperties.height + VERTICAL_OFFSET_MAIN_PIN);

      var shift = {
        x: Math.max(minX, Math.min((moveEvt.pageX - userMainPinPressX), maxX)) - mapPinsProperties.left,
        y: Math.max(minY, Math.min((moveEvt.pageY - userMainPinPressY), maxY)) - mapPinsProperties.top - window.scrollY
      };

      userMainPin.style.top = shift.y + 'px';
      userMainPin.style.left = shift.x + 'px';

      window.form.setInitUserAdressInput(true);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      window.form.setInitUserAdressInput(true);

      document.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };
  // Функции успешной и неуспешной загрузки данных с сервера
  var onSuccessLoad = function (pins) {
    drewPins(pins);
  };
  var onErrorLoad = function (errorMessage) {
    window.popup.error(errorMessage);
  };

  userMainPin.addEventListener('mousedown', onMainPinMousePressInit);

  userMainPin.addEventListener('keydown', onMainPinEnterPressInit);

  window.map = {
    // window.map.
    onSuccessLoad: onSuccessLoad,
    onErrorLoad: onErrorLoad
  };

})();
