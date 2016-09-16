(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['user', 'posts', '$http'];

    function ProfileController(user, posts, $http) {
        var vm = this;

        angular.extend(vm, {
            input: {
                url: '',
            },
            postInput: {
                postTitle: '',
                postContent: ''
            },
            user: user,
            posts: posts,
            errorUrl: false,
            shouldShowInput: false,
            shouldShowPostForm: false,
            changeAvatar: changeAvatar,
            cancelUrlInput: cancelUrlInput,
            changeAvatarByKeypress: changeAvatarByKeypress,
            cancelPostInput: cancelPostInput,
            addPost: addPost,
            deletePost: deletePost
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

        function cancelPostInput() {
            vm.shouldShowPostForm = false;
            vm.postInput.postContent = '';
            vm.postInput.postTitle = '';
        }

        function addPost() {
            $http.post('/api/add-post', vm.postInput)
                .then(function(response) {
                    vm.posts.push(response.data);
                    vm.cancelPostInput();
                }).catch(function() {
                    console.log('Failed');
                });
        }

        function deletePost(_id) {
            $http.delete('/api/posts/' + _id)
                .then(function(response) {
                    var indexToRemove = -1;

                    for (var i = 0; i < vm.posts.length; i++) {
                        if (vm.posts[i]._id === _id) {
                            indexToRemove = i;
                        }
                    }

                    if (indexToRemove >= 0) {
                        vm.posts.splice(indexToRemove, 1);
                    }
                });
        }
    }
})();
