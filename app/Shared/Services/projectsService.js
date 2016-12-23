
'use strict';

//hämtar Application-modulen som redan är skapad i Application.js
var application = angular.module('App');
var projects = [];
application.service('projectsService', function ($http) {
  var self = this;
  self.getAll = function(){
    return $http.get("https://mikael-projects.herokuapp.com/projects");
  };

});
