(function() {
    'use strict';

    angular.module('app')
        .component('comment', {
            templateUrl: '/components/comment/comment.component.html',
            controller: CommentController,
            bindings: {
                comment: '=',
                user: '=',
                deleteComment: '=',
                likeOrUnlike: '=',
                isLiked: '='
            }
        });

    function CommentController() {
        var vm = this;

        vm.canDeleteComment = function() {
            // var isOwner = vm.post.owner._id === vm.user._id;
            var isCreator = vm.comment.creator._id === vm.user._id;

            if (isCreator) {
                return true;
            }

            return false;
        };
    }
})();
