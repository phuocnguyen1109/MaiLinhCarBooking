

(function () {
    angular.module('mainApp')
        .controller('healthCheckController', healthCheckController);

    healthCheckController.$inject = ['$scope'];

    function healthCheckController($scope) {

        $scope.initialize = initialize;
        $scope.standardCheck = ["Thông tư 24", "Thông tư 14", "Đặc thù theo KH"];


        function initialize() {
           
        }

        



    }  
})();