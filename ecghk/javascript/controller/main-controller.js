var mainApp = angular.module("mainApp", ['ngRoute']);

mainApp.config(['$routeProvider',
 function($routeProvider) {
    $routeProvider.
       when('/homepage', {
          templateUrl: 'html-templates/homepage.html'
       }).
       when('/about', {
          templateUrl: 'html-templates/about.html',
          controller: 'AboutCtrl'
       }).
       when('/clients', {
         templateUrl: 'html-templates/clients.html',
      }).
       when('/pagenotfound', {
                 templateUrl: 'html-templates/page-not-found.html'
              }).
       otherwise({
          redirectTo: '/homepage'
       });
 }]);

mainApp.controller('AboutCtrl', function($scope,  $http) {

       $http.get('website-data/leadership-team.json').
           success(function(data, status, headers, config) {
             $scope.leadership = data;
              console.log (data);
           }).
           error(function(data, status, headers, config) {
             alert("Could not retrieve data from server!");
           });

       $http.get('website-data/advisory-board.json').
          success(function(data, status, headers, config) {
            $scope.advisory = data;
             console.log (data);
          }).
          error(function(data, status, headers, config) {
            alert("Could not retrieve data from server!");
          });

          debugger;

      });