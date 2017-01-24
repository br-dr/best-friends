(function() {
    angular.module('app')
        .component('commentList', {
            templateUrl: '/components/comment-list/comment-list.component.html',
            controller: CommentListController,
            bindings: {
                comments: '=',
                event: '=',
                // user: '=',
                currentUser: '='
            }
        });

    CommentListController.$inject = ['CommentService', 'toastr'];

    function CommentListController(CommentService, toastr) {
        var vm = this;

        angular.extend(vm, {
            shouldShowCommentForm: false,
            commentInput: {
                commentContent: ''
            },
            cancelCommentInput: cancelCommentInput,
            addComment: addComment,
            deleteComment: deleteComment,
            likeOrUnlike: likeOrUnlike,
            isLiked: isLiked
        });

        function cancelCommentInput() {
            vm.shouldShowCommentForm = false;
            vm.commentInput.commentContent = '';
        }

        function addComment() {
            CommentService.addComment(vm.event._id, vm.commentInput)
                .then(function(response) {
                    // req.user.following = req.user.following || []
                    vm.comments.push(response.data);
                    vm.cancelCommentInput();
                }).catch(function() {
                    toastr.error(
                        'Error',
                        ':('
                    );
                });
        }

        function deleteComment(id) {
            CommentService.deleteComment(id)
                .then(function(response) {
                    var indexToRemove = -1;

                    for (var i = 0; i < vm.comments.length; i++) {
                        if (vm.comments[i]._id === id) {
                            indexToRemove = i;
                        }
                    }

                    if (indexToRemove >= 0) {
                        vm.comments.splice(indexToRemove, 1);
                    }
                });
        }

        function likeComment(comment) {
            CommentService.likeComment(comment._id)
                .then(function(response) {
                    return angular.copy(response.data, comment);
                })
                .catch(function() {
                    toastr.error('Server error', 'Can\'t like comment');
                });
        }

        function unlikeComment(comment) {
            CommentService.unlikeComment(comment._id)
                .then(function(response) {
                    return angular.copy(response.data, comment);
                })
                .catch(function() {
                    toastr.error('Server error', 'Can\'t unlike comment');
                });
        }

        function likeOrUnlike(comment) {
            var index = comment.likedBy.indexOf(vm.currentUser._id);

            if (index === -1) {
                likeComment(comment);
            } else {
                unlikeComment(comment);
            }
        }

        function isLiked(comment) {
            var index = comment.likedBy.indexOf(vm.currentUser._id);

            return index !== -1;
        }
    }
})();
