'use strict';

angular
  .module('App', [
    'ngRoute',
    'ui.bootstrap'

  ])
  .config(function ($routeProvider) {

    $routeProvider
      .when('/', {
        templateUrl: "Home/home.html"
    })

    $routeProvider
      .when('/portfolio', {
        templateUrl: "/Portfolio/portfolio.html",
        controller: "portfolioCtrl"
    })

    $routeProvider
      .when('/game', {
        templateUrl: "/Game/game.html",
    })

    $routeProvider
      .when('/portfolio/:id', {
        templateUrl: "/Portfolio/project.html",
    })

    $routeProvider
      .when('/comet', {
      templateUrl: "/Comet/comet.html",
    })

      .otherwise({
        redirectTo: '/'
      });

  });
