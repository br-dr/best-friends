(function() {
    'use strict';

    angular.module('app')
        .controller('NavbarController', NavbarController);

    NavbarController.$inject = [
        '$mdSidenav'];

    function NavbarController($mdSidenav) {
        var vm = this;

        // angular.extend(vm, {
        //     theme: 'indigo',
        //     changeTheme: changeTheme
        // });

        // function changeTheme() {
        //     vm.theme = vm.theme === 'indigo' ? 'lime' : 'indigo';
        // }


        vm.toggleSidenav = function() {
            $mdSidenav('left').toggle();
        };

        // vm.toggleSidenav = $timeout(function() {
        //     $mdSidenav('left').toggle();
        // }, 2000);
    }
})();
