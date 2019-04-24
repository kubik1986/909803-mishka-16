// Фикс бага IE - неработающий margin: auto у флекс-элемента при flex-direction: column и min-height у флекс-контейнера (родителя). Вокруг родительского элемента создается обертка-контейнер с display: flex, флекс-элементы начинают воспринимать высоту родителя.

var ua = window.navigator.userAgent.toLowerCase();
var is_ie = (/trident/gi).test(ua) || (/msie/gi).test(ua);

if (is_ie) {
  var elements = document.querySelectorAll('.js-fix-ie');

  function divWrapper(element) {
    var div = document.createElement('div');
    var cloneElement = element.cloneNode(true);
    div.appendChild(cloneElement);
    div.style.display = 'flex';
    return div;
  }

  for (var i = 0; i < elements.length; i++) {
    element = elements[i];
    element.parentNode.replaceChild(divWrapper(element), element);
  }
}
