(function() {
    angular.module('app')
        .controller('ConversationsController', ConversationsController);

    ConversationsController.$inject = [
        'conversations',
        'currentUser'
    ];

    function ConversationsController(
        conversations,
        currentUser
    ) {
        var vm = this;

        angular.extend(vm, {
            conversations: conversations,
            currentUser: currentUser
        });
    }
})();
