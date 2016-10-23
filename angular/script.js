
var app=angular.module('ngView', ['ngRoute', 'ngAnimate']);

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider){
	$routeProvider.when('/Book/:bookId', {
		templateUrl:'book.html',
		controller:'BookCtrl',
		controllerAs:'book'
	});
	
//	$locationProvider.html5Mode(true);
}]);

app.controller('MainCtrl', ['$route', '$routeParams', '$location', function ($route, $routeParams, $location){
	this.$route=$route;
	this.$location=$location;
	this.$routeParams=$routeParams;
}]);

app.controller('BookCtrl', ['$routeParams', function ($routeParams){
	this.name='BookCtrl';
	this.params=$routeParams;
}]);

