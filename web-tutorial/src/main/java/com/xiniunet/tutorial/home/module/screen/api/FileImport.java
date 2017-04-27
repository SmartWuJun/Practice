package com.xiniunet.tutorial.home.module.screen.api;

import com.alibaba.citrus.service.requestcontext.buffered.BufferedRequestContext;
import com.alibaba.citrus.turbine.dataresolver.Param;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.xiniunet.tutorial.tool.Constants;
import com.xiniunet.foundation.contract.UploadTypeEnum;
import com.xiniunet.foundation.request.FileUploadRequest;
import com.xiniunet.foundation.response.FileUploadResponse;
import com.xiniunet.foundation.service.FoundationService;
import com.xiniunet.framework.base.BaseURLResponse;
import com.xiniunet.framework.exception.ErrorType;
import com.xiniunet.framework.log.Log;
import com.xiniunet.framework.log.LogUtil;
import com.xiniunet.framework.security.Passport;
import com.xiniunet.framework.util.auth.LocalData;
import com.xiniunet.framework.util.excel.Excel;
import com.xiniunet.framework.util.excel.datatable.DataTable;
import com.xiniunet.master.domain.humanresource.*;
import com.xiniunet.master.domain.purchasing.SupplierImport;
import com.xiniunet.master.domain.sales.CustomerImport;
import com.xiniunet.master.request.humanresource.*;
import com.xiniunet.master.request.purchasing.SupplierListImportRequest;
import com.xiniunet.master.request.sales.CustomerListImportRequest;
import com.xiniunet.master.response.humanresource.*;
import com.xiniunet.master.response.purchasing.SupplierListImportResponse;
import com.xiniunet.master.response.sales.CustomerListImportResponse;
import com.xiniunet.master.service.MasterService;
import com.xiniunet.security.service.SecurityService;
import org.apache.commons.fileupload.FileItem;
import org.springframework.beans.factory.annotation.Autowired;

import javax.servlet.http.HttpServletResponse;
import java.io.PrintWriter;
import java.util.List;

/**
 * Created by DEV001 on 2014/9/1.
 */
public class FileImport {

    @Autowired
    private HttpServletResponse response;

    @Autowired
    private BufferedRequestContext brc;

    @Autowired
    private MasterService masterService;

    @Autowired
    private SecurityService securityService;

    @Autowired
    private FoundationService foundationService;

    // Excel解析失败的时候，报出的消息
    private static final String INVALID_EXCEL = "Excel解析失败，请确认上传文档的正确性";

