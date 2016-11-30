(function() {
    'use strict';

    angular
        .module('app')
        .config(function($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/');

            var appEventsUpcoming = {
                url: '/events/upcoming',
                templateUrl: '/components/events/upcoming-events.html',
                controller: 'UpcomingEventsController as upcomingEventsCtrl',
                resolve: {
                    upcomingEvents: resolveUpcomingEvents
                }
            };

            $stateProvider.state('app.events.upcoming', appEventsUpcoming);

            var appEventsDeclined = {
                url: '/events/declined',
                templateUrl: '/components/events/declined-events.html',
                controller: 'DeclinedEventsController as declinedEventsCtrl',
                resolve: {
                    declinedEvents: resolveDeclinedEvents
                }
            };

            $stateProvider.state('app.events.declined', appEventsDeclined);

            var appEventsArchive = {
                url: '/events/archive',
                templateUrl: '/components/events/archived-events.html',
                controller: 'ArchivedEventsController as archivedEventsCtrl',
                resolve: {
                    archivedEvents: resolveArchivedEvents
                }
            };

            $stateProvider.state('app.events.archive', appEventsArchive);

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
                    }
                })
                .state('app.visit-stats', {
                    url: '/visit-stats',
                    templateUrl: '/components/visit-stats/visit-stats.html',
                    controller: 'VisitStatsController as visitStatsCtrl',
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
                })
                .state('app.events', {
                    url: '/events',
                    templateUrl: '/components/events/events.html',
                    controller: 'EventsController as eventsCtrl'
                })
                .state('app.events.new', {
                    url: '/events/new',
                    templateUrl: '/components/events/new-event.html',
                    controller: 'NewEventController as newEventCtrl',
                })
                .state('app.events.invites', {
                    url: '/events/invites',
                    templateUrl: '/components/events/invites-events.html',
                    controller: 'InvitesEventsController as invitesEventsCtrl',
                    resolve: {
                        invitesEvents: resolveInvitesEvents
                    }
                })
                .state('app.events.search-events', {
                    url: '/events/search-events',
                    templateUrl: '/components/events/search-events.html',
                    controller: 'SearchEventsController as searchEventsCtrl',
                })
                .state('app.events.event', {
                    url: '/event/:id',
                    templateUrl: '/components/event/event.html',
                    controller: 'EventController as eventCtrl',
                    resolve: {
                        event: resolveEventById,
                        comments: resolveEventComments
                    }
                })
                .state('app.conversations', {
                    url: '/conversations',
                    templateUrl: '/components/conversations/conversations.html',
                    controller: 'ConversationsController as conversationsCtrl',
                    resolve: {
                        conversations: resolveUserConversations,
                    }
                });
                // .state('app.conversations.conversation', {
                //     url: '/conversation/:id',
                //     templateUrl: '/conversations/conversation/conversation.html',
                //     controller: 'ConversationController as conversationCtrl',
                //     resolve: {
                //         conversation: resolveConversationtById,
                //     }
                // });
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

    resolveEventById.$inject = ['$stateParams', 'EventService'];
    function resolveEventById($stateParams, EventService) {
        return EventService.getEventById($stateParams.id);
    }

    resolveInvitesEvents.$inject = ['EventService'];
    function resolveInvitesEvents(EventService) {
        return EventService.getInvitesEvents();
    }

    resolveDeclinedEvents.$inject = ['EventService'];
    function resolveDeclinedEvents(EventService) {
        return EventService.getDeclinedEvents();
    }

    resolveArchivedEvents.$inject = ['EventService'];
    function resolveArchivedEvents(EventService) {
        return EventService.getArchivedEvents();
    }

    resolveUpcomingEvents.$inject = ['EventService'];
    function resolveUpcomingEvents(EventService) {
        return EventService.getUpcomingEvents();
    }

    resolveEventComments.$inject = ['CommentService', '$stateParams'];
    function resolveEventComments(CommentService, $stateParams) {
        return CommentService.getEventComments($stateParams.id);
    }

    resolveUserConversations.$inject = ['ConversationService'];
    function resolveUserConversations(ConversationService) {
        return ConversationService.getUserConversations();
    }
})();
