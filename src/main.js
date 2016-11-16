import * as angular from 'angular';
import {AppModule} from './app.module';

document.addEventListener('DOMContentLoaded', () => {
    angular.bootstrap(document.getElementById('app'), [AppModule], {
        strictDi: true
    });
});
