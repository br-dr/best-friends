(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProfilePublicController', ProfilePublicController);

    ProfilePublicController.$inject = ['user'];

    function ProfilePublicController(user) {
        var vm = this;

        angular.extend(vm, {
            user: user,
        });
    }
})();
