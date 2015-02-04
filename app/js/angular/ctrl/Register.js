var Register = ['$scope', '$http','UserService','$location','$rootScope',function ($scope, $http,UserService,$location,$rootScope) {
    $scope.data = {
        "email": "",
        "password": ""
    }
    $scope.register = function() {
        UserService.register($scope.data).success(registersucess).error(registerfail);
    }

    function registersucess() {
        $rootScope.showNotification('Registrierung erfolgreich! Bitte loggen sie sich ein!','ok');
    }

    function registerfail() {
        $rootScope.showNotification('Registrierung fehlgeschlagen!','error');
    }
}];