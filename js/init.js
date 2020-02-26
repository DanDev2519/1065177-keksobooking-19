'use strict';

window.addEventListener('load', function () {
  var adForm = document.querySelector('.ad-form');
  var mapFilters = document.querySelector('.map__filters');

  // Функция инициализации
  (function () {
    window.utils.setAttributeDisabledChildren(adForm);
    window.utils.setAttributeDisabledChildren(mapFilters);
    window.form.setInitUserAdressInput(false);
  })();
});
