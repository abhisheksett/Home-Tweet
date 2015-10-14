
app.controller('chirpController',['$scope','chirpFactory','$rootScope','$timeout',
	 function($scope, chirpFactory, $rootScope, $timeout){
	$scope.posts = [];
	$scope.newPost = {
		username: '',
		text: '',
		created_at: ''
	};
	//$scope.updateInProgress = false;


	$scope.post = function(){
		$scope.newPost.created_at = Date.now();
		$scope.newPost.username = $rootScope.current_user;
		chirpFactory.appPost('/api/posts',$scope.newPost).success(function(data){
			$scope.posts.unshift($scope.newPost);
			$scope.newPost = {username: '',text: '',created_at: ''};
		}).error(function(data){
			console.log(data);
		});
		
	};

	$scope.getAllChirps = function(){
		chirpFactory.appGet('/api/posts').success(function(data){
			$scope.posts = data;
		}).error(function(data){
			console.log(data);
		});
	},

	$scope.deletePost = function(id){
		if(confirm("Do you want to delete the Post??")){
		chirpFactory.appDelete('/api/posts/'+id).success(function(data){
			//$scope.posts.splice(index,1);
			for(var i=0; i<$scope.posts.length; i++){
				if($scope.posts[i]._id==id){
					$scope.posts.splice(i,1);
					break;
				}
			}
		}).error(function(data){
			console.log(data);
		});
		}
	},

	$scope.updatePost = function(id){
		//var id=$scope.posts[index]._id;
		var result = $scope.posts.filter(function(e){ 
			return e._id == id; })[0];
		chirpFactory.appPut('/api/posts/'+id,result).success(function(data){
			//$scope.updateInProgress = false;
		}).error(function(data){
			console.log(data);
		});
	}

}]);