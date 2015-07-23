'use strict';

angular.module('workspaceApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/createpoll', {
        templateUrl: 'app/createpoll/createpoll.html',
        controller: 'CreatepollCtrl',
        authenticate: true
      });
  });