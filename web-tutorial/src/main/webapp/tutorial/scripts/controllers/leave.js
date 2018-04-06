/**
 * Created by DEV005 on 2017/3/28.
 */
(function () {
    "user strict";
    // 请假单首页控制器
    var leaveIndexController = function ($scope, tutorialService,systemService, dialogService) {
        /*向父级控制器传递参数*/
        $scope.$emit('navShow', 2);
        $scope.$emit('subNavShow', 0);

        /*
         * pageNumber:当前页数
         * pageSize:页面显示个数
         * */
        $scope.vm = {
            status:"",
            pageNumber: 1,
            pageSize: 10,
            isLoading: false, /*查询进度*/
            sortType: "DESC"
        };
        /*高级搜索切换*/
        $scope.searchShow=false;

        //批量处理
        function initBatch(list) {
            $scope.batch={
                allChecked:false,
                batchList:[],
                totalCount:0
            };
            if(angular.isArray(list)){
                angular.forEach(list,function (item) {
                    item.isChecked=false;
                    if(!item.isSubmit||item.approveResult=='REJECTED'){
                        $scope.batch.totalCount++;
                    }
                })
            }
        }
        initBatch();


        $scope.selectType = {"listKey":[],"list":[]};
        $scope.typeList = [
            {key:"PERSONAL_LEAVE",value:"事假",state:true},
            {key:"SICK_LEAVE",value:"病假",state:true},
            {key:"ANNUAL_LEAVE",value:"年假",state:true},
            {key:"DEFERED_LEAVE",value:"调休",state:true},
            {key:"MARITAL_LEAVE",value:"婚假",state:true},
            {key:"FUNERAL_LEAVE",value:"丧假",state:true},
            {key:"MATERNITY_LEAVE",value:"产假",state:true},
            {key:"NURSE_LEAVE",value:"看护假",state:true}
        ];

        /*员工列表*/
        $scope.leaveList = [];

        /*获取员工列表数据*/
        $scope.getList = function () {
            /*高级查询*/

            /*状态处理*/
            if($scope.searchShow){
                /*高级搜索*/
                $scope.vm.types=angular.copy($scope.selectType.listKey);

                //员工
                if (angular.isObject($scope.employee)) {
                    $scope.vm.employeeId = $scope.employee.id;
                    $scope.vm.employeeName = $scope.employee.name;
                } else {
                    $scope.vm.employeeId = null;
                    $scope.vm.employeeName = null;
                }

                //提交用户ID
                if (angular.isObject($scope.submitUser)) {
                    $scope.vm.submitUserId = $scope.submitUser.id;
                    $scope.vm.submitUserName = $scope.submitUser.name;
                } else {
                    $scope.vm.submitUserId = null;
                    $scope.vm.submitUserName = null;
                }

                /*日历格式处理*/
                if (angular.isDate($scope.vm.submitTimeFrom)) {
                    $scope.vm.submitTimeFrom = new Date($scope.vm.submitTimeFrom).format("yyyy-MM-dd");
                }

                /*日历格式处理*/
                if (angular.isDate($scope.vm.submitTimeTo)) {
                    $scope.vm.submitTimeTo = new Date($scope.vm.submitTimeTo).format("yyyy-MM-dd");
                }

            }else {
                /*基本搜索*/
                $scope.vm.types=null;
                $scope.vm.employeeId = null;
                $scope.vm.employeeName = null;
                $scope.vm.submitTimeFrom=null;
                $scope.vm.submitTimeTo=null;
                $scope.vm.submitUserId = null;
                $scope.vm.submitUserName = null;
            }

            $scope.leaveList = [];
            $scope.vm.isLoading = true;
            /*传递$scope.vm*/
            tutorialService.findEmployeeLeave($scope.vm).success(function (data) {
                $scope.vm.isLoading = false;
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
                    $scope.vm.totalCount = data.totalCount;
                    $scope.vm.allCount = data.allCount;
                    $scope.vm.createdCount = data.createdCount;
                    $scope.vm.submittedCount = data.submittedCount;
                    $scope.vm.agreedCount = data.agreedCount;
                    $scope.vm.rejectedCount = data.rejectedCount;

                    initBatch($scope.leaveList);
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
        
        /*切换*/
        $scope.changeTab=function (status) {
            $scope.batch.allChecked=false;
            $scope.vm.status=status;
            $scope.doSearch();
        };

        /*全选*/
        $scope.checkAll=function () {
            //清空选择列表
            $scope.batch.batchList=[];
            if($scope.batch.allChecked){    //选择打钩
                angular.forEach($scope.leaveList,function (leave) {
                    if(!leave.isSubmit||leave.approveResult=='REJECTED'){
                        leave.isChecked=true;
                        $scope.batch.batchList.push(leave);
                    }
                })
            }else {  //取消打钩
                angular.forEach($scope.leaveList,function (leave) {
                    leave.isChecked=false;
                })
            }
        };

        /*单行选择*/
        $scope.checkTr=function (leave) {
            if(leave.isChecked){
                $scope.batch.batchList.push(leave);
                /*判断选择后的总数是否等于查询后可选择批量操作的总数*/
                if($scope.batch.totalCount==$scope.batch.batchList.length){
                    $scope.batch.allChecked=true;
                }
            } else {
                angular.forEach($scope.batch.batchList,function (batch,index,array) {
                    if(batch.id==leave.id){
                        $scope.batch.batchList.splice(index,1);
                    }
                });
                $scope.batch.allChecked=false;
            }

        };

        /*批量提交 by jero**/
        $scope.submitBatch=function(){
            if($scope.batch.batchList.length==0){
                // dialogService.tip([{"message": "批量提交至少一条数据！"}]);
                return ;
            }
            var ids=[];
            angular.forEach($scope.batch.batchList,function (batch) {
                ids.push(batch.id)
            });
            window.location="/tutorial/leave/batch.htm?id="+ids.join("|")
        };


        /*排序*/
        $scope.orderBy = function(sortColumn,sortType) {
            $scope.vm.sortColumn = sortColumn;
            if($scope.vm.sortType== "ASC"){
                $scope.vm.sortType = "DESC";
            }else{
                $scope.vm.sortType = "ASC";
            }
            $scope.doSearch();
        };


        /*获取员工信息*/
        $scope.findEmployeeList = function (backdata) {
            var param = {
                isResign: false,
                keyword: backdata.data.keyword,
                pageNumber: backdata.data.pageNumber,
                pageSize: backdata.data.pageSize
            };
            tutorialService.searchEmployee(param).success(function (data) {
                if (data.errors == null || data.errors.length > 0) {
                    dialogService.tip(data.errors);
                }
                else {
                    backdata.deferred.resolve({itemList: data.result, totalCount: data.totalCount});
                }
            });
        };

        /*获取用户信息*/
        //获取审批人
        $scope.findUserList = function (method) {

            var param = {
                isActive: true,
                sourceTypes: ["EMPLOYEE", "NONE"],
                keyword: method.data.keyword,
                pageSize: method.data.pageSize,
                pageNumber: method.data.pageNumber
            };
            systemService.apiSystemUsersSearchBySourceType(param).success(function (data) {
                if (data.errors == null || data.errors.length > 0) {
                    dialogService.tip(data.errors);
                }
                else {
                    method.deferred.resolve({itemList: data.result, totalCount: data.totalCount});
                }
            });
        };
        

        //开始时间
        $scope.openSubmitTimeFrom = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.submitTimeFrom = true;
        };

        //结束时间
        $scope.openSubmitTimeTo = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.submitTimeTo = true;
        };

    };
    // 请假单创建控制器
    var leaveCreateController = function ($scope, tutorialService, dialogService) {
        /*向父级控制器传递参数*/
        $scope.$emit('navShow', 2);
        $scope.$emit('subNavShow', 0);

        $scope.leave = {
            type: "PERSONAL_LEAVE",
            beginTime: 9,
            endTime: 18
        };

        //开始时间
        $scope.openBeginDate = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.beginDate = true;
        };

        //结束时间
        $scope.openEndDate = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.entryDate = true;
        };

        /*获取员工信息*/
        //数据加载
        $scope.findEmployeeList = function (backdata) {
            var param = {
                isResign: false,
                keyword: backdata.data.keyword,
                pageNumber: backdata.data.pageNumber,
                pageSize: backdata.data.pageSize
            };
            tutorialService.searchEmployee(param).success(function (data) {
                if (data.errors == null || data.errors.length > 0) {
                    dialogService.tip(data.errors);
                }
                else {
                    backdata.deferred.resolve({itemList: data.result, totalCount: data.totalCount});
                }
            });
        };

        /*创建*/
        $scope.doSave = function (type) {
            /*日历格式处理*/
            if (angular.isDate($scope.leave.beginDate)) {
                $scope.leave.beginDate = new Date($scope.leave.beginDate).format("yyyy-MM-dd");
            }

            /*日历格式处理*/
            if (angular.isDate($scope.leave.endDate)) {
                $scope.leave.endDate = new Date($scope.leave.endDate).format("yyyy-MM-dd");
            }

            //负责人验证
            if (angular.isObject($scope.employee)) {
                $scope.leave.employeeId = $scope.employee.id;
                $scope.leave.employeeName = $scope.employee.name;
            } else {
                $scope.leave.employeeId = null;
                $scope.leave.employeeName = null;
            }

            tutorialService.createEmployeeLeave($scope.leave).success(function (data) {
                if (data.errors == null || data.errors.length > 0)
                    dialogService.tip(data.errors);
                else {
                    if (type == 'submit') {
                        window.location.href = "/tutorial/leave/submit?id=" + data.id;
                    } else {
                        dialogService.tip([{"message": "创建成功！"}], "/tutorial/leave/edit.htm?id=" + data.id, 1000);
                    }
                }
            })
        }
    };
    // 请假单编辑控制器
    var leaveEditController = function ($scope, $location, tutorialService, dialogService, toolsService) {
        /*向父级控制器传递参数*/
        $scope.$emit('navShow', 2);
        $scope.$emit('subNavShow', 0);

        $scope.leave = {
            id: toolsService.parameter("id", $location.absUrl())
        };

        //获取基本数据
        tutorialService.getEmployeeLeave($scope.leave).success(function (data) {
            if (data.errors == null || data.errors.length > 0) {
                dialogService.tip(data.errors);
            } else {
                $scope.leave = data.employeeLeave;


                /*负责人赋值*/
                $scope.getEmployee($scope.leave.employeeId);
            }
        });

        /*获取员工信息*/

        //获取基本数据
        $scope.getEmployee = function (id) {
            if(!id){
                return;
            }
            var param = {
               id:id
            };
            tutorialService.getEmployee(param).success(function (data) {
                if (data.errors == null || data.errors.length > 0) {
                    dialogService.tip(data.errors);
                }
                else {
                    $scope.employee = data.employee;
                }
            });
        };
        //数据加载
        $scope.findEmployeeList = function (backdata) {
            var param = {
                isResign: false,
                keyword: backdata.data.keyword,
                pageNumber: backdata.data.pageNumber,
                pageSize: backdata.data.pageSize
            };
            tutorialService.searchEmployee(param).success(function (data) {
                if (data.errors == null || data.errors.length > 0) {
                    dialogService.tip(data.errors);
                }
                else {
                    backdata.deferred.resolve({itemList: data.result, totalCount: data.totalCount});
                }
            });
        };


        /*创建*/
        $scope.doSave = function (type) {
            /*日历格式处理*/
            if (angular.isDate($scope.leave.beginDate)) {
                $scope.leave.beginDate = new Date($scope.leave.beginDate).format("yyyy-MM-dd");
            }

            /*日历格式处理*/
            if (angular.isDate($scope.leave.endDate)) {
                $scope.leave.endDate = new Date($scope.leave.endDate).format("yyyy-MM-dd");
            }

            //负责人验证
            if (angular.isObject($scope.employee)) {
                $scope.leave.employeeId = $scope.employee.id;
                $scope.leave.employeeName = $scope.employee.name;
            } else {
                $scope.leave.employeeId = null;
                $scope.leave.employeeName = null;
            }

            tutorialService.updateEmployeeLeave($scope.leave).success(function (data) {
                if (data.errors == null || data.errors.length > 0)
                    dialogService.tip(data.errors);
                else {
                    if (type == 'submit') {
                        window.location.href = "/tutorial/leave/submit?id=" + $scope.leave.id;
                    } else {
                        dialogService.tip([{"message": "编辑成功！"}], "/tutorial/leave/edit.htm?id=" + $scope.leave.id, 1000);
                    }
                }
            })
        }
    };
    // 请假单打开控制器
    var leaveOpenController = function ($scope, $location, tutorialService, myService, dialogService, toolsService) {
        /*向父级控制器传递参数*/
        $scope.$emit('navShow', 2);
        $scope.$emit('subNavShow', 0);

        $scope.leave = {
            id: toolsService.parameter("id", $location.absUrl())
        };

        // 获取任务的详细信息
        $scope.approveResult = {};

        // 获取请假单信息
        tutorialService.getEmployeeLeave($scope.leave).success(function (data) {
            if (data.errors === null || data.errors.length > 0) {
                dialogService.tip(data.errors);
            } else {
                $scope.leave = data.employeeLeave;
            }
        });

        // 删除请假单
        $scope.doDelete = function () {
            var dialogDefaults = {
                size: "sm"
            };
            var dialogOptions = {
                closeButtonText: "取消",
                actionButtonText: "确定删除",
                headerText: "继续....?",
                bodyText: "您确定要删除当前申请单吗？",
                callback: function () {
                    tutorialService.deleteEmployeeLeave({id: $scope.leave.id}).success(function (data) {
                        if (data.errors === null || data.errors.length > 0) {
                            /*如果失败弹出提示框报错*/
                            dialogService.tip(data.errors);
                        } else {
                            /*dialogService.tip 提示方法
                             * type: Array 提示内容
                             * url: 跳转页面
                             * time :延迟关闭时间 ，毫秒
                             * */
                            dialogService.tip([{"message": "删除成功！"}], "/tutorial/leave/index.htm", 1000);
                        }
                    });
                }
            };
            dialogService.confirm(dialogDefaults, dialogOptions);
        };
    };
    // 请假单提交控制器
    var leaveSubmitController = function ($scope, $location, tutorialService, systemService, dialogService, toolsService) {
        /*向父级控制器传递参数*/
        $scope.$emit('navShow', 2);
        $scope.$emit('subNavShow', 0);

        $scope.leave = {
            id: toolsService.parameter("id", $location.absUrl())
        };

        //获取基本数据
        tutorialService.getEmployeeLeave($scope.leave).success(function (data) {
            if (data.errors == null || data.errors.length > 0) {
                dialogService.tip(data.errors);
            } else {
                $scope.leave = data.employeeLeave;
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

        $scope.removeApproveUser = function (index) {
            $scope.approveUserList.splice(index, 1);
        };
        //获取审批人
        $scope.getApproveUser = function (method) {

            var param = {
                isActive: true,
                sourceTypes: ["EMPLOYEE", "NONE"],
                keyword: method.data.keyword,
                pageSize: method.data.pageSize,
                pageNumber: method.data.pageNumber
            };
            systemService.apiSystemUsersSearchBySourceType(param).success(function (data) {
                if (data.errors == null || data.errors.length > 0) {
                    dialogService.tip(data.errors);
                }
                else {
                    method.deferred.resolve({itemList: data.result, totalCount: data.totalCount});
                }
            });
        };

        $scope.setUser = function () {
            $scope.approveContent.isAdd = false;
            if ($scope.approveContent.user && $scope.approveContent.user.id) {
                $scope.approveUserList.push($scope.approveContent.user);
            }
        };

        $scope.cancelUser = function () {
            $scope.approveContent.isAdd = false;
        };

        $scope.doSubmit = function () {
            $scope.leave.approveUserIdList = [];
            for (var i = 0, len = $scope.approveUserList.length; i < len; i++) {
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
    // 请假单审批控制器
    var leaveApproveController = function ($scope, $location, tutorialService, myService, dialogService, toolsService) {
        /*向父级控制器传递参数*/
        $scope.$emit('navShow', 2);
        $scope.$emit('subNavShow', 0);

        $scope.leave = {
            id: toolsService.parameter("id", $location.absUrl())
        };

        //获取基本数据
        tutorialService.getEmployeeLeave($scope.leave).success(function (data) {
            if (data.errors == null || data.errors.length > 0) {
                dialogService.tip(data.errors);
            } else {
                $scope.leave = data.employeeLeave;
            }
        });
        /*审批*/

        //获取任务的详细信息
        var btnFlag = false;
        var msgFlag = false;
        $scope.task = {};
        $scope.viewList = {
            flag: "false",
            list: []
        };

        /**/
        $scope.flow = {
            id: toolsService.parameter("stepId", $location.absUrl()),
            flowId: toolsService.parameter("flowId", $location.absUrl()),
            isLoad: false
        };
        $scope.getTaskDetail = function () {
            myService.apiWorkflowTaskGet($scope.flow).success(function (data) {
                if (data.errors == null || data.errors.length > 0) {
                    dialogService.tip(data.errors);
                } else {
                    $scope.task = data.flowStep;
                    var stepStatus = data.flowStep.stepStatus;
                    if ("WAITING" == stepStatus) {
                        btnFlag = true;
                    }
                    msgFlag = true;
                }
                $scope.getState();
            })
        };
        $scope.getTaskDetail();

        //获取task详情
        $scope.getState = function () {

            myService.apiWorkflowTaskDetailGet({id: $scope.flow.flowId}).success(function (data) {
                if (data.errors == null || data.errors.length > 0) {
                    dialogService.tip(data.errors);
                } else {
                    $scope.task.flow = data.flow;
                    $scope.task.flowId = data.flow.id;
                    // $scope.getLeave(data.flow.objectId);
                    $scope.viewList.businessId = data.flow.businessId;
                    $scope.viewList.businessType = 'LEAVE_ATTACHMENT';
                    $scope.viewList.flag = "true";

                }
            })
        };


        //通过
        $scope.doApprove = function () {
            if (btnFlag) {
                btnFlag = false;
                myService.apiWorkflowFlowStepApprove($scope.task).success(function (data) {
                    if (data.errors == null || data.errors.length > 0) {
                        btnFlag = true;
                        dialogService.tip(data.errors);
                    } else {
                        dialogService.tip([{"message": "提交成功！"}], xnConfig.myUrl + "task/futrue", 1000);

                    }
                })
            } else {
                if (msgFlag) {
                    dialogService.tip([{"message": "此申请单已被处理，请刷新列表！"}], null, 1000);
                }
            }
        };

        //拒绝
        $scope.doReject = function () {
            if (btnFlag) {
                myService.apiWorkflowFlowStepReject($scope.task).success(function (data) {
                    if (data.errors == null || data.errors.length > 0) {
                        dialogService.tip(data.errors);
                    } else {
                        dialogService.tip([{"message": "提交成功！"}], xnConfig.myUrl + "task/futrue", 1000);
                    }
                })

            } else {
                if (msgFlag) {
                    dialogService.tip([{"message": "此申请单已被处理，请刷新列表！"}], null, 1000);
                }
            }

        };

        //转交
        $scope.setTransfer = function () {
            if (btnFlag) {
                btnFlag = false;
                if (angular.isObject($scope.approveResult.submitUser)) {
                    $scope.task.assignUserName = $scope.approveResult.submitUser.name;
                    $scope.task.assignUserId = $scope.approveResult.submitUser.id;
                } else {
                    dialogService.tip([{"message": "请选择转交人！"}], null, 1000);
                    return
                }
                $scope.task.assignReason = $scope.approveResult.description;
                myService.apiWorkflowFlowStepTransfer($scope.task).success(function (data) {
                    if (data.errors == null || data.errors.length > 0) {
                        btnFlag = true;
                        dialogService.tip(data.errors);
                    } else {
                        dialogService.tip([{"message": "转交成功！"}], xnConfig.myUrl + "task/futrue", 1000);
                    }
                })
            } else {
                if (msgFlag) {
                    dialogService.tip([{"message": "此申请单已被处理，请刷新列表！"}], null, 1000);
                }
            }
        };

    };
    // 请假单批量提交控制器
    var leaveBatchSubmitController = function ($scope, $location, tutorialService, systemService, dialogService, toolsService) {
        /*向父级控制器传递参数*/
        $scope.$emit('navShow', 2);
        $scope.$emit('subNavShow', 0);

        $scope.idList=toolsService.parameter("id", $location.absUrl()).split("|");

        $scope.leaveList =[];

        angular.forEach($scope.idList,function (id) {
            //获取基本数据
            tutorialService.getEmployeeLeave({id:id}).success(function (data) {
                if (data.errors == null || data.errors.length > 0) {
                    dialogService.tip(data.errors);
                } else {
                    $scope.leaveList.push(data.employeeLeave);
                }
            });

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

        $scope.removeApproveUser = function (index) {
            $scope.approveUserList.splice(index, 1);
        };
        //获取审批人
        $scope.getApproveUser = function (method) {

            var param = {
                isActive: true,
                sourceTypes: ["EMPLOYEE", "NONE"],
                keyword: method.data.keyword,
                pageSize: method.data.pageSize,
                pageNumber: method.data.pageNumber
            };
            systemService.apiSystemUsersSearchBySourceType(param).success(function (data) {
                if (data.errors == null || data.errors.length > 0) {
                    dialogService.tip(data.errors);
                }
                else {
                    method.deferred.resolve({itemList: data.result, totalCount: data.totalCount});
                }
            });
        };

        $scope.setUser = function () {
            $scope.approveContent.isAdd = false;
            if ($scope.approveContent.user && $scope.approveContent.user.id) {
                $scope.approveUserList.push($scope.approveContent.user);
            }
        };

        $scope.cancelUser = function () {
            $scope.approveContent.isAdd = false;
        };

        $scope.doSubmit = function () {
           var vm={
               approveUserIdList:[],
               leaveList:[]
           };
            for (var i = 0, len = $scope.approveUserList.length; i < len; i++) {
                vm.approveUserIdList.push($scope.approveUserList[i].id);
            }


         /*   leaveList*/
            angular.forEach($scope.leaveList ,function (leave) {
                vm.leaveList.push({
                    id:leave.id,
                    rowVersion:leave.rowVersion
                })
            });
            tutorialService.batchSubmitEmployeeLeave(vm).success(function (plandata) {
                /*错误特殊处理*/
                var status=true;
                var errorList=[];
                angular.forEach(plandata.errorLists,function (error,index) {
                    if (error === null || error.length > 0) {
                        errorList.push({"message":"第"+index+"条请假单报错："+error[0].message});
                        status=false;
                    }
                });
                if(status){
                      dialogService.tip([{"message": "批量提交成功！"}], "/tutorial/leave/index.htm", 1000);
                }else {
                    dialogService.tip(errorList);
                }
            });
        }
    };

    var xnPage = angular.module("xn.page", ["xn.directive.form"])
        .config(["xnValidatorProvider", function (xnValidatorProvider) {
            // 全局配置
            xnValidatorProvider.config({
                blurTrig: false,
                showError: false,
                removeError: false
            });
            xnValidatorProvider.setRules({

                number: {
                    required: "单号不能为空！"
                },
                employee: {
                    required: "员工不能为空！"
                },
                beginDate: {
                    required: "开始时间不能为空！"
                },
                entryDate: {
                    required: "结束时间不能为空！"
                },
                leaveDays: {
                    required: "请假天数不能为空！",
                    pattern: "请假天数格式不正确！"
                }

            });

        }])
        .controller("LeaveIndexController", ["$scope", "tutorialService","systemService", "dialogService", leaveIndexController])
        .controller("LeaveCreateController", ["$scope", "tutorialService", "dialogService", leaveCreateController])
        .controller("LeaveEditController", ["$scope", "$location", "tutorialService", "dialogService", "toolsService", leaveEditController])
        .controller("LeaveOpenController", ["$scope", "$location", "tutorialService", "myService", "dialogService", "toolsService", leaveOpenController])
        .controller("LeaveSubmitController", ["$scope", "$location", "tutorialService", "systemService", "dialogService", "toolsService", leaveSubmitController])
        .controller("LeaveApproveController", ["$scope", "$location", "tutorialService", "myService", "dialogService", "toolsService", leaveApproveController])
        .controller("LeaveBatchSubmitController", ["$scope", "$location", "tutorialService", "systemService", "dialogService", "toolsService", leaveBatchSubmitController])

})();
