var Register = ['$scope', '$http','UserService','$location',function ($scope, $http,UserService,$location) {
    $scope.data = {
        "email": "",
        "password": ""
    }
    $scope.register = function() {
        UserService.register($scope.data).success(registersucess).error(registerfail);
    }

    function registersucess(data) {
        console.log(data)
    }

    function registerfail() {
        console.log('registerfail')
    }
}];