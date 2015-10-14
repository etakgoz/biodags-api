angular.module('biodags-admin').service('StatusService', function ($http, $q, $rootScope) {


    this.get = function () {

        return $http({
                    method: 'GET',
                    url: $rootScope.appSettings.backendUrl + "status"
                });

    };

});