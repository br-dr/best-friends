(function() {
    'use strict';

    angular.module('app')
        .controller('EventController', EventController);

    EventController.$inject = [
        'event'
    ];

    function EventController(
        event
    ) {

        var vm = this;
        angular.extend(vm, {
            event: event
        });
    }
})();
