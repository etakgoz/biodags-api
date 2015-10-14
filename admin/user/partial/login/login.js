angular
    .module('biodags-admin')
    .controller('LoginCtrl', function($scope, $rootScope, $route, $routeParams,
        $location, $timeout, $q, $log) {

    $("title").text("biodags | Login");

    $log.info("Login Ctrl is running");


    $scope.loginData = {};
    $scope.isProcessing = false;
    $scope.hasError = false;


    var updateLoginData = function () {

        if ($("#login-username").val() !== '') {
            $scope.loginData.username  = $("#login-username").val();
        }

        if ($("#login-password").val() !== '') {
            $scope.loginData.password  = $("#login-password").val();
        }
    };


    var setHasError = function (value) {

        if (value && $scope.hasError) {
            $(".login-form-container").removeClass("has-error");
            $timeout(function () {
                $(".login-form-container").addClass("has-error");
            }, 10, false);
        } else {
            $scope.hasError = value;
        }

    };

    $scope.login = function () {
        var loginData = $scope.loginData,
            errorExists = false;

        $scope.isSessionCleared = false;

        updateLoginData();

        if (!loginData.hasOwnProperty("username") || !(_.isString(loginData.username) && loginData.username !== '')) {
            loginData.errorUsername = true;
            errorExists = true;
        } else {
            delete loginData.errorUsername;
        }


        if (!loginData.hasOwnProperty("password") || !(_.isString(loginData.password) && loginData.password !== '')) {
            loginData.errorPassword = true;
            errorExists = true;
        } else {
            delete loginData.errorPassword;
        }

        if (!errorExists) {
            $scope.isLoggingIn = true;

            $log.info("The user is logged in....");

            // redirect to tasks page listing all tasks
            $location.url("/movies");

            $rootScope.safeApply();

            // TODO: compare with some previously set username and password
            // log in and redirect to movies page

            /*
            UserService
                .login(loginData.username, loginData.password)
                .then(function (data) {
                    if (_.isObject(data) && data.hasOwnProperty("loginToken")) {
                        $(".login-form-container").removeClass("has-error");
                        $(".footer").css("visibility", "hidden");
                        $(".login-view").addClass("fadeOutUp");


                        $timeout(function () {
                            $scope.$apply(function() {
                                 if(UserService.getAppUrl() !== "") {
                                    window.location = UserService.getAppUrl();
                                 }
                            });
                        }, 1000, false);

                    } else if (_.isObject(data)) {
                        loginData.errorCredentials = true;
                        setHasError(true);
                    }

                    $scope.isLoggingIn = false;

                }, function (data) {
                    loginData.errorSubmission = true;
                    setHasError(true);
                    $scope.isLoggingIn = false;
                });*/

        } else {
            setHasError(true);
        }

        console.log("I am running....");
    };

});
