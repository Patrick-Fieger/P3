angular.module('starter.services', [])
.service('DatabaseService', function($http){
	var url = 'http://localhost:5000/'
	
	var login = function(data){
		return $http.post(url + 'login', data)
	};

	var register = function(data){
		return $http.post(url + 'create', data)
	};


	var getMessagesAll = function(){

	};
	var getMessageById = function(id){
	
	};
	var getMessagesFromUser = function( user){

	};
	var getCountFromMessage = function(id){

	};
	var getPhotosFromMessage = function(id){

	};
	var getTitleFromMessage = function(id){

	};
	var getLocationFromMessage = function(id){

	};
	var getMessagesByLocation = function(longitude, latitude){

	};
	var getMessagesByTime = function(date){

	};
	var getMessagesByPeriod = function(from,  to){

	};



	var logout = function(user){

	};
	var updatePassword = function(oldpassword, newpassword){

	};
	var deleteAccount = function(user){

	};



	var deleteMessage = function(id){

	};
	var updateMessage = function(message, id){

	};
	var postMessage = function(message, id){

	};


	return{
		Login : login,
		Register : register,
		getMessagesAll : getMessagesAll,
		getMessageById : getMessageById,
		getMessagesFromUser : getMessagesFromUser,
		getCountFromMessage : getCountFromMessage,
		getPhotosFromMessage : getPhotosFromMessage,
		getTitleFromMessage : getTitleFromMessage,
		getLocationFromMessage : getLocationFromMessage,
		getMessagesByLocation : getMessagesByLocation,
		getMessagesByTime : getMessagesByTime,
		getMessagesByPeriod : getMessagesByPeriod,
		logout : logout,
		updatePassword : updatePassword,
		deleteAccount : deleteAccount,
		deleteMessage : deleteMessage,
		updateMessage : updateMessage,
		postMessage : postMessage
	}
});
