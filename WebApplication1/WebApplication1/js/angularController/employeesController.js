

(function(){
    angular.module('mainApp')
    .controller('employeesController', employeeControler);
    
    employeeControler.$inject=['$scope'];

    function employeeControler($scope){

        $scope.initialize = initialize;
        $scope.addEmployee = addEmployee;
        $scope.removeEmployees = removeEmployees;
        $scope.updateSelected = updateSelected;
        $scope.openModal = openModal;
        $scope.search = search;

        $scope.selectedEmployees =[];
        $scope.filterText ='';
        var backupEmployees =[];
        

        function initialize()
        {
            $scope.employees = $scope.$parent.$parent.employees;
            $scope.employees.forEach(function(item, index){
                item.selected = false;
            });
            backupEmployees = angular.copy($scope.employees);
            resetData();
        }

        function search()
        {
            $scope.employees = angular.copy(backupEmployees);
            if($scope.filterText)
            {
                $scope.employees = $scope.employees.filter(function(x){
                    return x.name.indexOf($scope.filterText) != -1;
                });
            }
        }
        
        function updateSelected(employee)
        {
          employee.selected = !employee.selected;  
          $scope.selectedEmployees = $scope.employees.filter(function(x){
              return x.selected;
          });
        }

        function openModal(state)
        {
            if(state == 1)
            {
                $scope.isEditting = false;
                $scope.modalTitle="Thêm Nhân Viên";
                return;
            }
            $scope.isEditting = true;
            $scope.modalTitle = "Sửa Thông Tin Nhân Viên";
            $scope.selectedEmployees[0].doB = new Date($scope.selectedEmployees[0].doB);
            $scope.employee = angular.copy($scope.selectedEmployees[0]);
        }


        function removeEmployees(){
            $scope.selectedEmployees.forEach(function(employee, index){
                $scope.employees = $scope.employees.filter(function(x){
                    return x.id != employee.id;
                });
            });
            backupEmployees = angular.copy($scope.employees);
            resetData();
        }



        function resetData(){
            $scope.employee ={
                id: '',
                name:'',
                department:'',
                role: 'Nhân Viên',
                address:'',
                doB:'',
                phone:'' 
            }

            $scope.selectedEmployees =[];
        }
        function addEmployee(){
            if($scope.selectedEmployees.length == 0)
            {
            $scope.employee.doBDisplay = $scope.employee.doB.toLocaleString(['ban', 'id']);
            $scope.employees.push(angular.copy($scope.employee));
            }
            else
            {
                var employee = $scope.employees.filter(function(employee){
                    return employee.id == $scope.employee.id; 
                })[0];

                employee.name = $scope.employee.name;
                employee.department = $scope.employee.department;
                employee.phone = $scope.employee.phone;
                employee.address = $scope.employee.address;
                employee.doB = $scope.employee.doB
                employee.doBDisplay = $scope.employee.doB.toLocaleString(['ban', 'id']);
                employee.selected =false;
            }
            resetData();
            backupEmployees = angular.copy($scope.employees);
        }

        

    }
})();