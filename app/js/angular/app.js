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
        })
        .state("/timeline/:position", {
            url: "/timeline/:position",
            controller: "Timeline",
            templateUrl: "js/templates/timeline.html"
        });
    }
]);
var ctrl = angular.module('app.ctrl', ['ngAnimate'])
.controller('Login', Login)
.controller('Register', Register)
.controller('Navigate', Navigate)
.controller('Message', Message)
.controller('Post', Post)
.controller('Timeline', Timeline)


app.run(['$rootScope','$timeout',function($rootScope,$timeout) {
    $rootScope.$on('$viewContentLoaded', function() {
        if($(window).scrollTop() > 0){
            $('html,body').animate({scrollTop: 0}, 750, 'easeInOutExpo');
        }

        $timeout(function(){
            NProgress.done();
        },5000);
    });

    $rootScope.showNotification = function(text){
        $rootScope.notibool = true;
        $rootScope.alerttext = text;
        $timeout(function(){
            $rootScope.notibool = false;
        },6000)
    }

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
        var zahl = parseFloat(input);
        if(zahl >= 1){
            zahl = zahl.toFixed(1);
            return zahl + ' km'
        }else{
            zahl = zahl.toFixed(3);
            zahl = zahl.split('.')[1];
            if(zahl.charAt(0) == "0" && zahl.charAt(1) == "0"){
                return zahl.charAt(2) + ' m'
            }else if(zahl.charAt(0) == "0"){
                return zahl.charAt(1) + zahl.charAt(2) + ' m'
            }else{
                return zahl + ' m'
            }
        }
    }
});

app.filter('formatdate', function () {
    return function (date) {
        if(date !== undefined){
            var monatalswort = [['01', 'Januar'],['02', 'Februar'],['03', 'März'],['04', 'April'],['05', 'Mai'],['06', 'Juni'],['07', 'Juli'],['08', 'August'],['09', 'September'],['10', 'Oktober'],['11', 'November'],['12', 'Dezember']];
            var formatdate = date.split('-');
            var tag = formatdate[2];
            var jahr = formatdate[0];
            var monat = function() {
                for (var i = 0; i < monatalswort.length; i++) {
                    if (formatdate[1] == monatalswort[i][0]) {
                        return monatalswort[i][1]
                    }
                };
            }
            return tag + '. ' + monat() + ' ' + jahr
        }
    }
});


app.filter('onlyyear', function () {
    return function (date) {
        if(date !== undefined){
            var formatdate = date.split('-');
            var jahr = formatdate[0];
            return jahr
        }
    }
});


