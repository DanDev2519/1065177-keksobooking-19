'use strict';

(function () {
  var errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

  var error = function (errorMessage) {
    var errorPopup = errorTemplate.cloneNode(true);
    var errorButton = errorPopup.querySelector('.error__button');
    var mein = document.querySelector('main');

    var removeError = function () {
      mein.removeChild(errorPopup);
      errorButton.removeEventListener('click', onErrorButtonClick);
      document.removeEventListener('keydown', onPopupEscPress);
      errorPopup.removeEventListener('click', onPopupClick);
    };
    var onErrorButtonClick = function () {
      removeError();
      window.load.getData(window.map.onSuccessLoad, window.map.onErrorLoad);
    };
    var onPopupEscPress = function (evt) {
      window.utils.isEscEvent(evt, function () {
        removeError();
      });
    };
    var onPopupClick = function (evt) {
      if (evt.target === evt.currentTarget) {
        removeError();
      }
    };

    errorPopup.querySelector('.error__message').textContent = errorMessage;
    mein.appendChild(errorPopup);

    errorButton.addEventListener('click', onErrorButtonClick);
    document.addEventListener('keydown', onPopupEscPress);
    errorPopup.addEventListener('click', onPopupClick);
  };

  window.popup = {
    // window.popup.
    error: error
  };

})();
