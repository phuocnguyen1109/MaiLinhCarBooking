
(function () {
    angular.module('mainApp')
        .controller('equipmentsController', equipmentsController);

    equipmentsController.$inject = ['$scope'];

    function equipmentsController($scope) {
          
         $scope.initialize = initialize;
        $scope.changeDate = changeDate;
        $scope.selectedEmployees = [];
        var backupEquipments = [];
        $("#test").on("change", function () {
            this.setAttribute(
                "data-date",
                moment(this.value, "YYYY-MM-DD")
                    .format(this.getAttribute("data-date-format"))
            )
        }).trigger("change")

        
        function initialize() {
            $scope.equipments = $scope.$parent.$parent.equipments; 
            
            $scope.equipments.forEach(function (item, index) {
                
                item.selected = false;
                
            });
            backupEquipments = angular.copy($scope.equipments);

            //resetData();
        }
        function updateSelected(employee) {
            employee.selected = !employee.selected;
            $scope.selectedEmployees = $scope.employees.filter(function (x) {
                return x.selected;
            });
        }

        $scope.$watch('met', function (newValue, oldValue) {
             console.log(newValue);
            console.log(oldValue);
            })

        function changeDate(newValue){
        //var currentElement = $event.target;
        console.log(newValue);


        }
        function resetData() {
            $scope.employee = {
                id: '',
                name: '',
                department: '',
                role: 'Nhân Viên',
                address: '',
                doB: '',
                phone: ''
            }

            $scope.selectedEmployees = [];
        }
      


    }
})();