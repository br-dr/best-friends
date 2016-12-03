(function() {
    'use strict';

    angular.module('app')
        .component('messageList', {
            templateUrl: '/components/message-list/message-list.component.html',
            controller: MessageListController,
            bindings: {
                messages: '=',
                conversation: '=',
                currentUser: '='
            }
        });

    MessageListController.$inject = ['MessageService', 'toastr', '$mdDialog'];

    function MessageListController(MessageService, toastr, $mdDialog) {
        var vm = this;

        angular.extend(vm, {
            shouldShowMessageForm: false,
            messageInput: {
                content: ''
            },
            // deleteMessage: deleteMessage,
            showMessageDialog: showMessageDialog
        });


        function showMessageDialog($event) {
            $mdDialog.show({
                controller: MessageDialogController,
                controllerAs: 'messageDialogCtrl',
                templateUrl: '/components/message-list/new-message-dialog.tmpl.html',
                clickOutsideToClose: true,
            });

            function MessageDialogController($mdDialog) {
                var dialogVm = this;

                angular.extend(dialogVm, {
                    messageInput: {
                        content: ''
                    },
                    closeDialog: closeDialog,
                    addMessage: addMessage
                });

                function closeDialog() {
                    $mdDialog.hide();
                }

                function addMessage() {
                    MessageService.addMessage(vm.conversation._id, dialogVm.messageInput)
                        .then(function(response) {
                            vm.messages.push(response.data);
                        }).catch(function() {
                            toastr.error(
                                'Error',
                                ':('
                            );
                        });

                    closeDialog();
                }
            }
        }


        // function deleteComment(id) {
        //     CommentService.deleteComment(id)
        //         .then(function(response) {
        //             var indexToRemove = -1;

        //             for (var i = 0; i < vm.comments.length; i++) {
        //                 if (vm.comments[i]._id === id) {
        //                     indexToRemove = i;
        //                 }
        //             }

        //             if (indexToRemove >= 0) {
        //                 vm.comments.splice(indexToRemove, 1);
        //             }
        //         });
        // }

        // function likeComment(comment) {
        //     CommentService.likeComment(comment._id)
        //         .then(function(response) {
        //             return angular.copy(response.data, comment);
        //         })
        //         .catch(function() {
        //             toastr.error('Server error', 'Can\'t like comment');
        //         });
        // }

        // function unlikeComment(comment) {
        //     CommentService.unlikeComment(comment._id)
        //         .then(function(response) {
        //             return angular.copy(response.data, comment);
        //         })
        //         .catch(function() {
        //             toastr.error('Server error', 'Can\'t unlike comment');
        //         });
        // }

        // function likeOrUnlike(comment) {
        //     var index = comment.likedBy.indexOf(vm.currentUser._id);

        //     if (index === -1) {
        //         likeComment(comment);
        //     } else {
        //         unlikeComment(comment);
        //     }
        // }

        // function isLiked(comment) {
        //     var index = comment.likedBy.indexOf(vm.currentUser._id);

        //     return index !== -1;
        // }
    }
})();
