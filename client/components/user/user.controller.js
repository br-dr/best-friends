(function() {
    'use strict';

    angular
        .module('app')
        .controller('UserController', UserController);

    UserController.$inject = [
        'user',
        'posts',
        'currentUser',
        'followers'
    ];

    function UserController(
        user,
        posts,
        currentUser,
        followers
    ) {
        var vm = this;

        angular.extend(vm, {
            user: user,
            posts: posts,
            currentUser: currentUser,
            followers: followers
        });
    }
})();
