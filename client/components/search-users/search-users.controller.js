(function () {
    angular.module('app')
        .controller('SearchUsersController', ['$http', 'UserService', function ($http, UserService) {
            var vm = this;

            angular.extend(vm, {
                input: {
                    searchText: ''
                },
                searchUsers: searchUsers,
                foundUsers: [],
                canFollow: canFollow,
                canUnFollow: canUnFollow,
                follow: follow,
                unfollow: unfollow
            });

            function searchUsers(input) {
                console.log(vm.input)
                $http.post('/searchUsers', vm.input)
                    .success(function (response) {
                        // console.log(response); 
                        vm.foundUsers = response;
                        console.log(vm.foundUsers)
                    })
                    .error(function () {
                        console.log("SOMETHING WENT WRONG");
                    });
            }

            function canFollow(user) {
                if (user._id == UserService.currentUser._id || UserService.currentUser.follows.indexOf(user._id) !== -1 ){
                    return false;
                }
                return true;
            }

            function canUnFollow(user) {
                if (user._id == UserService.currentUser._id || UserService.currentUser.follows.indexOf(user._id) == -1 ){
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


        }]);
})();