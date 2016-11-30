import * as angular from 'angular';
import uiRouter from 'angular-ui-router';

import { profileRoutes } from './profile.routes';
import { ProfileComponent } from './profile.component';

export const ProfileModule = angular
    .module('ProfileModule', [
        uiRouter
    ])
    .component('profile', ProfileComponent)
    .config(profileRoutes)
    .name;

