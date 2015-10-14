
app.controller('authController',['$scope','chirpFactory','$location', function($scope, chirpFactory,$location){

	$scope.user = {username: '', password: ''};
	$scope.error_message = "";

	$scope.register = function(){
		//$scope.error_message = "Registration request for "+$scope.user.username;
		chirpFactory.appPost('/auth/signup',$scope.user).success(function(data){
			if(data.state == 'success'){
				$location.path('login');
			}else{
				$scope.error_message = data.message;
			}
		}).error(function(data){
			console.log(data);
		});
	};
}]);