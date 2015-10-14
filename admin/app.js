angular.module('biodags-admin', [
    'ui.bootstrap',
    'ui.utils',
    'ngRoute',
    'ngAnimate',
    'ipCookie']);

angular.module('biodags-admin').config(function ($routeProvider) {
    $routeProvider.when('/login', {templateUrl: 'user/partial/login/login.html'});
    $routeProvider.when('/movies',{templateUrl: 'movie/partial/movies/movies.html'});
    $routeProvider.when('/movie/:movieId',{templateUrl: 'movie/partial/movie/movie.html'});
    $routeProvider.when('/status/',{templateUrl: 'common/partial/api-status/api-status.html'});
    // $routeProvider.when('/', {templateUrl: 'user/partial/login/login.html'});

    /* Add New Routes Above */
    $routeProvider.otherwise({redirectTo: '/login'});

});

angular.module('biodags-admin').constant("DEFAULT_APP_SETTINGS", {
    backendUrl : "https://itclarifiesloginstage.appspot.com/"
});


angular.module('biodags-admin').constant("AUTH_EVENTS", {
    loginSuccess: 'auth-login-success',
    logoutSuccess: 'auth-logout-success'
});


angular.module('biodags-admin').config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push(['$rootScope', '$q', '$location', function($rootScope, $q, $location) {
      return {
        responseError: function(rejection) {
          if (rejection.status === 403) {
            var deferred = $q.defer();
            $location.url("login?clearsession=1");
            return deferred.promise;
          }
          // otherwise, default behaviour
          return $q.reject(rejection);
        }
      };
    }]);
}]);


var appSettings = {},
    appVersions = {};

angular.module('biodags-admin').run(function ($rootScope, $location, DEFAULT_APP_SETTINGS) {

    $rootScope.appSettings = _.defaults(appSettings, DEFAULT_APP_SETTINGS);
    $rootScope.appVersions = appVersions;

    // Pinging login server to start it up
    // netTesting.ping($rootScope.appSettings.backendUrl + "Ping", function(){});

    $rootScope.safeApply = function (fn) {
        var phase = $rootScope.$$phase;
        if (phase === '$apply' || phase === '$digest') {
            if (fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };
});

// Manual bootstrap of the application
angular.element(document).ready(function() {
    var $q = angular.bootstrap().get('$q'),
        $http = angular.bootstrap().get('$http');

    $q.all([
        $http.get("local-settings.json"),
        $http.get("versions.json")
    ]).then(function (responses) {

        appSettings = responses[0].data;
        appVersions = responses[1].data;

        angular.bootstrap(document, ['biodags-admin']);

    });
});
