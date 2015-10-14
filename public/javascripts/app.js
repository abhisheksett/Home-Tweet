
var app = angular.module('chirpApp',[]);

app.config(function($routeProvider){
	$routeProvider.when('/chirp',{
		templateUrl: 'templates/chirp.html',
		controller: 'chirpController'
	})
	.when('/register',{
		templateUrl: 'templates/register.html',
		controller: 'authController'
	})
	.when('/login',{
		templateUrl: 'templates/login.html',
		controller: 'loginController'
	})
	.otherwise({
        redirectTo: '/chirp'
    });
}).run(['chirpFactory','$rootScope','$location',function(chirpFactory, $rootScope, $location){
	if(window.sessionStorage.getItem('user')){
		$rootScope.isAuthenticated = true;
		$rootScope.current_user = window.sessionStorage.getItem('user');
	}else{
		$rootScope.isAuthenticated = false;
		$rootScope.current_user = "";
	}

	$rootScope.signOut = function(event){
		event.preventDefault();
		chirpFactory.appGet('/auth/signout').success(function(data){
			$rootScope.isAuthenticated = false;
			$rootScope.current_user = "";
			window.sessionStorage.removeItem('user');
			$location.path('/login');
		});
	};

	/*$rootScope.$on("$routeChangeStart", function(event, next, current) {
		if(next.templateUrl == "templates/chirp.html"){
			if(!window.sessionStorage.getItem('user')){
				$location.path('/login');
			}
		}
	});*/
}]);

app.controller('mainController',['$scope', function($scope){

}]);