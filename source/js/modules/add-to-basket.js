/* ----- Попап - добавление товара в корзину ----- */

(function () {
  var modalOverlay = document.querySelector('.modal-overlay');

  if (modalOverlay) {
    var body = document.querySelector('body');
    var popup = modalOverlay.querySelector('.basket-add');
    var popupForm = popup.querySelector('.basket-add-form');
    var popupOpenBtns = document.querySelectorAll('.product-full__buy-btn, .product__buy-btn');
    var popupOpenBtnCurrent;
    var popupCloseBtn = popup.querySelector('.basket-add__close-btn');
    var popupFirstInput = popupForm.querySelector('input');
    var popupInputs = popupForm.querySelectorAll('input');
    var keys = {
      'Tab': 9,
      'Esc': 27
    };

    var onModalEscPress = function (evt) {
      if (evt.keyCode === keys['Esc']) {
        evt.preventDefault();
        closeModal();
      }
    };

    var onModalClick = function (evt) {
      if (evt.target === modalOverlay) {
        evt.preventDefault();
        closeModal();
      }
    };

    var onPopupOpenBtnClick = function (evt) {
      evt.preventDefault();
      popupOpenBtnCurrent = evt.currentTarget;
      openModal();
    };

    var openModal = function (evt) {
      if (popupForm.classList.contains('basket-add-form--error')) {
        popupForm.classList.remove('basket-add-form--error');
      }
      modalOverlay.classList.add('modal-overlay--show');
      body.classList.add('modal-opened');
      popupFirstInput.focus();

      document.addEventListener('keydown', onModalEscPress);
      document.addEventListener('click', onModalClick);
    };

    var closeModal = function () {
      body.classList.remove('modal-opened');
      modalOverlay.classList.remove('modal-overlay--show');
      popupOpenBtnCurrent.focus();

      document.removeEventListener('keydown', onModalEscPress);
      document.removeEventListener('click', onModalClick);
    };

    popupOpenBtns.forEach(function (btn) {
      btn.addEventListener('click', onPopupOpenBtnClick);
    });

    popupCloseBtn.addEventListener('click', closeModal);

    popupCloseBtn.addEventListener('keydown', function(evt) {
      if (evt.keyCode === keys['Tab'] && !evt.shiftKey) {
        evt.preventDefault();
        popupFirstInput.focus();
      }
    });

    popupFirstInput.addEventListener('keydown', function(evt) {
      if (evt.keyCode === keys['Tab'] && evt.shiftKey) {
        evt.preventDefault();
        popupCloseBtn.focus();
      }
    });

    popupForm.addEventListener('submit', function(evt) {
      popupForm.classList.remove('basket-add-form--error');
      var isError = true;
      for (var i = 0; i < popupInputs.length; i++) {
        if (popupInputs[i].checked) {
          isError = false;
          return;
        }
      }
      if (isError) {
        evt.preventDefault();
        popup.offsetWidth = popup.offsetWidth;
        popupForm.classList.add('basket-add-form--error');
      }
    });
  }
})();
