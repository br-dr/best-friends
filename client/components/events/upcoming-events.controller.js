(function() {
    angular.module('app')
        .controller('UpcomingEventsController', UpcomingEventsController);

    UpcomingEventsController.$inject = [
        'upcomingEvents',
        'currentUser'
    ];

    function UpcomingEventsController(upcomingEvents, currentUser) {
        var vm = this;

        angular.extend(vm, {
            upcomingEvents: upcomingEvents,
            currentUser: currentUser
        });
    }
})();
