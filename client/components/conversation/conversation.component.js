(function() {
    'use strict';

    angular.module('app')
        .component('conversation', {
            templateUrl: '/components/conversation/conversation.component.html',
            controller: ConversationController,
            bindings: {
                conversation: '=',
                currentUser: '=',
                // deletePost: '=',
                // likeOrUnlike: '=',
                // isLiked: '='
            }
        });

    function ConversationController() {
        // var vm = this;

        // vm.canDeletePost = function() {
        //     var isOwner = vm.post.owner._id === vm.user._id;
        //     var isCreator = vm.post.creator._id === vm.user._id;

        //     if (isOwner || isCreator) {
        //         return true;
        //     }

        //     return false;
        // };
    }
})();
