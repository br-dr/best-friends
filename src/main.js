import * as angular from 'angular';

import './index.css';
import { AppModule } from './app/app.module';

document.addEventListener('DOMContentLoaded', () => {
    angular.bootstrap(document.getElementById('app'), [AppModule], {
        strictDi: true
    });
});
