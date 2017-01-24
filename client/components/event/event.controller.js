(function() {
    angular.module('app')
        .controller('EventController', EventController);

    EventController.$inject = [
        'event',
        'currentUser',
        'comments'
    ];

    function EventController(
        event,
        currentUser,
        comments
    ) {

        var vm = this;
        angular.extend(vm, {
            event: event,
            currentUser: currentUser,
            comments: comments
        });
    }
})();
