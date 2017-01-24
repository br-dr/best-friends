(function() {
    angular.module('app')
        .controller('ArchivedEventsController', ArchivedEventsController);

    ArchivedEventsController.$inject = [
        'archivedEvents',
        'currentUser'
    ];

    function ArchivedEventsController(archivedEvents, currentUser) {
        var vm = this;

        angular.extend(vm, {
            archivedEvents: archivedEvents,
            currentUser: currentUser
        });
    }
})();
