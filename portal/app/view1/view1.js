'use strict';

angular.module('myApp.view1', ['ngRoute','ngAnimate'])

.config(['$routeProvider','$animateProvider', function($routeProvider,$animateProvider) {
  $routeProvider.when('/', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });

}])

.controller('View1Ctrl', ['$scope','$location','$timeout',function($scope,$location,$timeout) {
	$scope.user="";
	$scope.password="";


	$scope.sendForm = function(){
		$('#login,.spinner').addClass('active');
		$timeout(function(){
			$location.path("/kategorien");
		},3000)
	}

}]);