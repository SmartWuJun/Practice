/**
 * Created by DEV005 on 2017/3/28.
 */
(function () {
    "user strict";
    var leaveIndexController = function ($scope, tutorialService, dialogService) {
        /*向父级控制器传递参数*/
        $scope.$emit('navShow', 2);
        $scope.$emit('subNavShow',0);

        /*
         * pageNumber:当前页数
         * pageSize:页面显示个数
         * */
        $scope.vm = {
            pageNumber: 1,
            pageSize: 10,
            isLoading:false,         /*查询进度*/
            sortType : "DESC"
        };

        /*员工列表*/
        $scope.leaveList = [];

        /*获取员工列表数据*/
        $scope.getList = function () {
            $scope.leaveList = [];
            $scope.vm.isLoading=true;
            /*传递$scope.vm*/
            tutorialService.searchEmployeeLeave($scope.vm).success(function (data) {
                $scope.vm.isLoading=false;
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
                    $scope.leaveList = data.result;
                    $scope.vm.totalCount =data.totalCount;
                }
            })
        };

        /*根据条件搜索*/
        $scope.doSearch = function () {
            $scope.vm.pageNumber = 1;
            $scope.getList();
        };

        /*执行查询方法*/
        $scope.getList();

    };
    var leaveCreateController = function ($scope, tutorialService, dialogService) {
        /*向父级控制器传递参数*/
        $scope.$emit('navShow', 2);
        $scope.$emit('subNavShow',0);

        $scope.leave={
            type:"PERSONAL_LEAVE",
            beginTime:"09",
            endTime:"18"

        };

        //开始时间
        $scope.openBeginDate = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.beginDate = true;
        };

        //结束时间
        $scope.openEndDate = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.entryDate = true;
        };

        /*获取员工信息*/
        //数据加载
        $scope.getEmployee=function(backdata){
            var param={
                isResign:false,
                keyword:backdata.data.keyword,
                pageNumber: backdata.data.pageNumber,
                pageSize: backdata.data.pageSize
            };
            tutorialService.searchEmployee(param).success(function(data){
                if (data.errors == null || data.errors.length > 0) {
                    dialogService.tip(data.errors);
                }
                else {
                    backdata.deferred.resolve({itemList:data.result,totalCount:data.totalCount});
                }
            });
        };


        /*创建*/
        $scope.doSave=function (type) {
            /*日历格式处理*/
            if( angular.isDate($scope.leave.beginDate)){
                $scope.leave.beginDate = new Date($scope.leave.beginDate).format("yyyy-MM-dd");
            }

            /*日历格式处理*/
            if( angular.isDate($scope.leave.endDate)){
                $scope.leave.endDate = new Date($scope.leave.endDate).format("yyyy-MM-dd");
            }

            //负责人验证
            if(angular.isObject($scope.employee)){
                $scope.leave.employeeId=$scope.employee.id;
                $scope.leave.employeeName=$scope.employee.name;
            }else {
                $scope.leave.employeeId=null;
                $scope.leave.employeeName=null;
            }

            tutorialService.createEmployeeLeave($scope.leave).success(function (data) {
                if (data.errors == null || data.errors.length > 0)
                    dialogService.tip(data.errors);
                else{
                    if(type=='submit'){
                        window.location.href = "/tutorial/leave/submit?id="+data.id;
                    }else {
                        dialogService.tip([{"message": "创建成功！" }], "/tutorial/leave/edit.htm?id="+data.id,1000);
                    }
                }
            })
        }
    };
    var LeaveEditController = function ($scope, $location, tutorialService, dialogService, toolsService) {
        /*向父级控制器传递参数*/
        $scope.$emit('navShow', 2);
        $scope.$emit('subNavShow',0);

        $scope.leave={
            id:toolsService.parameter("id", $location.absUrl())
        };


        //获取基本数据
        tutorialService.getEmployeeLeave($scope.leave).success(function (data) {
            if (data.errors == null || data.errors.length > 0) {
                dialogService.tip(data.errors);
            } else {
                $scope.leave=data.employeeLeave;

                var employee={
                    id:data.employeeLeave.employeeId,
                    name:data.employeeLeave.employeeName
                };
                /*负责人赋值*/
                $scope.employee=employee;
            }
        });



        /*创建*/
        $scope.doSave=function (type) {
            /*日历格式处理*/
            if( angular.isDate($scope.leave.beginDate)){
                $scope.leave.beginDate = new Date($scope.leave.beginDate).format("yyyy-MM-dd");
            }

            /*日历格式处理*/
            if( angular.isDate($scope.leave.endDate)){
                $scope.leave.endDate = new Date($scope.leave.endDate).format("yyyy-MM-dd");
            }

            //负责人验证
            if(angular.isObject($scope.employee)){
                $scope.leave.employeeId=$scope.employee.id;
                $scope.leave.employeeName=$scope.employee.name;
            }else {
                $scope.leave.employeeId=null;
                $scope.leave.employeeName=null;
            }

            tutorialService.updateEmployeeLeave($scope.leave).success(function (data) {
                if (data.errors == null || data.errors.length > 0)
                    dialogService.tip(data.errors);
                else{
                    if(type=='submit'){
                        window.location.href = "/tutorial/leave/submit?id="+$scope.leave.id;
                    }else {
                        dialogService.tip([{"message": "编辑成功！" }], "/tutorial/leave/edit.htm?id="+$scope.leave.id,1000);
                    }


                }
            })
        }
    };
    var leaveViewController = function ($scope, $location, tutorialService, dialogService, toolsService) {
        /*向父级控制器传递参数*/
        $scope.$emit('navShow', 2);
        $scope.$emit('subNavShow',0);

        $scope.leave={
            id:toolsService.parameter("id", $location.absUrl())
        };


        //获取基本数据
        tutorialService.getEmployeeLeave($scope.leave).success(function (data) {
            if (data.errors == null || data.errors.length > 0) {
                dialogService.tip(data.errors);
            } else {
                $scope.leave=data.employeeLeave;
            }
        });

    };
    var leaveSubmitController = function ($scope, $location, tutorialService, dialogService, toolsService) {
        /*向父级控制器传递参数*/
        $scope.$emit('navShow', 2);
        $scope.$emit('subNavShow',0);

        $scope.leave={
            id:toolsService.parameter("id", $location.absUrl())
        };


        //获取基本数据
        tutorialService.getEmployeeLeave($scope.leave).success(function (data) {
            if (data.errors == null || data.errors.length > 0) {
                dialogService.tip(data.errors);
            } else {
                $scope.leave=data.employeeLeave;
            }
        });



        /*审批人添加*/
        $scope.approveUserList = [];
        $scope.approveContent = {
            isAdd: false
        };
        $scope.addApproveUser = function () {
            $scope.approveContent.user = null;
            $scope.approveContent.isAdd = true;
        };

        $scope.removeApproveUser = function(index){
            $scope.approveUserList.splice(index,1);
        };
        //获取审批人
        $scope.getApproveUser=function(backdata){

            var param={
                isResign:false,
                keyword:backdata.data.keyword,
                pageNumber: backdata.data.pageNumber,
                pageSize: backdata.data.pageSize
            };
            tutorialService.searchEmployee(param).success(function(data){
                if (data.errors == null || data.errors.length > 0) {
                    dialogService.tip(data.errors);
                }
                else {
                    backdata.deferred.resolve({itemList:data.result,totalCount:data.totalCount});
                }
            });
        };

        $scope.setUser = function(){
            $scope.approveContent.isAdd = false;
            if ($scope.approveContent.user && $scope.approveContent.user.id) {
                $scope.approveUserList.push($scope.approveContent.user);
            }
        };

        $scope.cancelUser = function(){
            $scope.approveContent.isAdd = false;
        };

        $scope.doSubmit = function() {
            $scope.leave.approveUserIdList = [];
            for (var i=0,len=$scope.approveUserList.length;i<len;i++) {
                $scope.leave.approveUserIdList.push($scope.approveUserList[i].id);
            }
            tutorialService.submitEmployeeLeave($scope.leave).success(function (plandata) {
                if (plandata.errors === null || plandata.errors.length > 0) {
                    dialogService.tip(plandata.errors)
                } else {
                    dialogService.tip([{"message": "提交成功"}], "/tutorial/leave/index.htm", 1000);
                }
            });
        }
    };
    var leaveApproveController = function ($scope, $location, tutorialService, dialogService, toolsService) {
        /*向父级控制器传递参数*/
        $scope.$emit('navShow', 2);
        $scope.$emit('subNavShow',0);

        $scope.leave={
            id:toolsService.parameter("id", $location.absUrl())
        };


        //获取基本数据
        tutorialService.getEmployeeLeave($scope.leave).success(function (data) {
            if (data.errors == null || data.errors.length > 0) {
                dialogService.tip(data.errors);
            } else {
                $scope.leave=data.employeeLeave;
            }
        });
        /*审批*/

        //通过
        var btnFlag = false;
        var msgFlag = false;
        $scope.doApprove=function(){
            if(btnFlag){
                btnFlag = false;
                tutorialService.apiWorkflowFlowStepApprove($scope.task).success(function(data){
                    if (data.errors == null || data.errors.length > 0) {
                        btnFlag = true;
                        dialogService.tip(data.errors);
                    } else {
                        dialogService.tip([{"message": "提交成功！"}],xnConfig.myUrl+"task/futrue",1000);

                    }
                })
            }else{
                if(msgFlag){
                    dialogService.tip([{"message": "此预算申请已被处理，请刷新列表！"}],null,1000);
                }
            }

        };

        //拒绝
        $scope.doReject = function() {
            if(btnFlag){
                tutorialService.apiWorkflowFlowStepReject($scope.task).success(function(data){
                    if (data.errors == null || data.errors.length > 0) {
                        dialogService.tip(data.errors);
                    } else {
                        dialogService.tip([{"message": "提交成功！"}],xnConfig.myUrl+"task/futrue",1000);
                    }
                })

            }else{
                if(msgFlag){
                    dialogService.tip([{"message": "此预算申请已被处理，请刷新列表！"}],null,1000);
                }
            }

        };

        //转交
        $scope.setTransfer=function(){
            if(btnFlag){
                btnFlag = false;
                console.log($scope.approveResult);
                $scope.task.assignUserName=$scope.approveResult.submitUser.name;
                $scope.task.assignUserId=$scope.approveResult.submitUser.id;
                $scope.task.assignReason=$scope.approveResult.description;
                if($scope.task.assignUserId){
                    tutorialService.apiWorkflowFlowStepTransfer($scope.task).success(function(data){
                        if (data.errors == null || data.errors.length > 0) {
                            btnFlag = true;
                            dialogService.tip(data.errors);
                        } else {
                            dialogService.tip([{"message": "转交成功！"}],null,1000);
                            $timeout(function(){
                                window.location.href=xnConfig.myUrl+"task/futrue";
                            },2000);
                        }
                    })
                }else{
                    dialogService.tip([{"message": "请选择转交人！"}],null,1000);
                }
            }else{
                if(msgFlag){
                    dialogService.tip([{"message": "此预算申请已被处理，请刷新列表！"}],null,1000);
                }
            }
        };

    };

    var xnPage = angular.module("xn.page", ["xn.directive.form"])
        .config(["xnValidatorProvider", function (xnValidatorProvider) {
        // 全局配置
        xnValidatorProvider.config({
            blurTrig   : false,
            showError  : false,
            removeError: false
        });
        xnValidatorProvider.setRules({

            number:{
                required: "单号不能为空！"
            },
            employee:{
                required: "员工不能为空！"
            }
        });

    }])
        .controller("LeaveIndexController", ["$scope", "tutorialService", "dialogService", leaveIndexController])
        .controller("LeaveCreateController", ["$scope", "tutorialService", "dialogService", leaveCreateController])
        .controller("LeaveEditController", ["$scope", "$location", "tutorialService", "dialogService", "toolsService", LeaveEditController])
        .controller("LeaveViewController", ["$scope", "$location", "tutorialService", "dialogService", "toolsService", leaveViewController])
        .controller("LeaveSubmitController", ["$scope", "$location", "tutorialService", "dialogService", "toolsService", leaveSubmitController])
        .controller("LeaveApproveController", ["$scope", "$location", "tutorialService", "dialogService", "toolsService", leaveApproveController])

})();
