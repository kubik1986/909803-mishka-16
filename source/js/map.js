var mapHeightMobile = 457;
var minPadding = 40;
var clientHeight = document.documentElement.clientHeight;
var map = document.querySelector('.contacts__map');

if (clientHeight < mapHeightMobile + minPadding * 2) {
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
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    myMap.behaviors.disable('drag');
  }

  var myPlacemark = new ymaps.Placemark([59.938631, 30.323055], {}, {
    iconLayout: 'default#image',
    iconImageHref: 'img/icon-map-pin.svg',
    iconImageSize: [66, 100],
    iconImageOffset: [-25, -110],
    // iconShadow: true,
  });

  myMap.geoObjects.add(myPlacemark);
}
