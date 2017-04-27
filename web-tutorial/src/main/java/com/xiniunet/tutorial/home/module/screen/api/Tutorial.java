package com.xiniunet.tutorial.home.module.screen.api;

import com.alibaba.citrus.service.requestcontext.buffered.BufferedRequestContext;
import com.alibaba.citrus.turbine.dataresolver.Param;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.xiniunet.foundation.service.FoundationService;
import com.xiniunet.framework.base.BaseResponse;
import com.xiniunet.framework.exception.ErrorType;
import com.xiniunet.framework.log.LogUtil;
import com.xiniunet.framework.security.Passport;
import com.xiniunet.tutorial.request.*;
import com.xiniunet.tutorial.service.TutorialService;
import com.xiniunet.tutorial.tool.Constants;
import org.springframework.beans.factory.annotation.Autowired;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.PrintWriter;

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
public class Tutorial {
    @Autowired
    private HttpServletResponse response;

    @Autowired
    private BufferedRequestContext brc;

    @Autowired
    private HttpServletRequest request;

    @Autowired
    private FoundationService foundationService;

    @Autowired
    private TutorialService tutorialService;

    public void execute(@Param("method") String method) throws Exception {
        BaseResponse baseResponse = new BaseResponse();
        try {
            // 必须关闭buffering，未完成的页面才会被显示在浏览器上。
            brc.setBuffering(false);
            // 设置content type，但不需要设置charset，框架会设置正确的charset。
            response.setContentType("text/plain");
            method = method.toLowerCase();
            Passport passport = (Passport) request.getAttribute("passport");
            InputStreamReader isr = new InputStreamReader(request.getInputStream());
            BufferedReader in = new BufferedReader(isr);
            String line = in.readLine();
            JSONObject jsonObject = JSON.parseObject(line);

            switch(method) {
                // 根据Id获取部门
                case "api.tutorial.department.get":
                    baseResponse = getDepartment(jsonObject, passport);
                    break;
                // 模糊查询部门
                case "api.tutorial.department.search":
                    baseResponse = searchDepartment(jsonObject, passport);
                    break;
                // 高级查询部门
                case "api.tutorial.department.find":
                    baseResponse = findDepartment(jsonObject, passport);
                    break;
                // 创建部门
                case "api.tutorial.department.create":
                    baseResponse = createDepartment(jsonObject, passport);
                    break;
                // 更新部门
                case "api.tutorial.department.update":
                    baseResponse = updateDepartment(jsonObject, passport);
                    break;
                // 删除部门
                case "api.tutorial.department.delete":
                    baseResponse = deleteDepartment(jsonObject, passport);
                    break;
                // 作废部门
                case "api.tutorial.department.inactive":
                    baseResponse = inactiveDepartment(jsonObject, passport);
                    break;
                // 激活部门
                case "api.tutorial.department.active":
                    baseResponse = activeDepartment(jsonObject, passport);
                    break;
                // 导入部门
                case "api.tutorial.departmentlist.import":
                    baseResponse = importDepartmentList(jsonObject, passport);
                    break;
                // 根据Id获取员工请假单
                case "api.tutorial.employeeleave.get":
                    baseResponse = getEmployeeLeave(jsonObject, passport);
                    break;
                // 模糊查询员工请假单
                case "api.tutorial.employeeleave.search":
                    baseResponse = searchEmployeeLeave(jsonObject, passport);
                    break;
                // 高级查询员工请假单
                case "api.tutorial.employeeleave.find":
                    baseResponse = findEmployeeLeave(jsonObject, passport);
                    break;
                // 创建员工请假单
                case "api.tutorial.employeeleave.create":
                    baseResponse = createEmployeeLeave(jsonObject, passport);
                    break;
                // 更新员工请假单
                case "api.tutorial.employeeleave.update":
                    baseResponse = updateEmployeeLeave(jsonObject, passport);
                    break;
                // 删除员工请假单
                case "api.tutorial.employeeleave.delete":
                    baseResponse = deleteEmployeeLeave(jsonObject, passport);
                    break;
                // 提交员工请假单
                case "api.tutorial.employeeleave.submit":
                    baseResponse = submitEmployeeLeave(jsonObject, passport);
                    break;
                // 审批员工请假单
                case "api.tutorial.employeeleave.approve":
                    baseResponse = approveEmployeeLeave(jsonObject, passport);
                    break;
                // 根据Id获取员工
                case "api.tutorial.employee.get":
                    baseResponse = getEmployee(jsonObject, passport);
                    break;
                // 模糊查询员工
                case "api.tutorial.employee.search":
                    baseResponse = searchEmployee(jsonObject, passport);
                    break;
                // 高级查询员工
                case "api.tutorial.employee.find":
                    baseResponse = findEmployee(jsonObject, passport);
                    break;
                // 创建员工
                case "api.tutorial.employee.create":
                    baseResponse = createEmployee(jsonObject, passport);
                    break;
                // 更新员工
                case "api.tutorial.employee.update":
                    baseResponse = updateEmployee(jsonObject, passport);
                    break;
                // 更新员工照片
                case "api.tutorial.employeephoto.update":
                    baseResponse = updateEmployeePhoto(jsonObject, passport);
                    break;
                // 删除员工
                case "api.tutorial.employee.delete":
                    baseResponse = deleteEmployee(jsonObject, passport);
                    break;
                // 导入员工
                case "api.tutorial.employeelist.import":
                    baseResponse = importEmployeeList(jsonObject, passport);
                    break;
                default:
                    baseResponse.addError(ErrorType.INVALID_PARAMETER, Constants.NOT_EXIST_METHOD);
                    break;
            }
        } catch(Exception ex) {
            baseResponse.addError(ErrorType.SYSTEM_ERROR, Constants.ERROR_MESSAGE_500);
            baseResponse.addError(ErrorType.STACK_DUMP, LogUtil.dumpException(ex));
            LogUtil.errorLog(ex);
        } finally {
            String jsonTenant = JSON.toJSONString(baseResponse);
            PrintWriter out = response.getWriter();
            out.println(jsonTenant);
        }
    }

