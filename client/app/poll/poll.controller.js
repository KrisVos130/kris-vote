'use strict';

angular.module('workspaceApp')
  .controller('PollCtrl', function ($scope, $routeParams, $http, Auth, $location) {
    var id = $routeParams.id;
    if (Auth.isLoggedIn()) {
      $http.get('/api/polls/' + id).success(function(poll){  
          $scope.question = poll[0].question;
          $scope.options = poll[0].poll_options;
          
          console.log(poll[0]);
      });
    } else {
      $location.path('/poll/' + id + '/r');
    }
  });
