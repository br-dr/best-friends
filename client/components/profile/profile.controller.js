(function () {
    'use strict';

    angular
        .module('app')
        .controller('ProfileController', function (user) {
            var vm = this;

            vm.user = user;
        });
})();