    /**
     * 根据Id获取部门
     */
    private BaseResponse getDepartment(JSONObject jsonObject, Passport passport) {
        DepartmentGetRequest request = JSON.toJavaObject(jsonObject, DepartmentGetRequest.class);
        return tutorialService.getDepartment(request, passport);
    }

    /**
     * 模糊查询部门
     */
    private BaseResponse searchDepartment(JSONObject jsonObject, Passport passport) {
        DepartmentSearchRequest request = JSON.toJavaObject(jsonObject, DepartmentSearchRequest.class);
        return tutorialService.searchDepartment(request, passport);
    }

    /**
     * 高级查询部门
     */
    private BaseResponse findDepartment(JSONObject jsonObject, Passport passport) {
        DepartmentFindRequest request = JSON.toJavaObject(jsonObject, DepartmentFindRequest.class);
        return tutorialService.findDepartment(request, passport);
    }

    /**
     * 创建部门
     */
    private BaseResponse createDepartment(JSONObject jsonObject, Passport passport) {
        DepartmentCreateRequest request = JSON.toJavaObject(jsonObject, DepartmentCreateRequest.class);
        return tutorialService.createDepartment(request, passport);
    }

    /**
     * 更新部门
     */
    private BaseResponse updateDepartment(JSONObject jsonObject, Passport passport) {
        DepartmentUpdateRequest request = JSON.toJavaObject(jsonObject, DepartmentUpdateRequest.class);
        return tutorialService.updateDepartment(request, passport);
    }

    /**
     * 删除部门
     */
    private BaseResponse deleteDepartment(JSONObject jsonObject, Passport passport) {
        DepartmentDeleteRequest request = JSON.toJavaObject(jsonObject, DepartmentDeleteRequest.class);
        return tutorialService.deleteDepartment(request, passport);
    }

    /**
     * 作废部门
     */
    private BaseResponse inactiveDepartment(JSONObject jsonObject, Passport passport) {
        DepartmentInactiveRequest request = JSON.toJavaObject(jsonObject, DepartmentInactiveRequest.class);
        return tutorialService.inactiveDepartment(request, passport);
    }

    /**
     * 激活部门
     */
    private BaseResponse activeDepartment(JSONObject jsonObject, Passport passport) {
        DepartmentActiveRequest request = JSON.toJavaObject(jsonObject, DepartmentActiveRequest.class);
        return tutorialService.activeDepartment(request, passport);
    }

    /**
     * 导入部门
     */
    private BaseResponse importDepartmentList(JSONObject jsonObject, Passport passport) {
        DepartmentListImportRequest request = JSON.toJavaObject(jsonObject, DepartmentListImportRequest.class);
        return tutorialService.importDepartmentList(request, passport);
    }

    /**
     * 根据Id获取员工请假单
     */
    private BaseResponse getEmployeeLeave(JSONObject jsonObject, Passport passport) {
        EmployeeLeaveGetRequest request = JSON.toJavaObject(jsonObject, EmployeeLeaveGetRequest.class);
        return tutorialService.getEmployeeLeave(request, passport);
    }

    /**
     * 模糊查询员工请假单
     */
    private BaseResponse searchEmployeeLeave(JSONObject jsonObject, Passport passport) {
        EmployeeLeaveSearchRequest request = JSON.toJavaObject(jsonObject, EmployeeLeaveSearchRequest.class);
        return tutorialService.searchEmployeeLeave(request, passport);
    }

