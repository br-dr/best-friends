(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProfilePublicController', ProfilePublicController);

    ProfilePublicController.$inject = ['user', '$http'];

    function ProfilePublicController(user, $http) {
        var vm = this;

        angular.extend(vm, {
            user: user,
        });
    }
})();
