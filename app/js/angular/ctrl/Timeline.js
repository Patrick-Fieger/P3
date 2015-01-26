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
        


        var route = $stateParams.position.split('-');
        var width = $(window).width();
        var timeinnerfull = $('.time_inner').width();
        var maxscrolltimeinnerfull = timeinnerfull - width;

        var timelinefull = $('.timeline_inner').width();
        var maxscrolltimeline = timelinefull - width;

        $('.time_wrapper').scroll(function(event) {
            console.log(event.target.scrollLeft)
            if(timescroll == false){
                timescrollbig = true;
                var scrollpos = $(this).scrollLeft();
                var percent = (scrollpos / maxscrolltimeinnerfull);
                $('.timeline_wrapper').scrollLeft(maxscrolltimeline * percent);
            } 
        });

        $('.time_wrapper').scrollEnd(function(){
            timescrollbig = false;
        }, 100);

        $('.timeline_wrapper').scroll(function(event) {
            if(timescrollbig == false){
                timescroll = true;
                var scrollpos = $(this).scrollLeft();
                var percent = (scrollpos / maxscrolltimeline);
                $('.time_wrapper').scrollLeft(maxscrolltimeinnerfull * percent);
            }
        });

        $('.timeline_wrapper').scrollEnd(function(){
            timescroll = false;
        }, 100);


        // MessageService.getMessageById(route).success(showData);

        // function showData(data, status, headers, config) {
        //     var message = data;
        //     message.photo = '/uploads/' + message.photo;
        //     message.date = formatDate(message.date[0]);
        //     $scope.message = message;
        // }


    }
];