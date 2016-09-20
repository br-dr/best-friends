(function() {
    'use strict';

    angular.module('app')
        .controller('FollowersController', FollowersController);

    FollowersController.$inject = [
        'followers',
    ];

    function FollowersController(
        followers
    ) {
        var vm = this;
        angular.extend(vm, {
            followers: followers,
        });
    }
})();
