'use strict';

(function () {
  var VERTICAL_OFFSET_MAIN_PIN = 16;
  var ERROR_LOAD_MESSAGE = 'Ошибка загрузки объявления';

  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var userMainPin = map.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var userAddressInput = adForm.querySelector('#address');
  var userRoomNumberSelect = adForm.querySelector('#room_number');
  var userСapacitySelect = adForm.querySelector('#capacity');
  var userTypeRoomSelect = adForm.querySelector('#type');
  var userPriceNight = adForm.querySelector('#price');
  var adFormSubmitBtn = adForm.querySelector('.ad-form__submit');
  var userSelectTimeIn = adForm.querySelector('#timein');
  var userSelectTimeOut = adForm.querySelector('#timeout');
  var resetFormBtn = adForm.querySelector('.ad-form__reset');
  var avatarPreview = adForm.querySelector('.ad-form-header__preview').querySelector('img');

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
  var resetAvatar = function () {
    avatarPreview.src = 'img/muffin-grey.svg';
  };
  var resetPriceNight = function () {
    onTypeRoomSelectChange();
  };
  // Функция валидации Типа жилья и Цены за ночь
  var onTypeRoomSelectChange = function () {
    userPriceNight.min = flatPrices[userTypeRoomSelect.value];
    userPriceNight.placeholder = flatPrices[userTypeRoomSelect.value];
  };
  // Функция синхронизации полей времени заезда и выезда
  var onTimeinSelectChange = function () {
    userSelectTimeOut.value = userSelectTimeIn.value;
  };
  var onTimeoutSelectChange = function () {
    userSelectTimeIn.value = userSelectTimeOut.value;
  };
  // Функция вызывающая соответствующее действие после попытки отпраитвить форму
  var onPostDataAction = function () {
    onResetBtnAction();
    window.popup.success();
  };
  var onErrorPostData = function () {
    window.popup.error(ERROR_LOAD_MESSAGE, function () {
      window.backend.postToServer(onPostDataAction, onErrorPostData, new FormData(adForm));
    });
  };
  // Функция сброса формы
  var onResetBtnAction = function () {
    adForm.reset();
    resetAvatar();
    resetPriceNight();
    window.photo.remove();
    window.map.reset();
    window.filters.reset();
    window.card.closePopup();
    adForm.classList.add('ad-form--disabled');
    window.init.begin();
  };

  // Обработчик изменения поля выбора Типа жилья
  userTypeRoomSelect.addEventListener('change', onTypeRoomSelectChange);
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
  // Обработчик события отправки формы
  adForm.addEventListener('submit', function (evt) {
    window.backend.postToServer(onPostDataAction, onErrorPostData, new FormData(adForm));
    evt.preventDefault();
  });
  // Обработчик события сброса формы
  resetFormBtn.addEventListener('click', onResetBtnAction);


  window.form = {
    // window.form.
    setInitUserAdressInput: setInitUserAdressInput,
    onPostDataAction: onPostDataAction,
  };
})();
