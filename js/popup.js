'use strict';

(function () {
  var errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');
  var successTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');
  var adForm = document.querySelector('.ad-form');

  var error = function (errorMessage, btnAction) {
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
      // window.load.getData(window.map.onSuccessLoad, window.map.onErrorLoad);
      switch (btnAction) {
        case 'get-data':
          window.load.getData(window.map.onSuccessLoad, window.map.onErrorLoad);
          break;
        case 'post-data':
          // error = 'Неверный запрос';
          window.upload.postData(new FormData(adForm), window.form.onPostDataAction);
          break;
      }
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

  var success = function () {
    var successPopup = successTemplate.cloneNode(true);
    var mein = document.querySelector('main');

    var removeSuccess = function () {
      mein.removeChild(successPopup);
      document.removeEventListener('keydown', onPopupEscPress);
      successPopup.removeEventListener('click', onPopupClick);
    };
    var onPopupEscPress = function (evt) {
      window.utils.isEscEvent(evt, function () {
        removeSuccess();
      });
    };
    var onPopupClick = function (evt) {
      if (evt.target === evt.currentTarget) {
        removeSuccess();
      }
    };

    mein.appendChild(successPopup);

    document.addEventListener('keydown', onPopupEscPress);
    successPopup.addEventListener('click', onPopupClick);
  };

  window.popup = {
    // window.popup.
    error: error,
    success: success
  };

})();
