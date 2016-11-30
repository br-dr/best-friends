import * as angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngAnimate from 'angular-animate';
import ngSanitize from 'angular-sanitize';
import toastr from 'angular-toastr';
import loadingBar from 'angular-loading-bar';
import 'angucomplete-alt';
import ngMaterial from 'angular-material';
import ngAria from 'angular-aria';
import ngMdIcons from 'angular-material-icons';


import { CommonModule } from '../common/common.module';
import { UserModule } from '../user/user.module';
import { ProfileModule } from '../profile/profile.module';

import { appRoutes } from './app.routes';
import { AppComponent } from './app.component';

export const AppModule = angular
    .module('app', [
        CommonModule,
        UserModule,
        ProfileModule,

        uiRouter,
        ngAnimate,
        toastr,
        ngSanitize,
        loadingBar,
        ngMaterial,
        ngAria,
        ngMdIcons,
        'angucomplete-alt'
    ])
    .config(appRoutes)
    .component('app', AppComponent)
    .name;
