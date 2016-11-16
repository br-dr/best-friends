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
                return $http.get('/api/profile')
                    .then(function(response) {
                        return response.data;
                    });
            }

            function followUser(user, currentUser) {
                return $http.post('/api/user/' + user._id + '/follow')
                    .then(function(response) {
                        return angular.copy(response.data, currentUser);
                    });
            }

            function unFollowUser(user, currentUser) {
                return $http.post('/api/user/' + user._id + '/unfollow')
                    .then(function(response) {
                        return angular.copy(response.data, currentUser);
                    });
            }

            function getUserById(id) {
                return $http.get('/api/user/' + id)
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

