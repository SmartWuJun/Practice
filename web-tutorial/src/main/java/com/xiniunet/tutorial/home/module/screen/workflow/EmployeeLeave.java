package com.xiniunet.tutorial.home.module.screen.workflow;

import com.alibaba.fastjson.JSON;
import com.xiniunet.common.utils.i18n.XnI18n;
import com.xiniunet.common.utils.properties.PropertyGetter;
import com.xiniunet.common.utils.web.page.WorkflowPage;
import com.xiniunet.framework.security.Passport;
import com.xiniunet.tutorial.request.EmployeeLeaveApproveRequest;
import com.xiniunet.tutorial.request.EmployeeLeaveGetRequest;
import com.xiniunet.tutorial.response.EmployeeLeaveApproveResponse;
import com.xiniunet.tutorial.response.EmployeeLeaveGetResponse;
import com.xiniunet.tutorial.service.TutorialService;
import com.xiniunet.workflow.domain.Flow;
import com.xiniunet.workflow.request.FlowGetRequest;
import com.xiniunet.workflow.response.FlowFormGetResponse;
import com.xiniunet.workflow.service.WorkflowService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Date;

import static com.xiniunet.workflow.enumeration.FlowStatusEnum.APPROVED;
import static com.xiniunet.workflow.enumeration.FlowStatusEnum.REJECTED;

/**
 * Created on 2017-04-11.
 *
 * @author 吕浩
 * @since 1.0.0
 */
public class EmployeeLeave extends WorkflowPage {
    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private WorkflowService workflowService;
    @Autowired
    private TutorialService tutorialService;

    @Override
    public FlowFormGetResponse getForm(FormParam param, Passport passport) {
        return null;
    }

    @Override
    public String printForm(FormParam param, Passport passport) {
        return null;
    }

    @Override
    public String viewForm(FormParam param, Passport passport) {
        return PropertyGetter.getFromFile("site.tutorial.url") + "/tutorial/leave/view.htm?id=" + param.getBusinessId() + "&flowId=" + param.getFlowId();
    }

    @Override
    public String openForm(FormParam param, Passport passport) {
        Long id;
        if(param.getBusinessId() == null) {
            FlowGetRequest flowGetRequest = new FlowGetRequest();
            flowGetRequest.setId(param.getFlowId());
            Flow flow = workflowService.getFlow(flowGetRequest, passport).getFlow();
            if(flow == null) {
                logger.warn(XnI18n.get("xxx.xxx.xxxx.xxx"));
                logger.warn("流程对象不存在，流程ID：" + param.getFlowId());
                return "";
            }
            id = flow.getBusinessId();
        } else {
            id = param.getBusinessId();
        }
        return PropertyGetter.getFromFile("site.tutorial.url") + "/tutorial/leave/approve.htm?stepId=" + param.getStepId() + "&flowId=" + param.getFlowId() + "&id=" + id;
    }

    @Override
    public boolean finishForm(FormParam param, Passport passport) {
        FlowGetRequest flowGetRequest = new FlowGetRequest();
        flowGetRequest.setId(param.getFlowId());
        Flow flow = workflowService.getFlow(flowGetRequest,passport).getFlow();
        if(flow == null) {
            logger.warn("流程对象不存在，流程ID：" + param.getFlowId());
            return false;
        }
        if(flow.getFlowStatus() != APPROVED && flow.getFlowStatus() != REJECTED) {
            logger.warn("流程尚未审批完成，当前状态为：" + flow.getFlowStatus());
            return false;
        }

        EmployeeLeaveGetRequest getRequest = new EmployeeLeaveGetRequest();
        getRequest.setId(flow.getBusinessId());
        EmployeeLeaveGetResponse getResponse = tutorialService.getEmployeeLeave(getRequest, passport);
        com.xiniunet.tutorial.domain.EmployeeLeave leave = getResponse.getEmployeeLeave();
        if(leave == null) {
            logger.warn("请假单对象不存在，单据ID：" + flow.getBusinessId());
            return false;
        }

        EmployeeLeaveApproveRequest approveRequest = new EmployeeLeaveApproveRequest();
        approveRequest.setId(flow.getBusinessId());
        approveRequest.setApproveResult(flow.getFlowStatus().name());
        approveRequest.setApproveUserId(passport.getUserId());
        approveRequest.setApproveUserName(passport.getUserName());
        approveRequest.setApproveTime(new Date());
        approveRequest.setRowVersion(leave.getRowVersion());
        EmployeeLeaveApproveResponse approveResponse = tutorialService.approveEmployeeLeave(approveRequest, passport);
        if(approveResponse.hasError()) {
            logger.warn("审批请假单出现错误：" + JSON.toJSONString(approveResponse.getErrors()));
            return false;
        }
        return true;
    }

    /**
     * 获取表单创建页面的地址（用于任务中心提交任务的跳转）
     *
     * @param processId 流程定义ID
     * @param passport  用户护照
     * @return 表单信息
     */
    @Override
    public String createForm(Long processId, Passport passport) {
        return PropertyGetter.getFromFile("site.tutorial.url") + "/workflow/employeeLeave.do";
    }

    /**
     * 获取表单的描述信息（用于在任务中心显示任务的描述信息，请返回html内容）
     *
     * @param param    表单信息
     * @param passport 用户护照
     * @return 任务的描述信息
     */
    @Override
    public String describeForm(FormParam param, Passport passport) {
        // TODO 覆写的方法 describeForm
        return super.describeForm(param, passport);
    }
}
