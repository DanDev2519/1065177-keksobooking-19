'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var adForm = document.querySelector('.ad-form');
  var avatarInput = adForm.querySelector('#avatar');
  var avatarPreview = adForm.querySelector('.ad-form-header__preview').querySelector('img');
  var housingPhotoInput = adForm.querySelector('#images');
  var photoContainer = adForm.querySelector('.ad-form__photo-container');
  var isFirstLoad = true;

  var createImg = function (parent, img) {
    var div = document.createElement('div');
    var image = document.createElement('img');

    div.classList.add('ad-form__photo');
    image.alt = 'Фото жилья';
    image.width = 70;
    image.height = 70;
    image.src = img;
    div.appendChild(image);
    parent.appendChild(div);
  };

  var remove = function () {
    adForm.querySelectorAll('.ad-form__photo').forEach(function (photo) {
      photo.remove();
    });
  };
  var previewLoad = function (evt, cb) {
    Array.from(evt.target.files).forEach(function (file) {
      if (file) {
        var fileName = file.name.toLowerCase();
        var matches = FILE_TYPES.some(function (it) {
          return fileName.endsWith(it);
        });
        if (matches) {
          var reader = new FileReader();
          reader.addEventListener('load', function () {
            cb(reader.result);
          });
          reader.readAsDataURL(file);
        }
      }
    });
  };
  var onAvatarInputChange = function (evt) {
    previewLoad(evt, function (result) {
      avatarPreview.src = result;
    });
  };
  var onHousingPhotoInputChange = function (evt) {
    previewLoad(evt, function (image) {
      if (isFirstLoad) {
        remove();
        isFirstLoad = false;
      }
      createImg(photoContainer, image);
    });
  };
  avatarInput.addEventListener('change', onAvatarInputChange);
  housingPhotoInput.addEventListener('change', onHousingPhotoInputChange);

  window.photo = {
  // window.photo.
    remove: remove
  };
})();
