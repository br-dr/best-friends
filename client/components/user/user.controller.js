(function() {
    'use strict';

    angular
        .module('app')
        .controller('UserController', UserController);

    UserController.$inject = ['user'];

    function UserController(user) {
        var vm = this;

        angular.extend(vm, {
            user: user,
        });
    }
})();
