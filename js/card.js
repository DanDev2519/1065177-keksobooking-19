'use strict';

(function () {
  var cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.map__card');

  var offerTypeMap = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };

  // Функция изменения карточки с объявлением согласно удобвствам в объявлении
  var renderCardFeatures = function (card, ad) {
    var popupFeatures = card.querySelector('.popup__features');
    var featureElement = popupFeatures.children;
    // for более уместен чем forEach - for необходим для логики
    for (var i = 0; i < featureElement.length; i++) {
      var сlassesСompare = featureElement[i].getAttribute('class');
      var flag = 0;
      ad.offer.features.forEach(function (it) {
        if (сlassesСompare.endsWith('--' + it)) {
          flag += 1;
        }
      });
      if (flag === 0) {
        popupFeatures.removeChild(featureElement[i]);
        if (!featureElement.length) {
          popupFeatures.remove();
        }
        i--;
      }
    }
  };
  // Функция создания фото у карточки обявления и изменения его src
  var renderCardPhotos = function (card, ad) {
    var popupPhotos = card.querySelector('.popup__photos');
    var photo = popupPhotos.children;
    if (ad.offer.photos[0]) {
      photo[0].src = ad.offer.photos[0];
      if (ad.offer.photos.length > 1) {
        for (var i = 1; i < ad.offer.photos.length; i++) {
          popupPhotos.appendChild(photo[0].cloneNode(true));
          photo[i].src = ad.offer.photos[i];
        }
      }
    } else {
      popupPhotos.remove();
    }
  };


  var closePopup = function () {
    var card = document.querySelector('.map__card');
    if (!card) {
      return;
    }
    card.remove();
    document.removeEventListener('keydown', onPupopEscPress);
    window.map.removeClassPinActive();
  };
  var onPupopEscPress = function (evt) {
    window.utils.isEscEvent(evt, function () {
      closePopup();
    });
  };
  // Функция, описывающая взаимодействие пользователя с карточкой объявления
  var userCardActions = function (card) {
    var closeButton = card.querySelector('.popup__close');

    closeButton.addEventListener('click', function (evt) {
      evt.preventDefault();
      closePopup();
    });
    document.addEventListener('keydown', onPupopEscPress);
  };
  // Функция создания DOM элемента - карточка объявления
  var renderCardOfAd = function (ad) {
    var card = cardTemplate.cloneNode(true);
    card.querySelector('.popup__title').textContent = ad.offer.title;
    card.querySelector('.popup__text--address').textContent = ad.offer.address;
    card.querySelector('.popup__text--price').textContent = ad.offer.price;
    card.querySelector('.popup__text--price').insertAdjacentHTML('beforeEnd', '&#x20bd;<span>/ночь</span>');
    card.querySelector('.popup__type').textContent = offerTypeMap[ad.offer.type];
    card.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
    renderCardFeatures(card, ad);
    card.querySelector('.popup__description').textContent = ad.offer.description;
    renderCardPhotos(card, ad);
    card.querySelector('.popup__avatar').src = ad.author.avatar;

    userCardActions(card);

    return card;
  };

  window.card = {
    // window.card.
    closePopup: closePopup,
    renderOfAd: renderCardOfAd
  };
})();
