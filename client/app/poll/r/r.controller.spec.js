'use strict';

describe('Controller: RCtrl', function () {

  // load the controller's module
  beforeEach(module('workspaceApp'));

  var RCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RCtrl = $controller('RCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
