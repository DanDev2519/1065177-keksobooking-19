'use strict';

(function () {
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
    var length = window.utils.getRandomIntInclusive(0, arrayIn.length);
    for (var i = 0; i < length; i++) {
      var arrayEl = arrayIn[window.utils.getRandomInt(0, arrayIn.length)];
      while (arrayOut.indexOf(arrayEl) !== -1) {
        arrayEl = arrayIn[window.utils.getRandomInt(0, arrayIn.length)];
      }
      arrayOut.push(arrayEl);
    }
    return arrayOut;
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

  window.utils = {
    // window.utils.
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent,
    getLeadingZeros: getLeadingZeros,
    getRandomInt: getRandomInt,
    getRandomIntInclusive: getRandomIntInclusive,
    getArrayNoRepeatFrom: getArrayNoRepeatFrom,
    setAttributeDisabledChildren: setAttributeDisabledChildren,
    removeAttributeDisabledChildren: removeAttributeDisabledChildren
  };
})();
