'use strict';

angular.module('myApp.view1', ['ngRoute','ngAnimate'])

.config(['$routeProvider','$animateProvider', function($routeProvider,$animateProvider) {
  $routeProvider.when('/', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });

}])

.controller('View1Ctrl', function($scope,$location,$timeout,$http) {
	$scope.user="patrick@patrick-fieger.com";
	$scope.fullname="Patrick Fieger";
	$scope.password="123";
	$scope.password_confirm="123";
	$scope.city="Weinheim";

	$scope.sendajax = function(){
		var data ={
			"user":$scope.user,
			"fullname":$scope.fullname,
			"password":$scope.password,
			"city":$scope.city
		}
		$http.put('http://localhost:5000/create',data).success(function(data){
			console.log(data)
		});
	}
});