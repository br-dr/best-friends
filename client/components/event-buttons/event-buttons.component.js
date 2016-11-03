(function() {
    'use strict';

    angular.module('app')
        .component('eventButtons', {
            templateUrl: '/components/event-buttons/' +
            'event-buttons.component.html',
            controller: EventButtonsController,
            bindings: {
                event: '=',
                currentUser: '='
            }
        });

    EventButtonsController.$inject = ['EventService'];

    function EventButtonsController(EventService) {
        var vm = this;

        angular.extend(vm, {
            accept: accept,
            decline: decline
            // canAccept: canAccept,
            // canDecline: canDecline,
        });

        function accept() {
            EventService.acceptEvent(vm.event, vm.currentUser);
        }

        function decline() {
            EventService.declineEvent(vm.event, vm.currentUser);
        }
    }
})();
