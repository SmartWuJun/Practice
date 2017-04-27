package com.xiniunet.tutorial.home.module.screen.api;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.xiniunet.framework.annotation.ApiName;
import com.xiniunet.framework.api.BaseApi;
import com.xiniunet.framework.security.Passport;
import com.xiniunet.master.request.system.*;
import com.xiniunet.master.response.system.*;
import com.xiniunet.master.service.MasterService;
import com.xiniunet.security.request.ApplicationInitializeRequest;
import com.xiniunet.security.request.ApplicationInstallFindRequest;
import com.xiniunet.security.request.UserApplicationSearchRequest;
import com.xiniunet.security.response.ApplicationInitializedResponse;
import com.xiniunet.security.response.ApplicationInstallFindResponse;
import com.xiniunet.security.response.UserApplicationSearchResponse;
import com.xiniunet.security.service.SecurityService;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * 产品、应用等相关接口
 * Created on 2017-03-10.
 *
 * @author 吕浩
 * @since 1.0.0
 */
public class Application extends BaseApi {

    @Autowired
    private SecurityService securityService;

    @Autowired
    private MasterService masterService;

    // region -------------平台相关----------------

    @ApiName("api.platform.application.get.tenant")
    public ApplicationInstallFindResponse apiPlatformApplicationGetTenant(Passport passport) {
        ApplicationInstallFindRequest request = new ApplicationInstallFindRequest();
        request.setPageSize(0);
        return securityService.findApplicationInstall(request, passport);
    }

    @ApiName("api.platform.application.get.user")
    public ApplicationFindResponse apiPlatformApplicationGetUser(Passport passport) {
        ApplicationFindRequest request = new ApplicationFindRequest();
        request.setPageSize(0);
        return masterService.findApplication(request, passport);
    }

    @ApiName("api.platform.application.initialize")
    public ApplicationInitializedResponse apiPlatformApplicationInitialize(JSONObject jsonObject, Passport passport) {
        ApplicationInitializeRequest initializeRequest = JSON.toJavaObject(jsonObject, ApplicationInitializeRequest.class);
        return securityService.initializedApplication(initializeRequest, passport);
    }

    @ApiName("api.platform.application.get.commonly")
    public UserApplicationSearchResponse apiPlatformApplicationGetCommonly(Passport passport) {
        return securityService.searchUserApplication(new UserApplicationSearchRequest(), passport);
    }
    // endregion


    // region -------------应用包相关----------------
    @ApiName("api.platform.application.assemble.order.create")
    public ApplicationAssembleOrderCreateResponse createApplicationAssembleOrder(JSONObject jsonObject, Passport passport) {
        ApplicationAssembleOrderCreateRequest request = JSON.toJavaObject(jsonObject, ApplicationAssembleOrderCreateRequest.class);
        return masterService.createApplicationAssembleOrder(request, passport);
    }

    @ApiName("api.platform.application.assemble.get")
    public ApplicationAssembleGetResponse getApplicationAssemble(JSONObject jsonObject, Passport passport) {
        ApplicationAssembleGetRequest request = JSON.toJavaObject(jsonObject, ApplicationAssembleGetRequest.class);
        return masterService.getApplicationAssemble(request, passport);
    }

    @ApiName("api.platform.application.assemble.find")
    public ApplicationAssembleFindResponse findApplicationAssemble(JSONObject jsonObject, Passport passport) {
        ApplicationAssembleFindRequest request = JSON.toJavaObject(jsonObject, ApplicationAssembleFindRequest.class);
        return masterService.findApplicationAssemble(request, passport);
    }

    @ApiName("api.platform.application.assemble.create")
    public ApplicationAssembleCreateResponse createApplicationAssemble(JSONObject jsonObject, Passport passport) {
        ApplicationAssembleCreateRequest request = JSON.toJavaObject(jsonObject, ApplicationAssembleCreateRequest.class);
        return masterService.createApplicationAssemble(request, passport);
    }

    @ApiName("api.platform.application.assemble.update")
    public ApplicationAssembleUpdateResponse updateApplicationAssemble(JSONObject jsonObject, Passport passport) {
        ApplicationAssembleUpdateRequest request = JSON.toJavaObject(jsonObject, ApplicationAssembleUpdateRequest.class);
        return masterService.updateApplicationAssemble(request, passport);
    }

    @ApiName("api.platform.application.assemble.delete")
    public ApplicationAssembleDeleteResponse deleteApplicationAssemble(JSONObject jsonObject, Passport passport) {
        ApplicationAssembleDeleteRequest request = JSON.toJavaObject(jsonObject, ApplicationAssembleDeleteRequest.class);
        return masterService.deleteApplicationAssemble(request, passport);
    }
    // endregion
}
