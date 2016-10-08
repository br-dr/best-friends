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
                period: ''
            },
            getVisits: getVisits,
        });

        var totalVisits = [];
        var uniqueVisits = [];

        function getVisits() {
            return VisitService.getVisitsByPeriod(
                vm.input.period
            )
                .then(function(response) {
                    vm.areVisitsShown = true;

                    angular.copy(response.data, vm.visits);
                    for (var i = 0; i < vm.visits.length; i++) {
                        totalVisits.push([vm.visits[i]._id, vm.visits[i].count]);
                        uniqueVisits.push([vm.visits[i]._id, vm.visits[i].visitors.length]);
                        var data = {total: totalVisits, unique: uniqueVisits};
                    }
                    
                    return data;
                })
                .then(function(data) {
                    return drawChart(data);
                })
                .catch(function(err) {
                    console.log('error with getting visits');
                });
        }

        function drawChart(data) {
            Highcharts.chart('chart-container', {
                title: {
                    text: 'Visits'
                },

                xAxis: {
                    title: {
                        text: 'time'
                    },
                },
                yAxis: {
                    title: {
                        text: 'Visits count'
                    },
                    min: 0
                },

                plotOptions: {
                    spline: {
                        marker: {
                            enabled: true
                        }
                    }
                },

                series: [{
                    name: 'total',
                    data: data.total
                }, {
                    name: 'unique',
                    data: data.unique
                }]
            });
        }



    }
})();
