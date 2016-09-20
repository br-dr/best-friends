(function() {
    'use strict';
    angular.module('app')
        .controller('SearchUsersController', SearchUsersController);

    SearchUsersController.$inject = [
        '$http',
        'UserService',
        'currentUser'
    ];

    function SearchUsersController(
        $http,
        UserService,
        currentUser
    ) {
        var vm = this;

        angular.extend(vm, {
            input: {
                searchText: ''
            },
            foundUsers: [],
            currentUser: currentUser,
            searchUsers: searchUsers
        });

        function searchUsers() {
            $http.post('/search-users', vm.input)
                .success(function(response) {
                    vm.foundUsers = response;
                    vm.errorMessage = false;
                })
                .error(function() {
                    vm.errorMessage = true;
                });
        }
    }
})();
