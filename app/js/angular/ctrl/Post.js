/**
 * Controller zum Anzeigen einer einzelnen Geschichte
 * Wenn ein Zeitstrahl vorhanden ist leitet er beim "Zurückbutton" automatisch auf diesen weiter,
 * falls nicht würden wir wieder auf dem Kompass landen
 */
var Post = ['$scope', '$http', 'MessageService', '$location', 'geolocation', '$stateParams',
    function($scope, $http, MessageService, $location, geolocation, $stateParams) {
        var route = $stateParams.id
        MessageService.getMessageById(route).success(showData);
        var message;
        $scope.href;

        function showData(data, status, headers, config) {
            message = data[0];
            message.photo = '/uploads/' + message.photo;
            message.date = message.date[0];
            $scope.message = message;
            MessageService.isTimelineAvailable(message.position).success(updateHref);
        }

        function updateHref(data, status, headers, config){
            if(data.length > 1){
                $scope.href = '/timeline/' + message.position[0] + '-' + message.position[1]; 
            }else {
                $scope.href = '/navigate'
            }
        }
    }
];