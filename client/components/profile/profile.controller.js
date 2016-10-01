(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = [
        'currentUser',
        'posts',
        '$http',
        'followers',
        'totalVisits',
        'uniqueVisits',
        'totalVisitsThisDay',
        'totalVisitsThisWeek',
        'totalVisitsThisMonth',
        'uniqueVisitsThisDay',
        'uniqueVisitsThisWeek',
        'uniqueVisitsThisMonth'
    ];

    function ProfileController(
        currentUser,
        posts,
        $http,
        followers,
        totalVisits,
        uniqueVisits,
        totalVisitsThisDay,
        totalVisitsThisWeek,
        totalVisitsThisMonth,
        uniqueVisitsThisDay,
        uniqueVisitsThisWeek,
        uniqueVisitsThisMonth
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
            totalVisits: totalVisits,
            uniqueVisits: uniqueVisits,
            totalVisitsThisDay: totalVisitsThisDay,
            totalVisitsThisWeek: totalVisitsThisWeek,
            totalVisitsThisMonth: totalVisitsThisMonth,
            uniqueVisitsThisDay: uniqueVisitsThisDay,
            uniqueVisitsThisWeek: uniqueVisitsThisWeek,
            uniqueVisitsThisMonth: uniqueVisitsThisMonth
        });

        function changeAvatar() {
            $http.post('/api/change-avatar', vm.input)
                .then(function(response) {
                    angular.copy(response.data, vm.currentUser);
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
