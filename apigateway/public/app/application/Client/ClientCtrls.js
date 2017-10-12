angular.module('mainApp').controller('clientHomeCtrl',function($scope,$routeParams,$location,$rootScope,clientService){
	$scope.userD = $rootScope.userDetails;
	
});


angular.module('mainApp').controller('progressCtrl',function($scope,$routeParams,$location,$rootScope,clientService){

	$scope.currentResult= {};
	$scope.gapCtrl =0;
	
	$scope.changeRoute = function(url, forceReload) {
        $scope = $scope || angular.element(document).scope();
        if(forceReload || $scope.$$phase) { // that's right TWO dollar signs: $$phase
            window.location = url;
        } else {
            $location.path(url);
            $scope.$apply($scope.token);
        }
     }
     $scope.getProgress = function(resultsLength,questionsLength){
    
		return (resultsLength/questionsLength)*100;
     };
     

	if($rootScope.token){
		$scope.userD = $rootScope.userDetails;
		$scope.$emit('LOAD');
		clientService.post({token: $rootScope.token},'api/questions',function(results,err){
		 	if(err){
		 		alert("Something went wrong!");
		 		console.log(err);
		 	}else{

		 		$scope.questions = results;
		 		
		 		console.log(results);
		 		
		 	}
		 	
		 });
       
		clientService.post({
			token: $rootScope.token,
			companyId: $rootScope.companyId
		},'api/getResult',function(response,err){
			if(err){
				alert("Something went wrong");
				console.log(err);
			}else{
				console.log(response);

				$scope.gapResult = response;
				$rootScope.globalGapResult = response;

				$scope.progres = $scope.getProgress($scope.gapResult.results.length,$scope.questions.length);
				console.log($scope.progres);
				if($scope.progres==0){
		            $scope.currentResult = $scope.questions[0];
		            $scope.gapCtrl = 0;
		        }else{
		        	var lastGapResult = $scope.gapResult.results[$scope.gapResult.results.length-1];

		        	$scope.gapCtrl = $scope.gapResult.results.length-1;

		        	console.log(lastGapResult);

		        	$scope.currentResult.qnumber = lastGapResult.qnumber;

		        	$scope.currentResult.Questions = lastGapResult.ans;

		        	$scope.currentResult.purpose = lastGapResult.purpose;

		        }

		        $scope.progres = $scope.getProgress($scope.gapResult.results.length,$scope.questions.length);

		        if($scope.progres==100){
		        	$scope.changeRoute("#/gapReport");

		        }else{
		        	$scope.$emit('UNLOAD');
		        }
			}
		});
	
	}else{
		$scope.changeRoute("#/login");

	}

	$scope.next = function(){
		//This is validating if all question where answered before the user proceeds
		var isNext = true;
		for(var i=0;i< $scope.currentResult.Questions.length;i++){

			if($scope.currentResult.Questions[i].value == undefined){
				isNext =false;
			}
		}
		if(isNext){
			if($scope.progres!=0){

				$scope.gapResult.results[$scope.gapCtrl] = $scope.currentResult;
			}
			else{
				//if there is not progress, the first element in gap results will updated to 
				//current Result / (Question being answered)
				$scope.gapResult.results[0] = $scope.currentResult;
			}


			$scope.gapResult.results[$scope.gapCtrl].ans = $scope.currentResult.Questions;

			console.log($scope.gapResult);

			var body ={
				gapResult:$scope.gapResult,
				token: $rootScope.token
			}

			clientService.post(body,'/api/updateGapResult',function(response,err){

				if(err){
					alert('Something went wrong!');
					console.log(err);
				}else{
					//updating the progress of gap analysis
					$scope.progres = $scope.getProgress($scope.gapResult.results.length,$scope.questions.length);

					$scope.gapCtrl = $scope.gapCtrl+1;

					if($scope.questions.length!=$scope.gapResult.results.length){
						$scope.currentResult = $scope.questions[$scope.gapCtrl];
						$scope.gapResult.results[$scope.gapCtrl] = $scope.currentResult;

					} else{
						$scope.changeRoute('#/gapReport');
					}
					
				}

			});
		}
		else{
			alert("OOPs, It seems like you haven't answered all questions");
		}

		

	}

	//This Function reset gapAnalysis
	$scope.reset = function(){
		$scope.gapResult.results=[];
		var body ={
			gapResult:$scope.gapResult,
			token: $rootScope.token
		}
		clientService.post(body,'/api/updateGapResult',function(response,err){
			 $scope.currentResult = $scope.questions[0];
		     $scope.gapCtrl = 0;
		     $scope.progres = $scope.getProgress($scope.gapResult.results.length,$scope.questions.length);
		});
	}

	//This function set a gap analysis to yes or no
	$scope.setValue = function(question, value){

		for(var i=0;i< $scope.currentResult.Questions.length;i++){

			if($scope.currentResult.Questions[i].qnum == question.qnum){
				$scope.currentResult.Questions[i].value = value;
			}
		}
	}

     
});

angular.module('mainApp').controller('reportCtrl',function($scope,$routeParams,$location,$rootScope,clientService){
	$scope.$emit('UNLOAD');
   
    $scope.changeRoute = function(url, forceReload) {
        $scope = $scope || angular.element(document).scope();
        if(forceReload || $scope.$$phase) { // that's right TWO dollar signs: $$phase
            window.location = url;
        } else {
            $location.path(url);
            $scope.$apply($scope.token);
        }
     }

   if($rootScope.token){


   	$scope.userD = $rootScope.userDetails;
   	 clientService.post({
     	token: $rootScope.token,
     	companyId:$rootScope.companyId
     },'/api/finalResults',function(response,err){
     	if(err){
     		alert("Something went wrong!");
     	}
     	else{

     		$scope.Results = response;
     	}
     });
   }else{
   	$scope.changeRoute("#/login");
   }
	

    

	$scope.reset = function(){
		console.log($rootScope.globalGapResult);
		$rootScope.globalGapResult.results=[];
		var body ={
			gapResult:$rootScope.globalGapResult,
			token: $rootScope.token
		}
		clientService.post(body,'/api/updateGapResult',function(response,err){
			 $scope.changeRoute('#/gapprogress');
		});
	}
});
angular.module('mainApp').controller('policyCtrl',function($scope,$routeParams,$location,$rootScope,clientService){
	$scope.$emit('UNLOAD');
	
});

angular.module('mainApp').controller('userCtrl',function($scope,$routeParams,$location,$rootScope,clientService){
	$scope.$emit('UNLOAD');
	
});

angular.module('mainApp').controller('loadCtrl',function($scope){
	
	$scope.$on('LOAD', function(){$scope.loading=true;});
	$scope.$on('UNLOAD',function(){$scope.loading=false;});
	
});