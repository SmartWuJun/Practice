package com.xiniunet.tutorial.home.module.screen.api;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.xiniunet.common.utils.file.ImportUtil;
import com.xiniunet.framework.annotation.ApiName;
import com.xiniunet.framework.api.ApiParam;
import com.xiniunet.framework.api.BaseApi;
import com.xiniunet.framework.base.BaseResponse;
import com.xiniunet.framework.base.BaseURLResponse;
import com.xiniunet.framework.security.Passport;
import com.xiniunet.tutorial.domain.DepartmentImport;
import com.xiniunet.tutorial.domain.EmployeeImport;
import com.xiniunet.tutorial.request.*;
import com.xiniunet.tutorial.service.TutorialService;
import org.apache.commons.fileupload.FileItem;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * <p/>
 * <pre>
 * ***************************************************************
 *  Copyright (c) 2014 –苏州犀牛网络科技有限公司
 *  Title: com.xiniunet.tutorial.module.screen.Api
 *  Description: tutorial 的API信息
 *  @since
 *  @author 吕浩
 * ***************************************************************
 * </pre>
 */
public class Tutorial extends BaseApi {
    @Autowired
    private TutorialService tutorialService;

    /**
     * 根据Id获取部门
     * http://localhost/api/tutorial.do?method=api.tutorial.department.get
     */
    @ApiName("api.tutorial.department.get")
    public BaseResponse getDepartment(JSONObject jsonObject, Passport passport) {
        DepartmentGetRequest request = JSON.toJavaObject(jsonObject, DepartmentGetRequest.class);
        return tutorialService.getDepartment(request, passport);
    }

    /**
     * 模糊查询部门
     */
    @ApiName("api.tutorial.department.search")
    public BaseResponse searchDepartment(JSONObject jsonObject, Passport passport) {
        DepartmentSearchRequest request = JSON.toJavaObject(jsonObject, DepartmentSearchRequest.class);
        return tutorialService.searchDepartment(request, passport);
    }

    /**
     * 高级查询部门
     */
    @ApiName("api.tutorial.department.find")
    public BaseResponse findDepartment(JSONObject jsonObject, Passport passport) {
        DepartmentFindRequest request = JSON.toJavaObject(jsonObject, DepartmentFindRequest.class);
        return tutorialService.findDepartment(request, passport);
    }

    /**
     * 创建部门
     */
    @ApiName("api.tutorial.department.create")
    public BaseResponse createDepartment(JSONObject jsonObject, Passport passport) {
        DepartmentCreateRequest request = JSON.toJavaObject(jsonObject, DepartmentCreateRequest.class);
        return tutorialService.createDepartment(request, passport);
    }

    /**
     * 更新部门
     */
    @ApiName("api.tutorial.department.update")
    public BaseResponse updateDepartment(JSONObject jsonObject, Passport passport) {
        DepartmentUpdateRequest request = JSON.toJavaObject(jsonObject, DepartmentUpdateRequest.class);
        return tutorialService.updateDepartment(request, passport);
    }

    /**
     * 删除部门
     */
    @ApiName("api.tutorial.department.delete")
    public BaseResponse deleteDepartment(JSONObject jsonObject, Passport passport) {
        DepartmentDeleteRequest request = JSON.toJavaObject(jsonObject, DepartmentDeleteRequest.class);
        return tutorialService.deleteDepartment(request, passport);
    }

    /**
     * 作废部门
     */
    @ApiName("api.tutorial.department.inactive")
    public BaseResponse inactiveDepartment(JSONObject jsonObject, Passport passport) {
        DepartmentInactiveRequest request = JSON.toJavaObject(jsonObject, DepartmentInactiveRequest.class);
        return tutorialService.inactiveDepartment(request, passport);
    }

    /**
     * 激活部门
     */
    @ApiName("api.tutorial.department.active")
    public BaseResponse activeDepartment(JSONObject jsonObject, Passport passport) {
        DepartmentActiveRequest request = JSON.toJavaObject(jsonObject, DepartmentActiveRequest.class);
        return tutorialService.activeDepartment(request, passport);
    }

