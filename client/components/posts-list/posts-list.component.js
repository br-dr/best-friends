(function() {
    'use strict';

    angular.module('app')
        .component('postsList', {
            templateUrl: '/components/posts-list/posts-list.component.html',
            controller: PostsListController,
            bindings: {
                posts: '=',
                owner: '=',
                creator: '=',
                currentUser: '='
            }
        });

    PostsListController.$inject = ['$http', 'toastr'];

    function PostsListController($http, toastr) {
        var vm = this;

        angular.extend(vm, {
            shouldShowPostForm: false,
            postInput: {
                postTitle: '',
                postContent: '',
            },
            cancelPostInput: cancelPostInput,
            addPost: addPost,
            deletePost: deletePost,
            likePost: likePost,
            unlikePost: unlikePost,
            likeOrUnlike: likeOrUnlike,
            // isLiked: isLiked
            isLiked: isLiked
        });

        function cancelPostInput() {
            vm.shouldShowPostForm = false;
            vm.postInput.postContent = '';
            vm.postInput.postTitle = '';
        }

        function addPost() {
            $http.post('/api/user/' + vm.owner._id + '/add-post/', vm.postInput)
                .then(function(response) {
                    vm.posts.push(response.data);
                    vm.cancelPostInput();
                }).catch(function() {
                    toastr.error('This user is not following you...',
                        'You can\'t post here!');
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

        function likePost(post) {
            $http.post('/api/posts/' + post._id + '/like-post')
                .then(function(response) {
                    return angular.copy(response.data, post);
                })
                .catch(function() {
                    return console.log('can\'t like, something is wrong');
                });
        }

        function unlikePost(post) {
            $http.post('/api/posts/' + post._id + '/unlike-post')
                .then(function(response) {
                    return angular.copy(response.data, post);
                })
                .catch(function() {
                    return console.log('can\'t like, something is wrong');
                });
        }

        function likeOrUnlike(post) {
            var index = post.likedBy.indexOf(vm.currentUser._id);

            if (index === -1) {
                vm.likePost(post);
            } else {
                vm.unlikePost(post);
            }
        }

        function isLiked(post) {
            var index = post.likedBy.indexOf(vm.currentUser._id);

            if (index === -1) {
                return false;
            } else {
                return true;
            }
        }
    }
})();
