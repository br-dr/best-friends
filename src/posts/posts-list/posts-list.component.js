// import * as angular from 'angular';

// import template from './posts-list.component.html';
// import {$mdDialog} from 'angular-material';

// export const PostsListComponent = {
//     template,
//     bindings: {
//         posts: '<',
//         owner: '<',
//         creator: '<'
//     },
//     controller: class PostsListComponent {
//         constructor($mdDialog) {
//             'ngInject';

//             Object.assign(this, {

//             });
//         }

//         showDialog($event) {
//             $mdDialog.show({
//                 controller: DialogController,
//                 // controllerAs: 'dialogCtrl',
//                 controllerAs: '$ctrl',
//                 templateUrl: '/posts/posts-list/new-post-dialog.component.html',
//                 clickOutsideToClose: true,
//             });

//             function DialogController($mdDialog) {
//                 var dialogVm = this;

//                 angular.extend(dialogVm, {
//                     postInput: {
//                         postContent: ''
//                     },
//                     closeDialog: closeDialog,
//                     addPost: addPost
//                 });

//                 function closeDialog() {
//                     $mdDialog.hide();
//                 }

//                 function addPost() {
//                     // PostService.addPost(vm.owner._id, dialogVm.postInput)
//                     //     .then(function(response) {
//                     //         vm.posts.push(response.data);
//                     //     })
//                     //     .catch(function() {
//                     //         toastr.error(
//                     //             'This user is not following you...',
//                     //             'You can\'t post here!'
//                     //         );
//                     //     });
//                     // closeDialog();
//                     console.log('adding post..')
//                 }
//             }
//         }
//     }
// }