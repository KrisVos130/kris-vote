'use strict';

angular.module('workspaceApp')
  .controller('RCtrl', function ($scope, $routeParams, $http) {
    $scope.ok = false;
    $scope.question = "";
    var id = $routeParams.id;
    $scope.id = $routeParams.id;
    $http.get('/api/polls/' + id).success(function(poll){
      if (poll[0] !== undefined) {
        // Do all stuff with stuff yeah
        $scope.question = poll[0].question;
        $scope.ok = true;
      } else {
        $scope.question = "404 - Poll not found.";
        $scope.ok = false;
      }
    }).error(function(error){
      if (error === "Not found") {
        $scope.question = "404 - Poll not found.";
        $scope.ok = false;
      } else {
        $scope.question = error;
        $scope.ok = false;
      }
    });
    
  });
