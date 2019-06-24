(function(){
angular.module('mainApp')
.controller('adminController', adminController);

function adminController($scope, $state, $stateParams){

var user = $stateParams.userName;


$scope.selectedDept = 1;

$scope.initialize = initialize;
$scope.changeDepartmentName = changeDepartmentName;
$scope.gotoPermission = gotoPermission;
    $scope.gotoEmployees = gotoEmployees;
    // vinh
$scope.gotoMarriage = gotoMarriage;
$scope.gotoPreviousJobs = gotoPreviousJobs;
$scope.gotoEquipment = gotoEquipment;

$scope.logout = logout;

function initialize()
{
    
    $scope.isAdmin = user == 'admin';
    if($scope.isAdmin)
    {
        changeDepartmentName($scope.selectedDept);
    }
    
}

function gotoEmployees()
{
    resetForm();
    $scope.openEmployeesForm = true;
}
// vinh - goto Marrige Page
    function gotoMarriage() {
        resetForm();
        $scope.openMarriageForm = true;
    }

    // vinh - goto Previous Job Page
    function gotoPreviousJobs() {
        resetForm();
        $scope.openPreviousJobForm = true;
    }
     // vinh - goto Previous Job Page
    function gotoEquipment() {
        resetForm();
        $scope.openEquipmentForm = true;
    }

function gotoPermission()
{
    resetForm();
    $scope.openPermissionForm = true;
}

function resetForm()
{
    $scope.openPermissionForm = false;
    $scope.openEmployeesForm = false;
    $scope.openMarriageForm = false;
    $scope.openPreviousJobForm = false;
    $scope.openEquipmentForm = false;
}

function changeDepartmentName(departmentNo)
{   $scope.selectedDept = departmentNo;
    switch (departmentNo)
    {
                case 1: $scope.departmentName = "Phòng Nhân Sự";
                break;
                case 2: $scope.departmentName = "Phòng Điều Hành - Kinh Doanh";
                break;
                case 3: $scope.departmentName = "Phòng Kỹ Thuật - An Toàn";
                break;
                case 4: $scope.departmentName = "Phòng Kế Toán";
                break;
    }
}

function logout()
{
    $state.go('login');
}

}

})();