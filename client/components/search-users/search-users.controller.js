(function() {
    'use strict';
    angular.module('app')
        .controller('SearchUsersController', ['$http', 'UserService',
            function($http, UserService) {
                var vm = this;

                angular.extend(vm, {
                    input: {
                        searchText: ''
                    },
                    searchUsers: searchUsers,
                    foundUsers: [],
                    canFollow: canFollow,
                    canUnFollow: canUnFollow,
                    follow: follow,
                    unfollow: unfollow
                });

                function searchUsers() {
                    $http.post('/search-users', vm.input)
                        .success(function(response) {
                            vm.foundUsers = response;
                            vm.errorMessage = false;
                        })
                        .error(function() {
                            vm.errorMessage = true;
                        });
                }

                function canFollow(user) {
                    var isCurrentUser = user._id == UserService.currentUser._id;
                    var isFollowing = UserService.currentUser
                        .following.indexOf(user._id) !== -1;
                    if (isCurrentUser || isFollowing) {
                        return false;
                    }
                    return true;
                }

                function canUnFollow(user) {
                    var isCurrentUser = user._id == UserService.currentUser._id;
                    var isNotFollowing = UserService.currentUser
                        .following.indexOf(user._id) === -1;
                    if (isCurrentUser || isNotFollowing) {
                        return false;
                    }
                    return true;
                }

                function follow(user) {
                    UserService.followUser(user);
                }

                function unfollow(user) {
                    UserService.unFollowUser(user);
                }

            }]);
})();
