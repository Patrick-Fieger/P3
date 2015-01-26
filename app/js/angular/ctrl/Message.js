Date.prototype.toDateInputValue = (function() {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0,10);
});

var Message = ['$scope', '$http', 'MessageService', '$location','fileUpload','geolocation',
    function($scope, $http, MessageService, $location,fileUpload,geolocation) {
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



        geolocation.getLocation({enableHighAccuracy: true}).then(function(data){
            $scope.Message.position[0] = data.coords.latitude;
            $scope.Message.position[1] = data.coords.longitude;
        });

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
            MessageService.postMessage($scope.Message).success(MessageSaved).error(MessageSavedFail);
        }


        function MessageSaved(status){

        }

        function MessageSavedFail(status){

        }

    }
];