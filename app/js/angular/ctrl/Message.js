var Message = ['$scope', '$http', 'MessageService', '$location','fileUpload',
    function($scope, $http, MessageService, $location,fileUpload) {
        navigator.geolocation.getCurrentPosition(success, error, {
            enableHighAccuracy: true
        });
        var crd;
        $scope.Message = {
            email: localStorage.getItem('user'),
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

        function error(){
            alert('Geolocation konnte nicht ermittelt werden');
        }

        $scope.sendMessage = function() {
            MessageService.sendPhoto($scope.photo).success(sendDetails).error(photofail);
        }

        function photofail() {
            alert('Photo Upload fehlgeschlagen')
        }

        function sendDetails(data) {
            var currentdate = new Date();
            $scope.Message.position[0] = crd.latitude;
            $scope.Message.position[1] = crd.longitude;
            $scope.Message.date[1] = currentdate.getHours() + ":" + currentdate.getMinutes();
            $scope.Message.photo = data;
            MessageService.postMessage($scope.Message).success(MessageSaved).error(MessageSavedFail);
        }


        function MessageSaved(status){

        }

        function MessageSavedFail(status){

        }

    }
];