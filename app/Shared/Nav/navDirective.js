(function () {
    'use strict';

    //hämtar Application-modulen som redan är skapad i Application.js
    var application = angular.module('App');

    //Binder direktivet till vår modul
    application.directive('navBar', ['$location', function ($location) {


        function link($scope, $element, $attrs) {
                   

            $scope.isActive = function (viewLocation) {
                var active = (viewLocation === $location.path());
                return active;
            };
            
        }

        return {
            templateUrl: "/Shared/Nav/navDirective.html",
            restrict: 'E',
            link: link
        };
    }])
})();