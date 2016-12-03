(function() {
    'use strict';

    angular.module('app')
        .controller('ConversationController', ConversationController);

    ConversationController.$inject = [
        'conversation',
        'currentUser',
        'messages'
    ];

    function ConversationController(
        conversation,
        currentUser,
        messages
    ) {

        var vm = this;
        angular.extend(vm, {
            conversation: conversation,
            currentUser: currentUser,
            messages: messages
        });
    }
})();
