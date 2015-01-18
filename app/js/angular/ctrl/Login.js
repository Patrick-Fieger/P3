var Login = ['$scope', '$http','UserService','$location',function ($scope, $http,UserService,$location) {
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
        console.log(status);
    }
}];