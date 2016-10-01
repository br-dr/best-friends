(function() {
    'use strict';

    angular.module('app')
        .factory('VisitService', VisitService);

    VisitService.$inject = ['$timeout', '$http'];

    function VisitService($timeout, $http) {
        return {
            createVisit: createVisit,
            getTotalVisits: getTotalVisits,
            getUniqueVisits: getUniqueVisits
        };

        function createVisit(id) {
            $timeout(function() {
                $http.post('/api/user/' + id + '/visit');
            }, 1000);
        }

        function getTotalVisits() {
            return $http.get('/api/profile/total-visits')
                .then(function(response) {
                    return response.data;
                });
        }

        function getUniqueVisits() {
            return $http.get('api/profile/unique-visits')
                .then(function(response) {
                    return response.data;
                });
        }
    }
})();
