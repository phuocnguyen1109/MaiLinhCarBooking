

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
        $scope.goToEditInformation = goToEditInformation;
        $scope.gotoEmployees = gotoEmployees;
        $scope.title = "Sửa Thông Tin Nhân Viên";
        $scope.selectedEmployees =[];
        $scope.filterText ='';
        $scope.listProvince = [

        ];
        var backupEmployees =[];
        $scope.showEmployeesForm = true;

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

        function goToEditInformation() {
            resetForm();
            $scope.openEditInformation = true;
            $scope.isEditting = true;
            $scope.selectedEmployees[0].doB = new Date($scope.selectedEmployees[0].doB);
            $scope.employee = angular.copy($scope.selectedEmployees[0]);
        }

        function gotoEmployees() {
            resetForm();
            $scope.showEmployeesForm = true;
        }

        function resetForm() {
            $scope.openEditInformation = false;
            $scope.showEmployeesForm = false;
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
                addressDefault:'',
                addressContact: '',
                doB:'',
                dateJoin:'',
                phone:'',
                contract: ''
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
                employee.addressDefault = $scope.employee.addressDefault;
                employee.addressContact = $scope.employee.addressContact;
                employee.doB = $scope.employee.doB;
                employee.dateJoin = $scope.employee.dateJoin
                employee.doBDisplay = $scope.employee.doB.toLocaleString(['ban', 'id']);
                employee.selected =false;
                employee.contract = $scope.employee.contract;
            }
            resetData();
            backupEmployees = angular.copy($scope.employees);
        }

        

    }
})();