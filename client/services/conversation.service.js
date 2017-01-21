(function() {
    angular.module('app')
        .factory('ConversationService', ConversationService);

    ConversationService.$inject = ['$http'];

    function ConversationService($http) {
        return {
            // deletePost: deletePost,
            // likePost: likePost,
            // unlikePost: unlikePost,
            addConversation: addConversation,
            getUserConversations: getUserConversations,
            getConversationById: getConversationById
        };

        function addConversation(conversationInput) {
            return $http.post('/api/conversations/', conversationInput);
        }

        function getUserConversations() {
            return $http.get('/api/conversations/')
                .then(function(response) {
                    return response.data;
                });
        }

        function getConversationById(id) {
            return $http.get('/api/conversations/' + id)
                .then(function(response) {
                    return response.data;
                });
        }
        // function deletePost(id) {
        //     return $http.delete('/api/posts/' + id);
        // }

        // function likePost(id) {
        //     return $http.post('/api/posts/' + id + '/like-post');
        // }

        // function unlikePost(id) {
        //     return $http.post('/api/posts/' + id + '/unlike-post');
        // }


        // function getPosts() {
        //     return $http.get('/api/profile/posts/')
        //         .then(function(response) {
        //             return response.data;
        //         });
        // }
    }
})();
