var mainApp = angular.module('mainApp',['ngResource','ngRoute']);

mainApp.config(['$routeProvider','$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.
       when('/homepage', {
          templateUrl: 'html-templates/homepage.html',
          controller: 'HomeCtrl'
       }).
       when('/about/', {
          templateUrl: 'html-templates/about.html',
          controller: 'AboutCtrl'
       }).
       when('/about/:section', {
             templateUrl: 'html-templates/about.html',
             controller: 'AboutCtrl'
        }).
       when('/clients', {
         templateUrl: 'html-templates/clients.html',
         controller: 'ClientsCtrl'
      }).
       when('/join-us', {
            templateUrl: 'html-templates/join-us.html',
            controller: 'JoinUsCtrl'
        }).
       when('/pagenotfound', {
                 templateUrl: 'html-templates/page-not-found.html'
              }).
       otherwise({
          redirectTo: '/homepage'
       });
 }]);

mainApp.controller('AboutCtrl', ['$scope','$routeParams', '$http' , '$window', '$resource', '$timeout' , '$anchorScroll',function($scope, $routeParams, $http, $window, $resource, $timeout, $anchorScroll) {

       $http.get('website-data/leadership-team.json').
           success(function(data, status, headers, config) {
             $scope.leadership = data;
           }).
           error(function(data, status, headers, config) {
             alert("Could not retrieve data from server!");
           });

       $http.get('website-data/advisory-board.json').
          success(function(data, status, headers, config) {
            $scope.advisory = data;
          }).
          error(function(data, status, headers, config) {
            alert("Could not retrieve data from server!");
          });
        $window.scrollTo(0,0);
        $scope.section = $routeParams.section;
        if ($scope.section == null) return;
        $timeout(function() {
            $('html, body').animate({ scrollTop: ($('#'+$scope.section).offset().top)-50 }, 'slow');
        }, 500);
}]);

mainApp.controller('JoinUsCtrl', ['$scope','$routeParams', '$window',function($scope, $routeParams, $window) {
        $window.scrollTo(0,0);
}]);

mainApp.controller('ClientsCtrl', ['$scope','$routeParams', '$window',function($scope, $routeParams, $window) {
        $window.scrollTo(0,0);
}]);

mainApp.controller('HomeCtrl', ['$scope','$routeParams','$http' , '$window',function($scope, $routeParams,$http , $window) {

         $http.get('website-data/current-clients.json').
                   success(function(data, status, headers, config) {
                     $scope.currentClients = data;
                     console.log($scope.currentClients);
                   }).
                   error(function(data, status, headers, config) {
                     alert("Could not retrieve data from server!");
                   });



        $window.scrollTo(0,0);
}]);

