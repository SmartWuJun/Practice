(function(){
    "use strict";
    angular.module("xn.tutorialwu.service", [])
    .factory('TutorialService', ['$http', function ($http) {
    var service = {};
    var url = "/api/tutorial.do";
    /**
    * 根据Id获取部门
    *@param id 部门ID长度：--
    *@return
    *department 部门信息
    */
    service.getDepartment = function (data) {
        return $http({method: 'POST', url: url, data: data, params: {"method": "api.tutorial.department.get"}});
    };
    /**
    * 模糊查询部门
    *@param pageNumber 当前页数--不为空长度：--
    *@param pageSize 分页大小--不为空长度：--
    *@param keyword 查询关键字长度：--
    *@param sortKey 排序列长度：--
    *@param sortType 排序方式长度：--
    *@return
    *totalCount 当前页数
    *result 返回对象
    */
    service.searchDepartment = function (data) {
        return $http({method: 'POST', url: url, data: data, params: {"method": "api.tutorial.department.search"}});
    };
    /**
    * 高级查询部门
    *@param tenantId 承租人ID长度：--
    *@param code 部门代码长度：--
    *@param type 部门类型长度：--
    *@param name 部门名称长度：--
    *@param description 部门描述长度：--
    *@param pageNumber 当前页数--不为空长度：--
    *@param pageSize 分页大小--不为空长度：--
    *@param sortKey 排序列长度：--
    *@param sortType 排序方式长度：--
    *@return
    *totalCount 当前页数
    *result 返回对象
    */
    service.findDepartment = function (data) {
        return $http({method: 'POST', url: url, data: data, params: {"method": "api.tutorial.department.find"}});
    };
    /**
    * 创建部门
    *@param code 部门代码长度：--
    *@param type 部门类型长度：--
    *@param name 部门名称长度：--
    *@param description 部门描述长度：--
    *@param isActive 是否有效长度：--
    *@param orderIndex 排序索引长度：--
    *@param ownerEmployeeId 负责员工ID长度：--
    *@param ownerEmployeeName 负责员工姓名长度：--
    *@return
    *id 新创建的部门ID
    */
    service.createDepartment = function (data) {
        return $http({method: 'POST', url: url, data: data, params: {"method": "api.tutorial.department.create"}});
    };
    /**
    * 更新部门
    *@param id 主键长度：--
    *@param code 部门代码长度：--
    *@param type 部门类型长度：--
    *@param name 部门名称长度：--
    *@param description 部门描述长度：--
    *@param isActive 是否有效长度：--
    *@param orderIndex 排序索引长度：--
    *@param ownerEmployeeId 负责员工ID长度：--
    *@param ownerEmployeeName 负责员工姓名长度：--
    *@param rowVersion 版本号长度：--
    *@return
    *result 更新的部门的数目
    */
    service.updateDepartment = function (data) {
        return $http({method: 'POST', url: url, data: data, params: {"method": "api.tutorial.department.update"}});
    };
    /**
    * 删除部门
    *@param id 部门ID长度：--
    *@return
    *result 作废的部门数目
    */
    service.deleteDepartment = function (data) {
        return $http({method: 'POST', url: url, data: data, params: {"method": "api.tutorial.department.delete"}});
    };
    /**
    * 作废部门
    *@param id 部门ID长度：--
    *@param rowVersion 版本号长度：--
    *@return
    *result 作废的部门数目
    */
    service.inactiveDepartment = function (data) {
        return $http({method: 'POST', url: url, data: data, params: {"method": "api.tutorial.department.inactive"}});
    };
    /**
    * 激活部门
    *@param id 部门ID长度：--
    *@param rowVersion 版本号长度：--
    *@return
    *result 激活的部门数目
    */
    service.activeDepartment = function (data) {
        return $http({method: 'POST', url: url, data: data, params: {"method": "api.tutorial.department.active"}});
    };
    /**
    * 导入部门
    *@return
    */
    service.importDepartmentList = function (data) {
        return $http({method: 'POST', url: url, data: data, params: {"method": "api.tutorial.departmentList.import"}});
    };
    /**
    * 根据Id获取员工请假单
    *@param id 员工请假单ID长度：--
    *@return
    *employeeLeave 员工请假单信息
    */
    service.getEmployeeLeave = function (data) {
        return $http({method: 'POST', url: url, data: data, params: {"method": "api.tutorial.employeeLeave.get"}});
    };
    /**
    * 模糊查询员工请假单
    *@param pageNumber 当前页数--不为空长度：--
    *@param pageSize 分页大小--不为空长度：--
    *@param keyword 查询关键字长度：--
    *@param sortKey 排序列长度：--
    *@param sortType 排序方式长度：--
    *@return
    *totalCount 当前页数
    *result 返回对象
    */
    service.searchEmployeeLeave = function (data) {
        return $http({method: 'POST', url: url, data: data, params: {"method": "api.tutorial.employeeLeave.search"}});
    };
    /**
    * 高级查询员工请假单
    *@param number 单号长度：--
    *@param employeeName 员工姓名长度：--
    *@param submitUserId 提交用户ID长度：--
    *@param submitUserName 提交用户姓名长度：--
    *@param approveUserId 审批用户ID长度：--
    *@param approveUserName 审批用户姓名长度：--
    *@param pageNumber 当前页数--不为空长度：--
    *@param pageSize 分页大小--不为空长度：--
    *@param sortKey 排序列长度：--
    *@param sortType 排序方式长度：--
    *@return
    *totalCount 当前页数
    *result 返回对象
    */
    service.findEmployeeLeave = function (data) {
        return $http({method: 'POST', url: url, data: data, params: {"method": "api.tutorial.employeeLeave.find"}});
    };
    /**
    * 创建员工请假单
    *@param number 单号长度：--
    *@param employeeId 员工ID长度：--
    *@param employeeName 员工姓名长度：--
    *@param type 请假类型 事假病假调休年假婚假产假看护假丧假长度：--
    *@param beginDate 开始日期长度：--
    *@param beginTime 开始小时 24小时制长度：--
    *@param endDate 结束日期长度：--
    *@param endTime 结束小时 24小时制长度：--
    *@param leaveDays 请假天数长度：--
    *@param summary 摘要说明长度：--
    *@param description 原因说明长度：--
    *@param agentEmployeeId 代理人员工ID长度：--
    *@param agentEmployeeName 代理人员工姓名长度：--
    *@return
    *id 新创建的员工请假单ID
    */
    service.createEmployeeLeave = function (data) {
        return $http({method: 'POST', url: url, data: data, params: {"method": "api.tutorial.employeeLeave.create"}});
    };
    /**
    * 更新员工请假单
    *@param id 主键长度：--
    *@param number 单号长度：--
    *@param employeeId 员工ID长度：--
    *@param employeeName 员工姓名长度：--
    *@param type 请假类型 事假病假调休年假婚假产假看护假丧假长度：--
    *@param beginDate 开始日期长度：--
    *@param beginTime 开始小时 24小时制长度：--
    *@param endDate 结束日期长度：--
    *@param endTime 结束小时 24小时制长度：--
    *@param leaveDays 请假天数长度：--
    *@param summary 摘要说明长度：--
    *@param description 原因说明长度：--
    *@param agentEmployeeId 代理人员工ID长度：--
    *@param agentEmployeeName 代理人员工姓名长度：--
    *@param isSubmit 是否已提交长度：--
    *@param submitUserId 提交用户ID长度：--
    *@param submitUserName 提交用户姓名长度：--
    *@param submitTime 提交时间长度：--
    *@param isApproved 是否已审批长度：--
    *@param approveUserId 审批用户ID长度：--
    *@param approveUserName 审批用户姓名长度：--
    *@param approveTime 审批时间长度：--
    *@param approveResult 审批结果长度：--
    *@param rowVersion 版本号长度：--
    *@return
    *result 更新的员工请假单的数目
    */
    service.updateEmployeeLeave = function (data) {
        return $http({method: 'POST', url: url, data: data, params: {"method": "api.tutorial.employeeLeave.update"}});
    };
    /**
    * 删除员工请假单
    *@param id 员工请假单ID长度：--
    *@return
    *result 作废的员工请假单数目
    */
    service.deleteEmployeeLeave = function (data) {
        return $http({method: 'POST', url: url, data: data, params: {"method": "api.tutorial.employeeLeave.delete"}});
    };
    /**
    * 提交员工请假单
    *@param id 请假单ID长度：--
    *@param url 单据URL长度：--
    *@param approveUserIdList 审批人list长度：--
    *@param rowVersion 版本号长度：--
    *@return
    *result 提交的结果
    */
    service.submitEmployeeLeave = function (data) {
        return $http({method: 'POST', url: url, data: data, params: {"method": "api.tutorial.employeeLeave.submit"}});
    };
    /**
    * 审批员工请假单
    *@param id 请假单ID长度：--
    *@param approveUserId 审批用户ID长度：--
    *@param approveUserName 审批用户姓名长度：--
    *@param approveTime 审批时间长度：--
    *@param approveResult 审批结果长度：--
    *@param rowVersion 版本号长度：--
    *@return
    *result 审批结果
    */
    service.approveEmployeeLeave = function (data) {
        return $http({method: 'POST', url: url, data: data, params: {"method": "api.tutorial.employeeLeave.approve"}});
    };
    /**
    * 根据Id获取员工
    *@param id 员工ID长度：--
    *@return
    *employee 员工信息
    */
    service.getEmployee = function (data) {
        return $http({method: 'POST', url: url, data: data, params: {"method": "api.tutorial.employee.get"}});
    };
    /**
    * 模糊查询员工
    *@param pageNumber 当前页数--不为空长度：--
    *@param pageSize 分页大小--不为空长度：--
    *@param keyword 查询关键字长度：--
    *@param sortKey 排序列长度：--
    *@param sortType 排序方式长度：--
    *@return
    *totalCount 当前页数
    *result 返回对象
    */
    service.searchEmployee = function (data) {
        return $http({method: 'POST', url: url, data: data, params: {"method": "api.tutorial.employee.search"}});
    };
    /**
    * 高级查询员工
    *@param tenantId 承租人ID长度：--
    *@param pageNumber 当前页数--不为空长度：--
    *@param pageSize 分页大小--不为空长度：--
    *@param sortKey 排序列长度：--
    *@param sortType 排序方式长度：--
    *@return
    *totalCount 当前页数
    *result 返回对象
    */
    service.findEmployee = function (data) {
        return $http({method: 'POST', url: url, data: data, params: {"method": "api.tutorial.employee.find"}});
    };
    /**
    * 创建员工
    *@param number 工号长度：--
    *@param name 姓名长度：--
    *@param gender 性别长度：--
    *@param birthDate 生日长度：--
    *@param entryDate 入职日长度：--
    *@param description 描述长度：--
    *@param photoFileId 照片文件ID长度：--
    *@param photoFileUrl 照片文件地址长度：--
    *@param departmentId 部门ID长度：--
    *@param isResign 是否离职长度：--
    *@param resignDate 离职日期长度：--
    *@param salary 薪资长度：--
    *@return
    *id 新创建的员工ID
    */
    service.createEmployee = function (data) {
        return $http({method: 'POST', url: url, data: data, params: {"method": "api.tutorial.employee.create"}});
    };
    /**
    * 更新员工
    *@param id 主键长度：--
    *@param number 工号长度：--
    *@param name 姓名长度：--
    *@param gender 性别长度：--
    *@param birthDate 生日长度：--
    *@param entryDate 入职日长度：--
    *@param description 描述长度：--
    *@param departmentId 部门ID长度：--
    *@param isResign 是否离职长度：--
    *@param resignDate 离职日期长度：--
    *@param salary 薪资长度：--
    *@param rowVersion 版本号长度：--
    *@return
    *result 更新的员工的数目
    */
    service.updateEmployee = function (data) {
        return $http({method: 'POST', url: url, data: data, params: {"method": "api.tutorial.employee.update"}});
    };
    /**
    * 更新员工照片
    *@param id 主键长度：--
    *@param photoFileId 照片文件ID长度：--
    *@param photoFileUrl 照片文件地址长度：--
    *@param rowVersion 版本号长度：--
    *@return
    *result 更新记录数
    */
    service.updateEmployeePhoto = function (data) {
        return $http({method: 'POST', url: url, data: data, params: {"method": "api.tutorial.employeePhoto.update"}});
    };
    /**
    * 删除员工
    *@param id 员工ID长度：--
    *@return
    *result 作废的员工数目
    */
    service.deleteEmployee = function (data) {
        return $http({method: 'POST', url: url, data: data, params: {"method": "api.tutorial.employee.delete"}});
    };
    /**
    * 导入员工
    *@return
    */
    service.importEmployeeList = function (data) {
        return $http({method: 'POST', url: url, data: data, params: {"method": "api.tutorial.employeeList.import"}});
    };
    return service;
    }]);
})();