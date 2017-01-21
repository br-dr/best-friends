(function() {
    angular.module('app')
        .controller('FollowingController', FollowingController);

    FollowingController.$inject = [
        'users',
        'currentUser',
        'user'
    ];

    function FollowingController(
        users,
        currentUser,
        user
    ) {
        var vm = this;
        angular.extend(vm, {
            users: users,
            currentUser: currentUser,
            user: user
        });
    }
})();
