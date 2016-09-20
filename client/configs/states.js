(function() {
    'use strict';

    angular
        .module('app')
        .config(function($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/');

            $stateProvider
                .state('home', {
                    url: '/',
                    templateUrl: '/components/home/home.html'
                })
                .state('login', {
                    url: '/login',
                    templateUrl: '/components/login/login.html'
                })
                .state('registration', {
                    url: '/registration',
                    templateUrl: '/components/registration/registration.html'
                })
                .state('profile', {
                    url: '/profile',
                    templateUrl: '/components/profile/profile.html',
                    controller: 'ProfileController as profileCtrl',
                    resolve: {
                        user: resolveCurrentUser,
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
                .state('user', {
                    url: '/user/:id',
                    templateUrl: '/components/user/' +
                    'user.html',
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
                        currentUser: resolveCurrentUser,
                        followers: function($http, $stateParams) {
                            var id = $stateParams.id;
                            return $http.get('/api/user/' + id + '/followers/')
                                .then(function(response) {
                                    return response.data;
                                });
                        }
                    }
                })
                .state('search-users', {
                    url: '/search-users',
                    templateUrl: '/components/search-users/search-users.html',
                    controller: 'SearchUsersController as searchUsersCtrl',
                    resolve: {
                        user: resolveCurrentUser
                    }
                })
                .state('following', {
                    url: '/user/:id/following',
                    templateUrl: '/components/following-list/' +
                    'following-list.html',
                    controller: 'FollowingController as followingCtrl',
                    resolve: {
                        users: function($http, $stateParams) {
                            var id = $stateParams.id;
                            return $http.get('/api/user/' + id +
                                '/following-list/')
                                .then(function(response) {
                                    return response.data;
                                });
                        },
                        currentUser: resolveCurrentUser,
                        user: resolveUserById
                    }
                })
                .state('followers', {
                    url: '/user/:id/followers',
                    templateUrl: '/components/followers-list/' +
                    'followers-list.html',
                    controller: 'FollowersController as followersCtrl',
                    resolve: {
                        followers: function($http, $stateParams) {
                            var id = $stateParams.id;
                            return $http.get('/api/user/' + id +
                                '/followers-list/')
                                .then(function(response) {
                                    return response.data;
                                });
                        },
                        currentUser: resolveCurrentUser,
                        user: resolveUserById
                    }
                });

        });

    resolveUserById.$inject = ['$stateParams', 'UserService'];
    function resolveUserById($stateParams, UserService) {
        return UserService.getUserById($stateParams.id);
    }

    resolveCurrentUser.$inject = ['UserService'];
    function resolveCurrentUser(UserService) {
        return UserService.getCurrentUser();
    }
})();
