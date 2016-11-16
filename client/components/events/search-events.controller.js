(function() {
    'use strict';
    angular.module('app')
        .controller('SearchEventsController', SearchEventsController);

    SearchEventsController.$inject = [
        '$http',
        'UserService',
        'currentUser'
    ];

    function SearchEventsController(
        $http,
        UserService,
        currentUser
    ) {
        var vm = this;

        angular.extend(vm, {
            input: {
                searchText: ''
            },
            foundEvents: [],
            currentUser: currentUser,
            searchEvents: searchEvents
        });

        function searchEvents() {
            $http.get('/api/events', {params: vm.input})
                .then(function(response) {
                    vm.errorMessage = false;
                    return angular.copy(response.data, vm.foundEvents);
                })
                .catch(function() {
                    vm.errorMessage = true;
                });
        }
    }
})();
