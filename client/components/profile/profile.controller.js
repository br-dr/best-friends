(function () {
    'use strict';

    angular
        .module('app')
        .controller('ProfileController', function ($http) {
            var vm = this;
            $http.get('/profile')
                .success(function (user) {
                    vm.user = user;
                })
        });
})();