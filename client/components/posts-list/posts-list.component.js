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

    PostsListController.$inject = ['PostService', 'toastr', '$mdDialog', '$mdMedia'];

    function PostsListController(PostService, toastr, $mdDialog, $mdMedia) {
        var vm = this;

        angular.extend(vm, {
            deletePost: deletePost,
            likeOrUnlike: likeOrUnlike,
            isLiked: isLiked,
            showDialog: showDialog
        });

        function showDialog($event) {
            $mdDialog.show({
                controller: DialogController,
                controllerAs: 'dialogCtrl',
                templateUrl: '/components/posts-list/new-post-dialog.tmpl.html',
                clickOutsideToClose: true,
                // parent: angular.element(document.body),
                // bindToController: true
            });

            function DialogController($mdDialog) {
                var dialogVm = this;

                angular.extend(dialogVm, {
                    postInput: {
                        postContent: ''
                    },
                    closeDialog: closeDialog,
                    addPost: addPost
                });

                function closeDialog() {
                    $mdDialog.hide();
                }

                function addPost() {
                    PostService.addPost(vm.owner._id, dialogVm.postInput)
                        .then(function(response) {
                            vm.posts.push(response.data);
                        })
                        .catch(function() {
                            toastr.error(
                                'This user is not following you...',
                                'You can\'t post here!'
                            );
                        });
                    closeDialog();
                }
            }
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
