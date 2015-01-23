var app = angular.module('p3', ['ui.router','ngSanitize','ngAnimate','app.ctrl','app.services','geolocation']);
app.config([
    '$locationProvider','$stateProvider','$urlRouterProvider','$animateProvider',
    function($locationProvider,$stateProvider,$urlRouterProvider,$animateProvider) {
        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise("/login");

        $stateProvider
        .state("/", {
            url: "/",
            controller: "Login",
            templateUrl: "js/templates/login.html"
        })
        .state("/login", {
            url: "/login",
            controller: "Login",
            templateUrl: "js/templates/login.html"
        })
        .state("/register", {
            url: "/register",
            controller: "Register",
            templateUrl: "js/templates/register.html"
        })
        .state("/navigate", {
            url: "/navigate",
            controller: "Navigate",
            templateUrl: "js/templates/navigate.html"
        })
        .state("/message", {
            url: "/message",
            controller: "Message",
            templateUrl: "js/templates/message.html"
        })
        .state("/post/:id", {
            url: "/post/:id",
            controller: "Post",
            templateUrl: "js/templates/post.html"
        });
    }
]);
var ctrl = angular.module('app.ctrl', ['ngAnimate'])
.controller('Login', Login)
.controller('Register', Register)
.controller('Navigate', Navigate)
.controller('Message', Message)
.controller('Post', Post)


app.run(['$rootScope','$timeout',function($rootScope,$timeout) {
    $rootScope.$on('$viewContentLoaded', function() {
        if($(window).scrollTop() > 0){
            $('html,body').animate({scrollTop: 0}, 750, 'easeInOutExpo');
        }

        $timeout(function(){
            NProgress.done();
        },5000);
    });

    $rootScope.$on('$stateChangeStart', function(ev, to, toParams, from, fromParams) {
        NProgress.start();
    });
}]);


app.directive('a', function() {
    return {
        restrict: 'E',
        link: function(scope, elem, attrs) {
            if (attrs.ngClick || attrs.href === '' || attrs.href === '#') {
                elem.on('click', function(e) {
                    e.preventDefault();
                });
            }
        }
    };
});

app.directive('onFinishRender',['$timeout', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                scope.$evalAsync(attr.onFinishRender);
            }
        }
    };
}]);

app.filter('distance', function () {
    return function (input) {
        var zahl = parseFloat(input)
        if(zahl >= 1){
            zahl = zahl.toFixed(1);
            return zahl + ' km'
        }else{
            zahl = zahl.toFixed(3);
            zahl = zahl.split('.')[1]
            return zahl + ' m'
        }
    }
});

