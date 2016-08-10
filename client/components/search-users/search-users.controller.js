(function(){
    angular.module('app')
        .controller('SearchUsersController', function($http){
            var vm = this;
            
            angular.extend(vm, {                
                input: {
                    searchText: ''
                },
                searchUsers: searchUsers,
                foundUsers: []              
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
            
        });
})();