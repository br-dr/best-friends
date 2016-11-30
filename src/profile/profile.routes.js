import template from './profile.route.html';

export function profileRoutes($stateProvider) {
    'ngInject';

    $stateProvider
        .state('app.profile', {
            url: '/',
            template,
            resolve: {
                posts: resolvePosts,
                followers: resolveFollowers
            }
        });

    function resolvePosts() {
        'ngInject';
        return [];
    }

    function resolveFollowers() {
        'ngInject';
        return [];
    }
}
