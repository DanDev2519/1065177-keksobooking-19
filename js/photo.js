'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var adForm = document.querySelector('.ad-form');
  var avatarInput = adForm.querySelector('#avatar');
  var avatarPreview = adForm.querySelector('.ad-form-header__preview').querySelector('img');
  var housingPhotoInput = adForm.querySelector('#images');
  var housingPhotos = adForm.querySelector('.ad-form__photo');

  // var onAvatarInputChange = function (evt) {
  //   var file = evt.target.files[0];
  //   var fileName = file.name.toLowerCase();

  //   if (file) {
  //     var matches = FILE_TYPES.some(function (it) {
  //       return fileName.endsWith(it);
  //     });
  //     if (matches) {
  //       var reader = new FileReader();
  //       reader.addEventListener('load', function () {
  //         avatarPreview.src = reader.result;
  //       });
  //       reader.readAsDataURL(file);
  //     }
  //   }
  // };
  var createImg = function (parent) {
    var image = document.createElement('img');

    image.alt = 'Фото жилья';
    image.width = 70;
    image.height = 70;
    parent.appendChild(image);
  };

  var previewLoad = function (evt, preview) {
    var file = evt.target.files[0];
    var fileName = file.name.toLowerCase();

    if (file) {
      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });
      if (matches) {
        var reader = new FileReader();
        reader.addEventListener('load', function () {
          preview.src = reader.result;
        });
        reader.readAsDataURL(file);
      }
    }
  };
  var onAvatarInputChange = function (evt) {
    previewLoad(evt, avatarPreview);
  };
  var onHousingPhotoInputChange = function (evt) {
    createImg(housingPhotos);
    var previewImg = adForm.querySelector('.ad-form__photo').querySelector('img');
    previewLoad(evt, previewImg);
  };
  avatarInput.addEventListener('change', onAvatarInputChange);
  housingPhotoInput.addEventListener('change', onHousingPhotoInputChange);

  // window.photo = {
  //   // window.photo.
  // };
})();
