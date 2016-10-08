(function() {
    'use strict';

    angular.module('app')
        .factory('VisitService', VisitService);

    VisitService.$inject = ['$timeout', '$http'];

    function VisitService($timeout, $http) {
        return {
            createVisit: createVisit,
            // getVisits: getVisits,
            getTotalVisits: getTotalVisits,
            getUniqueVisits: getUniqueVisits,
            getTotalVisitsThisDay: getTotalVisitsThisDay,
            getTotalVisitsThisWeek: getTotalVisitsThisWeek,
            getTotalVisitsThisMonth: getTotalVisitsThisMonth,
            getUniqueVisitsThisDay: getUniqueVisitsThisDay,
            getUniqueVisitsThisWeek: getUniqueVisitsThisWeek,
            getUniqueVisitsThisMonth: getUniqueVisitsThisMonth,
            getVisitsByPeriod: getVisitsByPeriod
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

        function getTotalVisitsThisDay() {
            return $http.get('/api/profile/total-visits-day')
                .then(function(response) {
                    return response.data;
                });
        }

        function getTotalVisitsThisWeek() {
            return $http.get('/api/profile/total-visits-week')
                .then(function(response) {
                    return response.data;
                });
        }

        function getTotalVisitsThisMonth() {
            return $http.get('/api/profile/total-visits-month')
                .then(function(response) {
                    return response.data;
                });
        }

        function getUniqueVisitsThisDay() {
            return $http.get('/api/profile/unique-visits-day')
                .then(function(response) {
                    return response.data;
                });
        }

        function getUniqueVisitsThisWeek() {
            return $http.get('/api/profile/unique-visits-week')
                .then(function(response) {
                    return response.data;
                });
        }

        function getUniqueVisitsThisMonth() {
            return $http.get('/api/profile/unique-visits-month')
                .then(function(response) {
                    return response.data;
                });
        }

        function getVisitsByPeriod(period) {
            return $http.get('/api/profile/visit-stats/' + period);
        }
    }
})();
