(function() {
    'use strict';

    angular.module('app')
        .controller('VisitStatsController', VisitStatsController);

    VisitStatsController.$inject = [
        'currentUser',
        'VisitService',
        'visits'
    ];

    function VisitStatsController(currentUser, VisitService, visits) {
        var vm = this;

        angular.extend(vm, {
            areVisitsShown: false,
            visits: [],
            input: {
                period: '',
                totalOrUnique: ''
            },
            getVisits: getVisits,
        });

        function getVisits() {
            return VisitService.getVisitsByPeriod(vm.input.period, vm.input.totalOrUnique)
                .then(function(response) {
                    vm.areVisitsShown = true;
                    return angular.copy(response.data, vm.visits);
                })
                .catch(function(err) {
                    console.log('error with getting visits');
                });
        }
    }
})();