    /**
     * 导入部门
     */
    @ApiName("api.tutorial.departmentlist.import")
    public BaseResponse importDepartmentList(@ApiParam("file") FileItem fileItem, Passport passport) {
        DepartmentListImportRequest request = new DepartmentListImportRequest();
        request.setBytes(fileItem.get());
        return tutorialService.importDepartmentList(request, passport);
    }

    /**
     * 导出部门模板
     */
    @ApiName("api.tutorial.department.template.export")
    public BaseURLResponse exportDepartmentTemplate(Passport passport) {
        BaseURLResponse response = new BaseURLResponse();
        String url = ImportUtil.uploadTemplate(DepartmentImport.class, passport);
        response.setUrl(url);
        return response;
    }

    @ApiName("api.tutorial.department.list.sort")
    public BaseResponse updateDepartmentOrderIndex(JSONObject jsonObject, Passport passport){
        DepartmentOrderIndexUpdateRequest request = JSON.toJavaObject(jsonObject,DepartmentOrderIndexUpdateRequest.class);
        return tutorialService.updateDepartmentOrderIndex(request,passport);
    }


    /**
     * 部门排序
     */
//    @ApiName("api.tutorial.departmentlist.sort")
//    public BaseURLResponse sortDepartmentlist(JSONObject jsonObject, Passport passport) {
//        DepartmentSortRequest request = JSON.toJavaObject(jsonObject, DepartmentSortRequest.class);
//        return tutorialService.sortDepartment(request, passport);
//    }

    /**
     * 根据Id获取员工请假单
     */
    @ApiName("api.tutorial.employeeleave.get")
    public BaseResponse getEmployeeLeave(JSONObject jsonObject, Passport passport) {
        EmployeeLeaveGetRequest request = JSON.toJavaObject(jsonObject, EmployeeLeaveGetRequest.class);
        return tutorialService.getEmployeeLeave(request, passport);
    }

    /**
     * 模糊查询员工请假单
     */
    @ApiName("api.tutorial.employeeleave.search")
    public BaseResponse searchEmployeeLeave(JSONObject jsonObject, Passport passport) {
        EmployeeLeaveSearchRequest request = JSON.toJavaObject(jsonObject, EmployeeLeaveSearchRequest.class);
        return tutorialService.searchEmployeeLeave(request, passport);
    }

    /**
     * 高级查询员工请假单
     */
    @ApiName("api.tutorial.employeeleave.find")
    public BaseResponse findEmployeeLeave(JSONObject jsonObject, Passport passport) {
        EmployeeLeaveFindRequest request = JSON.toJavaObject(jsonObject, EmployeeLeaveFindRequest.class);
        return tutorialService.findEmployeeLeave(request, passport);
    }

    /**
     * 创建员工请假单
     */
    @ApiName("api.tutorial.employeeleave.create")
    public BaseResponse createEmployeeLeave(JSONObject jsonObject, Passport passport) {
        EmployeeLeaveCreateRequest request = JSON.toJavaObject(jsonObject, EmployeeLeaveCreateRequest.class);
        return tutorialService.createEmployeeLeave(request, passport);
    }

    /**
     * 更新员工请假单
     */
    @ApiName("api.tutorial.employeeleave.update")
    public BaseResponse updateEmployeeLeave(JSONObject jsonObject, Passport passport) {
        EmployeeLeaveUpdateRequest request = JSON.toJavaObject(jsonObject, EmployeeLeaveUpdateRequest.class);
        return tutorialService.updateEmployeeLeave(request, passport);
    }

    /**
     * 删除员工请假单
     */
    @ApiName("api.tutorial.employeeleave.delete")
    public BaseResponse deleteEmployeeLeave(JSONObject jsonObject, Passport passport) {
        EmployeeLeaveDeleteRequest request = JSON.toJavaObject(jsonObject, EmployeeLeaveDeleteRequest.class);
        return tutorialService.deleteEmployeeLeave(request, passport);
    }

