(function() {
    'use strict';

    angular.module('app')
        .factory('CommentService', CommentService);

    CommentService.$inject = ['$http'];

    function CommentService($http) {
        return {
            addComment: addComment,
            deleteComment: deleteComment,
            likeComment: likeComment,
            unlikeComment: unlikeComment,
            // getPosts: getPosts,
            getEventComments: getEventComments
        };

        function addComment(id, commentInput) {
            return $http.post('/api/events/' + id + '/add-comment/', commentInput);
        }

        function deleteComment(id) {
            return $http.delete('/api/comments/' + id);
        }

        function likeComment(id) {
            return $http.post('/api/comments/' + id + '/like-comment');
        }

        function unlikeComment(id) {
            return $http.post('/api/comments/' + id + '/unlike-comment');
        }

        function getEventComments(id) {
            return $http.get('/api/events/' + id + '/comments/')
                .then(function(response) {
                    return response.data;
                });
        }

        // function getPosts() {
        //     return $http.get('/api/profile/posts/')
        //         .then(function(response) {
        //             return response.data;
        //         });
        // }
    }
})();
