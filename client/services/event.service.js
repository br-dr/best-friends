(function() {
    'use strict';

    angular.module('app')
        .factory('EventService', EventService);

    EventService.$inject = ['$http'];

    function EventService($http) {
        return {
            getEventById: getEventById
        };

        function getEventById(id) {
            return $http.get('/api/event/' + id)
                .then(function(response) {
                    return response.data;
                });
        }
    }
})();
