(function() {
    'use strict';

    angular
        .module('app')
        .controller('UserController', UserController);

    UserController.$inject = ['user', 'posts', 'currentUser'];

    function UserController(user, posts, currentUser) {
        var vm = this;

        angular.extend(vm, {
            user: user,
            posts: posts,
            currentUser: currentUser
        });
    }
})();
