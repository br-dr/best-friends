(function() {
    angular
        .module('app')
        .controller('UserController', UserController);

    UserController.$inject = [
        'user',
        'posts',
        'currentUser',
        'followers',
        'VisitService'
    ];

    function UserController(
        user,
        posts,
        currentUser,
        followers,
        VisitService
    ) {
        var vm = this;

        angular.extend(vm, {
            user: user,
            posts: posts,
            currentUser: currentUser,
            followers: followers,
        });

        VisitService.createVisit(user._id);
    }
})();
