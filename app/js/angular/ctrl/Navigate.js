var Navigate = ['$scope', '$http', 'MessageService', '$location', 'geolocation',
    function($scope, $http, MessageService, $location, geolocation) {
        $scope.currentLocation;
        $scope.lesen = false;
        $scope.messages = [];
        $scope.href_;

        var ready = false,
            compass,
            bearing = [],
            circle = 50;

        Compass.watch(function(heading) {
            compass = heading;
        });

        function setCurrentGeo(withmessage) {
            geolocation.getLocation({
                enableHighAccuracy: true
            }).then(function(data) {
                // if(data.coords.accuracy < 15) circle = 15
                // else circle = data.coords.accuracy
                $scope.currentLocation = new LatLon(data.coords.latitude, data.coords.longitude);
                if (withmessage) {
                    MessageService.getNearestMessagesByLocation($scope.currentLocation).success(loadMessages);
                }
            });
        }

        function loadMessages(data, status, headers, config) {
            $scope.messages = [];
            var count = 0;
            for (var i = 0; i < data.length; i++) {
                MessageService.getMessageById(data[i]).success(function(data, status, headers, config) {
                    var dataholder = data;
                    dataholder.distance = $scope.currentLocation.distanceTo(new LatLon(dataholder.position[0], dataholder.position[1]))
                    $scope.messages.push(dataholder);
                    count++
                    if (count == 3) {
                        ready = true;
                    }
                });
            };
        }

        function showMessageIfNear(){
            var count = 0;
            for (var i = 0; i < $scope.messages.length; i++) {
                if($scope.messages[i].distance * 1000 < parseInt(circle)){
                    count++;
                    $scope.lesen = true;
                    $scope.href_ = $scope.messages[i].id;
                }

                if(i == $scope.messages.length-1){
                    if(count==0){
                        $scope.lesen = false;
                    }
                }

            };
        }

        function calculateDistanceAndBearing() {
            if (ready) {
                bearing = [];
                var rotade = 360 - compass;
                $(".compass").css({
                    "transform": "rotate(" + rotade + "deg)"
                });
                for (var i = 0; i < $scope.messages.length; i++) {
                    $scope.messages[i].distance = $scope.currentLocation.distanceTo(new LatLon($scope.messages[i].position[0], $scope.messages[i].position[1]))
                    bearing[i] = 0 + $scope.currentLocation.bearingTo(new LatLon($scope.messages[i].position[0], $scope.messages[i].position[1]))
                };

                $("#" + $scope.messages[0].id).addClass('full').css({
                    "transform": "rotate(" + bearing[0] + "deg)"
                });
                $("#" + $scope.messages[0].id + ' p').css({
                    "transform": "rotate(" + -(rotade + bearing[0]) + "deg)"
                });
                $("#" + $scope.messages[1].id).css({
                    "transform": "rotate(" + bearing[1] + "deg)"
                });
                $("#" + $scope.messages[1].id + ' p').css({
                    "transform": "rotate(" + -(rotade + bearing[1]) + "deg)"
                });
                $("#" + $scope.messages[2].id).css({
                    "transform": "rotate(" + bearing[2] + "deg)"
                });
                $("#" + $scope.messages[2].id + ' p').css({
                    "transform": "rotate(" + -(rotade + bearing[2]) + "deg)"
                });
                showMessageIfNear();
            }
        }
        setCurrentGeo(true);
        setInterval(function() {
            setCurrentGeo(false);
            calculateDistanceAndBearing();
        }, 100);
    }
];