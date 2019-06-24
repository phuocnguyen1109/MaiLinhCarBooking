(function () {
    angular.module('mainApp')
        .controller('previousjobsController', previousjobsController);

    previousjobsController.$inject = ['$scope'];

    function previousjobsController($scope) {

        $scope.initialize = initialize;
        $scope.addPreJob = addPreJob;
        $scope.removePreJob = removePreJob;
        $scope.updateSelected = updateSelected;
        $scope.openModal = openModal;
        $scope.search = search;

        $scope.selectedPreviousJobs = [];
        $scope.filterText = '';
        var backupPreviousjobs = [];

        $("#dateFrom").on("change", function () {
            this.setAttribute(
                "data-date",
                moment(this.value, "YYYY-MM-DD")
                    .format(this.getAttribute("data-date-format"))
            )
        }).trigger("change")
        $("#dateTo").on("change", function () {
            this.setAttribute(
                "data-date",
                moment(this.value, "YYYY-MM-DD")
                    .format(this.getAttribute("data-date-format"))
            )
        }).trigger("change")
        function initialize() {
            $scope.previousjobs = $scope.$parent.$parent.previousjobs;
            $scope.employees = $scope.$parent.$parent.employees[0];
            
            $scope.previousjobs.forEach(function (item, index) {
                item.selected = false;
            });
            backuPreviousjobs = angular.copy($scope.previousjobs);
            resetData();
        }

        function search() {
            $scope.previousjobs = angular.copy(backuPreviousjobs);
            if ($scope.filterText) {
                $scope.previousjobs = $scope.previousjobs.filter(function (x) {
                       var dateResult =  x.dateForm.indexOf($scope.filterText) != -1;
                        if(!dateResult){
                           dateResult =  x.dateTo.indexOf($scope.filterText) != -1;
                        }
                    return dateResult;

                    
                });
            }
        }

        function updateSelected(prejob) {
            prejob.selected = !prejob.selected;
            $scope.selectedPreviousJobs = $scope.previousjobs.filter(function (x) {
                return x.selected;
            });
        }

        function openModal(state) {
            if (state == 1) {
                $scope.isEditting = false;
                $scope.modalTitle = "Thêm Công Việc Trước";
                return;
            }
            $scope.isEditting = true;
            $scope.modalTitle = "Sửa Công Việc Trước";
            $scope.selectedPreviousJobs[0].dateTo = new Date($scope.selectedPreviousJobs[0].dateTo);
            //$scope.selectedPreviousJobs[0].dateTo = moment($scope.selectedPreviousJobs[0].dateTo).format("DD/MM/YYYY");
            $scope.selectedPreviousJobs[0].dateForm = new Date($scope.selectedPreviousJobs[0].dateForm);
            //$scope.selectedPreviousJobs[0].dateForm = moment($scope.selectedPreviousJobs[0].dateForm).format("DD/MM/YYYY");

            $scope.previousjob = angular.copy($scope.selectedPreviousJobs[0]);
        }


        function removePreJob() {
            $scope.selectedPreviousJobs.forEach(function (previousjob, index) {
                $scope.previousjobs = $scope.previousjobs.filter(function (x) {
                    return x.id != previousjob.id;
                });
            });
            backupPreviousjobs = angular.copy($scope.previousjobs);
            resetData();
        }



        function resetData() {
            $scope.previousjob = {
                id: '',
                nameCompany: '',
                dateForm: '',
                dateTo: '',
                note: '',
            }

            $scope.selectedPreviousJobs = [];
        }
        $scope.errorMessage = false;
        $scope.errorMessage2 = false;
        function addPreJob() {
            if ($scope.selectedPreviousJobs.length == 0) {
                if ($scope.previousjob.dateForm < $scope.previousjob.dateTo) {
                    $scope.previousjob.id = $scope.previousjobs[$scope.previousjobs.length - 1].id + 1;
                    var DateCurrent = new Date();
                    if ($scope.previousjob.dateTo > DateCurrent) {
                        $scope.errorMessage2 = true;
                    }

                    $scope.previousjob.dateForm = moment($scope.previousjob.dateForm).format("DD/MM/YYYY");
                    $scope.previousjob.dateTo = moment($scope.previousjob.dateTo).format("DD/MM/YYYY");
                    $scope.previousjobs.push(angular.copy($scope.previousjob));
                    
                } else {
                    $scope.errorMessage = true;
                }
               
               
            }
            else {
                var previousjob = $scope.previousjobs.filter(function (previousjob) {
                    return previousjob.id == $scope.previousjob.id;
                })[0];

                previousjob.nameCompany = $scope.previousjob.nameCompany;

                previousjob.dateForm = moment($scope.previousjob.dateForm).format("DD/MM/YYYY");
                previousjob.dateTo = moment($scope.previousjob.dateTo).format("DD/MM/YYYY") ;
                previousjob.note = $scope.previousjob.note
                previousjob.selected = false;
            }
            resetData();
            backupPreviousjobs = angular.copy($scope.previousjobs);
        }



    }
})();