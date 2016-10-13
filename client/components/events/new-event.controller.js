(function() {
    'use strict';

    angular.module('app')
        .controller('NewEventController', NewEventController);

    NewEventController.$inject = ['$http'];

    function NewEventController($http) {

        var vm = this;

        angular.extend(vm, {
            input: {
                title: '',
                description: '',
                place: '',
                time: new Date().setMinutes(0),
                date: null
            },
            format: 'dd-MMMM-yyyy',
            popupDatePicker: {
                opened: false,
            },
            openDatePicker: openDatePicker,
            addNewEvent: addNewEvent
        });

        function openDatePicker() {
            vm.popupDatePicker.opened = true;
        }

        function addNewEvent() {
            $http.post('/api/events/add-event', vm.input)
                .then(function(data) {
                    console.log(data);
                })
                .catch(function() {
                    console.log('Something is wrong');
                });
        }
    }
})();
