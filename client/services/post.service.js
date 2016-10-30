(function() {
    'use strict';

    angular.module('app')
        .factory('PostService', PostService);

    PostService.$inject = ['$http'];

    function PostService($http) {
        return {
            addPost: addPost,
            deletePost: deletePost,
            likePost: likePost,
            unlikePost: unlikePost,
            getPosts: getPosts,
            getUserPosts: getUserPosts
        };

        function addPost(id, postInput) {
            return $http.post('/api/user/' + id + '/add-post/', postInput);
        }

        function deletePost(id) {
            return $http.delete('/api/posts/' + id);
        }

        function likePost(id) {
            return $http.post('/api/posts/' + id + '/like-post');
        }

        function unlikePost(id) {
            return $http.post('/api/posts/' + id + '/unlike-post');
        }

        function getUserPosts(id) {
            return $http.get('/api/user/' + id + '/posts/')
                .then(function(response) {
                    return response.data;
                });
        }

        function getPosts() {
            return $http.get('/api/profile/posts/')
                .then(function(response) {
                    return response.data;
                });
        }
    }
})();
