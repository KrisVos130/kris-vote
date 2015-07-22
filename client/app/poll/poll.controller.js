'use strict';

angular.module('workspaceApp')
  .controller('PollCtrl', function ($scope, $routeParams, $http, Auth, $location) {
    $scope.ok = false;
    $scope.buttonDisabled = true;
    $scope.submitted = false;
    var answered = false;
    var ready = false;
    var id = $routeParams.id;
    $scope.id = $routeParams.id;
    var user = Auth.getCurrentUser();
    if (Auth.isLoggedIn) {
      user.$promise.then(function(user){
        $http.get('/api/polls/' + id).success(function(poll){
          if (poll[0] !== undefined) {
            poll[0].results.map(function(result){
              //console.log(Auth.getCurrentUser());
              if (result.user === user._id) {
                answered = true;
              }
            });
            if (!answered) {
              $scope.question = poll[0].question;
              $scope.poll_options = poll[0].poll_options;
              $scope.ok = true;
            } else {
              $location.path('/poll/' + id + '/r');
            }
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
    } else {
      $location.path('/poll/' + id + '/r');
    }
    
    var answer = -1;
    $scope.click = function(id){
      answer = id;
      $(".option-li").removeClass("selected");
      $("#" + id).addClass("selected");
      
      if (answer > -1 && answer < $scope.poll_options.length) {
        $scope.buttonDisabled = false;
      } else {
        $scope.buttonDisabled = true;
      }
    };
    
    $scope.submitAnswer = function(){
      if (answer > -1 && answer < $scope.poll_options.length && !$scope.submitted && !answered && $scope.ok) {
        $scope.submitted = true;
        var post = {user: Auth.getCurrentUser()["_id"], poll_option: answer};
        console.log(post);
        $http.post("/api/polls/" + id + "/answer", post).success(function(stuff){
          $location.path('/poll/' + id + '/r');
        });
      }
    };
    
    $scope.results = function(){
      $location.path('/poll/' + id + '/r');
    }
  });
