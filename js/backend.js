'use strict';

(function () {
  var TIMEOUT_IN_MS = 10000;
  var Url = {
    GET: 'https://js.dump.academy/keksobooking/data',
    POST: 'https://js.dump.academy/keksobooking'
  };
  var StatusCode = {
    OK: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500
  };

  var sendXhr = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case StatusCode.OK:
          onSuccess(xhr.response);
          break;
        case StatusCode.BAD_REQUEST:
          error = 'Неверный запрос';
          break;
        case StatusCode.UNAUTHORIZED:
          error = 'Пользователь не авторизован';
          break;
        case StatusCode.NOT_FOUND:
          error = 'Ничего не найдено';
          break;
        case StatusCode.INTERNAL_SERVER_ERROR:
          error = 'Внутренняя ошибка сервера';
          break;
        default:
          error = 'Что-то пошло не так';
      }
      if (error) {
        onError('Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText + ' ' + error);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    return xhr;
  };

  var exchangeServer = function (onSuccess, onError, data) {
    var xhr = sendXhr(onSuccess, onError);
    if (data) {
      xhr.open('POST', Url.POST);
      xhr.send(data);
    } else {
      xhr.open('GET', Url.GET);
      xhr.send();
    }
  };

  window.backend = {
    // window.backend.
    exchangeServer: exchangeServer
  };
})();
