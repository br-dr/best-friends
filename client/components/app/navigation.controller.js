(function() {
    'use strict';

    angular.module('app')
        .controller('NavbarController', NavbarController);

    function NavbarController() {
        var vm = this;

        vm.isNavCollapsed = true;
    }
})();
