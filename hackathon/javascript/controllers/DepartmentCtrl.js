var connectItControllers = angular.module('connectItControllers');

connectItControllers.controller('DepartmentCtrl', ['$scope', '$routeParams', 'getNeoData', function ($scope, $routeParams, getNeoData) {
    $scope.name = $routeParams.name;
    $scope.department = null;
    $scope.departmentMembers = null;

    getNeoData("match (department {name: '" + $scope.name + "'}) return department", false, function (response) {
        $scope.department = response;
    });

    getNeoData("match (department {name: '" + $scope.name + "'}), department<-[:IN_DEPARTMENT]-person return person", true, function (response) {
        $scope.departmentMembers = response;

        $scope.departmentMembers = _.map( $scope.departmentMembers, function(item)
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
                                                                    } )

    });

}]);