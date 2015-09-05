var connectItControllers = angular.module('connectItControllers');

connectItControllers.controller('PersonCtrl', ['$scope', '$routeParams', 'getNeoData', function ($scope, $routeParams, getNeoData) {
    $scope.name = $routeParams.name;
    $scope.user = null;
    $scope.photoUrl = null;
    $scope.skills = null;
    $scope.projects = null;
    $scope.offices = null;
    $scope.department = null;
    $scope.colleagues = null;

    getNeoData("match (person {name: '" + $scope.name + "'}) return person", false, function (response) {
        $scope.user = response;

        image_url = 'img/'+ $scope.user.name + '.jpg';
        var http = new XMLHttpRequest();
        http.open('HEAD', image_url, false);
        http.send();
        if ( http.status != 404)
        {
            $scope.photoUrl = image_url
        }
        else
        {
            $scope.photoUrl = 'img/empty.jpg'
        }

    });

    getNeoData("match (person {name: '" + $scope.name + "'}), (person)-[contributed:CONTRIBUTOR]->(project) return {project: project, contributed: contributed}", true, function (response) {
        $scope.projects = response;


        var dataObject = {
            "timeline": {
                "headline": "Joined Credit Suisse",
                "type": "default",
                "text": "<p>Equity Derivatives IT</p>",

                "era": [
                    {
                        "startDate": "2010,12,10",
                        "endDate": "2016,12,11"
                    }
                ]
            }
        };

        dataObject.timeline.date = _.map($scope.projects, function (project) {
            var timePoint = {
                startDate: moment(project.contributed.start).format('YYYY,MM'),
                headline: project.project.name,
                text: '',
                asset: {
                    media: project.project.description
                }
            };

            if (project.contributed.end == undefined) {
                timePoint.endDate = moment().format('YYYY,MM')
            } else {
                timePoint.endDate = moment(project.contributed.end).format('YYYY,MM')
            }

            return timePoint;
        });

        createStoryJS({
            type: 'timeline',
            height: '450',
            source: dataObject,
            embed_id: 'timeline-js'
        });
    });

    getNeoData("match (person {name: '" + $scope.name + "'}), person-[location:LOCATED_IN]->office return {office: office, located_during: location}", true, function (response) {
        $scope.offices = response;
        $scope.currentOffice = _.find($scope.offices, function (office) {
            return office.located_during.end == undefined
        });
    });
    getNeoData("match (person {name: '" + $scope.name + "'}), person-[:IN_DEPARTMENT]->department return department", false, function (response) {
        $scope.department = response;
    });
    getNeoData("match (person {name: '" + $scope.name + "'}), person-[:CONTRIBUTOR]->project<-[:CONTRIBUTOR]-colleague return colleague", true, function (response) {
        $scope.colleagues = response;
    });
    getNeoData("match (person {name: '" + $scope.name + "'}), person-[:HAS_SKILL]->skill return skill", true, function (response) {
        $scope.skills = response;
    });
}]);