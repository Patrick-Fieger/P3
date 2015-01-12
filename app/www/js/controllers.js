angular.module('starter.controllers', [])

.controller('Login', function($scope, $http,$location, DatabaseService) {
    $scope.data = {
        "email": "",
        "password": ""
    }

    $scope.login = function(user, password) {
        DatabaseService.Login($scope.data).success(checklogin).error(faillogin);
    }

    function checklogin() {
        console.log('loggin');
        localStorage.setItem('user' , $scope.data.email);
        $location.path('/card');
    }

    function faillogin() {
        console.log('loggin failed');
    }
})
.controller('Register', function($scope, $http, DatabaseService) {
    $scope.data = {
        "fullname": "",
        "user": "",
        "city": "",
        "password": ""
    }
    $scope.register = function() {
        DatabaseService.Register($scope.data).success(registersucess).error(registerfail);
    }

    function registersucess() {
        console.log('registersucess')
    }

    function registerfail() {
        console.log('registerfail')
    }
})
.controller('Card', function($scope, $http, DatabaseService) {
    $scope.getCurrentPossition =function (){
        navigator.geolocation.getCurrentPosition(success, error, {enableHighAccuracy: true});

        function success(pos){
            var crd = pos.coords;
            initCard(crd.latitude,crd.longitude)
        }

        function error(){
            alert('SHOIT')
        }
    }

    function initCard(longi,lat){
        L.mapbox.accessToken = 'pk.eyJ1IjoicGF0cmlja2ZpZWdlciIsImEiOiI5ZHRLTGpzIn0.BXY_La-J8qE0Jf3lwofrrw';
        var map = L.mapbox.map('map', 'patrickfieger.klafa28i');
        map.setView([longi, lat], 3);

        var layer = L.mapbox.featureLayer().addTo(map);

        
        layer.setGeoJSON([
            {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [8.6358400,49.5430700]
                },
                properties: {
                    'id':123,
                    'marker-color': '#f86767'
                }
            }
        ]);

        layer.on('click', function(e) {
            DatabaseService.getMessageById(e.layer.feature.properties.id);
        });
    }
    $scope.getCurrentPossition();
})