'use strict';

(function () {
  var NUMBER_OF_OFFERS = 8;

  var map = document.querySelector('.map');
  var mapFilters = document.querySelector('.map__filters');
  var mapPins = map.querySelector('.map__pins');
  var userMainPin = map.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var userAddressInput = adForm.querySelector('#address');

  // Функция заплнения блока элементами - указатель
  var drewPins = function (adverts) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < adverts.length; i++) {
      fragment.appendChild(window.pin.renderPin(adverts[i]));
    }
    mapPins.appendChild(fragment);
  };
  // Функция заплнения блока элементами - карточка объявления
  var drewCardOfAd = function (adverts) {
    mapPins.appendChild(window.card.renderCardOfAd(adverts[0]));
  };
  // Функция активации страницы по нажатию на главный pin на карте
  var activation = function () {
    var adverts = window.data.getAdList(NUMBER_OF_OFFERS);
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    drewPins(adverts);
    drewCardOfAd(adverts);
    window.utils.removeAttributeDisabledChildren(adForm);
    window.utils.removeAttributeDisabledChildren(mapFilters);
    userMainPin.removeEventListener('mousedown', onMainPinMousePressInit);
    userMainPin.removeEventListener('keydown', onMainPinEnterPressInit);
  };

  // Функция события нажатия ЛКМ по mainPin при инициализации
  var onMainPinMousePressInit = function (evt) {
    if (evt.button === 0) {
      activation();
    }
  };
  // Функция события нажатия Enter по mainPin при инициализации
  var onMainPinEnterPressInit = function (evt) {
    window.utils.isEnterEvent(evt, function () {
      activation();
      window.form.setInitUserAdressInput(true);
    });
  };
  // Функция заания адреса по отпусканию мыши с main pin
  var onMainPinMouseUp = function (evt) {
    var userMainPinX = Math.round(evt.pageX - mapPins.getBoundingClientRect().left);
    var userMainPinY = Math.round(evt.pageY + mapPins.getBoundingClientRect().top + window.scrollY);
    userAddressInput.value = userMainPinX + ', ' + userMainPinY;
  };

  userMainPin.addEventListener('mousedown', onMainPinMousePressInit);

  userMainPin.addEventListener('keydown', onMainPinEnterPressInit);

  userMainPin.addEventListener('mouseup', onMainPinMouseUp);

  // window.map = {
  //   // window.map.
  // };
})();
