export class VisitService {
    constructor($http) {
        'ngInject';

        this.$http = $http;
    }

    getVisitsByPeriod(period) {
        return this.$http.get('/api/profile/visit-stats/' + period);
    }
}
