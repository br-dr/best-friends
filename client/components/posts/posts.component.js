(function() {
    'use strict';

    angular.module('app')
        .component('post', {
            templateUrl: '/components/posts/posts.component.html',
            controller: PostsController,
            bindings: {
                post: '='
            }
        });

    function PostsController() {
    }

})();

