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
                isPrivate: false,
                time: new Date().setMinutes(0),
                date: null,
                invitedPersons: [],
                selectedPeople: []
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

        vm.person = {};
        vm.people = [];

        // vm.disabled = undefined;
        // vm.searchEnabled = undefined;

        // vm.enable = function() {
        //     vm.disabled = false;
        // };

        // vm.disable = function() {
        //     vm.disabled = true;
        // };

        // vm.enableSearch = function() {
        //     vm.searchEnabled = true;
        // };

        // vm.disableSearch = function() {
        //     vm.searchEnabled = false;
        // };

        // vm.clear = function() {
        //     vm.person.selected = undefined;
        // };

        // vm.counter = 0;
        // vm.someFunction = function(item, model) {
        //     vm.counter++;
        //     vm.eventResult = { item: item, model: model };
        // };

        // vm.removed = function(item, model) {
        //     vm.lastRemoved = {
        //         item: item,
        //         model: model
        //     };
        // };

        vm.addPerson = function(item, model) {
            if (item.hasOwnProperty('isTag')) {
                delete item.isTag;
                vm.people.push(item);
            }
        };
    }
})();
