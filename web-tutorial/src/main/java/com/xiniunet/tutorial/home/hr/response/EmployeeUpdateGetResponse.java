package com.xiniunet.tutorial.home.hr.response;

import com.xiniunet.tutorial.home.hr.domain.EmployeeUpdate;
import com.xiniunet.framework.base.BaseResponse;

/**
 * Created by DEV003 on 2014/10/15.
 */
public class EmployeeUpdateGetResponse extends BaseResponse {

    private EmployeeUpdate employeeUpdate;

    public EmployeeUpdate getEmployeeUpdate() {
        return employeeUpdate;
    }

    public void setEmployeeUpdate(EmployeeUpdate employeeUpdate) {
        this.employeeUpdate = employeeUpdate;
    }
}