    @SuppressWarnings("unchecked")
    public void execute(@Param("file") FileItem fileItem, @Param("method") String method, @Param("json") String json,@Param("isNeedSendMail") Boolean isNeedSendMail) throws Exception {
        BaseURLResponse baseResponse = new BaseURLResponse();
        if (fileItem == null) {
            return;
        }
        try {
            // 必须关闭buffering，未完成的页面才会被显示在浏览器上。
            brc.setBuffering(false);

            // 设置content type，但不需要设置charset，框架会设置正确的charset。
            response.setContentType("text/plain");

            Passport passport = LocalData.getCurrentPassport();

            FileUploadRequest fileUploadRequest = new FileUploadRequest();
            fileUploadRequest.setType(UploadTypeEnum.TMP);
            fileUploadRequest.setFileExt("xlsx");
            FileUploadResponse fileUploadResponse;

            JSONObject jsonObject = JSON.parseObject(json);


            switch (method) {
                case "api.hr.job.import": {
                    DataTable<JobImport> dataTable;
                    try {
                        dataTable = new DataTable(fileItem.get(), JobImport.class);
                    } catch (Exception e) {
                        baseResponse.addError(ErrorType.INVALID_PARAMETER, e.getMessage());
                        break;
                    }
                    if (!dataTable.hasError()) {
                        List<JobImport> list = dataTable.transferList(JobImport.class);
                        JobListImportRequest jobListImportRequest = new JobListImportRequest();
                        jobListImportRequest.setDataTable(dataTable);
                        jobListImportRequest.setList(list);
                        if (list.isEmpty()) {
                            baseResponse.addError(ErrorType.INVALID_PARAMETER, Constants.NOT_EXIST_DATA);
                            break;
                        } else {

                            JobListImportResponse jobListImportResponse = masterService.importJobList(jobListImportRequest, passport);
                            if (jobListImportResponse.getDataTable() != null) {
                                dataTable = jobListImportResponse.getDataTable();
                            }
                        }
                    }
                    if (dataTable.hasError()) {
                        fileUploadRequest.setFileStream(new Excel(dataTable, true).getBytes());
                        fileUploadResponse = foundationService.uploadFile(fileUploadRequest, passport);
                        baseResponse.setUrl(fileUploadResponse.getUrl());
                        baseResponse.addErrors(dataTable.getErrorList());
                    }
                    break;
                }
                case "api.hr.level.import": {
                    DataTable<LevelImport> dataTable;
                    try {
                        dataTable = new DataTable(fileItem.get(), LevelImport.class);
                    } catch (Exception e) {
                        baseResponse.addError(ErrorType.INVALID_PARAMETER, e.getMessage());
                        break;
                    }
                    if (!dataTable.hasError()) {
                        List<LevelImport> list = dataTable.transferList(LevelImport.class);
                        EmployeeLevelListImportRequest levelListImportRequest = new EmployeeLevelListImportRequest();
                        levelListImportRequest.setDataTable(dataTable);
                        levelListImportRequest.setList(list);
                        if (list.isEmpty()) {
                            baseResponse.addError(ErrorType.INVALID_PARAMETER, Constants.NOT_EXIST_DATA);
                            break;
                        } else {

                            EmployeeLevelListImportResponse levelImportResponse = masterService.importEmployeeLevelList(levelListImportRequest, passport);
                            if (levelImportResponse.getDataTable() != null) {
                                dataTable = levelImportResponse.getDataTable();
                            }
                        }
                    }
                    if (dataTable.hasError()) {
                        fileUploadRequest.setFileStream(new Excel(dataTable, true).getBytes());
                        fileUploadResponse = foundationService.uploadFile(fileUploadRequest, passport);
                        baseResponse.setUrl(fileUploadResponse.getUrl());
                        baseResponse.addErrors(dataTable.getErrorList());
                    }
                    break;
                }
                case "api.hr.location.import": {
                    DataTable<LocationImport> dataTable;
                    try {
                        dataTable = new DataTable(fileItem.get(), LocationImport.class);
                    } catch (Exception e) {
                        baseResponse.addError(ErrorType.INVALID_PARAMETER, e.getMessage());
                        break;
                    }
                    if (!dataTable.hasError()) {
                        List<LocationImport> list = dataTable.transferList(LocationImport.class);
                        LocationListImportRequest locationListImportRequest = new LocationListImportRequest();
                        locationListImportRequest.setDataTable(dataTable);
                        locationListImportRequest.setList(list);
                        if (list.isEmpty()) {
                            baseResponse.addError(ErrorType.INVALID_PARAMETER, Constants.NOT_EXIST_DATA);
                            break;
                        } else {

                            LocationListImportResponse locationListImportResponse = masterService.importLocationList(locationListImportRequest, passport);
                            if (locationListImportResponse.getDataTable() != null) {
                                dataTable = locationListImportResponse.getDataTable();
                            }
                        }
                    }
                    if (dataTable.hasError()) {
                        fileUploadRequest.setFileStream(new Excel(dataTable, true).getBytes());
                        fileUploadResponse = foundationService.uploadFile(fileUploadRequest, passport);
                        baseResponse.setUrl(fileUploadResponse.getUrl());
                        baseResponse.addErrors(dataTable.getErrorList());
                    }
                    break;
                }

                case "api.hr.employee.import": {
                    DataTable<EmployeeImport> dataTable;
                    try {
                        dataTable = new DataTable(fileItem.get(), EmployeeImport.class);
                    } catch (Exception e) {
                        baseResponse.addError(ErrorType.INVALID_PARAMETER, e.getMessage());
                        break;
                    }
                    if (!dataTable.hasError()) {
                        List<EmployeeImport> list = dataTable.transferList(EmployeeImport.class);
                        EmployeeListImportRequest employeeImportRequest = new EmployeeListImportRequest();
                        employeeImportRequest.setDataTable(dataTable);
                        employeeImportRequest.setList(list);
                        if (list.isEmpty()) {
                            baseResponse.addError(ErrorType.INVALID_PARAMETER, Constants.NOT_EXIST_DATA);
                            break;
                        } else {

                            EmployeeListImportResponse employeeImportResponse = masterService.importEmployeeList(employeeImportRequest, passport);
                            if (employeeImportResponse.getDataTable() != null) {
                                dataTable = employeeImportResponse.getDataTable();
                            }
                        }
                    }
                    if (dataTable.hasError()) {
                        fileUploadRequest.setFileStream(new Excel(dataTable, true).getBytes());
                        fileUploadResponse = foundationService.uploadFile(fileUploadRequest, passport);
                        baseResponse.setUrl(fileUploadResponse.getUrl());
                        baseResponse.addErrors(dataTable.getErrorList());
                    }
                    break;
                }


                case "api.hr.org.import": {
                    DataTable<OrganizationImport> dataTable;
                    try {
                        dataTable = new DataTable(fileItem.get(), OrganizationImport.class);
                    } catch (Exception e) {
                        baseResponse.addError(ErrorType.INVALID_PARAMETER, e.getMessage());
                        break;
                    }
                    if (!dataTable.hasError()) {
                        List<OrganizationImport> list = dataTable.transferList(OrganizationImport.class);
                        OrganizationListImportRequest organizationListImportRequest = new OrganizationListImportRequest();
                        organizationListImportRequest.setDataTable(dataTable);
                        organizationListImportRequest.setList(list);
                        if (list.isEmpty()) {
                            baseResponse.addError(ErrorType.INVALID_PARAMETER, Constants.NOT_EXIST_DATA);
                            break;
                        } else {

                            OrganizationListImportResponse organizationImportResponse = masterService.importOrganizationList(organizationListImportRequest, passport);
                            if (organizationImportResponse.getDataTable() != null) {
                                dataTable = organizationImportResponse.getDataTable();
                            }
                        }
                    }
                    if (dataTable.hasError()) {
                        fileUploadRequest.setFileStream(new Excel(dataTable, true).getBytes());
                        fileUploadResponse = foundationService.uploadFile(fileUploadRequest, passport);
                        baseResponse.setUrl(fileUploadResponse.getUrl());
                        baseResponse.addErrors(dataTable.getErrorList());
                    }
                    break;
                }

                case "api.hr.org.setowner.import": {
                    DataTable<OrganizationSetOwner> dataTable;
                    try {
                        dataTable = new DataTable(fileItem.get(), OrganizationSetOwner.class);

                    } catch (Exception e) {
                        baseResponse.addError(ErrorType.INVALID_PARAMETER, e.getMessage());
                        break;
                    }
                    if (!dataTable.hasError()) {
                        List<OrganizationSetOwner> list = dataTable.transferList(OrganizationSetOwner.class);
                        OrganizationSetOwnerBatchRequest organizationSetOwnerBatchRequest = new OrganizationSetOwnerBatchRequest();
                        organizationSetOwnerBatchRequest.setDataTable(dataTable);
                        organizationSetOwnerBatchRequest.setList(list);
                        if (list.isEmpty()) {
                            baseResponse.addError(ErrorType.INVALID_PARAMETER, Constants.NOT_EXIST_DATA);
                            break;
                        } else {

                            OrganizationSetOwnerBatchResponse organizationSetOwnerBatchResponse = masterService.setOrganizationOwnerBatch(organizationSetOwnerBatchRequest, passport);
                            if (organizationSetOwnerBatchResponse!=null&&organizationSetOwnerBatchResponse.getDataTable() != null) {
                                dataTable = organizationSetOwnerBatchResponse.getDataTable();
                            }
                        }
                    }
                    if (dataTable.hasError()) {
                        fileUploadRequest.setFileStream(new Excel(dataTable, true).getBytes());
                        fileUploadResponse = foundationService.uploadFile(fileUploadRequest, passport);
                        baseResponse.setUrl(fileUploadResponse.getUrl());
                        baseResponse.addErrors(dataTable.getErrorList());
                    }
                    break;
                }


                case "api.purchasing.supplier.import": {
                    DataTable<SupplierImport> dataTable;
                    try {
                        dataTable = new DataTable(fileItem.get(), SupplierImport.class);
                    } catch (Exception e) {
                        baseResponse.addError(ErrorType.INVALID_PARAMETER, e.getMessage());
                        break;
                    }
                    if (!dataTable.hasError()) {
                        List<SupplierImport> list = dataTable.transferList(SupplierImport.class);
                        SupplierListImportRequest excelRequest = new SupplierListImportRequest();
                        excelRequest.setDataTable(dataTable);
                        excelRequest.setList(list);
                        if (list.isEmpty()) {
                            baseResponse.addError(ErrorType.INVALID_PARAMETER, Constants.NOT_EXIST_DATA);
                            break;
                        } else {

                            SupplierListImportResponse excelResponse = masterService.importSupplierList(excelRequest, passport);
                            baseResponse.addErrors(excelResponse.getErrors());
                            if (excelResponse.getDataTable() != null) {
                                dataTable = excelResponse.getDataTable();
                            }
                        }
                    } else {
                        baseResponse.addErrors(dataTable.getErrorList());
                    }
                    if (baseResponse.hasError()) {
                        fileUploadRequest.setFileStream(new Excel(dataTable, true).getBytes());
                        fileUploadResponse = foundationService.uploadFile(fileUploadRequest, passport);
                        baseResponse.setUrl(fileUploadResponse.getUrl());
                    }
                    break;
                }


                case "api.sales.customer.importcustomer": {
                    DataTable<CustomerImport> dataTable;
                    try {
                        dataTable = new DataTable(fileItem.get(), CustomerImport.class);
                    } catch (Exception e) {
                        baseResponse.addError(ErrorType.INVALID_PARAMETER, e.getMessage());
                        break;
                    }
                    if (!dataTable.hasError()) {
                        List<CustomerImport> list = dataTable.transferList(CustomerImport.class);
                        CustomerListImportRequest customerListImportRequest = new CustomerListImportRequest();
                        customerListImportRequest.setDataTable(dataTable);
                        customerListImportRequest.setList(list);
                        if (list.isEmpty()) {
                            baseResponse.addError(ErrorType.INVALID_PARAMETER, Constants.NOT_EXIST_DATA);
                            break;
                        } else {

                            CustomerListImportResponse customerListImportResponse = masterService.importCustomerList(customerListImportRequest, passport);
                            if (customerListImportResponse.getDataTable() != null) {
                                dataTable = customerListImportResponse.getDataTable();
                            }
                        }
                    }
                    if (dataTable.hasError()) {
                        fileUploadRequest.setFileStream(new Excel(dataTable, true).getBytes());
                        fileUploadResponse = foundationService.uploadFile(fileUploadRequest, passport);
                        baseResponse.setUrl(fileUploadResponse.getUrl());
                        baseResponse.addErrors(dataTable.getErrorList());
                    }
                    break;
                }
                case "api.system.role.import.file":
                    //baseResponse = apiSystemRoleImportFile(fileItem.get(), passport);
                    break;
                /* 通过文件导入用户列表 */
                default:
                    baseResponse.addError(ErrorType.INVALID_PARAMETER, Constants.NOT_EXIST_METHOD);
                    break;
            }
        } catch (Exception ex) {
            Passport passport = LocalData.getCurrentPassport();
            LogUtil.writeLog(new Log("debug", "web", "", ex.getMessage(), passport));
            baseResponse.addError(ErrorType.SYSTEM_ERROR, Constants.ERROR_MESSAGE_500);
            baseResponse.addError(ErrorType.STACK_DUMP, LogUtil.dumpException(ex));
        } finally {
            json = JSON.toJSONString(baseResponse, SerializerFeature.DisableCircularReferenceDetect);
            PrintWriter out = response.getWriter();
            out.println(json);
        }
    }
}
