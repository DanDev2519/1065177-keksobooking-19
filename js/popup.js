'use strict';

(function () {
  var main = document.querySelector('main');
  var errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');
  var successTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');


  var popupEscPress = function (evt, callback) {
    window.utils.isEscEvent(evt, function () {
      callback();
    });
  };
  var popupClick = function (evt, callback) {
    if (evt.target === evt.currentTarget) {
      callback();
    }
  };

  var error = function (errorMessage, btnAction) {
    var errorPopup = errorTemplate.cloneNode(true);
    var errorButton = errorPopup.querySelector('.error__button');

    var removeError = function () {
      main.removeChild(errorPopup);
      errorButton.removeEventListener('click', onErrorButtonClick);
      document.removeEventListener('keydown', onPopupEscPress);
      errorPopup.removeEventListener('click', onPopupClick);
    };
    var onErrorButtonClick = function () {
      removeError();
      btnAction();
    };
    var onPopupEscPress = function (evt) {
      popupEscPress(evt, removeError);
    };
    var onPopupClick = function (evt) {
      popupClick(evt, removeError);
    };

    errorPopup.querySelector('.error__message').textContent = errorMessage;
    main.appendChild(errorPopup);

    errorButton.addEventListener('click', onErrorButtonClick);
    document.addEventListener('keydown', onPopupEscPress);
    errorPopup.addEventListener('click', onPopupClick);
  };

  var success = function () {
    var successPopup = successTemplate.cloneNode(true);

    var removeSuccess = function () {
      main.removeChild(successPopup);
      document.removeEventListener('keydown', onPopupEscPress);
      successPopup.removeEventListener('click', onPopupClick);
    };
    var onPopupEscPress = function (evt) {
      popupEscPress(evt, removeSuccess);
    };
    var onPopupClick = function (evt) {
      popupClick(evt, removeSuccess);
    };

    main.appendChild(successPopup);

    document.addEventListener('keydown', onPopupEscPress);
    successPopup.addEventListener('click', onPopupClick);
  };

  window.popup = {
    // window.popup.
    error: error,
    success: success
  };

})();
