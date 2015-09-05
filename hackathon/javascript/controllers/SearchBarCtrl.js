var connectItControllers = angular.module('connectItControllers');

connectItControllers.controller('SearchBarCtrl', ['$scope', '$routeParams', 'getNeoData', function ($scope, $routeParams, getNeoData) {

       $scope.data = null;

        getNeoData("match (n) where n.name =~ '(?i).*.*' and (n:Person or n:Project or n:Department or n:Office) return {labels: labels(n), item: n}", true, function (response) {
            $scope.data = response;
            var i = 0;
            var source = _.map($scope.data, function(item){
                return { id: i++, name: item.item.name + ' | ' +item.labels[0] };
            });

            $('.demo1').typeahead({
                            source: source
                    });


             $('#navBarSearch input').keypress(function (e) {
                 if (e.keyCode == 13) {
                    var str = $('.demo1').val();
                    var res = str.split("|");
                    var url = "#/" + res[1].trim().toLowerCase() + "/" +  res[0].trim();
                    location.href = url;
                 }
             });

        });




}]);