'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500; // ms
  var KeyCode = {
    ESC: 27,
    ENTER: 13
  };

  // Функции проверки нажатых клавишь
  var isEscEvent = function (evt, action) {
    if (evt.keyCode === KeyCode.ESC) {
      action();
    }
  };
  var isEnterEvent = function (evt, action) {
    if (evt.keyCode === KeyCode.ENTER) {
      action();
    }
  };

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
  // Функция добавления атрибута disabled дочерним элементам
  var setAttributeDisabledChildren = function (parent) {
    Array.from(parent.children).forEach(function (child) {
      child.setAttribute('disabled', 'disabled');
    });
  };
  // Функция удаления атрибута disabled дочерним элементам
  var removeAttributeDisabledChildren = function (parent) {
    Array.from(parent.children).forEach(function (child) {
      child.removeAttribute('disabled', 'disabled');
    });
  };

  var debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  window.utils = {
    // window.utils.
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent,
    getLeadingZeros: getLeadingZeros,
    getRandomInt: getRandomInt,
    getRandomIntInclusive: getRandomIntInclusive,
    getArrayNoRepeatFrom: getArrayNoRepeatFrom,
    setAttributeDisabledChildren: setAttributeDisabledChildren,
    removeAttributeDisabledChildren: removeAttributeDisabledChildren,
    debounce: debounce
  };
})();
