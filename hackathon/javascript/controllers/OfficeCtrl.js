var connectItControllers = angular.module('connectItControllers');

connectItControllers.controller('OfficeCtrl', ['$scope', '$routeParams', 'getNeoData', function ($scope, $routeParams, getNeoData) {
    $scope.name = $routeParams.name;
    $scope.office = null;
    $scope.officeMembers = null;
    $scope.officeMapUrl = null;

    getNeoData("match (office {name: '" + $scope.name + "'}) return office", false, function (response) {
        $scope.office = response;

        $scope.officeMapUrl = 'http://google.com/maps?q='+ $scope.office.latitude + ',' + $scope.office.longitude;
    });

    getNeoData("match (office {name: '" + $scope.name + "'}), office <-[:LOCATED_IN]-person return person", true, function (response) {
        $scope.officeMembers = response;

        $scope.officeMembers = _.map( $scope.officeMembers, function(item)
                                                                            {
                                                                               image_url = 'img/'+ item.name + '.jpg';
                                                                               var http = new XMLHttpRequest();
                                                                               http.open('HEAD', image_url, false);
                                                                               http.send();
                                                                               if ( http.status == 404)
                                                                               {
                                                                                  image_url = 'img/empty.jpg'
                                                                               }
                                                                               return { name: item.name , role: item.role , photoUrl: image_url };
                                                                            } );

    });
}]);