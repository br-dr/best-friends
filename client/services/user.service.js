(function() {
    'use strict';

    angular.module('app')
        .service('UserService', ['$http', function($http) {
            var vm = this;

            angular.extend(vm, {
                getCurrentUser: getCurrentUser,
                followUser: followUser,
                unFollowUser: unFollowUser,
                getUserById: getUserById,
                getFollowing: getFollowing,
                getFollowers: getFollowers
            });

            function getCurrentUser() {
                return $http.get('/profile')
                    .then(function(response) {
                        return response.data;
                    });
            }

            function followUser(user, currentUser) {
                return $http.post('/follow', user)
                    .then(function(response) {
                        return angular.copy(response.data, currentUser);
                    });
            }

            function unFollowUser(user, currentUser) {
                return $http.post('/unfollow', user)
                    .then(function(response) {
                        return angular.copy(response.data, currentUser);
                    });
            }

            function getUserById(id) {
                return $http.get('/user/' + id)
                    .then(function(response) {
                        return response.data;
                    });
            }

            function getFollowing(id) {
                return $http.get('/api/user/' + id + '/following-list/')
                    .then(function(response) {
                        return response.data;
                    });
            }

            function getFollowers(id) {
                return $http.get('/api/user/' + id + '/followers-list/')
                    .then(function(response) {
                        return response.data;
                    });
            }
        }]);
})();

