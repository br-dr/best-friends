(function() {
    'use strict';

    angular.module('app')
        .controller('VisitStatsController', VisitStatsController);

    VisitStatsController.$inject = [
        'currentUser',
        'VisitService',
        'visits',
    ];

    function VisitStatsController(
        currentUser,
        VisitService,
        visits
    ) {
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
            return VisitService.getVisitsByPeriod(
                vm.input.period,
                vm.input.totalOrUnique
            )
                .then(function(response) {
                    vm.areVisitsShown = true;
                    return angular.copy(response.data, vm.visits);
                })
                .catch(function(err) {
                    console.log('error with getting visits');
                });
        }

        Highcharts.chart('chart-container', {
            title: {
                text: 'Visits'
            },

            xAxis: {
                type: 'datetime'
            },
            yAxis: {
                title: {
                    text: 'Visits count'
                },
                min: 0
            },
            // tooltip: {
            //     headerFormat: '<b>{series.name}</b><br>',
            //     pointFormat: '{point.x:%e. %b}: {point.y:.2f} m'
            // },

            plotOptions: {
                spline: {
                    marker: {
                        enabled: true
                    }
                }
            },

            series: [{
                name: 'Visits',
                // data: [
                //     [Date.UTC(1970, 9, 21), 0],
                //     [Date.UTC(1970, 10, 4), 0.28],
                //     [Date.UTC(1970, 10, 9), 0.25],
                //     [Date.UTC(1970, 10, 27), 0.2],
                //     [Date.UTC(1970, 11, 2), 0.28],
                //     [Date.UTC(1970, 11, 26), 0.28],
                //     [Date.UTC(1970, 11, 29), 0.47],
                //     [Date.UTC(1971, 0, 11), 0.79],
                //     [Date.UTC(1971, 0, 26), 0.72],
                //     [Date.UTC(1971, 1, 3), 1.02],
                //     [Date.UTC(1971, 1, 11), 1.12],
                //     [Date.UTC(1971, 1, 25), 1.2],
                //     [Date.UTC(1971, 2, 11), 1.18],
                //     [Date.UTC(1971, 3, 11), 1.19],
                //     [Date.UTC(1971, 4, 1), 1.85],
                //     [Date.UTC(1971, 4, 5), 2.22],
                //     [Date.UTC(1971, 4, 19), 1.15],
                //     [Date.UTC(1971, 5, 3), 0]
                // ]
                data: visits

            }]
        });

    }
})();
