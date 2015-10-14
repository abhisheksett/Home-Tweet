
var domainUrl = "http://192.168.1.10:3000";
app.factory('chirpFactory', ['$http', function($http){

	return{
		appGet: function(url){
			return $http.get(domainUrl+url);
		},

		appPost: function(url, data){
			return $http.post(domainUrl+url, JSON.stringify(data));
		},

		appPut: function(url, data){
			return $http.put(domainUrl+url, data);
		},

		appDelete: function(url){
			return $http.delete(domainUrl+url);
		}
	}
}]);