'use strict';

angular.module('workspaceApp')
  .controller('PollCtrl', function ($scope, $routeParams, $http, Auth, $location) {
    $scope.ok = false;
    $scope.buttonDisabled = true;
    $scope.submitted = false;
    var ready = false;
    var id = $routeParams.id;
    var ip = "";
    var answered = false;
    $scope.id = $routeParams.id;
    $http.get('/api/polls/' + id).success(function(poll){
      if (poll[0] !== undefined) {
        poll[0].results.map(function(result){
          console.log(result);
          if (result.ip === poll[0].user_ip) {
            answered = true;
          }
        });
        if (!answered) {
          ip = poll[0].user_ip;
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
      if (answer > -1 && answer < $scope.poll_options.length && !$scope.submitted && $scope.ok) {
        $scope.submitted = true;
        var post = {ip: ip, poll_option: answer};
        $http.post("/api/polls/" + id + "/answer", post).success(function(stuff){
          $location.path('/poll/' + id + '/r');
        });
      }
    };
    
    $scope.results = function(){
      $location.path('/poll/' + id + '/r');
    }
  });
