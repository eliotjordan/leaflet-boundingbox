/*jslint browser: true*/
/*global L */

(function (window, document, L, undefined) {
	'use strict';

	var bboxExists = false,
		southWest,
		northEast,
		currentBounds;

	if (bboxExists) {
		southWest = L.latLng(41.7958, -74.1522);
	    northEast = L.latLng(42.0492, -73.8061);
	} else {
		southWest = L.latLng(-90, -180);
	    northEast = L.latLng(90, 180);
	}

    currentBounds = L.latLngBounds(southWest, northEast);

	var map = L.map('map', {
		worldCopyJump: false,
	}).fitBounds(currentBounds);	

	new L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
		minZoom: 0,
		maxZoom: 18,
		noWrap: true,
		// detectRetina: true,
		attribution: 'Map data © <a href="http://www.openstreetmap.org">OpenStreetMap contributors</a>'
	}).addTo(map);

	var locationFilter = new L.LocationFilter({
		enable: true,
		bounds: currentBounds
	}).addTo(map);

	L.Control.geocoder({
		position: 'topright',
		collapsed: false
	}).addTo(map);

	locationFilter.on('change', function (e) {
		console.log(e.bounds);
        console.log(e.bounds.toBBoxString());
	});

}(window, document, L));