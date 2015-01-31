var url = 'http://project-go.me/server/';
angular.module('app.services', [])
.service('UserService', function($http){
	var login = function(data){
		return $http.post(url + 'login', data)
	};
	var register = function(data){
		return $http.post(url + 'create', data)
	};
	var logout = function(user){

	};
	var updatePassword = function(oldpassword, newpassword){

	};
	var deleteAccount = function(user){

	};

	return{
		login : login,
		register : register,
		logout : logout,
		updatePassword : updatePassword,
		deleteAccount : deleteAccount
	}
})
.service('MessageService', function($http){
	var getMessageById = function(id){
		return $http.post(url + 'messagebyid',{id:id})
	};
	
	var getNearestMessagesByLocation = function(position){
		return $http.post(url + 'messageslocation',{pos:position})
	};
	var getMessagesByLocation = function(position){
		return $http.get(url + 'allmessagesbylocation',{
			params: {
        	    position: position
        	}
		});
	};
	var isTimelineAvailable = function(position){
		return $http.get(url + 'timelineavailable',{
			params: {
        	    position: position
        	}
		});
	};
	var deleteMessage = function(id){

	};
	var postMessage = function(message){
		return $http.post(url + 'message', message)
	};
	var sendPhoto = function(photo){
		var formData = new FormData();
		formData.append('files', photo);

		return $http.post(url + 'photo', formData, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        });		
	};

	return {
		getMessageById : getMessageById,
		getNearestMessagesByLocation : getNearestMessagesByLocation,
		getMessagesByLocation : getMessagesByLocation,
		deleteMessage : deleteMessage,
		postMessage : postMessage,
		sendPhoto : sendPhoto,
		isTimelineAvailable : isTimelineAvailable
	}
}).directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]).service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function(file, uploadUrl){
        var fd = new FormData();
        fd.append('file', file);
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(){
        })
        .error(function(){
        });
    }
}]);



