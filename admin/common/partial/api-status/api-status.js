angular
    .module('biodags-admin')
    .controller('ApiStatusCtrl', function($scope, $rootScope, $timeout, $log, $location, StatusService) {

        $("title").text("itclarifies | API Status");

        $log.info("Login Ctrl is running");

        /*
        StatusService.get().then(function (response) {
            $scope.apiStatusMessage = response["data"]["Data"];
            $rootScope.safeApply();
        }, function (err) {
            $scope.apiStatusMessage = "Failed fetching API Status Message";
            $rootScope.safeApply();
        });*/
});

