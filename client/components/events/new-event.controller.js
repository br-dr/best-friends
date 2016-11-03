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
                invitedPersons: []
            },
            format: 'dd-MMMM-yyyy',
            popupDatePicker: {
                opened: false,
            },
            openDatePicker: openDatePicker,
            addNewEvent: addNewEvent,
            selectedUser: selectedUser
        });

        function openDatePicker() {
            vm.popupDatePicker.opened = true;
        }

        function addNewEvent($event) {
            $event.preventDefault();

            var input = angular.copy(vm.input);
            input.invitedPersons = input.invitedPersons.map(function(user) {
                return user._id;
            });

            $http.post('/api/events', input)
                .then(function(data) {
                })
                .catch(function() {
                    console.log('Something is wrong');
                });
        }

        function selectedUser(user) {
            if (!user) {
                return;
            }

            var userId = user.originalObject._id;

            for (var i = 0; i < vm.input.invitedPersons.length; i++) {
                var personId = vm.input.invitedPersons[i]._id;

                if (personId === userId) {
                    return;
                }
            }

            vm.input.invitedPersons.push(user.originalObject);
        }
    }
})();
