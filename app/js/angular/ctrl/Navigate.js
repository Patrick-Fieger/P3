var Navigate = ['$scope', '$http','UserService','$location','geolocation',function ($scope, $http,UserService,$location,geolocation) {
	$scope.geoSet = false;
	$scope.p1;
	$scope.p2 = new LatLon(49.544964, 8.660270); 
	$scope.compass;
	$scope.alpha

	window.addEventListener('deviceorientation', function(e) {
		$scope.compass = e.webkitCompassHeading;
		$scope.alpha = e.alpha
	}, false);

	function isGeoSetted(){
		if($scope.geoSet == true){
			calculateDistanceAndBearing($scope.compass);
		}	
	}

	function setCurrentGeo(){
		geolocation.getLocation({enableHighAccuracy: true}).then(function(data){
			$scope.p1 = new LatLon(data.coords.latitude, data.coords.longitude);                                                  
			$scope.geoSet = true
		});
	}
	
	function calculateDistanceAndBearing (compass) {
		var dist = $scope.p1.distanceTo($scope.p2);
		var brng = $scope.p1.bearingTo($scope.p2);
		var rotade = 360 - compass;
		var heading = 0 + brng;
		$(".compass").css({ "transform": "rotate(" + rotade + "deg)"});
		$(".compass_item").css({ "transform": "rotate(" + heading + "deg)"});
		$(".compass_item p").css({ "transform": "rotate(" + -(rotade + heading)  + "deg)"});
	}

	$scope.showmessage = function(){
		$('.container').addClass('active');
		setTimeout(function(){
			$('.messageform').addClass('active');
		},300)
	}

	setInterval(function(){
		setCurrentGeo();
		isGeoSetted();
	},100)
}];