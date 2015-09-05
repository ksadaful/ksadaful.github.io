var connectItResources = angular.module('connectItResources', []);

connectItResources.factory('NeoResource', ['$resource', function ($resource) {
    var headers = {
        'Authorization': 'Basic bmVvNGo6aGFja2F0aG9u',
        'Accept': 'application/json;odata=verbose'
    };

    return $resource('http://server.mjshaw.com:7474/db/data/transaction/commit', null,
        {
            'get': { method: 'POST', headers: headers}
        });
}]);