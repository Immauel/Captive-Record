angular.module('mainApp').controller('signinCtrl',function($scope,$routeParams,signinService,$location,$rootScope){
     $scope.login = function(){
     	signinService.post({email:$scope.email,password:$scope.password},"api/authenticate",function(response,err){
     		if(err){
     			alert(err.success);
     			console.log(err);
     		}
     		else{
     			
     			console.log(response);
     			if(response.success){
                    $rootScope.userDetails = response;
                    $rootScope.token = response.token;
                    $rootScope.userId = response.userId;
                    $rootScope.companyId = response.companyId;
     				$scope.changeRoute('#/clientHome');
     			}
     			else{
     				$scope.message= response.message;
     			}
     		}
            console.log($scope.token);
     	})
     }

     $scope.changeRoute = function(url, forceReload) {
        $scope = $scope || angular.element(document).scope();
        if(forceReload || $scope.$$phase) { // that's right TWO dollar signs: $$phase
            window.location = url;
        } else {
            $location.path(url);
            $scope.$apply($scope.token);
        }
      }

      

});

angular.module('mainApp').controller('signupCtrl',function($scope,$routeParams,signinService,$location,$rootScope){
    
     $scope.changeRoute = function(url, forceReload) {
        $scope = $scope || angular.element(document).scope();
        if(forceReload || $scope.$$phase) { // that's right TWO dollar signs: $$phase
            window.location = url;
        } else {
            $location.path(url);
            $scope.$apply($scope.token);
        }
      }

      $scope.user = {};

      $scope.signUp = function(){
        $scope.user.company="Default";
        signinService.post($scope.user,"api/addUser",function(response,err){
            if(err){
                
                console.log(err);
            }
            else{
                

                if(response.success){
                    console.log(response);
                    $rootScope.userDetails=response;
                    $rootScope.userId = response.userId;
                    $rootScope.token = response.token;
                    $scope.changeRoute('#/company');
                }
                else{
                    console.log(response);
                }
            }
        });
      }

});


angular.module('mainApp').controller('companyCtrl',function($scope,$routeParams,signinService,$location,$rootScope){
     

     $scope.changeRoute = function(url, forceReload) {
        $scope = $scope || angular.element(document).scope();
        if(forceReload || $scope.$$phase) { // that's right TWO dollar signs: $$phase
            window.location = url;
        } else {
            $location.path(url);
            $scope.$apply($scope.token);
        }
      }


      $scope.company = {};

      $scope.addCompany = function(){
       
        
        $scope.company.token = $rootScope.token;
        signinService.post($scope.company,"api/addCompany",function(response,err){
            if(err){
                //alert(err.success);
                console.log(err);
            }
            else{
                
                    $rootScope.companyId = response._id;
                    $scope.company.companyId = $rootScope.companyId;
                     $scope.company.userId = $rootScope.userId;
                    signinService.post($scope.company,"api/updateUser",function(response,err){
                        if(err){
                            //alert(err.success);
                            console.log(err);
                        }
                        else{
                            
                           
                            console.log(response);
                            $scope.changeRoute('#/clientHome');
                        }
                    });
            }
        });
      }
});

