(function() {
    'use strict';

    angular.module('app')
        .controller('FollowersController', FollowersController);

    FollowersController.$inject = [
        'followers',
        'currentUser',
        'user'
    ];

    function FollowersController(
        followers,
        currentUser,
        user
    ) {
        var vm = this;

        angular.extend(vm, {
            followers: followers,
            currentUser: currentUser,
            user: user
        });
    }
})();
