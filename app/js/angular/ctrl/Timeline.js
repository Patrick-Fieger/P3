var timescrollbig = false;
var timescroll = false;

$.fn.scrollEnd = function(callback, timeout) {          
  $(this).scroll(function(){
    var $this = $(this);
    if ($this.data('scrollTimeout')) {
      clearTimeout($this.data('scrollTimeout'));
    }
    $this.data('scrollTimeout', setTimeout(callback,timeout));
  });
};

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


        function calculateWidths(){
            timeinnerfull = $('.time_inner li').size() * 290;
            maxscrolltimeinnerfull = timeinnerfull - width;

            timelinefull = $('.timeline_inner div').size() * 171;
            $('.timeline_inner').width(timelinefull);
            maxscrolltimeline = timelinefull - width;

            initiScroll();
        }


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
        
        function updateTimeline(data, status, headers, config) {
            console.log(data)
            $scope.messages = data;

            for (var i = 0; i < $scope.messages.length; i++) {
                $scope.messages[i].date = $scope.messages[i].date[0]
            };

            setTimeout(function(){
                calculateWidths();
            },100)

            
        }
    }
];