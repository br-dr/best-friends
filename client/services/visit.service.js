(function() {
    angular.module('app')
        .factory('VisitService', VisitService);

    VisitService.$inject = ['$timeout', '$http'];

    function VisitService($timeout, $http) {
        return {
            createVisit: createVisit,
            getVisitsByPeriod: getVisitsByPeriod
        };

        function createVisit(id) {
            $timeout(function() {
                $http.post('/api/user/' + id + '/visit');
            }, 1000);
        }

        function getVisitsByPeriod(period) {
            return $http.get('/api/profile/visit-stats/' + period);
        }
    }
})();
