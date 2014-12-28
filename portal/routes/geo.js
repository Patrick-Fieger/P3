var geocoderProvider = 'google';
var httpAdapter = 'http';
exports.geocoder = require('node-geocoder').getGeocoder(geocoderProvider, httpAdapter);