    /**
     * 提交员工请假单
     */
    @ApiName("api.tutorial.employeeleave.submit")
    public BaseResponse submitEmployeeLeave(JSONObject jsonObject, Passport passport) {
        EmployeeLeaveSubmitRequest request = JSON.toJavaObject(jsonObject, EmployeeLeaveSubmitRequest.class);
        return tutorialService.submitEmployeeLeave(request, passport);
    }
    /**
     * 批量提交员工请假单
     */
    @ApiName("api.tutorial.employeeleave.batch.submit")
    public BaseResponse batchSubmitEmployeeLeave(JSONObject jsonObject, Passport passport) {
        EmployeeLeaveBatchSubmitRequest request = JSON.toJavaObject(jsonObject, EmployeeLeaveBatchSubmitRequest.class);
        return tutorialService.batchSubmitEmployeeLeave(request, passport);
    }

    /**
     * 审批员工请假单
     */
    @ApiName("api.tutorial.employeeleave.approve")
    public BaseResponse approveEmployeeLeave(JSONObject jsonObject, Passport passport) {
        EmployeeLeaveApproveRequest request = JSON.toJavaObject(jsonObject, EmployeeLeaveApproveRequest.class);
        return tutorialService.approveEmployeeLeave(request, passport);
    }

    /**
     * 根据Id获取员工
     */
    @ApiName("api.tutorial.employee.get")
    public BaseResponse getEmployee(JSONObject jsonObject, Passport passport) {
        EmployeeGetRequest request = JSON.toJavaObject(jsonObject, EmployeeGetRequest.class);
        return tutorialService.getEmployee(request, passport);
    }

    /**
     * 模糊查询员工
     */
    @ApiName("api.tutorial.employee.search")
    public BaseResponse searchEmployee(JSONObject jsonObject, Passport passport) {
        EmployeeSearchRequest request = JSON.toJavaObject(jsonObject, EmployeeSearchRequest.class);
        return tutorialService.searchEmployee(request, passport);
    }

    /**
     * 高级查询员工
     */
    @ApiName("api.tutorial.employee.find")
    public BaseResponse findEmployee(JSONObject jsonObject, Passport passport) {
        EmployeeFindRequest request = JSON.toJavaObject(jsonObject, EmployeeFindRequest.class);
        return tutorialService.findEmployee(request, passport);
    }

    /**
     * 创建员工
     */
    @ApiName("api.tutorial.employee.create")
    public BaseResponse createEmployee(JSONObject jsonObject, Passport passport) {
        EmployeeCreateRequest request = JSON.toJavaObject(jsonObject, EmployeeCreateRequest.class);
        return tutorialService.createEmployee(request, passport);
    }

    /**
     * 更新员工
     */
    @ApiName("api.tutorial.employee.update")
    public BaseResponse updateEmployee(JSONObject jsonObject, Passport passport) {
        EmployeeUpdateRequest request = JSON.toJavaObject(jsonObject, EmployeeUpdateRequest.class);
        return tutorialService.updateEmployee(request, passport);
    }

    /**
     * 离职员工
     */
    @ApiName("api.tutorial.employee.resign")
    public BaseResponse resignEmployee(JSONObject jsonObject, Passport passport) {
        EmployeeResignRequest request = JSON.toJavaObject(jsonObject, EmployeeResignRequest.class);
        return tutorialService.resignEmployee(request, passport);
    }

    /**
     * 更新员工照片
     */
    @ApiName("api.tutorial.employeephoto.update")
    public BaseResponse updateEmployeePhoto(JSONObject jsonObject, Passport passport) {
        EmployeeUpdatePhotoRequest request = JSON.toJavaObject(jsonObject, EmployeeUpdatePhotoRequest.class);
        return tutorialService.updateEmployeePhoto(request, passport);
    }

    /**
     * 删除员工
     */
    @ApiName("api.tutorial.employee.delete")
    public BaseResponse deleteEmployee(JSONObject jsonObject, Passport passport) {
        EmployeeDeleteRequest request = JSON.toJavaObject(jsonObject, EmployeeDeleteRequest.class);
        return tutorialService.deleteEmployee(request, passport);
    }

