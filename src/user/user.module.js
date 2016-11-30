import * as angular from 'angular';

import {UserService} from './user.service';

export const UserModule = angular
    .module('UserModule', [])
    .service('UserService', UserService)
    .name;
