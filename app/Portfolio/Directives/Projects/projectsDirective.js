
    'use strict';

    //hämtar Application-modulen som redan är skapad i Application.js
    var application = angular.module('App');

    //Binder direktivet till vår modul
    application.directive('projects', function (projectsService) {


        function link($scope) {
            
               projectsService.getAll()
               .then(function(response){
                   $scope.projects = response.data;
                   console.log(response.data);
               });

            }

        return {
            templateUrl: "/Portfolio/Directives/Projects/projectsDirective.html",
            restrict: 'E',
            link: link
        };
});
