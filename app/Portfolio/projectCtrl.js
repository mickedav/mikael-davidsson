'use strict';

var application = angular.module('App');

application.controller("projectCtrl", function($scope, $routeParams, projectsService){
	var currProject = $routeParams.id;
	$scope.projects = projectsService.one(currProject);
  	$scope.pics = projectsService.one(currProject).pics;
  	$scope.descs = projectsService.one(currProject).desc;
});
