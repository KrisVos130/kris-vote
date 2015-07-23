'use strict';

angular.module('workspaceApp')
  .controller('MypollsCtrl', function ($scope, Auth, $http) {
    $scope.polls = [];
    $scope.message = "Fetching polls...";
    var user;
    Auth.getCurrentUser().$promise.then(function(currentUser){
      user = currentUser;
      refreshPolls();
    });
    
    $scope.delete = function(id) {
      // Do stuff to delete it
      
      $http.delete('/api/polls/remove/' + id).success(function(response){
        if (response === "Success!") {
          refreshPolls();
          console.log("Success!");
        } else {
          console.log("Something went wrong...");
        }
      }).error(function(){
        alert("An error occured");
      });
    }
    
    function refreshPolls() {
      $scope.message = "Fetching polls...";
      $http.get('/api/polls/user/' + user._id).success(function(polls){
        $scope.polls = polls;
        if ($scope.polls.length === 0) {
          $scope.message = "No polls found";
          $("#results").hide();
        } else if ($scope.polls.length === 1) {
          $scope.message = "Displaying " + $scope.polls.length + " result";
          $("#results").show();
        } else {
          $scope.message = "Displaying " + $scope.polls.length + " results";
          $("#results").show();
        }
      }).error(function(){
        $scope.message = "An error occured, could not load polls";
        alert("An error occured");
      });
    }
  });
