angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,$http) {
  	$scope.d;
  	$http.get('http://localhost:5000/getusers').
		success(function(data, status, headers, config) {
		  $scope.d = data;
		}).
		error(function(data, status, headers, config) {
		  $scope.d = data;
		});
});