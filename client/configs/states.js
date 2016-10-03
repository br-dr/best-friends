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
                        posts: resolvePosts,
                        followers: function($http) {
                            return $http.get('/api/profile/followers')
                                .then(function(response) {
                                    return response.data;
                                });
                        },
                        totalVisits: resolveTotalVisits,
                        uniqueVisits: resolveUniqueVisits,
                        totalVisitsThisDay: resolveTotalVisitsThisDay,
                        totalVisitsThisWeek: resolveTotalVisitsThisWeek,
                        totalVisitsThisMonth: resolveTotalVisitsThisMonth,
                        uniqueVisitsThisDay: resolveUniqueVisitsThisDay,
                        uniqueVisitsThisWeek: resolveUniqueVisitsThisWeek,
                        uniqueVisitsThisMonth: resolveUniqueVisitsThisMonth
                    }
                })
                .state('app.visit-stats', {
                    url: '/visit-stats',
                    templateUrl: '/components/visit-stats/visit-stats.html',
                    controller: 'VisitStatsController as visitStatsCtrl',
                    resolve: {
                        visits: resolveVisits
                    }
                })
                .state('app.user', {
                    url: '/user/:id',
                    templateUrl: '/components/user/user.html',
                    controller: 'UserController as userCtrl',
                    resolve: {
                        user: resolveUserById,
                        posts: resolveUserPosts,
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

    resolveUserPosts.$inject = ['$stateParams', 'PostService'];
    function resolveUserPosts($stateParams, PostService) {
        return PostService.getUserPosts($stateParams.id);
    }

    resolvePosts.$inject = ['PostService'];
    function resolvePosts(PostService) {
        return PostService.getPosts();
    }

    resolveTotalVisits.$inject = ['VisitService'];
    function resolveTotalVisits(VisitService) {
        return VisitService.getTotalVisits();
    }

    resolveUniqueVisits.$inject = ['VisitService'];
    function resolveUniqueVisits(VisitService) {
        return VisitService.getUniqueVisits();
    }

    resolveTotalVisitsThisDay.$inject = ['VisitService'];
    function resolveTotalVisitsThisDay(VisitService) {
        return VisitService.getTotalVisitsThisDay();
    }

    resolveTotalVisitsThisWeek.$inject = ['VisitService'];
    function resolveTotalVisitsThisWeek(VisitService) {
        return VisitService.getTotalVisitsThisWeek();
    }

    resolveTotalVisitsThisMonth.$inject = ['VisitService'];
    function resolveTotalVisitsThisMonth(VisitService) {
        return VisitService.getTotalVisitsThisMonth();
    }

    resolveUniqueVisitsThisDay.$inject = ['VisitService'];
    function resolveUniqueVisitsThisDay(VisitService) {
        return VisitService.getUniqueVisitsThisDay();
    }

    resolveUniqueVisitsThisWeek.$inject = ['VisitService'];
    function resolveUniqueVisitsThisWeek(VisitService) {
        return VisitService.getUniqueVisitsThisWeek();
    }

    resolveUniqueVisitsThisMonth.$inject = ['VisitService'];
    function resolveUniqueVisitsThisMonth(VisitService) {
        return VisitService.getUniqueVisitsThisMonth();
    }

    resolveVisits.$inject = ['$stateParams', 'VisitService'];
    function resolveVisits($stateParams, VisitService) {
        return VisitService.getVisitsByPeriod($stateParams.period);
    }
})();
