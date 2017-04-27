package com.xiniunet.tutorial.home.hr.response;

import com.xiniunet.tutorial.home.hr.domain.EmployeeReport;
import com.xiniunet.framework.base.BaseResponse;

import java.util.List;

/**
 * Created by DEV001 on 2014/9/2.
 */
public class EmployeeReportVO extends BaseResponse {
    private static final long serialVersionUID = 1L;

    private List<EmployeeReport> employeeList;

    private long totalCount;

    public List<EmployeeReport> getEmployeeList() {
        return employeeList;
    }

    public void setEmployeeList(List<EmployeeReport> employeeList) {
        this.employeeList = employeeList;
    }

    public long getTotalCount() {
        return totalCount;
    }

    public void setTotalCount(long totalCount) {
        this.totalCount = totalCount;
    }
}
