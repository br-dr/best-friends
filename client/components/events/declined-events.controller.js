(function() {
    'use strict';

    angular.module('app')
        .controller('DeclinedEventsController', DeclinedEventsController);

    DeclinedEventsController.$inject = [
        'declinedEvents',
        'currentUser'
    ];

    function DeclinedEventsController(declinedEvents, currentUser) {
        var vm = this;

        angular.extend(vm, {
            declinedEvents: declinedEvents,
            currentUser: currentUser
        });
    }
})();
