/* ----- Скрипт открытия/закрытия меню на мобильных ----- */

(function () {
  var navMain = document.querySelector('.main-nav');
  var navToggle = navMain.querySelector('.main-nav__toggle');
  var navToggleText = navToggle.children[0];

  navMain.classList.add('main-nav--closed');

  navToggle.addEventListener('click', function() {
    if (navMain.classList.contains('main-nav--closed')) {
      navMain.classList.remove('main-nav--closed');
      navMain.classList.add('main-nav--opened');
      navToggleText.textContent = 'Закрыть меню';
    } else {
      navMain.classList.remove('main-nav--opened');
      navMain.classList.add('main-nav--closed');
      navToggleText.textContent = 'Открыть меню';
    }
  });
})();
