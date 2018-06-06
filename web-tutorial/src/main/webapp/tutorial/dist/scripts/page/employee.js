/**
 * Created by DEV005 on 2017/3/28.
 */

(function () {
    "user strict";
    var employeeIndexController = function ($scope, tutorialService, dialogService) {
        /*向父级控制器传递参数*/
        $scope.$emit('navShow', 1);
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
        $scope.employeeList = [];

        /*获取员工列表数据*/
        $scope.getList = function () {
            $scope.employeeList = [];
            $scope.vm.isLoading=true;
            /*传递$scope.vm*/
            tutorialService.searchEmployee($scope.vm).success(function (data) {
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
                    $scope.employeeList = data.result;
                    $scope.vm.totalCount =data.totalCount;
                }
            })
        };

        /*排序*/
        $scope.orderBy = function(sortColumn){
            $scope.vm.sortColumn=sortColumn;
            if($scope.vm.sortType== "ASC"){
                $scope.vm.sortType = "DESC";
            }else{
                $scope.vm.sortType = "ASC";
            }
            $scope.doSearch();
        };

        /*根据条件搜索*/
        $scope.doSearch = function () {
            $scope.vm.pageNumber = 1;
            $scope.getList();
        };

        /*执行查询方法*/
        $scope.getList();

        /*批量导入*/
        $scope.import = {
            title:"员工导入",
            uploadMethod:"api.tutorial.employeeList.import",
            downLoadUrl:"/api/tutorial.do",
            downLoadMethod:"api.tutorial.employee.template.export"
        };

    };

    var employeeCreateController = function ($scope, tutorialService, dialogService) {
        /*向父级控制器传递参数*/
        $scope.$emit('navShow', 1);
        $scope.$emit('subNavShow',0);

        $scope.employee={
            gender:"MALE",
            isResign:false  /*是否离职*/
        };

        //弹出入职日期
        $scope.openEntryDatevm = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.entryDate = true;
        };

        /*组织部门组件*/
        $scope.findDepartmentList = function(backdata) {
            var param={
                isActive:true,
                keyword:backdata.data.keyword,
                pageNumber: backdata.data.pageNumber,
                pageSize: backdata.data.pageSize
            };
            tutorialService.searchDepartment(param).success(function(data){
                if (data.errors == null || data.errors.length > 0) {
                    dialogService.tip(data.errors);
                }
                else {
                    backdata.deferred.resolve({itemList:data.result,totalCount:data.totalCount});
                }
            });
        };

        /*创建*/
        $scope.doSave=function () {
            /*日历格式处理*/
            if( angular.isDate($scope.employee.entryDate)){
                $scope.employee.entryDate = new Date($scope.employee.entryDate).format("yyyy-MM-dd");
            }

            if(angular.isObject($scope.department)){
                $scope.employee.departmentId=$scope.department.id;
                $scope.employee.departmentName=$scope.department.name;
            }else {
                $scope.employee.departmentId=null;
                $scope.employee.departmentName=null;
            }
            tutorialService.createEmployee($scope.employee).success(function (data) {
                if (data.errors == null || data.errors.length > 0)
                    dialogService.tip(data.errors);
                else{
                    dialogService.tip([{"message": "创建成功！" }], "/tutorial/employee/edit.htm?id="+data.id,1000);
                }
            })
        }
    };

    var employeeEditController = function ($scope, $location, $modal, tutorialService, dialogService, toolsService) {
        /*向父级控制器传递参数*/
        $scope.$emit('navShow', 1);
        $scope.$emit('subNavShow',0);

        $scope.employee={
            id:toolsService.parameter("id", $location.absUrl())
        };


        //获取基本数据
        tutorialService.getEmployee($scope.employee).success(function (data) {
            if (data.errors == null || data.errors.length > 0) {
                dialogService.tip(data.errors);
            } else {
                $scope.employee=data.employee;

                /*获取部门基本信息*/
                $scope.getDepartment(data.employee.departmentId)
            }
        });
        
        //弹出入职日期
        $scope.openEntryDatevm = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.entryDate = true;
        };

        //弹出式生日选择
        $scope.openBirthDate = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.birthDate = true;
        };


        //获取部门数据
        $scope.getDepartment = function (id) {
            if(!id){
                return;
            }
            var param = {
                id:id
            };
            tutorialService.getDepartment(param).success(function (data) {
                if (data.errors == null || data.errors.length > 0) {
                    dialogService.tip(data.errors);
                }
                else {
                    $scope.department = data.department;
                }
            });
        };
        /*组织部门组件*/
        $scope.findDepartmentList = function(backdata) {
            var param={
                isActive:true,
                keyword:backdata.data.keyword,
                pageNumber: backdata.data.pageNumber,
                pageSize: backdata.data.pageSize
            };
            tutorialService.searchDepartment(param).then(function(data){
                if (data.data.errors == null || data.data.errors.length > 0) {
                    dialogService.tip(data.data.errors);
                }
                else {
                    backdata.deferred.resolve({itemList:data.data.result,totalCount:data.data.totalCount});
                }
            });
        };
        
        /*头像处理*/

        $scope.upPhoto=function () {
            /*
             * 弹出框组件
             * templateUrl  模板名称
             * controller  模板控制器
             * size  尺寸  lg 、md 、sm
             * resolve  传递参数
             * */
            var modalInstance = $modal.open({
                templateUrl: "upPhoto.html",
                controller:UpPhotoController,
                size:"lg",
                resolve: {
                    items: function () {
                        return  $scope.employee;
                    }
                }
            });
            /*
            * 弹出框关闭执行
            * */
            modalInstance.result.then(function (data) {
                /*
                 * 弹出框确定后执行
                 * */
                $scope.employee.photoFileUrl= data;
                $scope.employee.rowVersion++;

            });
        };

        /*保存*/
        $scope.doSave=function () {
            /*日历格式处理*/
            if( angular.isDate($scope.employee.entryDate)){
                $scope.employee.entryDate = new Date($scope.employee.entryDate).format("yyyy-MM-dd");
            }

            /*日历格式处理*/
            if( angular.isDate($scope.employee.birthDate)){
                $scope.employee.birthDate = new Date($scope.employee.birthDate).format("yyyy-MM-dd");
            }

            if(angular.isObject($scope.department)){
                $scope.employee.departmentId=$scope.department.id;
                $scope.employee.departmentName=$scope.department.name;
            }else {
                $scope.employee.departmentId=null;
                $scope.employee.departmentName=null;
            }

            tutorialService.updateEmployee($scope.employee).success(function (data) {
                if (data.errors == null || data.errors.length > 0)
                    dialogService.tip(data.errors);
                else{
                    dialogService.tip([{"message": "保存成功！" }],"/tutorial/employee/edit.htm?id="+$scope.employee.id,1000);
                }
            })
        }

    };

    var employeeOpenController = function ($scope, $modal,$location, tutorialService, dialogService, toolsService) {

        /*向父级控制器传递参数*/
        $scope.$emit('navShow', 1);
        $scope.$emit('subNavShow',0);

        $scope.employee={
            id:toolsService.parameter("id", $location.absUrl())
        };

        //获取基本数据
        tutorialService.getEmployee($scope.employee).success(function (data) {
            if (data.errors == null || data.errors.length > 0) {
                dialogService.tip(data.errors);
            } else {
                $scope.employee=data.employee;
                var department={
                    id:data.employee.departmentId,
                    name:data.employee.departmentName
                };
                $scope.department=department;
            }
        });

        /*删除员工*/
        $scope.doDelete = function () {

            var dialogDefaults = {
                size: "sm"
            };
            var dialogOptions = {
                closeButtonText: "取消",
                actionButtonText: "确定删除",
                headerText: "继续....?",
                bodyText: "您确定要删除当前员工吗？",
                callback: function () {
                    tutorialService.deleteEmployee({id:$scope.employee.id}).success(function (data) {
                        if (data.errors === null || data.errors.length > 0) {
                            /*如果失败弹出提示框报错*/
                            dialogService.tip(data.errors);
                        } else {
                            /*dialogService.tip 提示方法
                             * type: Array 提示内容
                             * url: 跳转页面
                             * time :延迟关闭时间 ，毫秒
                             * */
                            dialogService.tip([{"message": "删除成功！"}], "/tutorial/employee/index.htm",1000);
                        }
                    });
                }
            };
            dialogService.confirm(dialogDefaults, dialogOptions);
        };


        /*离职员工*/
        $scope.doResign = function () {

            var modalInstance = $modal.open({
                templateUrl: "resign.html",
                controller:ResignController,
                size:"sm",
                resolve: {
                    items: function () {
                        return  $scope.employee;
                    }
                }
            });
            /*
             * 弹出框关闭执行
             * */
            modalInstance.result.then(function (result) {
                /*
                 * 弹出框确定后执行
                 * */
                var dialogDefaults = {
                    size: "sm"
                };
                var dialogOptions = {
                    closeButtonText: "取消",
                    actionButtonText: "确定离职",
                    headerText: "继续....?",
                    bodyText: "您确定要设置当前员工离职吗？",
                    callback: function () {
                        tutorialService.resignEmployee(result).success(function (data) {
                            if (data.errors === null || data.errors.length > 0) {
                                /*如果失败弹出提示框报错*/
                                dialogService.tip(data.errors);
                            } else {
                                /*dialogService.tip 提示方法
                                 * type: Array 提示内容
                                 * url: 跳转页面
                                 * time :延迟关闭时间 ，毫秒
                                 * */
                                dialogService.tip([{"message": "离职操作成功！"}], "/tutorial/employee/index.htm",1000);
                            }
                        });
                    }
                };
                dialogService.confirm(dialogDefaults, dialogOptions);

            });

        };

    };

    /*离职*/

    var ResignController = ["$scope", "$modalInstance" ,"items", "tutorialService", "dialogService",
        function ($scope, $modalInstance, items, tutorialService,dialogService) {

            $scope.employee=items;

            //弹出入职日期
            $scope.openResignDate = function($event) {
                $event.preventDefault();
                $event.stopPropagation();
                $scope.resignDate = true;
            };

            $scope.doSave=function () {
                /*日历格式处理*/
                if( angular.isDate($scope.employee.resignDate)){
                    $scope.employee.resignDate = new Date($scope.employee.resignDate).format("yyyy-MM-dd");
                }
                $modalInstance.close($scope.employee);
                $scope.employee={};
            };



            /*取消*/
            $scope.clean=function () {
                $modalInstance.dismiss('cancel');
            };
            /*关闭错误*/
            $scope.closeAlert = function (index,form) {
                form.splice(index,1);
            };
        }];

    /*头像更新*/
    var UpPhotoController = ["$scope", "$modalInstance" ,"items", "tutorialService","myService", "dialogService",
        function ($scope, $modalInstance, items, tutorialService, myService,dialogService) {
            $scope.vm={
                id:items.id,
                rowVersion:items.rowVersion,
                yImage:"",
                myCroppedImage:null
            };

            /*获取承租人信息*/
            myService.getTenant().success(function(data) {
                if (data.errors === null || data.errors.length > 0) {
                    dialogService.tip(data.errors);
                } else if (!data.tenant.pictureSpaceDiskId) {
                    dialogService.tip([{"message":"请联系管理员开通图片空间!"}],null,1000);
                    return ;
                } else {
                    $scope.vm.diskId = data.tenant.pictureSpaceDiskId;
                    $scope.getDisk($scope.vm.diskId);
                }
            });

            /*获取网盘信息*/
            $scope.getDisk=function(diskId){
                // 获取磁盘的信息apiFoundationDiskGet
                myService.apiFoundationDiskGet({id : diskId}).success(function(data) {
                    if (data.errors === null || data.errors.length > 0) {
                        dialogService.tip(data.errors);
                    }else{
                      $scope.vm.folderId=data.disk.rootFolderId;
                    }
                });
            };

            /*选择上传图*/
            $scope.fileUp=function ($event) {
                var fileId = document.getElementById("fileUp");
                fileId.onchange=function() {
                    var file = $event.currentTarget.files[0];
                    $scope.vm.fileName=file.name;
                    $scope.vm.fileExt=$scope.vm.fileName.substr($scope.vm.fileName.indexOf(".")+1);
                    var reader = new FileReader();
                    reader.onload = function (evt) {
                        $scope.$apply(function ($scope) {
                            $scope.vm.myImage = evt.target.result;
                        });
                    };
                    reader.readAsDataURL(file);
                };
            };

            /**
             * 将以base64的图片url数据转换为Blob
             * @param urlData
             *            用url方式表示的base64图片数据
             */
            function convertBase64UrlToBlob(urlData,type){

                var bytes=window.atob(urlData.split(',')[1]);        //去掉url的头，并转换为byte

                //处理异常,将ascii码小于0的转换为大于0
                var ab = new ArrayBuffer(bytes.length);
                var ia = new Uint8Array(ab);
                for (var i = 0; i < bytes.length; i++) {
                    ia[i] = bytes.charCodeAt(i);
                }
                return new Blob( [ab] , {type : 'image/'+type});
            }

            /*更新员工头像*/
            function updateEmployeePhoto(data){
                var item={
                    id:$scope.vm.id,
                    rowVersion:$scope.vm.rowVersion,
                    photoFileId:data.id,
                    photoFileUrl:data.url
                };
                tutorialService.updateEmployeePhoto(item).success(function (data) {
                    if (data.errors == null || data.errors.length > 0)
                        dialogService.tip(data.errors);
                    else{
                        $modalInstance.close(item.photoFileUrl);
                    }
                });
            }

            /*保存*/
            $scope.doSave=function () {
                if(!$scope.vm.fileExt){
                    dialogService.tip([{"message": xnI18n.get("xxx.xx.xx.xx")+"请先设置图片！" }]);
                    return ;
                }

                var file=$scope.vm.myCroppedImage;
                var fd = new FormData();
                var newFile=convertBase64UrlToBlob(file,$scope.vm.fileExt);

                fd.append("File", newFile);
                fd.append("DiskId", $scope.vm.diskId);
                fd.append("FolderId", $scope.vm.folderId );
                fd.append("filename", $scope.vm.fileName );
                fd.append("fileExt", $scope.vm.fileExt );
                myService.diskFileUpload(fd).success(function (data) {
                    if (data.errors == null || data.errors.length > 0)
                        dialogService.tip(data.errors);
                    else{
                        updateEmployeePhoto(data);
                    }
                });
            };

            /*取消*/
            $scope.clean=function () {
                $modalInstance.dismiss('cancel');
            }
    }];

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
                name:{
                    required:"员工姓名不能为空！"
                },
                mobile:{
                    required:"手机号码不能为空！",
                    pattern : "手机号码格式不正确！"
                },
                email:{
                    required:"邮箱不能为空！",
                    pattern : "邮箱格式不正确！"
                },
                entryDate:{
                    required:"入职日期不能为空！"
                },
                resignDate:{
                    required:"离职日期不能为空！"
                },
                department:{
                    required:"部门不能为空！"
                }
            });
        }])
        .controller("EmployeeIndexController", ["$scope", "tutorialService", "dialogService", employeeIndexController])
        .controller("EmployeeCreateController", ["$scope", "tutorialService", "dialogService", employeeCreateController])
        .controller("EmployeeEditController", ["$scope", "$location", "$modal", "tutorialService", "dialogService", "toolsService", employeeEditController])
        .controller("EmployeeOpenController", ["$scope", "$modal", "$location", "tutorialService", "dialogService", "toolsService", employeeOpenController]);

})();
