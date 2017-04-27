package com.xiniunet.tutorial.home.hr.response;

import com.xiniunet.data.domain.Bank;
import com.xiniunet.framework.base.BaseResponse;
import com.xiniunet.master.domain.humanresource.*;

import java.util.List;

/**
 * Created by DEV003 on 2014/8/26.
 */
public class EmployeeVO extends BaseResponse {

    private Employee employee;

    private List<Position> positionList;

    private List<EmployeeContact> employeeContactList;

    private List<Level> levelList;

    private List<Organization> organizationList;

    private List<Bank> bankList;

    private List<Location> locationList;

    private String photoUrl;


    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public List<Position> getPositionList() {
        return positionList;
    }

    public void setPositionList(List<Position> positionList) {
        this.positionList = positionList;
    }

    public List<EmployeeContact> getEmployeeContactList() {
        return employeeContactList;
    }

    public void setEmployeeContactList(List<EmployeeContact> employeeContactList) {
        this.employeeContactList = employeeContactList;
    }

    public List<Level> getLevelList() {
        return levelList;
    }

    public void setLevelList(List<Level> levelList) {
        this.levelList = levelList;
    }

    public List<Organization> getOrganizationList() {
        return organizationList;
    }

    public void setOrganizationList(List<Organization> organizationList) {
        this.organizationList = organizationList;
    }

    public List<Bank> getBankList() {
        return bankList;
    }

    public void setBankList(List<Bank> bankList) {
        this.bankList = bankList;
    }

    public String getPhotoUrl() {
        return photoUrl;
    }

    public void setPhotoUrl(String photoUrl) {
        this.photoUrl = photoUrl;
    }

    public List<Location> getLocationList() {
        return locationList;
    }

    public void setLocationList(List<Location> locationList) {
        this.locationList = locationList;
    }
}

