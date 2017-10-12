var app = angular.module("mainApp");

app.service("signinService", function($http){


    this.post =function(details,url, callback){
        $http.post(url,details,{
            headers:{
                'Content-Type': 'application/json'
            }
        }).success(function(response){
            callback(response);
        }).error(function(error){
            callback(error);
        });
    }
})