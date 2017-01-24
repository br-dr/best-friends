import * as angular from 'angular';
import Highcharts from 'highcharts';

import template from './visit-stats.component.html';


export const VisitStatsComponent = {
    template,
    controller: class VisitStatsComponent {
        constructor(VisitService) {
            'ngInject';


            Object.assign(this, {
                VisitService,
                areVisitsShown: false,
                period: localStorage.getItem('period') || 'day',
                visits: [],
                totalVisits: [],
                uniqueVisits: [],
            });
        }

        // getVisits(this.period);

        getVisits(period) {
            this.period = period;
            localStorage.setItem('period', this.period);
            return this.VisitService.getVisitsByPeriod(
                period
            )
                .then((response) => {
                    this.areVisitsShown = true;
                    this.totalVisits.length = 0;
                    this.uniqueVisits.length = 0;

                    angular.copy(response.data, this.visits);

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
                            this.visits = this.visits.map(function(visit) {
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
                        var visit = this.visits.find(function(visit) {
                            return visit._id === i;
                        });

                        this.totalVisits.push([i, visit ? visit.count : 0]);
                        this.uniqueVisits.push([
                            i,
                            visit ? visit.visitors.length : 0
                        ]);
                    }

                    return {
                        total: this.totalVisits,
                        unique: this.uniqueVisits,
                        categories: categories
                    };
                })
                .then(this.drawChart)
                .catch(function(err) {
                    console.log('error with getting visits');
                });
        }
        drawChart(data) {
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
};
