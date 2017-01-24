(function() {
    angular.module('app')
        .component('userList', {
            templateUrl: '/components/user-list/user-list.component.html',
            controller: UserListController,
            bindings: {
                users: '=',
                currentUser: '='
            }
        });

    function UserListController() {

    }
})();
