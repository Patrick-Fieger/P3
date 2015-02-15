/**
 * Controller zum Anzeigen des Zeitstrahls
 * 
 */
var Timeline = ['$scope', '$http', 'MessageService', '$location', 'geolocation', '$stateParams',
    function($scope, $http, MessageService, $location, geolocation, $stateParams) {    
        $scope.messages = [];
        var route = $stateParams.position.split('-');
        var width = $(window).width();
        var scrolloptions = {
            probeType: 3,
            eventPassthrough: true,
            scrollX: true,
            scrollY: false
        }
        var timeinnerfull,maxscrolltimeinnerfull,timelinefull,maxscrolltimeline;

        MessageService.getMessagesByLocation(route).success(updateTimeline);

        // Berechnet die Breiten des Zeistrahls
        function calculateWidths(){
            timeinnerfull = $('.time_inner li').size() * 290;
            maxscrolltimeinnerfull = timeinnerfull - width;
            timelinefull = $('.timeline_inner div').size() * 171;
            $('.timeline_inner').width(timelinefull);
            maxscrolltimeline = timelinefull - width;
            initiScroll();
        }

        // Initialisiert iScroll-Plugin --> Updates onScroll
        function initiScroll(){
            var timeWrapper = new IScroll('.time_wrapper', scrolloptions);
            var timeLineWrapper = new IScroll('.timeline_wrapper', scrolloptions);
    
            timeWrapper.on('scroll', function(event) {
                var scrollPos = parseInt(this.x) * (-1);
                var percent = (scrollPos / maxscrolltimeinnerfull);
                timeLineWrapper.scrollTo(-(maxscrolltimeline * percent),0)
            });
    
            timeLineWrapper.on('scroll', function(event) {
                var scrollPos = parseInt(this.x) * (-1);
                var percent = (scrollPos / maxscrolltimeline);
                timeWrapper.scrollTo(-(maxscrolltimeinnerfull * percent),0);
            });
        }
        
        // Bekommt die geladenen Messages und Updatet den Scope
        function updateTimeline(data, status, headers, config) {
            $scope.messages = data;

            for (var i = 0; i < $scope.messages.length; i++) {
                $scope.messages[i].date = $scope.messages[i].date[0]
            };

            setTimeout(function(){
                calculateWidths();
            },100)   
        }

        // Positioniert den Zeitstrahl im Browser
        $scope.setPositions = function(){
            $('.time_inner li').each(function(index, el) {
                $(this).find('a').find('p').css('margin-top',  (250 - ($(this).find('a').find('p').height()))/2 + 'px');
            });
        }
    }
];