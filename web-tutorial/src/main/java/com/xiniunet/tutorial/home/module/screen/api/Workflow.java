package com.xiniunet.tutorial.home.module.screen.api;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.xiniunet.framework.annotation.ApiName;
import com.xiniunet.framework.api.ApiParam;
import com.xiniunet.framework.api.BaseApi;
import com.xiniunet.framework.security.Passport;
import com.xiniunet.workflow.domain.Process;
import com.xiniunet.workflow.request.ProcessApproveRuleGetRequest;
import com.xiniunet.workflow.request.ProcessGetFromTemplateRequest;
import com.xiniunet.workflow.response.ProcessApproveRuleGetResponse;
import com.xiniunet.workflow.response.ProcessGetFromTemplateResponse;
import com.xiniunet.workflow.service.WorkflowService;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * Created on 2017-08-29.
 *
 * @author 吕浩
 * @since 1.0.0
 */
@SuppressWarnings("unused")
public class Workflow extends BaseApi {
    @Autowired
    private WorkflowService workflowService;

    @ApiName("api.workflow.process.get.from.template")
    public ProcessGetFromTemplateResponse getProcessFromTemplate(JSONObject jsonObject, Passport passport) {
        ProcessGetFromTemplateRequest request = JSON.toJavaObject(jsonObject, ProcessGetFromTemplateRequest.class);
        return workflowService.getProcessFromTemplate(request, passport);
    }

    @ApiName("api.workflow.process.approve.rule.get")
    public ProcessApproveRuleGetResponse getProcessApproveRule(JSONObject jsonObject, Passport passport) {
        ProcessApproveRuleGetRequest request = JSON.toJavaObject(jsonObject, ProcessApproveRuleGetRequest.class);
        return workflowService.getProcessApproveRule(request, passport);
    }
}
