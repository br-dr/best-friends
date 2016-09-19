(function() {
    'use strict';

    angular.module('app')
        .controller('FollowingController', FollowingController);

    FollowingController.$inject = [
        'user',
    ];

    function FollowingController(
        user
    ) {
        var vm = this;
        angular.extend(vm, {
            user: user,
        });
    }
})();
