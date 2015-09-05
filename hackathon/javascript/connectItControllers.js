var connectItControllers = angular.module('connectItControllers', ['connectItResources', 'connectItDirectives']);

connectItControllers.factory('getNeoData', ['NeoResource', function(NeoResource) {
    var logError = function (response) {
        console.log(response);
        window.response = response;
    };

    return function(statement, isArray, callback){
        NeoResource.get({}, {
            "statements": [
                {"statement": statement}
            ]
        }, function (response) {
            var result = null;
            if (isArray) {
                result = _.map(response.results[0].data, function (data) {
                    return data.row[0]
                })
            } else {
                result = response.results[0].data[0].row[0];
            }
            callback(result);
        }, logError);
    }
}]);