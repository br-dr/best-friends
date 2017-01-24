import * as angular from 'angular';

import { ngEnter } from './ng-enter.directive';

export const CommonModule = angular.module('common', [])
    .directive('ngEnter', ngEnter)
    .name;
