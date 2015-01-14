angular.module('starter.controllers', []).controller('LoginCtrl', function($scope, $http, $location, UserService) {
    $scope.data = {
        "email": "",
        "password": ""
    }
    $scope.login = function(user, password) {
        UserService.login($scope.data).success(checklogin).error(faillogin);
    }

    function checklogin() {
        console.log('loggin');
        localStorage.setItem('user', $scope.data.email);
        $location.path('/card');
    }

    function faillogin() {
        console.log('loggin failed');
    }
}).controller('RegisterCtrl', function($scope, $http, UserService) {
    $scope.data = {
        "email": "",
        "password": ""
    }
    $scope.register = function() {
        UserService.register($scope.data).success(registersucess).error(registerfail);
    }

    function registersucess() {
        console.log('registersucess')
    }

    function registerfail() {
        console.log('registerfail')
    }
}).controller('CardCtrl', function($scope, $http, MessageService) {
    var layer;
    $scope.getCurrentPossition = function() {
        navigator.geolocation.getCurrentPosition(success, error, {
            enableHighAccuracy: true
        });

        function success(pos) {
            var crd = pos.coords;
            initCard(crd.latitude, crd.longitude)
        }

        function error() {
            alert('SHOIT')
        }
    }

    function initCard(longi, lat) {
        L.mapbox.accessToken = 'pk.eyJ1IjoicGF0cmlja2ZpZWdlciIsImEiOiI5ZHRLTGpzIn0.BXY_La-J8qE0Jf3lwofrrw';
        var map = L.mapbox.map('map', 'patrickfieger.klafa28i');
        map.setView([longi, lat], 3);
        layer = L.mapbox.featureLayer().addTo(map);
        layer.on('click', function(e) {
            MessageService.getMessageById(e.layer.feature.properties.id);
        });
        MessageService.getMessagesAll().success(showMessages);
    }
    $scope.getCurrentPossition();

    function showMessages(data) {
        var arr = [];
        var geo = [];
        for (var i in data) {
            if (data.hasOwnProperty(i)) {
                for (var k = 0; k < data[i].value.messages.length; k++) {
                    arr.push(data[i].value.messages[k]);
                };
            }
        }
        setTimeout(function() {
            for (var x = 0; x < arr.length; x++) {
                geo.push({
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [arr[x].position[1], arr[x].position[0]]
                    },
                    properties: {
                        'id': arr[i].id,
                        'marker-color': '#f86767'
                    }
                })
            };
        }, 300)
        setTimeout(function() {
            console.log(geo)
            layer.setGeoJSON(geo)
        }, 500);
    }
}).controller('SendMessage', function($scope, MessageService) {
    navigator.geolocation.getCurrentPosition(success, error, {
        enableHighAccuracy: true
    });
    var crd;
    var currentdate = new Date();
    var date = currentdate.getDate() + "/" + (currentdate.getMonth() + 1) + "/" + currentdate.getFullYear();
    var time = currentdate.getHours() + ":" + currentdate.getMinutes()
    $scope.Message = {
        user: localStorage.getItem('user'),
        position: [],
        photo: "",
        readed: 0,
        id: "",
        date: [],
        title: "",
        message: ""
    }

        function success(pos) {
            crd = pos.coords;
        }

        function error() {
            alert('SHIT')
        }
    $scope.sendMessage = function() {
        $scope.Message.position[0] = crd.latitude;
        $scope.Message.position[1] = crd.longitude;
        $scope.Message.date[0] = date;
        $scope.Message.date[1] = time;
        MessageService.postMessage($scope.Message).success(messagesended).error(messagefail);
    }

    function messagesended() {
        alert('HURRA')
    }

    function messagefail() {
        alert('SCHEISE')
    }
})