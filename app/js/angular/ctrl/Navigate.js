var Navigate = ['$scope', '$http','UserService','$location','geolocation',function ($scope, $http,UserService,$location,geolocation) {
	$scope.geoSet = false;
	$scope.p1;
	$scope.p2 = new LatLon(49.544964, 8.660270); 
	$scope.compass;

	window.addEventListener('deviceorientation', function(e) {
		$scope.compass = e.webkitCompassHeading;

		console.log(e.alpha)

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
		var heading = (brng - compass );
		//console.log(heading)
	}

	setInterval(function(){
		setCurrentGeo();
		isGeoSetted();
	},100)
}];