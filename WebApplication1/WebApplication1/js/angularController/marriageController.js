
(function () {
    angular.module('mainApp')
        .controller('marriageController', marriageController);

    marriageController.$inject = ['$scope'];

    function marriageController($scope) {
        $scope.initialize = initialize;
        $scope.selectedRelatives = [];
        $scope.openModal = openModal;
        $scope.updateSelected = updateSelected;
        $scope.addRelative = addRelative;
        $scope.removeRelatives = removeRelatives;
        var backupRelative = [];
        // variable
        $scope.dropdowntext = 'Tình trạng hôn nhân';
        $scope.relativesArray = [
            { key: 1, value: 'Cha' },
            { key: 2, value: 'Mẹ' },
            { key: 3, value: 'Vợ' },
            { key: 4, value: 'Con' },
            { key: 5, value: 'Bố Vợ/Chồng' },
            { key: 6, value: 'Mẹ Vợ/Chồng' }
        ];
        var maritalStatus = [{
            key: 1,
            status: "Chưa lập gia đình"
        },
        {
            key: 2,
            status: "Lập gia đình"
        }, {
            key: 3,
            status: "Ly dị"
        }
        ];
        $scope.valueOfDropDown = [];
        //maritalStatus.forEach(function (element) {
        //    $scope.valueOfDropDown.push(element.status);
        //});
        function showStatusMarriage() {
            // to do
            //$scope.employees.forEach(function (item) {
            //    if (item.statusMarriage === 1) {
            //        $scope.statusMarriage = 'Chưa lập gia đình';
            //    } else if (item.statusMarriage === 2) {
            //        $scope.statusMarriage = 'Lập gia đình';

            //    } else {
            //        $scope.statusMarriage = 'Ly dị';

            //    }
                
            //})

            if ($scope.employees.statusMarriage === 1) {
                  $scope.statusMarriage = 'Chưa lập gia đình';
            } else if ($scope.employees.statusMarriage === 2) {
                   $scope.statusMarriage = 'Lập gia đình';

               } else {
                    $scope.statusMarriage = 'Ly dị';

               }
        }
        function initialize() {
            $scope.relatives = $scope.$parent.$parent.relatives;
            $scope.employees = $scope.$parent.$parent.employees[0];
            showStatusMarriage();
            $scope.relatives.forEach(function (item, index) {
                item.selected = false;
            });
            backupRelative = angular.copy($scope.relatives);
            resetData();
        };
        function resetData() {
            $scope.relative = {
                id: '',
                name: '',
                relative: '',
                address: '',
                doB: '',
                status: ''
            }

            $scope.selectedRelatives = [];
        }
        function updateSelected(relative) {
            relative.selected = !relative.selected;
            $scope.selectedRelatives = $scope.relatives.filter(function (x) {
                return x.selected
            });
        };
        function checkRelativeDropDown() {
            var listRelativeData = [];
            var dropdownCheck = $scope.relativesArray;
            $scope.relatives.forEach(function (item) {
                listRelativeData.push(item.relative);
            });
            var listValueMarrige = [];
            for (var i = 0; i < dropdownCheck.length; i++) {
                if ($.inArray(dropdownCheck[i].value, listRelativeData) > -1) {
                    dropdownCheck.splice(i, 1);
                    i--;
                }  
            };
            dropdownCheck.forEach(function (item) {
                listValueMarrige.push(item.value);
            })
            if (!listValueMarrige.includes("Con")) {
                listValueMarrige.push("Con")
            }           
            return listValueMarrige;
        };
        function openModal(state) {
            if (state == 1) {
                $scope.isEditting = false;
                $scope.modalTitle = "Thêm Quan Hệ";
                $scope.dropdownCheck = checkRelativeDropDown();

                return;
            };
            $scope.isEditting = true;
            $scope.modalTitle = "Sửa Thông Tin Quan Hệ";
            $scope.selectedRelatives[0].doB = new Date($scope.selectedRelatives[0].doB);
            $scope.relative = angular.copy($scope.selectedRelatives[0]);
        };
        function removeRelatives() {
            $scope.selectedRelatives.forEach(function (relatives, index) {
                $scope.relatives = $scope.relatives.filter(function (x) {
                    return x.id != relatives.id;
                });
            });
            backupRelative = angular.copy($scope.relatives);
            resetData();
        };
        function addRelative() {
            if ($scope.selectedRelatives.length == 0) {
                $scope.relative.id = $scope.relatives[$scope.relatives.length - 1].id + 1;
                $scope.relative.doBDisplay = $scope.relative.doB.toLocaleString(['ban', 'id']);
                $scope.relatives.push(angular.copy($scope.relative));
            }
            else {
                var relative = $scope.relatives.filter(function (relative) {
                    return relative.id == $scope.relative.id;
                })[0];
                relative.id = $scope.relative.id;
                relative.name = $scope.relative.name;
                relative.relative = $scope.relative.relative;
                relative.status = $scope.relative.status;
                relative.address = $scope.relative.address;
                relative.doB = $scope.relative.doB
                //employee.doBDisplay = $scope.employee.doB.toLocaleString(['ban', 'id']);
                relative.selected = false;
            }
            resetData();
            backupRelative = angular.copy($scope.relatives);
        }
    };
})();