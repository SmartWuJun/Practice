(function(){
    "use strict";
    angular.module("xn.tutorial.service", [])
    .config(['$httpProvider',
            function ($httpProvider) {
                $httpProvider.defaults.headers.post['Content-Type'] = 'text/plain';
                $httpProvider.defaults.withCredentials=true;
                $httpProvider.defaults.useXDomain = true;
            }])
    .factory('tutorialService', ['$http', function ($http) {
        var service = {};
        var url = "/api/tutorial.do";
        /**
        * 根据Id获取部门
        */
        service.getDepartment = function (data) {
            return $http({method: 'POST', url: url, data: data, params: {"method": "api.tutorial.department.get"}});
        };
        /**
        * 模糊查询部门
        */
        service.searchDepartment = function (data) {
            return $http({method: 'POST', url: url, data: data, params: {"method": "api.tutorial.department.search"}});
        };
        /**
        * 高级查询部门
        */
        service.findDepartment = function (data) {
            return $http({method: 'POST', url: url, data: data, params: {"method": "api.tutorial.department.find"}});
        };
        /**
        * 创建部门
        */
        service.createDepartment = function (data) {
            return $http({method: 'POST', url: url, data: data, params: {"method": "api.tutorial.department.create"}});
        };
        /**
        * 更新部门
        */
        service.updateDepartment = function (data) {
            return $http({method: 'POST', url: url, data: data, params: {"method": "api.tutorial.department.update"}});
        };
        /**
        * 删除部门
        */
        service.deleteDepartment = function (data) {
            return $http({method: 'POST', url: url, data: data, params: {"method": "api.tutorial.department.delete"}});
        };
        /**
        * 作废部门
        */
        service.inactiveDepartment = function (data) {
            return $http({method: 'POST', url: url, data: data, params: {"method": "api.tutorial.department.inactive"}});
        };
        /**
        * 激活部门
        */
        service.activeDepartment = function (data) {
            return $http({method: 'POST', url: url, data: data, params: {"method": "api.tutorial.department.active"}});
        };
        /**
        * 导入部门
        */
        service.importDepartmentList = function (data) {
            return $http({method: 'POST', url: url, data: data, params: {"method": "api.tutorial.departmentList.import"}});
        };
        /**
        * 导出部门模板
        */
        service.exportDepartmentTemplate = function (data) {
            return $http({method: 'POST', url: url, data: data, params: {"method": "api.tutorial.department.template.export"}});
        };


        service.sortDepartment = function (data) {
            return $http({
                method: 'POST',
                url: url,
                data: data,
                params: {"method": "api.tutorial.department.list.sort"}
            });
        };
        /**
        * 根据Id获取员工请假单
        */
        service.getEmployeeLeave = function (data) {
            return $http({method: 'POST', url: url, data: data, params: {"method": "api.tutorial.employeeLeave.get"}});
        };
        /**
        * 模糊查询员工请假单
        */
        service.searchEmployeeLeave = function (data) {
            return $http({method: 'POST', url: url, data: data, params: {"method": "api.tutorial.employeeLeave.search"}});
        };
        /**
        * 高级查询员工请假单
        */
        service.findEmployeeLeave = function (data) {
            return $http({method: 'POST', url: url, data: data, params: {"method": "api.tutorial.employeeLeave.find"}});
        };
        /**
        * 创建员工请假单
        */
        service.createEmployeeLeave = function (data) {
            return $http({method: 'POST', url: url, data: data, params: {"method": "api.tutorial.employeeLeave.create"}});
        };
        /**
        * 更新员工请假单
        */
        service.updateEmployeeLeave = function (data) {
            return $http({method: 'POST', url: url, data: data, params: {"method": "api.tutorial.employeeLeave.update"}});
        };
        /**
        * 删除员工请假单
        */
        service.deleteEmployeeLeave = function (data) {
            return $http({method: 'POST', url: url, data: data, params: {"method": "api.tutorial.employeeLeave.delete"}});
        };
        /**
        * 提交员工请假单
        */
        service.submitEmployeeLeave = function (data) {
            return $http({method: 'POST', url: url, data: data, params: {"method": "api.tutorial.employeeLeave.submit"}});
        };
        /**
        * 批量提交提交员工请假单
        */
        service.batchSubmitEmployeeLeave = function (data) {
            return $http({method: 'POST', url: url, data: data, params: {"method": "api.tutorial.employeeleave.batch.submit"}});
        };

        /**
        * 审批员工请假单
        */
        service.approveEmployeeLeave = function (data) {
            return $http({method: 'POST', url: url, data: data, params: {"method": "api.tutorial.employeeLeave.approve"}});
        };
        /**
        * 根据Id获取员工
        */
        service.getEmployee = function (data) {
            return $http({method: 'POST', url: url, data: data, params: {"method": "api.tutorial.employee.get"}});
        };
        /**
        * 模糊查询员工
        */
        service.searchEmployee = function (data) {
            return $http({method: 'POST', url: url, data: data, params: {"method": "api.tutorial.employee.search"}});
        };
        /**
        * 高级查询员工
        */
        service.findEmployee = function (data) {
            return $http({method: 'POST', url: url, data: data, params: {"method": "api.tutorial.employee.find"}});
        };
        /**
        * 创建员工
        */
        service.createEmployee = function (data) {
            return $http({method: 'POST', url: url, data: data, params: {"method": "api.tutorial.employee.create"}});
        };
        /**
        * 更新员工
        */
        service.updateEmployee = function (data) {
            return $http({method: 'POST', url: url, data: data, params: {"method": "api.tutorial.employee.update"}});
        };
        /**
         * 员工离职
         */
        service.resignEmployee = function (data) {
            return $http({method: 'POST', url: url, data: data, params: {"method": "api.tutorial.employee.resign"}});
        };
        /**
        * 更新员工照片
        */
        service.updateEmployeePhoto = function (data) {
            return $http({method: 'POST', url: url, data: data, params: {"method": "api.tutorial.employeePhoto.update"}});
        };
        /**
        * 删除员工
        */
        service.deleteEmployee = function (data) {
            return $http({method: 'POST', url: url, data: data, params: {"method": "api.tutorial.employee.delete"}});
        };
        /**
        * 导入员工
        */
        service.importEmployeeList = function (data) {
            return $http({method: 'POST', url: url, data: data, params: {"method": "api.tutorial.employeeList.import"}});
        };
        /**
         * 导出员工模板
         */
        service.exportEmployeeTemplate = function (data) {
            return $http({method: 'POST', url: url, data: data, params: {"method": "api.tutorial.employee.template.export"}});
        };
        /**
         * 根据Id获取视频
         */
        service.getVideo = function (data) {
            return $http({method: 'POST', url: url, data: data, params: {"method": "api.tutorial.video.get"}});
        };
        /**
         * 获取视频上传凭证
         */
        service.getVideoUploadAuth = function (data) {
            return $http({method: 'POST', url: url, data: data, params: {"method": "api.tutorial.video.upload.auth.get"}});
        };
        /**
         * 获取视频上传信息
         */
        service.getVideoUploadInfo = function (data) {
            return $http({method: 'POST', url: url, data: data, params: {"method": "api.tutorial.video.upload.info.get"}});
        };
        /**
         * 从阿里云同步视频信息
         */
        service.syncVideo = function (data) {
            return $http({method: 'POST', url: url, data: data, params: {"method": "api.tutorial.video.sync"}});
        };
        /**
         * 模糊查询视频
         */
        service.searchVideo = function (data) {
            return $http({method: 'POST', url: url, data: data, params: {"method": "api.tutorial.video.search"}});
        };
        /**
         * 高级查询视频
         */
        service.findVideo = function (data) {
            return $http({method: 'POST', url: url, data: data, params: {"method": "api.tutorial.video.find"}});
        };
        /**
         * 创建视频
         */
        service.createVideo = function (data) {
            return $http({method: 'POST', url: url, data: data, params: {"method": "api.tutorial.video.create"}});
        };
        /**
         * 更新视频
         */
        service.updateVideo = function (data) {
            return $http({method: 'POST', url: url, data: data, params: {"method": "api.tutorial.video.update"}});
        };
        /**
         * 发布视频
         */
        service.publishVideo = function (data) {
            return $http({method: 'POST', url: url, data: data, params: {"method": "api.tutorial.video.publish"}});
        };
        /**
         * 删除视频
         */
        service.deleteVideo = function (data) {
            return $http({method: 'POST', url: url, data: data, params: {"method": "api.tutorial.video.delete"}});
        };
        return service;
        }])
    .factory('myService', ['$http', function ($http) {
            var service = {};
            var url = xnConfig.myUrl+"api/foundation.do";
            var sysUrl=xnConfig.myUrl+"system/api.do";
            var diskUrl=xnConfig.myUrl+"api/diskFileUpload.do";
            var workflowUrl=xnConfig.myUrl+"api/workflow.do";
            /*获取承租人信息*/
            service.getTenant = function (data) {
                return $http({
                    method: 'POST',
                    url: sysUrl,
                    data: data,
                    params: {"method": "api.system.tenant.get"} });
            };

            /*获取网盘*/
            service.apiFoundationDiskGet = function (data) {
                return $http({
                    method: 'POST',
                    url: url,
                    data: data,
                    params: {"method": "api.foundation.disk.get"} });
            };

            //上传附件
            service.diskFileUpload = function (data) {
                return  $http({
                    method: 'POST',
                    url: diskUrl,
                    headers: {'Content-Type': undefined },
                    transformRequest: angular.identity,
                    data: data

                });
            };


            //根据ID取得我一个任务的详细信息
            service.apiWorkflowTaskDetailGet = function (data) {
                return $http({
                    method: 'POST',
                    url: workflowUrl,
                    params: {"method": "api.workflow.task.detail.get"},
                    data: data
                });
            };

            //审批通过一个任务的 状态置为approve //通过
            service.apiWorkflowFlowStepApprove = function (data) {
                return $http({
                    method: 'POST',
                    url: workflowUrl,
                    params: {"method": "api.workflow.flow.step.approve"},
                    data: data
                });
            };

            service.apiWorkflowFormGet = function (data) {
                return $http({
                    method: 'POST',
                    url: workflowUrl,
                    data: data,
                    params: {"method": "api.workflow.form.get"}
                });
            };

            service.apiWorkflowFlowFind = function (data) {
                return $http({
                    method: 'POST',
                    url: workflowUrl,
                    data: data,
                    params: {"method": "api.workflow.flow.find"}
                });
            };
        
            //审批拒绝一个任务的 状态置为reject  //拒绝
            service.apiWorkflowFlowStepReject = function (data) {
                return $http({
                    method: 'POST',
                    url: workflowUrl,
                    params: {"method": "api.workflow.flow.step.reject"},
                    data: data
                });
            };

            //转交一个任务给另一个人   //转交
            service.apiWorkflowFlowStepTransfer = function (data) {
                return $http({
                    method: 'POST',
                    url: workflowUrl,
                    params: {"method": "api.workflow.flow.step.transfer"},
                    data: data
                });
            };

            service.apiWorkflowTaskGet = function (data) {
                return $http({method: 'POST', url: workflowUrl, data: data, params: {"method": "api.workflow.task.get"}});
            };
            service.apiWorkflowFlowGet = function (data) {
                return $http({method: 'POST', url: workflowUrl, data: data, params: {"method": "api.workflow.flow.get"}});
            };

        
        return service;
    }])
    .factory('systemService', ['$http', function ($http) {
            var service = {};
            var url = "/api/system.do";
            /*获取审批人*/
            /**
             * 用户获取列表
             * @param data
             * @returns {*}
             */
            service.apiSystemUsersSearchBySourceType = function (data) {
                return $http({
                    method: 'POST',
                    url: url,
                    params: {"method": "api.system.users.search.sourcetype"},
                    data: data
                });
            };
        return service;
    }])
    .factory('foundationService', ['$http', function ($http) {
            var service = {};
            var url = "/api/foundation.do";
            service.getId = function (data) {
                return $http({
                    method: 'POST',
                    url: url,
                    params: {"method": "api.foundation.id.get"},
                    data: data
                });
            };
            service.getIds = function (data) {
                return $http({
                    method: 'POST',
                    url: url,
                    params: {"method": "api.foundation.ids.get"},
                    data: data
                });
            };
        return service;
    }])
})();