var app = angular.module("mainApp");

app.service("clientService", function($http){


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

    this.put =function(details,url, callback){
        $http.put(url,details,{
            headers:{
                'Content-Type': 'application/json'
                
            }
        }).success(function(response){
            callback(response);
        }).error(function(error){
            callback(error);
        });
    }

    this.get =function(url, callback){
        $http.get(url,{
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