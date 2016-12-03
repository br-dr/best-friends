(function() {
    'use strict';

    angular.module('app')
        .factory('MessageService', MessageService);

    MessageService.$inject = ['$http'];

    function MessageService($http) {
        return {
            addMessage: addMessage,
            // deleteMessage: deleteMessage,
            // getPosts: getPosts,
            getMessages: getMessages
        };

        function addMessage(id, messageInput) {
            var url = '/api/conversations/' + id + '/add-message/';
            return $http.post(url, messageInput);
        }

        // function deleteMessage(id) {
        //     return $http.delete('/api/messages/' + id);
        // }

        function getMessages(id) {
            return $http.get('/api/conversations/' + id + '/messages/')
                .then(function(response) {
                    return response.data;
                });
        }
    }
})();
