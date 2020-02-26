'use strict';

(function () {

  var adForm = document.querySelector('.ad-form');
  var mapFilters = document.querySelector('.map__filters');

  // Функция инициализации
  window.addEventListener('load', function () {
  // (function () {
    window.utils.setAttributeDisabledChildren(adForm);
    window.utils.setAttributeDisabledChildren(mapFilters);
    window.form.setInitUserAdressInput(false);
  // })();
  });

})();
