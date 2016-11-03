(function() {
    'use strict';

    angular.module('app')
        .factory('EventService', EventService);

    EventService.$inject = ['$http'];

    function EventService($http) {
        return {
            getEventById: getEventById,
            getUpcomingEvents: getUpcomingEvents,
            acceptEvent: acceptEvent,
            declineEvent: declineEvent
        };

        function getEventById(id) {
            return $http.get('/api/events/' + id)
                .then(function(response) {
                    return response.data;
                });
        }

        function getUpcomingEvents() {
            return $http.get('/api/events/upcoming-events')
                .then(function(response) {
                    return response.data;
                });
        }

        function acceptEvent(event, currentUser) {
            return $http.post('/api/events/' + event._id + '/accept')
                .then(function(response) {
                    return angular.copy(response.data, event);
                });
        }

        function declineEvent(event, currentUser) {
            return $http.post('/api/events/' + event._id + '/decline')
                .then(function(response) {
                    return angular.copy(response.data, event);
                });
        }
    }
})();
