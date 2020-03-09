'use strict';

(function () {
  var NUMBER_OF_ADS = 5;
  var pins = [];

  var mapFilters = document.querySelector('.map__filters');
  var housingTypeFilter = mapFilters.querySelector('#housing-type');


  var filterByHousingType = function (it) {
    return it.offer.type === housingTypeFilter.value || housingTypeFilter.value === 'any';
  };

  var filterPins = function () {
    var i = 0;
    var resultArray = [];
    while (i < pins.length && resultArray.length < NUMBER_OF_ADS) {
      if (filterByHousingType(pins[i])) {
        resultArray.push(pins[i]);
      }
      i++;
    }
    return resultArray;
  };

  var updatePins = function () {
    window.card.closePopup();

    var resultPins = filterPins();
    // var resultPins = pins.filter(function (it) {
    //   return filterByHousingType(it);
    // });

    window.map.drewPins(resultPins);
  };

  var unlockFilters = function () {
    window.utils.removeAttributeDisabledChildren(mapFilters);
  };
  // Функции успешной и неуспешной загрузки данных с сервера
  var onSuccessLoad = function (data) {
    pins = data;
    updatePins();
    unlockFilters();
  };
  var onErrorLoad = function (errorMessage) {
    window.popup.error(errorMessage, function () {
      window.backend.getFromServer(onSuccessLoad, onErrorLoad);
    });
  };


  mapFilters.addEventListener('change', updatePins);


  window.filters = {
    // window.filters.
    onSuccessLoad: onSuccessLoad,
    onErrorLoad: onErrorLoad
  };

})();
