(function() {
    'use strict';

    angular.module('app')
        .component('postsList', {
            templateUrl: '/components/posts-list/posts-list.component.html',
            controller: PostsListController,
            bindings: {
                posts: '=',
                owner: '=',
                creator: '='
            }
        });

    PostsListController.$inject = ['PostService', 'toastr'];

    function PostsListController(PostService, toastr) {
        var vm = this;

        angular.extend(vm, {
            shouldShowPostForm: false,
            postInput: {
                postContent: ''
            },
            cancelPostInput: cancelPostInput,
            addPost: addPost,
            deletePost: deletePost,
            likeOrUnlike: likeOrUnlike,
            isLiked: isLiked
        });

        function cancelPostInput() {
            vm.shouldShowPostForm = false;
            vm.postInput.postContent = '';
            vm.postInput.postTitle = '';
        }

        function addPost() {
            PostService.addPost(vm.owner._id, vm.postInput)
                .then(function(response) {
                    vm.posts.push(response.data);
                    vm.cancelPostInput();
                }).catch(function() {
                    toastr.error(
                        'This user is not following you...',
                        'You can\'t post here!'
                    );
                });
        }

        function deletePost(id) {
            PostService.deletePost(id)
                .then(function(response) {
                    var indexToRemove = -1;

                    for (var i = 0; i < vm.posts.length; i++) {
                        if (vm.posts[i]._id === id) {
                            indexToRemove = i;
                        }
                    }

                    if (indexToRemove >= 0) {
                        vm.posts.splice(indexToRemove, 1);
                    }
                });
        }

        function likePost(post) {
            PostService.likePost(post._id)
                .then(function(response) {
                    return angular.copy(response.data, post);
                })
                .catch(function() {
                    toastr.error('Server error', 'Can\'t like post');
                });
        }

        function unlikePost(post) {
            PostService.unlikePost(post._id)
                .then(function(response) {
                    return angular.copy(response.data, post);
                })
                .catch(function() {
                    toastr.error('Server error', 'Can\'t unlike post');
                });
        }

        function likeOrUnlike(post) {
            var index = post.likedBy.indexOf(vm.creator._id);

            if (index === -1) {
                likePost(post);
            } else {
                unlikePost(post);
            }
        }

        function isLiked(post) {
            var index = post.likedBy.indexOf(vm.creator._id);

            return index !== -1;
        }
    }
})();
