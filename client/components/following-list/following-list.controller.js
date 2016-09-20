(function() {
    'use strict';

    angular.module('app')
        .controller('FollowingController', FollowingController);

    FollowingController.$inject = [
        'user',
        'currentUser'
    ];

    function FollowingController(
        user,
        currentUser
    ) {
        var vm = this;
        angular.extend(vm, {
            user: user,
            currentUser: currentUser
        });
    }
})();
