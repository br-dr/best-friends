(function () {
    angular.module('app')
        .controller('EditProfileController', ['Upload', '$http', function (Upload, $http) {
            var vm = this;

            vm.uploadFile = function (file) {
               if (file) {
                   Upload.upload({
                       url: '/api/profile/editAvatar',
                       method: 'POST',
                       data: {file: file},
                    //    file: file
                   }).success(function(data){
                       console.log('Uploaded')

                   }).error(function (error) {
                       console.log(error)
                   })
               }
            }

        }])

})();