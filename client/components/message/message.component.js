(function() {
    angular.module('app')
        .component('message', {
            templateUrl: '/components/message/message.component.html',
            controller: MessageController,
            bindings: {
                message: '=',
                currentUser: '='
            }
        });

    function MessageController() {

    }
})();
