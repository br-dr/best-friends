export class UserService {
    constructor($http) {
        'ngInject';

        this.$http = $http;
    }

    getCurrentUser(id) {
        return this.$http.get('/api/profile')
            .then(function(response) {
                return response.data;
            });
    }
}
