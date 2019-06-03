(function(){
    angular.module('mainApp')
    .controller('login_Controller', loginController);
    
    loginController.$inject=['$rootScope','$scope','$state'];

    function loginController($rootScope, $scope, $state){
    
    angular.element('.modal-backdrop').detach();    
    $scope.userName='';
        
    $scope.login = login;

    function login(){
        var employees = $scope.$parent.employees;
        if(employees.some(function(x){
            return x.userName == $scope.userName;
        }))
        {
       $state.go("dashboard",{userName: $scope.userName});
        }
    }


    }

})();
