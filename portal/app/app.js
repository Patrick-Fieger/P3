'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ngAnimate',
  'myApp.view1',
  'myApp.view2',
  'myApp.view3'
  // 'myApp.version'
]).
config(['$routeProvider','$animateProvider', function($routeProvider,$animateProvider) {
  $routeProvider.otherwise({redirectTo: '/'});
}])
.run(function($rootScope) {
    $rootScope.$on('$routeChangeSuccess', function(ev, to, toParams, from, fromParams) {
        $('body').scrollTop(0);
        $('.spinner').removeClass('active');
    });
});