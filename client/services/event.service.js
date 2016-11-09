(function() {
    'use strict';

    angular.module('app')
        .factory('EventService', EventService);

    EventService.$inject = ['$http'];

    function EventService($http) {
        return {
            getEventById: getEventById,
            getInvitesEvents: getInvitesEvents,
            getDeclinedEvents: getDeclinedEvents,
            getArchivedEvents: getArchivedEvents,
            getUpcomingEvents: getUpcomingEvents,
            acceptEvent: acceptEvent,
            declineEvent: declineEvent,
            inviteEvent: inviteEvent,
            undo: undo
        };

        function getEventById(id) {
            return $http.get('/api/events/' + id)
                .then(function(response) {
                    return response.data;
                });
        }

        function getInvitesEvents() {
            return $http.get('/api/events/invites')
                .then(function(response) {
                    return response.data;
                });
        }

        function getDeclinedEvents() {
            return $http.get('/api/events/declined')
                .then(function(response) {
                    return response.data;
                });
        }

        function getArchivedEvents() {
            return $http.get('/api/events/archived')
                .then(function(response) {
                    return response.data;
                });
        }

        function getUpcomingEvents() {
            return $http.get('/api/events/upcoming')
                .then(function(response) {
                    return response.data;
                });
        }

        function acceptEvent(event) {
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

        function inviteEvent(event) {
            return $http.post('/api/events/' + event._id + '/invite')
                .then(function(response) {
                    return angular.copy(response.data, event);
                });
        }

        function undo(event, type) {
            return $http.post('/api/events/' + event._id + '/undo/' + type)
                .then(function(response) {
                    return angular.copy(response.data, event);
                });
        }
    }
})();