    /**
     * 导入员工
     */
    @ApiName("api.tutorial.employeelist.import")
    public BaseResponse importEmployeeList(@ApiParam("file") FileItem fileItem, Passport passport) {
        EmployeeListImportRequest request = new EmployeeListImportRequest();
        request.setBytes(fileItem.get());
        return tutorialService.importEmployeeList(request, passport);
    }

    /**
     * 导出员工模板
     */
    @ApiName("api.tutorial.employee.template.export")
    public BaseURLResponse exportEmployeeTemplate(Passport passport) {
        BaseURLResponse response = new BaseURLResponse();
        String url = ImportUtil.uploadTemplate(EmployeeImport.class, passport);
        response.setUrl(url);
        return response;
    }

    /**
     * 根据Id获取视频
     */
    @ApiName("api.tutorial.video.get")
    public BaseResponse getVideo(JSONObject jsonObject, Passport passport) {
        VideoGetRequest request = JSON.toJavaObject(jsonObject, VideoGetRequest.class);
        return tutorialService.getVideo(request, passport);
    }

    /**
     * 获取视频上传凭证
     */
    @ApiName("api.tutorial.video.upload.auth.get")
    public BaseResponse getVideoUploadAuth(Passport passport) {
        VideoUploadAuthGetRequest request = new VideoUploadAuthGetRequest();
        return tutorialService.getVideoUploadAuth(request, passport);
    }

    /**
     * 获取视频上传信息
     */
    @ApiName("api.tutorial.video.upload.info.get")
    public BaseResponse getVideoUploadInfo(JSONObject jsonObject, Passport passport) {
        VideoUploadInfoGetRequest request = JSON.toJavaObject(jsonObject, VideoUploadInfoGetRequest.class);
        return tutorialService.getVideoUploadInfo(request, passport);
    }

    /**
     * 从阿里云同步视频信息
     */
    @ApiName("api.tutorial.video.sync")
    public BaseResponse syncVideo(Passport passport) {
        VideoSyncRequest request = new VideoSyncRequest();
        return tutorialService.syncVideo(request, passport);
    }

    /**
     * 模糊查询视频
     */
    @ApiName("api.tutorial.video.search")
    public BaseResponse searchVideo(JSONObject jsonObject, Passport passport) {
        VideoSearchRequest request = JSON.toJavaObject(jsonObject, VideoSearchRequest.class);
        return tutorialService.searchVideo(request, passport);
    }

    /**
     * 高级查询视频
     */
    @ApiName("api.tutorial.video.find")
    public BaseResponse findVideo(JSONObject jsonObject, Passport passport) {
        VideoFindRequest request = JSON.toJavaObject(jsonObject, VideoFindRequest.class);
        return tutorialService.findVideo(request, passport);
    }

    /**
     * 创建视频
     */
    @ApiName("api.tutorial.video.create")
    public BaseResponse createVideo(JSONObject jsonObject, Passport passport) {
        VideoCreateRequest request = JSON.toJavaObject(jsonObject, VideoCreateRequest.class);
        return tutorialService.createVideo(request, passport);
    }

    /**
     * 更新视频
     */
    @ApiName("api.tutorial.video.update")
    public BaseResponse updateVideo(JSONObject jsonObject, Passport passport) {
        VideoUpdateRequest request = JSON.toJavaObject(jsonObject, VideoUpdateRequest.class);
        return tutorialService.updateVideo(request, passport);
    }

    /**
     * 发布视频
     */
    @ApiName("api.tutorial.video.publish")
    public BaseResponse publishVideo(JSONObject jsonObject, Passport passport) {
        VideoPublishRequest request = JSON.toJavaObject(jsonObject, VideoPublishRequest.class);
        return tutorialService.publishVideo(request, passport);
    }

    /**
     * 删除视频
     */
    @ApiName("api.tutorial.video.delete")
    public BaseResponse deleteVideo(JSONObject jsonObject, Passport passport) {
        VideoDeleteRequest request = JSON.toJavaObject(jsonObject, VideoDeleteRequest.class);
        return tutorialService.deleteVideo(request, passport);
    }
}