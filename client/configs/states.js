(function () {
    'use strict';

    angular
        .module('app')
        .config(function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise("/");

            $stateProvider
                .state('home', {
                    url: "/",
                    templateUrl: "components/home/home.html"
                })
                .state('login', {
                    url: "/login",
                    templateUrl: "components/login/login.html"
                })
                .state('registration', {
                    url: "/registration",
                    templateUrl: "components/registration/registration.html"
                })
                .state('profile', {
                    url: "/profile",
                    templateUrl: "components/profile/profile.html",
                    controller: "ProfileController as profileCtrl",
                })
                .state('search-users', {
                    url: "/search-users",
                    templateUrl: "components/search-users/search-users.html",
                    controller: "SearchUsersController as searchUsersCtrl",
                })
                .state('edit-profile', {
                    url: "/edit-profile",
                    templateUrl: "components/edit-profile/edit-profile.html",
                    controller: "EditProfileController as editProfileCtrl",
                })
        });
})();