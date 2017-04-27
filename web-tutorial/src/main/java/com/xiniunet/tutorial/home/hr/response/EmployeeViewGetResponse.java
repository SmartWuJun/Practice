package com.xiniunet.tutorial.home.hr.response;

import com.xiniunet.tutorial.home.hr.domain.EmployeeView;
import com.xiniunet.framework.base.BaseResponse;

/**
 * Created by DEV003 on 2014/10/13.
 */
public class EmployeeViewGetResponse extends BaseResponse {

    private EmployeeView employeeView;

    public EmployeeView getEmployeeView() {
        return employeeView;
    }

    public void setEmployeeView(EmployeeView employeeView) {
        this.employeeView = employeeView;
    }
}
