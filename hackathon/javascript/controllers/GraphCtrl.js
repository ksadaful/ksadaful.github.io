var connectItControllers = angular.module('connectItControllers');

connectItControllers.controller('GraphCtrl', ['$scope', 'getNeoData', 'NeoResource', function ($scope, getNeoData, NeoResource) {

    $scope.sourceSearchString = '';
    $scope.sourceList = null;
    $scope.source = 'Matthew Shaw';
    $scope.destinationSearchString = '';
    $scope.destinationList = null;
    $scope.destination = 'Tiger';

    $scope.onGraphSearch = function () {
        $scope.sourceSearchString =  $('#source input').val().split("|")[0].trim();
        $scope.destinationSearchString =  $('#destination input').val().split("|")[0].trim();
        getGraphData("match p=shortestPath((source {name: '"+$scope.sourceSearchString+"'})-[r:CONTRIBUTOR*1..10]-(destination {name: '"+$scope.destinationSearchString+"'})) RETURN extract(n IN nodes(p)| {id: n.name, label: n.name}) as nodes, extract(r in relationships(p)| {relationship: r, from: startnode(r).name, to: endnode(r).name, label: type(r)}) as relationships", true, function () {

            var nodes_cleaned = _.map($scope.nodes, function(item){
                                        return { id: item.label , shape: 'circularImage', image: 'img/'+item.label+'.jpg', label: item.label };
                                    });

            var edges_cleaned = _.map($scope.edges, function(item){
                                                    return { from: item.from , to: item.to , label: item.label.toLowerCase() };
                                            });

                                            toastr.success('Are you the six fingered man?', 'Inigo Montoya');

            var nodes = new vis.DataSet(nodes_cleaned);
            var edges = new vis.DataSet(edges_cleaned);


            var container = document.getElementById('graph');

            var data = {
                nodes: nodes,
                edges: edges
            };
            var options = {
                nodes: {
                    shape: 'dot',
                    borderWidth:4,
                      size:30,
                      color: {
                        border: '#222222',
                        background: '#666666'
                      },
                },

              physics: {
                forceAtlas2Based: {
                    gravitationalConstant: -26,
                    centralGravity: 0.004,
                    springLength: 200,
                    springConstant: 0.10
                },
                maxVelocity: 0,
                solver: 'forceAtlas2Based',
                timestep: 0.35,
                stabilization: {iterations: 150}
              },
                edges: {
                    arrows: {
                        to: {
                            enabled: true
                        }
                    },
                }
            };

            var network = new vis.Network(container, data, options);
        });
    };

    var getGraphData = function (statement, isArray, callback) {
        NeoResource.get({}, {
            "statements": [
                {"statement": statement}
            ]
        }, function (response) {


            var data = response.results[0].data[0];
            if( data != undefined)
            {
                $scope.edges = data.row[1];
                $scope.nodes = data.row[0];
            }
            callback();
        }, logError);
    };

    var logError = function (response) {
        console.log(response);
        window.response = response;
    };

}]);