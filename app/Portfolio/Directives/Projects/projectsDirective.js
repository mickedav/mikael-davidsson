
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

               $scope.modalId = function(){
                   console.log("SDFSDFSDFD");
                   return "MyModal-1";
               };

            }

        return {
            templateUrl: "/Portfolio/Directives/Projects/projectsDirective.html",
            restrict: 'E',
            link: link
        };
});