    /**
     * 高级查询员工请假单
     */
    private BaseResponse findEmployeeLeave(JSONObject jsonObject, Passport passport) {
        EmployeeLeaveFindRequest request = JSON.toJavaObject(jsonObject, EmployeeLeaveFindRequest.class);
        return tutorialService.findEmployeeLeave(request, passport);
    }

    /**
     * 创建员工请假单
     */
    private BaseResponse createEmployeeLeave(JSONObject jsonObject, Passport passport) {
        EmployeeLeaveCreateRequest request = JSON.toJavaObject(jsonObject, EmployeeLeaveCreateRequest.class);
        return tutorialService.createEmployeeLeave(request, passport);
    }

    /**
     * 更新员工请假单
     */
    private BaseResponse updateEmployeeLeave(JSONObject jsonObject, Passport passport) {
        EmployeeLeaveUpdateRequest request = JSON.toJavaObject(jsonObject, EmployeeLeaveUpdateRequest.class);
        return tutorialService.updateEmployeeLeave(request, passport);
    }

    /**
     * 删除员工请假单
     */
    private BaseResponse deleteEmployeeLeave(JSONObject jsonObject, Passport passport) {
        EmployeeLeaveDeleteRequest request = JSON.toJavaObject(jsonObject, EmployeeLeaveDeleteRequest.class);
        return tutorialService.deleteEmployeeLeave(request, passport);
    }

    /**
     * 提交员工请假单
     */
    private BaseResponse submitEmployeeLeave(JSONObject jsonObject, Passport passport) {
        EmployeeLeaveSubmitRequest request = JSON.toJavaObject(jsonObject, EmployeeLeaveSubmitRequest.class);
        return tutorialService.submitEmployeeLeave(request, passport);
    }

    /**
     * 审批员工请假单
     */
    private BaseResponse approveEmployeeLeave(JSONObject jsonObject, Passport passport) {
        EmployeeLeaveApproveRequest request = JSON.toJavaObject(jsonObject, EmployeeLeaveApproveRequest.class);
        return tutorialService.approveEmployeeLeave(request, passport);
    }

    /**
     * 根据Id获取员工
     */
    private BaseResponse getEmployee(JSONObject jsonObject, Passport passport) {
        EmployeeGetRequest request = JSON.toJavaObject(jsonObject, EmployeeGetRequest.class);
        return tutorialService.getEmployee(request, passport);
    }

    /**
     * 模糊查询员工
     */
    private BaseResponse searchEmployee(JSONObject jsonObject, Passport passport) {
        EmployeeSearchRequest request = JSON.toJavaObject(jsonObject, EmployeeSearchRequest.class);
        return tutorialService.searchEmployee(request, passport);
    }

    /**
     * 高级查询员工
     */
    private BaseResponse findEmployee(JSONObject jsonObject, Passport passport) {
        EmployeeFindRequest request = JSON.toJavaObject(jsonObject, EmployeeFindRequest.class);
        return tutorialService.findEmployee(request, passport);
    }

    /**
     * 创建员工
     */
    private BaseResponse createEmployee(JSONObject jsonObject, Passport passport) {
        EmployeeCreateRequest request = JSON.toJavaObject(jsonObject, EmployeeCreateRequest.class);
        return tutorialService.createEmployee(request, passport);
    }

    /**
     * 更新员工
     */
    private BaseResponse updateEmployee(JSONObject jsonObject, Passport passport) {
        EmployeeUpdateRequest request = JSON.toJavaObject(jsonObject, EmployeeUpdateRequest.class);
        return tutorialService.updateEmployee(request, passport);
    }

    /**
     * 更新员工照片
     */
    private BaseResponse updateEmployeePhoto(JSONObject jsonObject, Passport passport) {
        EmployeeUpdatePhotoRequest request = JSON.toJavaObject(jsonObject, EmployeeUpdatePhotoRequest.class);
        return tutorialService.updateEmployeePhoto(request, passport);
    }

    /**
     * 删除员工
     */
    private BaseResponse deleteEmployee(JSONObject jsonObject, Passport passport) {
        EmployeeDeleteRequest request = JSON.toJavaObject(jsonObject, EmployeeDeleteRequest.class);
        return tutorialService.deleteEmployee(request, passport);
    }

    /**
     * 导入员工
     */
    private BaseResponse importEmployeeList(JSONObject jsonObject, Passport passport) {
        EmployeeListImportRequest request = JSON.toJavaObject(jsonObject, EmployeeListImportRequest.class);
        return tutorialService.importEmployeeList(request, passport);
    }

}