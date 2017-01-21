(function() {
    angular.module('app')
        .component('eventButtons', {
            templateUrl: '/components/event-buttons/' +
            'event-buttons.component.html',
            controller: EventButtonsController,
            bindings: {
                event: '=',
                type: '@',
                currentUser: '=',
                onDecide: '&'
            }
        });

    EventButtonsController.$inject = ['EventService', 'toastr'];

    function EventButtonsController(EventService, toastr) {
        var vm = this;

        angular.extend(vm, {
            accept: accept,
            invite: invite,
            decline: decline,
        });

        function accept() {
            EventService.acceptEvent(vm.event)
                .then(function() {
                    vm.onDecide({type: vm.type});
                });
        }

        function invite() {
            EventService.inviteEvent(vm.event)
                .then(function() {
                    vm.onDecide({type: vm.type});
                });
        }

        function decline() {
            EventService.declineEvent(vm.event)
                .then(function() {
                    vm.onDecide({type: vm.type});
                });
        }
    }
})();
