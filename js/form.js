'use strict';

(function () {
  var VERTICAL_OFFSET_MAIN_PIN = 16;

  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var userMainPin = map.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var userAddressInput = adForm.querySelector('#address');
  var userRoomNumberSelect = adForm.querySelector('#room_number');
  var userСapacitySelect = adForm.querySelector('#capacity');
  var userTypeRoomSelect = adForm.querySelector('#type');
  var userPriseNight = adForm.querySelector('#price');
  var adFormSubmitBtn = adForm.querySelector('.ad-form__submit');
  var userSelectTimeIn = adForm.querySelector('#timein');
  var userSelectTimeOut = adForm.querySelector('#timeout');

  var flatPrices = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  // Функция задания начального адреса или по нажанию Ener
  var setInitUserAdressInput = function (withTail) {
    var userMainPinProperties = userMainPin.getBoundingClientRect();
    var mapPinsProperties = mapPins.getBoundingClientRect();
    var userMainPinX = Math.round(userMainPinProperties.left - mapPinsProperties.left + userMainPinProperties.width / 2);
    var userMainPinY = Math.round(userMainPinProperties.top + mapPinsProperties.top + 2 * window.scrollY + (withTail ? userMainPinProperties.height + VERTICAL_OFFSET_MAIN_PIN : userMainPinProperties.height / 2));
    userAddressInput.value = userMainPinX + ', ' + userMainPinY;
  };
  // Функция валидации Типа жилья и Цены за ночь
  var onTypeBoomSelectChange = function () {
    userPriseNight.min = flatPrices[userTypeRoomSelect.value];
    userPriseNight.placeholder = flatPrices[userTypeRoomSelect.value];
  };
  // Функция синхронизации полей времени заезда и выезда
  var onTimeinSelectChange = function () {
    userSelectTimeOut.value = userSelectTimeIn.value;
  };
  var onTimeoutSelectChange = function () {
    userSelectTimeIn.value = userSelectTimeOut.value;
  };

  // Обработчик изменения поля выбора Типа жилья
  userTypeRoomSelect.addEventListener('change', onTypeBoomSelectChange);
  // Обрботчик изменения времени заезда и выезда
  userSelectTimeIn.addEventListener('change', onTimeinSelectChange);
  userSelectTimeOut.addEventListener('change', onTimeoutSelectChange);
  // Обработчик события для проверки соответствия между количествами комнат и гостей
  adFormSubmitBtn.addEventListener('click', function () {
    if (+userRoomNumberSelect.value < +userСapacitySelect.value || userСapacitySelect.value === '0' && userRoomNumberSelect.value !== '100') {
      userСapacitySelect.setCustomValidity('Количество комнат не соответствует количеству гостей');
    } else {
      userСapacitySelect.setCustomValidity('');
    }
  });

  window.form = {
    // window.form.
    setInitUserAdressInput: setInitUserAdressInput,
  };
})();
