(function() {
    'use strict';

    angular.module('app', [
        'ui.router',
        'ngAnimate',
        'toastr',
        'ngSanitize',
        'ui.bootstrap',
        'angular-loading-bar',
        'angucomplete-alt'
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
});
})();
