import { currentUser } from '../user/user.resolve';

export function appRoutes($stateProvider, $urlRouterProvider) {
    'ngInject';

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('app', {
            abstract: true,
            template: '<app></app>',
            resolve: {
                currentUser
            }
        });
}

