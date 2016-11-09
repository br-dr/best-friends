(function() {
    'use strict';

    angular.module('app')
        .controller('EventsController', EventsController);

    EventsController.$inject = [
        'EventService',
        '$timeout'
    ];

    function EventsController(
        EventService,
        $timeout
    ) {
        var vm = this;

        angular.extend(vm, {
            decide: decide,
            cancel: function() { },
            isCancelShown: false,
            isCancelDisabled: false,
        });

        function decide(event, type) {
            var timeoutId = $timeout(function() {
                vm.isCancelShown = false;
            }, 3000);

            vm.isCancelShown = true;

            vm.cancel = function() {
                vm.isCancelDisabled = true;

                $timeout.cancel(timeoutId);

                EventService.undo(event, type)
                    .then(function() {
                        vm.isCancelDisabled = false;
                        vm.isCancelShown = false;
                    })
                    .catch(function(reason) {
                        vm.isCancelDisabled = false;

                        timeoutId = $timeout(function() {
                            vm.isCancelShown = false;
                        }, 3000);

                        console.log('can\'t cancel', reason);
                    });
            };
        }
    }
})();
