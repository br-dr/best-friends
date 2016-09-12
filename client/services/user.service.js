(function () {
    angular.module('app')
        .service('UserService', ['$http', function ($http) {
            var vm = this;

            vm.getCurrentUser = function () {
                return $http.get('/profile')
                    .then(function (response) {
                        return vm.currentUser = response.data;
                    });
            }

            // vm.followUser = function (user) {
            //     return $http.post('/follow', user)
            //         .then(function (response) {
            //             console.log('You are following now!');
            //             return angular.copy(response.data, UserService.currentUser);
                        
            //         });
            // }

            // vm.unFollowUser = function (user) {
            //     return $http.post('/unfollow', user)
            //         .then(function (response) {
            //             console.log('Unfollowed!');
            //             return angular.copy(response.data, UserService.currentUser);
                        
            //         });
            // }
        }]);
})();

