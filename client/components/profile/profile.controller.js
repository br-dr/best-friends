(function () {
    'use strict';

    angular
        .module('app')
        .controller('ProfileController', function (user) {
            var vm = this;

            vm.user = user;
            // $http.get('/profile')
            //     .success(function (user) {
            //         vm.user = user;
            //     });
        });
})();