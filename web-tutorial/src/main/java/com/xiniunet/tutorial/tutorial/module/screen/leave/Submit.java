package com.xiniunet.tutorial.tutorial.module.screen.leave;

import com.alibaba.citrus.turbine.Context;
import com.xiniunet.framework.security.Passport;
import com.xiniunet.framework.util.auth.LocalData;
import com.xiniunet.workflow.domain.Process;
import com.xiniunet.workflow.domain.ProcessApproveRule;
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
public class Submit {
    @Autowired
    private WorkflowService workflowService;

    public String getProcess() {
        return "system.tutorial.leave";
    }

    public void execute(Context context) {
        Passport passport = LocalData.getCurrentPassport();

        // 查询流程实例对象
        ProcessGetFromTemplateRequest request = new ProcessGetFromTemplateRequest();
        request.setCode(getProcess());
        ProcessGetFromTemplateResponse response = workflowService.getProcessFromTemplate(request, passport);
        Process process = response.getProcess();

        // 获取流程审批规则
        ProcessApproveRuleGetRequest ruleGetRequest = new ProcessApproveRuleGetRequest();
        ruleGetRequest.setId(process.getId());
        ProcessApproveRuleGetResponse ruleGetResponse = workflowService.getProcessApproveRule(ruleGetRequest, passport);
        ProcessApproveRule approveRule = ruleGetResponse.getProcessApproveRule();

        context.put("approveRule", approveRule);
    }
}
