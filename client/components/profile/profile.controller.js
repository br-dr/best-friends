(function() {
    'use strict';

    angular
        .module('app')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['user', 'posts'];

    function ProfileController(user, posts) {
        var vm = this;

        angular.extend(vm, {
            user: user,
            posts: posts
        });
    }
})();
