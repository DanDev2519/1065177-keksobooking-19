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
    setAttributeDisabledChildren: setAttributeDisabledChildren,
    removeAttributeDisabledChildren: removeAttributeDisabledChildren,
    debounce: debounce
  };
})();
