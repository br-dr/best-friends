(function() {
    angular.module('app')
        .controller('VisitStatsController', VisitStatsController);

    VisitStatsController.$inject = [
        'currentUser',
        'VisitService'
    ];

    function VisitStatsController(
        currentUser,
        VisitService
    ) {
        var vm = this;

        angular.extend(vm, {
            areVisitsShown: false,
            period: localStorage.getItem('period') || 'day',
            visits: [],
            getVisits: getVisits,
        });

        var totalVisits = [];
        var uniqueVisits = [];

        getVisits(vm.period);

        function getVisits(period) {
            vm.period = period;
            localStorage.setItem('period', vm.period);
            return VisitService.getVisitsByPeriod(
                period
            )
                .then(function(response) {
                    vm.areVisitsShown = true;
                    totalVisits.length = 0;
                    uniqueVisits.length = 0;

                    angular.copy(response.data, vm.visits);

                    var end = 0;
                    var start = 0;
                    var categories = [];
                    switch (period) {
                        case 'day':
                            start = 0;
                            end = (new Date()).getHours();
                            categories = Array.apply(null, Array(24))
                                .map(function(item, index) {
                                    return index + 'h';
                                });
                            break;
                        case 'week':
                            start = 0;
                            end = ((new Date()).getDay() || 7) - 1;
                            vm.visits = vm.visits.map(function(visit) {
                                visit._id = visit._id - 2;
                                return visit;
                            });
                            categories = [
                                'Mon', 'Tue', 'Wed',
                                'Thu', 'Fri', 'Sat', 'Sun'
                            ];
                            break;
                        case 'month':
                            start = 1;
                            end = (new Date()).getDate();
                            break;
                    }

                    for (var i = start; i <= end; i++) {
                        var visit = vm.visits.find(function(visit) {
                            return visit._id === i;
                        });

                        totalVisits.push([i, visit ? visit.count : 0]);
                        uniqueVisits.push([
                            i,
                            visit ? visit.visitors.length : 0
                        ]);
                    }

                    return {
                        total: totalVisits,
                        unique: uniqueVisits,
                        categories: categories
                    };
                })
                .then(drawChart)
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
                    allowDecimals: false,
                    title: {
                        text: 'time'
                    },
                    categories: data.categories
                },
                yAxis: {
                    allowDecimals: false,
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

                series: [
                    {
                        name: 'total',
                        data: data.total
                    }, {
                        name: 'unique',
                        data: data.unique
                    }
                ]
            });
        }
    }
})();
