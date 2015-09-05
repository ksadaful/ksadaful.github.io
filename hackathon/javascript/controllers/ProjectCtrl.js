var connectItControllers = angular.module('connectItControllers');

connectItControllers.controller('ProjectCtrl', ['$scope', '$routeParams', 'getNeoData', function ($scope, $routeParams, getNeoData) {
    $scope.name = $routeParams.name;
    $scope.project = null;
    $scope.contributors = null;
    $scope.technologies = null;
    $scope.contributor_data = null

    getNeoData("match (project {name: '" + $scope.name + "'}) return project", false, function (response) {
        $scope.project = response;
    });

    getNeoData("match (project {name: '" + $scope.name + "'}), project<-[contributed:CONTRIBUTOR]-contributor return {contributor: contributor, contributed: contributed}", true, function (response) {
        $scope.contributors = response;

        $scope.contributor_data = _.map($scope.contributors, function (object)
            {
                image_url = 'img/'+object.contributor.name+'.jpg';
                var http = new XMLHttpRequest();
                http.open('HEAD', image_url, false);
                http.send();
                if ( http.status == 404)
                {
                    image_url = 'img/empty.jpg'
                }

                var data = {
                    startDate: moment(object.contributed.start).format('MMMM , YYYY'),
                    name: object.contributor.name,
                    photoUrl: image_url
                }

                if (object.contributed.end == undefined) {
                    data.endDate = 'Present'
                } else {
                    data.endDate = moment(object.contributed.end).format('MMMM , YYYY')
                }
                return data;
            });

    });

    getNeoData("match (project {name: '" + $scope.name + "'}), project-[created:CREATED_USING]->technology return technology", true, function (response) {
        $scope.technologies = response;
    });



}]);