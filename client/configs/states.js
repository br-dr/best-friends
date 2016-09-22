(function() {
    'use strict';

    angular
        .module('app')
        .config(function($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/');

            $stateProvider
                .state('app', {
                    templateUrl: '/components/app/app.html',
                    abstract: true,
                    resolve: {
                        currentUser: resolveCurrentUser
                    }
                })
                .state('guest', {
                    url: '/guest',
                    templateUrl: '/components/guest/guest.html',
                    resolve: {
                        checkLogin: function(UserService, $state) {
                            return UserService.getCurrentUser()
                                .then(function() {
                                    $state.go('app.profile');
                                })
                                .catch(function() {
                                    return;
                                });
                        }
                    }
                })
                .state('app.profile', {
                    url: '/',
                    templateUrl: '/components/profile/profile.html',
                    controller: 'ProfileController as profileCtrl',
                    resolve: {
                        posts: function($http) {
                            return $http.get('/api/posts/')
                                .then(function(response) {
                                    return response.data;
                                });
                        },
                        followers: function($http) {
                            return $http.get('/api/profile/followers')
                                .then(function(response) {
                                    return response.data;
                                });
                        }
                    }
                })
                .state('app.user', {
                    url: '/user/:id',
                    templateUrl: '/components/user/user.html',
                    controller: 'UserController as userCtrl',
                    resolve: {
                        user: resolveUserById,
                        posts: function($http, $stateParams) {
                            var id = $stateParams.id;
                            return $http.get('/api/user/' + id + '/posts/')
                                .then(function(response) {
                                    return response.data;
                                });
                        },
                        followers: resolveFollowers
                    }
                })
                .state('app.search-users', {
                    url: '/search-users',
                    templateUrl: '/components/search-users/search-users.html',
                    controller: 'SearchUsersController as searchUsersCtrl',
                })
                .state('app.following', {
                    url: '/user/:id/following',
                    templateUrl: '/components/following-list/' +
                    'following-list.html',
                    controller: 'FollowingController as followingCtrl',
                    resolve: {
                        users: resolveFollowing,
                        user: resolveUserById
                    }
                })
                .state('app.followers', {
                    url: '/user/:id/followers',
                    templateUrl: '/components/followers-list/' +
                    'followers-list.html',
                    controller: 'FollowersController as followersCtrl',
                    resolve: {
                        followers: resolveFollowers,
                        user: resolveUserById
                    }
                });

        });

    resolveUserById.$inject = ['$stateParams', 'UserService'];
    function resolveUserById($stateParams, UserService) {
        return UserService.getUserById($stateParams.id);
    }

    resolveCurrentUser.$inject = ['UserService', '$state'];
    function resolveCurrentUser(UserService, $state) {
        return UserService.getCurrentUser()
            .catch(function() {
                $state.go('guest');
            });
    }

    resolveFollowing.$inject = ['$stateParams', 'UserService'];
    function resolveFollowing($stateParams, UserService) {
        return UserService.getFollowing($stateParams.id);
    }

    resolveFollowers.$inject = ['$stateParams', 'UserService'];
    function resolveFollowers($stateParams, UserService) {
        return UserService.getFollowers($stateParams.id);
    }
})();
