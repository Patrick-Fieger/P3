var Post = ['$scope', '$http', 'MessageService', '$location', 'geolocation', '$stateParams',
    function($scope, $http, MessageService, $location, geolocation, $stateParams) {
        var route = $stateParams.id
        MessageService.getMessageById(route).success(showData);

        function showData(data, status, headers, config) {
            var message = data;
            message.photo = '/uploads/' + message.photo;
            message.date = formatDate(message.date[0]);
            $scope.message = message;
        }

        function formatDate(date) {
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
];