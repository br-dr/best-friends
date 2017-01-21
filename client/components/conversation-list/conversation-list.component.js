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
                        title: ''
                    },
                    closeConversationDialog: closeConversationDialog,
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
    }
})();
