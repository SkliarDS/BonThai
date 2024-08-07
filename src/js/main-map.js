
ymaps.ready(init);
function init() {
   
    let map = new ymaps.Map('main_map', {
        center: [55.751355888195356, 37.6188314338379],
        zoom: 14
    });

    let placemark = new ymaps.Placemark([55.751355888195356, 37.6188314338379], {
        hintContent: 'BonThai',
    }, {
        iconLayout: 'default#image',
        iconImageHref: '/img/icons/marker.svg',
        iconImageSize: [40, 60],
    });
    map.geoObjects.add(placemark);

    map.controls.remove('geolocationControl');
    map.controls.remove('searchControl');
    map.controls.remove('trafficControl');
    map.controls.remove('typeSelector');
    map.controls.remove('fullscreenControl');
    map.controls.remove('zoomControl');
    map.controls.remove('rulerControl');
    map.behaviors.disable(['scrollZoom']);

    
    
}
