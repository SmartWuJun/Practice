/**
 * Created by wujun on 2017/3/29.
 */
(function () {
    "use strict";
    //员工首页
    var employeeIndexController = function ($scope, TutorialService, dialogService) {
        /*向父级控制器传递参数*/
        $scope.$emit('navShow', 0);
        $scope.$emit('subNavShow', 2);

        /*
         * pageNumber:当前页
         * pageSize:页面显示个数
         * */
        $scope.vm = {
            pageNumber: 1,
            pageSize: 10
        };

        /*员工列表*/
        $scope.employeeList = [];

        /*获取员工列表*/
        $scope.getList = function () {

            /*发送请求*/
            TutorialService.searchEmployee($scope.vm).success(function (data) {
                if (data.error == null || data.errors.length > 0) {
                    /*如果失败弹出提示框报错*/

                    /*dialogService.tip 提示方法
                     * type: Array 提示内容
                     * url: 跳转页面
                     * time :延迟关闭时间 ，毫秒
                     * */
                    dialogService.tip(data.errors, null, null);
                } else {

                    /*成功*/
                    $scope.employeeList = data.result;
                    $scope.vm.totalCount = 100;
                }
            });
        }
        /*根据条件搜索*/
        $scope.doSearch = function () {
            console.log(1);
            $scope.vm.pageNumber = 1;
            $scope.getList();
        };

        $scope.doSearch();
    };

    //员工编辑
    var employeeEditController = function ($scope) {
        $scope.name = "hello world";
    };
    angular.module("xn.page", ["xn.directive.form"])
        .controller("EmployeeEditController", ["$scope", "TutorialService", "dialogService", employeeEditController])
        .controller("EmployeeIndexController", ["$scope", "TutorialService", "dialogService", employeeIndexController]);
})();