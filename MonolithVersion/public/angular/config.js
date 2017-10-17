angular.module("mainA", ['ngRoute']).config(['$routeProvider',function($routeProvider) {
       $routeProvider.when('/view1', {templateUrl: 'view1.html', controller: 'view1Ctrl'}).
       when('/view2', { templateUrl: 'view2.html', controller: 'view2Ctrl' })
       otherwise({redirectTo: '/index.html' });
}]);