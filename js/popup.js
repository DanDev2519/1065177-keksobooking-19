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
      errorButton.removeEventListener('click', removeError);
      document.removeEventListener('keydown', onPopupEscPress);
      document.removeEventListener('click', removeError);
    };
    var onPopupEscPress = function (evt) {
      window.utils.isEscEvent(evt, function () {
        removeError();
      });
    };

    errorPopup.querySelector('.error__message').textContent = errorMessage;
    mein.appendChild(errorPopup);

    errorButton.addEventListener('click', removeError);
    document.addEventListener('keydown', onPopupEscPress);
    // document.addEventListener('click', removeError);
  };

  window.popup = {
    // window.popup.
    error: error,
  };

})();
