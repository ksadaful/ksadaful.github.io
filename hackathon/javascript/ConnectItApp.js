var connectItApp = angular.module('connectItApp', ['ngResource', 'ngRoute', 'connectItControllers']);

connectItApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/person/:name', {
                templateUrl: 'partials/personTemplate.html',
                controller: 'PersonCtrl'
            }).
            when('/project/:name', {
                templateUrl: 'partials/projectTemplate.html',
                controller: 'ProjectCtrl'
            }).
            when('/department/:name', {
                templateUrl: 'partials/departmentTemplate.html',
                controller: 'DepartmentCtrl'
            }).
            when('/office/:name', {
                templateUrl: 'partials/officeTemplate.html',
                controller: 'OfficeCtrl'
            }).
            when('/graph', {
                templateUrl: 'partials/graphTemplate.html',
                controller: 'GraphCtrl'
            }).
            otherwise({
                redirectTo: '/person/Matthew Shaw'
            });
    }]);