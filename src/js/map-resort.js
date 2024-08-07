$(document).ready(function () {
	if ($('#resort-map').length > 0) {
		ymaps.ready(initResortMap);
	}
});

function initResortMap() {
	let objInfo = $('#resort-map').data('info');
	const balloon = document.getElementById('map_ballon');
	let activePlacemark = null;

	/* Карта Курорта */
	let map_resort = new ymaps.Map('resort-map',{
		center: objInfo['CENTER_COORDS'],
		zoom: objInfo['ZOOM']
	}, { maxZoom: objInfo['ZOOM'] });

	var placemarks = [];
	let k = 0;
	let minX = minY = maxX = maxY = 0;
	$.each(objInfo['PLACEMARKS'], function(key, arPlacemark) {
		placemarks[key] = new ymaps.Placemark(arPlacemark['PLACEMARK_COORDS'], {
			iconCaption: arPlacemark['TITLE'],
			customData: {
				title: arPlacemark['TITLE'],
				desc: arPlacemark['DESCRIPTION'],
				img: arPlacemark['PICTURE'],
				link: arPlacemark['LINK'],
				group: arPlacemark['GROUP'],
				btn_name: arPlacemark['BTN_NAME'],
				color_sheme: arPlacemark['COLOR_SHEME'],
				icon: arPlacemark['ICON'],
				icon_hover: arPlacemark['ICON_HOVER']
			}
		}, {
			iconLayout: 'default#image',
			iconImageHref: arPlacemark['ICON'],
			iconImageSize: [63, 63],
		});
		map_resort.geoObjects.add(placemarks[key]);

		placemarks[key].events.add('click', function (e) {
			setActivePlacemark(e.get('target'));
		});

		if ($.inArray(objInfo['CHOOSEN_GROUP'], arPlacemark['GROUP']) > -1 || objInfo['CHOOSEN_GROUP'] == '') {
			if (k == 0) k = key;
			placemarks[key].options.set('visible', true);
			let arCooards = placemarks[key].geometry.getCoordinates();
			if (minX > arCooards[0] || minX == 0) minX = arCooards[0];
			if (minY > arCooards[1] || minY == 0) minY = arCooards[1];
			if (maxX < arCooards[0] || maxX == 0) maxX = arCooards[0];
			if (maxY < arCooards[1] || maxY == 0) maxY = arCooards[1];
		} else {
			placemarks[key].options.set('visible', false);
		}
	});

	// Добавляю в левый блок на карте информацию при инициализации.
	setActivePlacemark(placemarks[k]);
	map_resort.setBounds([[minX,minY],[maxX,maxY]]);

	$('.resort-map__list .list__item').on('click', function () {
		$('.resort-map__list .list__item').removeClass('active');
		$(this).addClass('active');
		let key = $(this).data('key');
		if (key != '') {
			$.cookie('resort_map_group', key);
		} else {
			$.cookie('resort_map_group', '');
		}

		$('#map_ballon').html('');
		let i = 0;
		let minX = minY = maxX = maxY = 0;
		placemarks.forEach(function (placemark, index) {
			let group = placemark.properties.get('customData').group;
			if ($.inArray(key, group) > -1 || key == '') {
				if (i == 0) i = index;
				placemark.options.set('visible', true);
				let arCooards = placemark.geometry.getCoordinates();
				if (minX > arCooards[0] || minX == 0) minX = arCooards[0];
				if (minY > arCooards[1] || minY == 0) minY = arCooards[1];
				if (maxX < arCooards[0] || maxX == 0) maxX = arCooards[0];
				if (maxY < arCooards[1] || maxY == 0) maxY = arCooards[1];
			} else {
				placemark.options.set('visible', false);
			}
		});
		if (i > 0) {
			showDataFromPlacemark(placemarks[i].properties.get('customData'));
		}
		map_resort.setBounds([[minX,minY],[maxX,maxY]]);
	});

	function setActivePlacemark(placemark) {
		// Сбрасываем иконку предыдущего активного маркера
		if (activePlacemark) {
			let activePlacemarkCustomData = activePlacemark.properties.get('customData');
			activePlacemark.options.set('iconImageHref', activePlacemarkCustomData.icon);
		}

		// Устанавливаем новую иконку для текущего маркера
		let placemarkCustomData = placemark.properties.get('customData');
		placemark.options.set('iconImageHref', placemarkCustomData.icon_hover);
		activePlacemark = placemark;

		// Отображаем информацию в баллуне
		showDataFromPlacemark(placemarkCustomData);
	}

	// Функция рендерит html
	function showDataFromPlacemark(customData) {
		if (customData && customData.img) {
			let path = $('#resort-map').data('path');
			const html = 
			`
			<div class="resort-map__ballon-html ballon">
				<button id="ballon_close" class="ballon__modal-close"><svg width='24' height='21'><use href='${path}/img/icons/icons.svg#x'></use></svg></button>
				<h3 class="ballon__title title3">${customData.title}</h3>
				<div class="ballon__image">
					<img class='full-img' width='322' height='182' src='${customData.img}' alt='img'>
				</div>
				<div class="ballon__desc">
					<p>${customData.desc}</p>
				</div>
				<a href="${customData.link}" class="ballon__btn btn --${customData.color_sheme}">${customData.btn_name}</a>
			</div>
			`;
			balloon.innerHTML = html;
		} else {
			console.error("Ошибка: свойство img отсутствует в объекте customData");
		}
	}

	map_resort.controls.remove('geolocationControl');
	map_resort.controls.remove('searchControl');
	map_resort.controls.remove('trafficControl'); 
	map_resort.controls.remove('typeSelector'); 
	map_resort.controls.remove('fullscreenControl'); 
	//map_resort.controls.remove('zoomControl'); 
	map_resort.controls.remove('rulerControl'); 
	//map_resort.behaviors.disable(['scrollZoom']); 

	document.addEventListener('click', function(event) {		
		if (event.target.closest('#ballon_close')) {
			balloon.innerHTML = '';
		}
	});
};