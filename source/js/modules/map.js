/* ----- Интерактивная карта ----- */

var map = document.getElementById('map');

if (map) {
  var mapHeightMobile = 457;
  var minPadding = 40;  // отступ, необходимый для возможности прокрутки карты на устройстве
  var clientHeight = document.documentElement.clientHeight;
  var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  // Проверка условия, что карта не занимает по высоте весь экран. При необходимости высота карты уменьшается для возможности ее свободной прокрутки
  if (isMobile && clientHeight < mapHeightMobile + minPadding * 2) {
    mapHeightMobile = (clientHeight - minPadding * 2) + 'px'
    map.style.height = mapHeightMobile;
  }

  ymaps.ready(init);

  function init() {
    var myMap = new ymaps.Map('map', {
      center: [59.938780, 30.323055],
      zoom: 17,
      controls: ['zoomControl', 'fullscreenControl']
    },
    {
      suppressMapOpenBlock: true
    });
    myMap.behaviors.disable(['scrollZoom']);
    if (isMobile) {
      myMap.behaviors.disable('drag');
    }

    var myPlacemark = new ymaps.Placemark([59.938631, 30.323055], {}, {
      iconLayout: 'default#image',
      iconImageHref: 'img/map-pin.svg',
      iconImageSize: [66, 100],
      iconImageOffset: [-25, -110],
      // iconShadow: true,
    });

    myMap.geoObjects.add(myPlacemark);
  }
}
