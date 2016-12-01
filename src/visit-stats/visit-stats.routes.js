// import template from './visit-stats.route.html';

export function profileRoutes($stateProvider) {
    'ngInject';

    $stateProvider
        .state('app.visit-stats', {
            url: '/visit-stats',
            template: '<visit-stats></visit-stats>',
            // resolve: {
            //     posts: resolvePosts,
            //     followers: resolveFollowers
            // }
        });

}
