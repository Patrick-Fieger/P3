var Login = ['$scope', '$http','UserService',function ($scope, $http,UserService) {
    $scope.data = {
        "email": "",
        "password": ""
    }
    

    $http.post('http://project-go.me/server/test', $scope.data)  

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
}];