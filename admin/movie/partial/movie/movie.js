angular
    .module('biodags-admin')
    .controller('MovieCtrl', function($scope, $rootScope, $route, $routeParams,
        $location, $timeout, $q, $log, MovieService) {

    $("title").text("biodags | Movie");

    $log.info("Movies Ctrl is running");

});