(function() {
    angular.module('app', [
        'ui.router',
        'ngAnimate',
        'toastr',
        'ngSanitize',
        'angular-loading-bar',
        'angucomplete-alt',
        'ngAria',
        'ngMaterial',
        'ngMdIcons'
    ]).directive('ngEnter', function() {
        return function(scope, element, attrs) {
            element.bind('keydown keypress', function(event) {
                if (event.which === 13) {
                    scope.$apply(function() {
                        scope.$eval(attrs.ngEnter);
                    });
                    event.preventDefault();
                }
            });
        };
    })
        .config(function($mdThemingProvider) {
            $mdThemingProvider.theme('default')
                .primaryPalette('indigo', {
                    'default': '400',
                    'hue-1': '100', // md-hue-1 class
                    'hue-2': '600',
                    'hue-3': 'A100'
                })
                .accentPalette('red', {
                    'default': '400'
                });
            $mdThemingProvider.theme('lime')
                .primaryPalette('lime', {
                    'default': '400',
                    'hue-1': '100', // md-hue-1 class
                    'hue-2': '600',
                    'hue-3': 'A100'
                })
                .accentPalette('orange');
            // .warnPalette('blue');
            $mdThemingProvider.alwaysWatchTheme(true);
        });

})();
