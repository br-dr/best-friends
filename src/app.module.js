import * as angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngAnimate from 'angular-animate';
import ngSanitize from 'angular-sanitize';
import toastr from 'angular-toastr';
import uiBootstrap from 'angular-ui-bootstrap';
import loadingBar from 'angular-loading-bar';
import 'angucomplete-alt';

import {CommonModule} from './common/common.module';

import {appRoutes} from './app.routes';
import {AppComponent} from './app/app.component';

export const AppModule = angular
    .module('app', [
        CommonModule,

        uiRouter,
        ngAnimate,
        toastr,
        ngSanitize,
        uiBootstrap,
        loadingBar,
        'angucomplete-alt'
    ])
    .config(appRoutes)
    .component('app', AppComponent)
    .name;
