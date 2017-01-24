import * as angular from 'angular';
import uiRouter from 'angular-ui-router';

import { visitStatsRoutes } from './visit-stats.routes';
import { VisitStatsComponent } from './visit-stats.component';
import { VisitService } from './visit.service';


export const VisitStatsModule = angular
    .module('VisitStatsModule', [
        uiRouter
    ])
    .service('VisitService', VisitService)
    .component('visitStats', VisitStatsComponent)
    .config(visitStatsRoutes)
    .name;
