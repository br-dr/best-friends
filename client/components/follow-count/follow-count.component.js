(function() {
    'use strict';

    angular.module('app')
        .component('followCount', {
            templateUrl: '/components/follow-count/follow-count.component.html',
            controller: FollowCountController,
            bindings: {
                followers: '=',
                following: '='
            }
        });

    function FollowCountController() {

    }


})();
