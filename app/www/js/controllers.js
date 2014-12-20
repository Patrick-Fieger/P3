angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,Employees) {
  $scope.employees = Employees.query();
  $scope.employee = Employees.get({employeeId: 1});
  console.log($scope.employee)
})

