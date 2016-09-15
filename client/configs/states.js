(function() {
    'use strict';

    angular
        .module('app')
        .config(function($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/');

            $stateProvider
                .state('home', {
                    url: '/',
                    templateUrl: 'components/home/home.html'
                })
                .state('login', {
                    url: '/login',
                    templateUrl: 'components/login/login.html'
                })
                .state('registration', {
                    url: '/registration',
                    templateUrl: 'components/registration/registration.html'
                })
                .state('profile', {
                    url: '/profile',
                    templateUrl: 'components/profile/profile.html',
                    controller: 'ProfileController as profileCtrl',
                    resolve: {
                        user: function(UserService) {
                            return UserService.getCurrentUser();
                        }
                    }
                })
                .state('user', {
                    url: '/user/:id',
                    templateUrl: 'components/user/' +
                    'user.html',
                    controller: 'UserController as userCtrl',

                    resolve: {
                        user: function($http, $stateParams) {
                            var id = $stateParams.id;
                            return $http.get('/user/' + id)
                                .then(function(response) {
                                    return response.data;
                                });
                        }
                    }

                })
                .state('search-users', {
                    url: '/search-users',
                    templateUrl: 'components/search-users/search-users.html',
                    controller: 'SearchUsersController as searchUsersCtrl',
                    resolve: {
                        user: function(UserService) {
                            return UserService.getCurrentUser();
                        }
                    }
                });
        });
})();
