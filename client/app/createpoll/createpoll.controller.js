'use strict';

angular.module('workspaceApp')
  .controller('CreatepollCtrl', function ($scope, $http, Auth, $location) {
    $scope.poll = {};
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.options = [{name: 'option1'}, {name: 'option2'}];
    var options = 2;
    $scope.addOption = function(){
      options++;
      $scope.options.push({name: 'option' + ($scope.options.length + 1)});
    }; 
    $scope.submitted = false;
    $scope.submit = function(){
      if (!$scope.submitted) {
        $scope.submitted = true;
        $("#errors").children().remove();
        var error = [];
        if ($scope.poll["question"] === undefined | null || ($scope.poll["question"].length === 0)) {
            error.push("Invalid question");
        }
        var temp_options = [];
        for (var i = 1; i < options + 1; i++) {
          temp_options.push($scope.poll["option" + i]);
          if ($scope.poll["option" + i] === undefined | null || ($scope.poll["option" + i].length === 0)) {
            error.push("Invalid option");
          }
        }
        temp_options = temp_options.sort();
        for (var i = 0; i < temp_options.length; i++) {
          if (temp_options[i] === temp_options[i + 1]) {
            error.push("Duplicate option");
          }
        }
        if (error.length === 0) {
          $scope.poll = sortObject($scope.poll);
          var poll = {};
          poll.user = Auth.getCurrentUser()["_id"];
          poll.question = $scope.poll.question;
          poll.poll_options = [];
          for (i = 1; i < options + 1; i++) {
            poll.poll_options.push($scope.poll["option" + i]);
          }
          poll.results = [];
          console.log(poll);
          $http.post('/api/polls/create', poll).success(function(stuff){
            // Redirect
            $location.path('/poll/' + parseInt(stuff));
          });
        } else {
          error.forEach(function(curr_err){
            $("<li>" + curr_err + "</li>").appendTo("#errors");
          });
          $scope.submitted = false;
        }
      }
    }
  });

function sortObject(o) {
    var sorted = {},
    key, a = [];

    for (key in o) {
        if (o.hasOwnProperty(key)) {
          if (key !== "question") {
            a.push(key);
          }
        }
    }

    a.sort();
    a = ["question"].concat(a);
    
    for (key = 0; key < a.length; key++) {
        sorted[a[key]] = o[a[key]];
    }
    return sorted;
}