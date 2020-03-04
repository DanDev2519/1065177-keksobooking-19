'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var mapFilters = document.querySelector('.map__filters');

  var begin = function () {
    window.utils.setAttributeDisabledChildren(adForm);
    window.utils.setAttributeDisabledChildren(mapFilters);
    window.form.setInitUserAdressInput(false);
  };
  // Функция инициализации
  window.addEventListener('load', function () {
    begin();
  });
  window.init = {
    // window.init.
    begin: begin
  };

})();
