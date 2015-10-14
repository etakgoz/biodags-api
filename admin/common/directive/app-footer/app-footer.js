angular.module('biodags-admin').directive('appFooter', function ($rootScope) {
    return {
        restrict: 'E',
        replace: true,
        scope: {},
        templateUrl: 'common/directive/app-footer/app-footer.html',
        link: function (scope, element, attrs, fn) {

        }
    };
});
