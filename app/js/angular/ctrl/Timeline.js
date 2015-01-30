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
        var timeinnerfull = $('.time_inner').width();
        var maxscrolltimeinnerfull = timeinnerfull - width;

        var timelinefull = $('.timeline_inner').width();
        var maxscrolltimeline = timelinefull - width;

        var scrolloptions = {
            probeType: 3,
            eventPassthrough: true,
            scrollX: true,
            scrollY: false
        }

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

        MessageService.getMessagesByLocation(route).success(updateTimeline);

        function updateTimeline(data, status, headers, config) {
            //$scope.messages = data;
            var test = []

            for (var i = 0; i < 10; i++) {
                test.push(data)
            };

            setTimeout(function(){
                $scope.messages = test;
            },4000)
        }
    }
];