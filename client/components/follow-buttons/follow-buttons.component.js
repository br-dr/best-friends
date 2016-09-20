(function() {
    'use strict';

    angular.module('app')
        .component('followButtons', {
            templateUrl: '/components/follow-buttons/' +
            'follow-buttons.component.html',
            controller: FollowButtonsController,
            bindings: {
                user: '=', //the one whom you already following
            }
        });

    FollowButtonsController.$inject = ['UserService'];

    function FollowButtonsController(UserService) {
        var vm = this;

        angular.extend(vm, {
            canFollow: canFollow,
            canUnFollow: canUnFollow,
            follow: follow,
            unfollow: unfollow

        });

        function canFollow(user) {
            var isCurrentUser = vm.user._id ==
                UserService.currentUser._id;
            var isFollowing = UserService.currentUser
            .following.indexOf(vm.user._id) !== -1;
            if (isCurrentUser || isFollowing) {
                return false;
            }
            return true;
        }

        function canUnFollow(user) {
            var isCurrentUser = vm.user._id ==
                UserService.currentUser._id;
            var isNotFollowing = UserService.currentUser
            .following.indexOf(vm.user._id) === -1;
            if (isCurrentUser || isNotFollowing) {
                return false;
            }
            return true;
        }

        function follow(user) {
            UserService.followUser(user);
        }

        function unfollow(user) {
            UserService.unFollowUser(user);
        }

    }
})();
