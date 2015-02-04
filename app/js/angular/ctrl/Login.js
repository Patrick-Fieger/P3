var Login = ['$scope', '$http','UserService','$location','$rootScope',function ($scope, $http,UserService,$location,$rootScope) {
    $scope.data = {
        "email": "",
        "password": ""
    }

    $scope.login = function(user, password) {
        UserService.login($scope.data).success(checklogin).error(faillogin);
    }

    function checklogin(data, status, headers, config) {
        localStorage.setItem('user', $scope.data.email);
        $location.path('/navigate');
    }

    function faillogin(data, status, headers, config) {
        if(status == 404){
            $rootScope.showNotification('Benutzer nicht gefunden!','error');
        }else{
            $rootScope.showNotification('Das Passwort ist nicht korrekt!','error');
        }
    }
}];