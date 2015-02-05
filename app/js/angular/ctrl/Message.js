Date.prototype.toDateInputValue = (function() {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0,10);
});

var counter = 0

var Message = ['$scope', '$http', 'MessageService', '$location','geolocation','$rootScope','$timeout',
    function($scope, $http, MessageService, $location,geolocation,$rootScope,$timeout) {
        $scope.Message = {
            email: localStorage.getItem('user'),
            position: [],
            photo: "",
            readed: 0,
            id: "",
            date: [new Date().toDateInputValue(),''],
            title: "Project Go! Präsentation",
            message: ""
        }
        
        if (++counter == 1) {
            setTimeout(function(){
                if($rootScope.samePlace !== undefined && $rootScope.samePlace !== ''){
                    if (confirm('Passt dein Ereigniss zu "'+$rootScope.samePlaceTitle+'"?')) {
                        localStorage.setItem('lat',$rootScope.samePlace[0])
                        localStorage.setItem('long',$rootScope.samePlace[1])
                    } else {
                        getGeo();
                    }
                }else{
                    getGeo();
                }
                counter = 0;
            },1000);
        }

        $scope.cancel = function(){
            if (confirm('Wollen sie wirklich diese Seite verlassen? \n Alle eingegebenen Daten gehen hierbei verloren!')) {
                $location.path('/navigate');
            }
        }

        function getGeo(){
            geolocation.getLocation({enableHighAccuracy: true}).then(function(data){
                localStorage.setItem('lat',data.coords.latitude)
                localStorage.setItem('long',data.coords.longitude)
            });
        }

        $scope.sendMessage = function() {
            NProgress.start();
            $('.container').addClass('fadeoutpres');
            //MessageService.sendPhoto($scope.photo).success(sendDetails).error(photofail);
            MessageSaved();
        }

        function photofail() {
            NProgress.done();
            $rootScope.showNotification('Bild Upload fehlgeschlagen!','error');
        }

        function sendDetails(data) {
            var currentdate = new Date();
            $scope.Message.date[1] = currentdate.getHours() + ":" + currentdate.getMinutes();
            $scope.Message.photo = data;
            $scope.Message.position[0] = parseFloat(localStorage.getItem('lat'));
            $scope.Message.position[1] = parseFloat(localStorage.getItem('long'));
            MessageService.postMessage($scope.Message).success(MessageSaved).error(MessageSavedFail);
        }


        function MessageSaved(){
            $timeout(function(){
                NProgress.done();
                $rootScope.showNotification('Die Geschichte wurde erfolgreich gespeichert!','ok');
            },2000)
        }

        function MessageSavedFail(status){
            NProgress.done();
            $rootScope.showNotification('Speicherung der Geschichte fehlgeschlagen!','error');
        }

        $(document).on('change', 'input[type="file"]', function(evt) {
            event.preventDefault();
            var tgt = evt.target || window.event.srcElement,
            files = tgt.files;
            if (FileReader && files && files.length) {
                var fr = new FileReader();
                fr.onload = function () {
                    $('.img_place_wrapper').show();
                    $('#imageplace').attr('src',fr.result);
                    localStorage.setItem('img',fr.result);
                }
                fr.readAsDataURL(files[0]);
            }
        });
    }
];