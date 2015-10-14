angular
    .module('biodags-admin')
    .controller('MoviesCtrl', function($scope, $rootScope, $route, $routeParams,
        $location, $timeout, $q, $log, MovieService) {

    $("title").text("biodags | Movies");

    $log.info("Movies Ctrl is running");

});