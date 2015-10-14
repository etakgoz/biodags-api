angular.module('biodags-admin').service('MovieService', function ($http, $q, $rootScope) {


    this.get = function () {

        return $http({
                    method: 'GET',
                    url: $rootScope.appSettings.backendUrl + "status"
                });

    };

});