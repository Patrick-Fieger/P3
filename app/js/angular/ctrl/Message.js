Date.prototype.toDateInputValue = (function() {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0,10);
});

var counter = 0

var Message = ['$scope', '$http', 'MessageService', '$location','geolocation','$rootScope',
    function($scope, $http, MessageService, $location,geolocation,$rootScope) {
        $scope.Message = {
            email: localStorage.getItem('user'),
            position: [],
            photo: "",
            readed: 0,
            id: "",
            date: [new Date().toDateInputValue(),''],
            title: "",
            message: ""
        }
        
        if (++counter == 1) {
            setTimeout(function(){
                if($rootScope.samePlace !== undefined && $rootScope.samePlace !== ''){
                    if (confirm('Passt dein Ereigniss zu "'+$rootScope.samePlaceTitle+'"?')) {
                        $scope.Message.position = $rootScope.samePlace;
                        console.log($scope.Message.position)
                    } else {
                        getGeo();
                    }
                }else{
                    getGeo();
                }
                counter = 0;
            },1000);
        };


        function getGeo(){
            geolocation.getLocation({enableHighAccuracy: true}).then(function(data){
                $scope.Message.position[0] = data.coords.latitude;
                $scope.Message.position[1] = data.coords.longitude;
            });
        }

        $scope.sendMessage = function() {
            MessageService.sendPhoto($scope.photo).success(sendDetails).error(photofail);
        }

        function photofail() {
            alert('Photo Upload fehlgeschlagen')
        }

        function sendDetails(data) {
            var currentdate = new Date();
            $scope.Message.date[1] = currentdate.getHours() + ":" + currentdate.getMinutes();
            $scope.Message.photo = data;
            $scope.Message.position[0] = parseFloat($scope.Message.position[0]);
            $scope.Message.position[1] = parseFloat($scope.Message.position[1]);
            MessageService.postMessage($scope.Message).success(MessageSaved).error(MessageSavedFail);
        }


        function MessageSaved(status){
            console.log('abgespeichert!!!!');
        }

        function MessageSavedFail(status){

        }

    }
];