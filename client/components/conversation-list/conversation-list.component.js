(function() {
    'use strict';

    angular.module('app')
        .component('conversationList', {
            templateUrl: '/components/conversation-list/conversation-list.component.html',
            controller: ConversationListController,
            bindings: {
                conversations: '=',
                currentUser: '='
            }
        });

    ConversationListController.$inject = [
        'ConversationService',
        'toastr',
        '$mdDialog',
        '$mdMedia'
    ];

    function ConversationListController(
        ConversationService,
        toastr,
        $mdDialog,
        $mdMedia
    ) {
        var vm = this;

        angular.extend(vm, {
            showDialog: showDialog
        });

        function showDialog($event) {
            $mdDialog.show({
                controller: ConversationDialogController,
                controllerAs: 'conversationDialogCtrl',
                templateUrl: '/components/conversation-list/new-conversation-dialog.tmpl.html',
                clickOutsideToClose: true,
            });

            function ConversationDialogController($mdDialog) {
                var dialogVm = this;

                angular.extend(dialogVm, {
                    conversationInput: {
                        conversationContent: ''
                    },
                    closeDialog: closeConversationDialog,
                    addConversation: addConversation
                });

                function closeConversationDialog() {
                    $mdDialog.hide();
                }

                function addConversation() {
                    ConversationService.addConversation(dialogVm.conversationInput)
                        .then(function(response) {
                            vm.conversations.push(response.data);
                        })
                        .catch(function() {
                            toastr.error(
                                'Error'
                            );
                        });
                    closeConversationDialog();
                }
            }
        }

        // function deletePost(id) {
        //     PostService.deletePost(id)
        //         .then(function(response) {
        //             var indexToRemove = -1;

        //             for (var i = 0; i < vm.posts.length; i++) {
        //                 if (vm.posts[i]._id === id) {
        //                     indexToRemove = i;
        //                 }
        //             }

        //             if (indexToRemove >= 0) {
        //                 vm.posts.splice(indexToRemove, 1);
        //             }
        //         });
        // }

        // function likePost(post) {
        //     PostService.likePost(post._id)
        //         .then(function(response) {
        //             return angular.copy(response.data, post);
        //         })
        //         .catch(function() {
        //             toastr.error('Server error', 'Can\'t like post');
        //         });
        // }

        // function unlikePost(post) {
        //     PostService.unlikePost(post._id)
        //         .then(function(response) {
        //             return angular.copy(response.data, post);
        //         })
        //         .catch(function() {
        //             toastr.error('Server error', 'Can\'t unlike post');
        //         });
        // }

        // function likeOrUnlike(post) {
        //     var index = post.likedBy.indexOf(vm.creator._id);

        //     if (index === -1) {
        //         likePost(post);
        //     } else {
        //         unlikePost(post);
        //     }
        // }

        // function isLiked(post) {
        //     var index = post.likedBy.indexOf(vm.creator._id);

        //     return index !== -1;
        // }
    }
})();
