
app.controller('loginController',['$scope','chirpFactory','$rootScope','$location', function($scope, chirpFactory, $rootScope, $location){

	$scope.user = {username: '', password: ''};
	$scope.error_message = "";

	$scope.login = function(){
		//$scope.error_message = "Registration request for "+$scope.user.username;
		chirpFactory.appPost("/auth/login", $scope.user).success(function(data){
			if(data.state == 'success'){
				$rootScope.isAuthenticated = true;
				$rootScope.current_user = data.user.username;
				window.sessionStorage.setItem('user',$rootScope.current_user);
				$location.path('/chirp');
			}else{
				$scope.error_message = data.message;
			}
		}).error(function(data){
			console.log(data);
			$scope.error_message = data.message;
		});
	};
}]);