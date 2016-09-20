(function() {
    'use strict';

    angular.module('app')
        .service('UserService', ['$http', function($http) {
            var vm = this;

            vm.getCurrentUser = function() {
                return $http.get('/profile')
                    .then(function(response) {
                        return vm.currentUser = response.data;
                    });
            };

            vm.followUser = function(user) {
                return $http.post('/follow', user)
                    .then(function(response) {
                        return angular.copy(response.data, vm.currentUser);
                    });
            };

            vm.unFollowUser = function(user) {
                return $http.post('/unfollow', user)
                    .then(function(response) {
                        return angular.copy(response.data, vm.currentUser);
                    });
            };

            vm.getUserById = function(id) {
                return $http.get('/user/' + id)
                    .then(function(response) {
                        return response.data;
                    });
            };
        }]);
})();

