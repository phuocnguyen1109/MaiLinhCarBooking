(function(){
    angular.module('mainApp')
    .controller('employeesController', employeeControler);
    
    employeeControler.$inject=['$scope'];

    function employeeControler($scope){

        $scope.initialize = initialize;

        function initialize()
        {
            $scope.employees = $scope.$parent.$parent.employees;
        }

    }
})();