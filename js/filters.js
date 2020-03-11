'use strict';

(function () {
  var NUMBER_OF_ADS = 5;
  var pins = [];

  var mapFilters = document.querySelector('.map__filters');
  var housingTypeFilter = mapFilters.querySelector('#housing-type');
  var housingPriceFilter = mapFilters.querySelector('#housing-price');
  var housingRoomsFilter = mapFilters.querySelector('#housing-rooms');
  var housingGuestsFilter = mapFilters.querySelector('#housing-guests');
  var features = mapFilters.querySelectorAll('.map__checkbox');

  var isNotChecked = function (it) {
    return it.checked === false;
  };
  var filterByFeatures = function (it) {
    var shearchChecked = function () {
      var featuresArray = Array.from(features);
      for (var i = 0; i < featuresArray.length; i++) {
        if (featuresArray[i].checked) {
          if (it.offer.features.indexOf(featuresArray[i].value) !== -1) {
            return true;
          }
        }
      }
      return false;
    };
    return Array.from(features).every(isNotChecked) || shearchChecked(it);
  };

  var filterByHousingType = function (it) {
    return it.offer.type === housingTypeFilter.value || housingTypeFilter.value === 'any';
  };
  var filterByHousingPrice = function (it) {
    var priceRang = 'any';
    if (it.offer.price < 10000) {
      priceRang = 'low';
    } else if (it.offer.price > 50000) {
      priceRang = 'high';
    } else if (it.offer.price >= 10000 && it.offer.price <= 50000) {
      priceRang = 'middle';
    }
    return priceRang === housingPriceFilter.value || housingPriceFilter.value === 'any';
  };
  var filterByHousingRooms = function (it) {
    return it.offer.rooms === +housingRoomsFilter.value || housingRoomsFilter.value === 'any';
  };
  var filterByHousingGuests = function (it) {
    return it.offer.guests === +housingGuestsFilter.value || housingGuestsFilter.value === 'any';
  };

  var filterPins = function () {
    var i = 0;
    var resultArray = [];
    while (i < pins.length && resultArray.length < NUMBER_OF_ADS) {
      if (filterByHousingType(pins[i]) && filterByHousingPrice(pins[i]) && filterByHousingRooms(pins[i]) && filterByHousingGuests(pins[i]) && filterByFeatures(pins[i])) {
        resultArray.push(pins[i]);
      }
      i++;
    }
    return resultArray;
  };

  var updatePins = function () {
    window.card.closePopup();

    var resultPins = filterPins();

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


  mapFilters.addEventListener('change', window.utils.debounce(updatePins));


  window.filters = {
    // window.filters.
    onSuccessLoad: onSuccessLoad,
    onErrorLoad: onErrorLoad
  };

})();
