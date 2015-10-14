angular.module('biodags-admin').directive('appNavigation', function ($rootScope, $location) {
    return {
        restrict: 'E',
        replace: true,
        scope: {},
        templateUrl: 'common/directive/app-navigation/app-navigation.html',
        link: function (scope, element, attrs, fn) {

            scope.currentMenuItem = "movies";

            var getCurrentMenuItem = function (currentPath) {
                if (currentPath.indexOf("movies") !== -1) {
                    return "movies";
                } else if (currentPath.indexOf("movie") !== -1) {
                    return "movie";
                } else if (currentPath.indexOf("status") !== -1) {
                    return "status";
                } else if (currentPath.indexOf("login") !== -1) {
                    return "login";
                } else return "";
            };

            scope.$on('$locationChangeSuccess', function(event, data) {
                scope.currentMenuItem = getCurrentMenuItem(data);
            });

            scope.logout = function () {
                $location.url("/login");
            };

            scope.currentMenuItem = getCurrentMenuItem($location.path());
        }
    };
});
