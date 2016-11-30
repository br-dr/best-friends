import template from './app.component.html';

export const AppComponent = {
    template,
    controller: class AppController {
        constructor($mdSidenav) {
            'ngInject';
            this.$mdSidenav = $mdSidenav;
        }

        toggleSidenav() {
            this.$mdSidenav('left').toggle();
        }
    }
};

/*
AppController.$inject = ['$mdSidenav'];
function AppController($mdSidenav) {
    this.$mdSidenav = $mdSidenav;
}

AppController.prototype.toggleSidenav = function() {
    this.$mdSidenav('left').toggle();
};
*/
