angular.module("mainApp", ['ngRoute']).config(['$routeProvider',function($routeProvider) {
       $routeProvider.when('/landing', {templateUrl: 'app/landing/landing.html', controller: 'landingCtrl'}).
       when('/login', { templateUrl: 'app/signin/login.html', controller: 'signinCtrl' }).
       when('/signup', { templateUrl: 'app/signin/signup.html', controller: 'signupCtrl' }).
       when('/company', { templateUrl: 'app/signin/company.html', controller: 'companyCtrl' }).
       when('/clientHome', { templateUrl: 'app/application/Client/index.html', controller: 'clientHomeCtrl' }).
       when('/gapprogress', { templateUrl: 'app/application/Client/gapproccess.html', controller: 'progressCtrl' }).
       when('/gapReport', { templateUrl: 'app/application/Client/gapReport.html', controller: 'reportCtrl' }).
       when('/policy', { templateUrl: 'app/application/Client/policy.html', controller: 'policyCtrl' }).
       when('/user', { templateUrl: 'app/application/Client/user.html', controller: 'userCtrl' }).
       when('/pricing', {templateUrl: 'app/landing/pricing.html'}).
       when('/support', {templateUrl: 'app/landing/support.html'}).
       otherwise({redirectTo: '/landing' });
}]);