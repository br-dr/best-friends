(function() {
    'use strict';

    angular.module('app')
        .component('followButtons', {
            templateUrl: '/components/follow-buttons/' +
            'follow-buttons.component.html',
            controller: FollowButtonsController,
            bindings: {
                user: '=', //the one whom you already following
                currentUser: '='
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

        function canFollow() {
            var isCurrentUser = vm.user._id ===
                vm.currentUser._id;
            var isFollowing = vm.currentUser
                .following.indexOf(vm.user._id) !== -1;

            if (isCurrentUser || isFollowing) {
                return false;
            }

            return true;
        }

        function canUnFollow() {
            var isCurrentUser = vm.user._id ===
                vm.currentUser._id;
            var isNotFollowing = vm.currentUser
                .following.indexOf(vm.user._id) === -1;

            if (isCurrentUser || isNotFollowing) {
                return false;
            }

            return true;
        }

        function follow() {
            UserService.followUser(vm.user, vm.currentUser);
        }

        function unfollow() {
            UserService.unFollowUser(vm.user, vm.currentUser);
        }
    }
})();
