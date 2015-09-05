var connectItDirectives = angular.module('connectItDirectives');

connectItDirectives.directive('search', [function () {
    return {
        templateUrl: 'partials/searchBarTemplate.html',
        controller: "SearchBarCtrl"
    }
}]);

