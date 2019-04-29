/* ----- Попап - добавление товара в корзину ----- */

var modalOverlay = document.querySelector('.modal-overlay');

if (modalOverlay) {
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

  var addOpenBtnHandler = function(openBtn) {
    openBtn.addEventListener('click', function(evt) {
      evt.preventDefault();
      popupOpenBtnCurrent = openBtn;
      popupForm.classList.remove('basket-add-form--error');
      modalOverlay.classList.add('modal-overlay--show');
      popupFirstInput.focus();

      window.addEventListener('keydown', function(evtEsc) {
        if (evtEsc.keyCode === keys['Esc']) {
          evtEsc.preventDefault();
          modalOverlay.classList.remove('modal-overlay--show');
          popupOpenBtnCurrent.focus();
        }
      });

      window.addEventListener('click', function(evtClick) {
        if (evtClick.target === modalOverlay) {
          evtClick.preventDefault();
          modalOverlay.classList.remove('modal-overlay--show');
          popupOpenBtnCurrent.focus();
        }
      });
    });
  };

  for (var i = 0; i < popupOpenBtns.length; i++) {
    addOpenBtnHandler(popupOpenBtns[i]);
  }

  popupCloseBtn.addEventListener('click', function(evt) {
    evt.preventDefault();
    modalOverlay.classList.remove('modal-overlay--show');
    popupOpenBtnCurrent.focus();
  });

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
