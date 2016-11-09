(function() {
    'use strict';

    angular.module('app')
        .component('eventList', {
            templateUrl: '/components/event-list/event-list.component.html',
            controller: EventListController,
            bindings: {
                events: '=',
                type: '@',
                currentUser: '=',
                onDecide: '&'
            }
        });

    function EventListController() {
        var vm = this;

        angular.extend(vm, {
            hideEvent: hideEvent
        });

        function hideEvent(event) {
            switch (vm.type) {
                case 'invite':
                    return event.accepted.indexOf(vm.currentUser._id) !== -1 ||
                        event.declined.indexOf(vm.currentUser._id) !== -1;
                case 'accept':
                    return event.accepted.indexOf(vm.currentUser._id) === -1;
                case 'decline':
                    return event.declined.indexOf(vm.currentUser._id) === -1;
                default:
                    return false;
            }
        }
    }
})();
