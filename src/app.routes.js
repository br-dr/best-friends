export function appRoutes($stateProvider, $urlRouterProvider) {
    'ngInject';

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('app', {
            url: '/',
            template: '<app></app>',
            resolve: {
                currentUser: resolveCurrentUser
            }
        });

    function resolveCurrentUser(UserService, $state) {
        'ngInject';
        return UserService.getCurrentUser()
            .catch(function() {
                $state.go('guest');
            });
    }
}
