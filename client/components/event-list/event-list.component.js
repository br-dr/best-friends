(function() {
    'use strict';

    angular.module('app')
        .component('eventList', {
            templateUrl: '/components/event-list/event-list.component.html',
            controller: EventListController,
            bindings: {
                events: '=',
                currentUser: '='
            }
        });

    function EventListController() {

    }
})();
