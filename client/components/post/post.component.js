(function() {
    'use strict';

    angular.module('app')
        .component('post', {
            templateUrl: '/components/post/post.component.html',
            controller: PostController,
            bindings: {
                post: '=',
                user: '=',
                deletePost: '=',
                likePost: '=',
                unlikePost: '='
            }
        });

    function PostController() {
        var vm = this;

        vm.canDeletePost = function() {
            var isOwner = vm.post.owner._id === vm.user._id;
            var isCreator = vm.post.creator._id === vm.user._id;

            if (isOwner || isCreator) {
                return true;
            }

            return false;
        };
    }
})();
