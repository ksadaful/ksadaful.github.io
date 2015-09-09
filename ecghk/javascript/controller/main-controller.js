var mainApp = angular.module("mainApp", ['ngRoute']);

mainApp.config(['$routeProvider',
 function($routeProvider) {
    $routeProvider.
       when('/homepage', {
          templateUrl: 'html-templates/homepage.html'
       }).
       when('/about', {
          templateUrl: 'html-templates/about.html'
       }).
       when('/pagenotfound', {
                 templateUrl: 'html-templates/page-not-found.html'
              }).
       otherwise({
          redirectTo: '/homepage'
       });
 }]);