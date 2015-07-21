'use strict';

angular.module('workspaceApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/poll/:id/r', {
        templateUrl: 'app/poll/r/r.html',
        controller: 'RCtrl'
      });
  });
