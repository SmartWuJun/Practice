package com.xiniunet.tutorial.tutorial.module.screen.leave;

import com.alibaba.citrus.turbine.Context;
import com.alibaba.citrus.turbine.Navigator;
import com.alibaba.citrus.turbine.dataresolver.Param;
import com.xiniunet.framework.util.auth.LocalData;
import com.xiniunet.workflow.domain.Flow;
import com.xiniunet.workflow.request.FlowFindRequest;
import com.xiniunet.workflow.request.FlowGetRequest;
import com.xiniunet.workflow.response.FlowFindResponse;
import com.xiniunet.workflow.response.FlowGetResponse;
import com.xiniunet.workflow.service.WorkflowService;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * Created on 2017-04-13.
 *
 * @author 吕浩
 * @since 1.0.0
 */
public class Open {
    @Autowired
    private WorkflowService workflowService;

    public void execute(Navigator navigator, Context context, @Param("id")Long id, @Param("flowId")Long flowId) {
        if(flowId == null) {
            FlowFindRequest findRequest = new FlowFindRequest();
            findRequest.setBusinessType("TUTORIAL_EMPLOYEE_LEAVE");
            findRequest.setBusinessId(id);
            findRequest.setPageSize(1);
            findRequest.setPageNumber(Integer.MAX_VALUE);
            FlowFindResponse findResponse = workflowService.findFlow(findRequest, LocalData.getCurrentPassport());
            if(!findResponse.getResult().isEmpty()) {
                Flow flow = findResponse.getResult().get(0);
                flowId = flow.getId();
                navigator.redirectTo("tutorialLink").withTarget("/leave/open.htm")
                        .withParameter("id", id+"")
                        .withParameter("flowId", flowId + "")
                        .end();
            }
        } else {
            FlowGetRequest getRequest = new FlowGetRequest(flowId);
            FlowGetResponse getResponse = workflowService.getFlow(getRequest, LocalData.getCurrentPassport());

            context.put("flowNumber", getResponse.getFlow().getFlowNumber());
        }
        context.put("flowId", flowId);
    }
}
