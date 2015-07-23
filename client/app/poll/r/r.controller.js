'use strict';

angular.module('workspaceApp')
  .controller('RCtrl', function ($scope, $routeParams, $http) {
    $scope.ok = false;
    $scope.question = "";
    var id = $routeParams.id;
    $scope.id = $routeParams.id;
    var ctx = $("#chart").get(0).getContext("2d");
    
    $http.get('/api/polls/' + id).success(function(poll){
      if (poll[0] !== undefined) {
        // Do all stuff with stuff yeah
        $scope.question = poll[0].question;
        
        var poll_data = [];
        poll[0].poll_options.map(function(){
          poll_data.push(0);
        });
        poll[0].results.map(function(result){
          poll_data[result.poll_option]++;
        });
        var data = {
          labels: poll[0].poll_options,
          datasets: [
              {
                  label: poll[0].question,
                  fillColor: "rgba(220,220,220,0.5)",
                  strokeColor: "rgba(220,220,220,0.8)",
                  highlightFill: "rgba(220,220,220,0.75)",
                  highlightStroke: "rgba(220,220,220,1)",
                  data: poll_data
              }
          ]
        };
        
        var chart = new Chart(ctx).Bar(data, {});
        
        
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
