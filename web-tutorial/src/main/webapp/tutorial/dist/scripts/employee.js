/**
 * Created by DEV005 on 2017/3/28.
 */
(function () {
    "user strict";
    var employeeIndexController = function ($scope, TutorialService, dialogService) {
        /*向父级控制器传递参数*/
        $scope.$emit('navShow', 1);
        $scope.$emit('subNavShow', 2);

        /*
        * pageNumber:当前页数
        * pageSize:页面显示个数
        * */
        $scope.vm = {
            pageNumber: 1,
            pageSize: 10
        };

        /*员工列表*/
        $scope.employeeList = [];

        /*获取员工列表数据*/
        $scope.getList = function () {

            /*传递$scope.vm*/
            TutorialService.searchEmployee($scope.vm).success(function (data) {
                if (data.errors == null || data.errors.length > 0) {
                    /*如果失败弹出提示框报错*/

                    /*dialogService.tip 提示方法
                     * type: Array 提示内容
                     * url: 跳转页面
                     * time :延迟关闭时间 ，毫秒
                     * */
                    dialogService.tip(data.errors, null, null)
                } else {
                    /*成功处理*/
                    $scope.employeeList = data.result;
                    $scope.vm.totalCount =100;
                }
            })
        };

        /*根据条件搜索*/
        $scope.doSearch = function () {
            $scope.vm.pageNumber = 1;
            $scope.getList();
        };

        /*执行查询方法*/
        $scope.doSearch();

        /*删除员工*/
        $scope.doDelete = function (id) {

            var dialogDefaults = {
                size: "sm"
            };
            var dialogOptions = {
                closeButtonText: "取消",
                actionButtonText: "确定删除",
                headerText: "继续....?",
                bodyText: "您确定要删除吗？",
                callback: function () {
                    TutorialService.deleteEmployee({id:id}).success(function (data) {
                        if (data.errors === null || data.errors.length > 0) {
                            /*如果失败弹出提示框报错*/
                            dialogService.tip(data.errors);
                        } else {
                            /*dialogService.tip 提示方法
                            * type: Array 提示内容
                            * url: 跳转页面
                            * time :延迟关闭时间 ，毫秒
                            * */
                            dialogService.tip([{"message": "删除成功！"}], "/contract/item/index.htm");
                        }
                    });
                }
            };
            dialogService.confirm(dialogDefaults, dialogOptions);
        };
    };

    var employeeViewController = function ($scope, $location, TutorialService, dialogService, toolsService) {
        $scope.$emit('navShow', 3);
        $scope.vm = {
            pageNumber: 1,
            pageSize: 10
        };
    };

    angular.module("xn.page", ["xn.directive.form"])
        // 全局配置 form提交验证
        .config(["xnValidatorProvider", function (xnValidatorProvider) {
            // 全局配置
            xnValidatorProvider.config({
                blurTrig   : false,
                showError  : false,
                removeError: false
            });
            xnValidatorProvider.setRules({
                riskName:{
                    required:"风险名称不能为空"
                }
            });
        }])
        .controller("EmployeeIndexController", ["$scope", "TutorialService", "dialogService", employeeIndexController])
        .controller("EmployeeViewController", ["$scope", "$location", "TutorialService", "dialogService", "toolsService", employeeViewController])
})();
