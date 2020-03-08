'use strict';

(function () {
  var pins = [];
  var housingType;

  var mapFilters = document.querySelector('.map__filters');
  var housingTypeFilter = mapFilters.querySelector('#housing-type');


  var updatePins = function () {
    var isMapCard = document.querySelector('.map__card');
    if (isMapCard) {
      window.card.closePopup(isMapCard);
    }

    var sameHousingType = pins.filter(function (it) {
      // return it.offer.type === housingType;
      if (housingType === undefined) {
        return true;
      } else {
        return it.offer.type === housingType;
      }
    });

    window.map.drewPins(sameHousingType);
  };
  // Функции успешной и неуспешной загрузки данных с сервера
  var onSuccessLoad = function (data) {
    pins = data;
    updatePins();
    window.utils.removeAttributeDisabledChildren(mapFilters);
  };
  var onErrorLoad = function (errorMessage) {
    window.popup.error(errorMessage, function () {
      window.backend.getFromServer(onSuccessLoad, onErrorLoad);
    });
  };


  housingTypeFilter.addEventListener('change', function () {
    // housingType = housingTypeFilter.value;
    housingType = housingTypeFilter.value === 'any' ? undefined : housingTypeFilter.value;
    updatePins();
  });


  window.filters = {
    // window.filters.
    onSuccessLoad: onSuccessLoad,
    onErrorLoad: onErrorLoad

  };

})();
