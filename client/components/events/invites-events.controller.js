(function() {
    'use strict';

    angular.module('app')
        .controller('InvitesEventsController', InvitesEventsController);

    InvitesEventsController.$inject = [
        'invitesEvents',
        'currentUser'
    ];

    function InvitesEventsController(
        invitesEvents,
        currentUser
    ) {
        var vm = this;

        angular.extend(vm, {
            invitesEvents: invitesEvents,
            currentUser: currentUser
        });
    }
})();
