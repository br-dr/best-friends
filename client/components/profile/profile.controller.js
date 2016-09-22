(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = [
        'currentUser',
        'posts',
        '$http',
        'followers'
    ];

    function ProfileController(
        currentUser,
        posts,
        $http,
        followers
    ) {
        var vm = this;

        angular.extend(vm, {
            input: {
                url: '',
            },
            currentUser: currentUser,
            posts: posts,
            followers: followers,
            errorUrl: false,
            shouldShowInput: false,
            changeAvatar: changeAvatar,
            cancelUrlInput: cancelUrlInput,
            changeAvatarByKeypress: changeAvatarByKeypress,
        });

        function changeAvatar() {
            $http.post('/api/change-avatar', vm.input)
                .then(function(response) {
                    angular.copy(response.data, vm.user);
                    vm.errorUrl = false;
                    vm.input.url = '';
                    vm.shouldShowInput = false;
                })
                .catch(function() {
                    vm.errorUrl = true;
                });
        }

        function cancelUrlInput() {
            vm.shouldShowInput = false;
            vm.input.url = '';
            vm.errorUrl = false;
        }

        function changeAvatarByKeypress($event) {
            if ($event.keyCode === 13) {
                changeAvatar();
            }
        }
    }
})();
