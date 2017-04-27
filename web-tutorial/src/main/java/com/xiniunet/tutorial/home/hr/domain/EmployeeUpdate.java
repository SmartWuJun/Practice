package com.xiniunet.tutorial.home.hr.domain;

import com.xiniunet.foundation.domain.Location;
import com.xiniunet.master.domain.humanresource.BankAccount;
import com.xiniunet.master.domain.humanresource.EmployeeDetail;
import com.xiniunet.master.domain.humanresource.Job;
import com.xiniunet.master.domain.humanresource.Position;

/**
 * Created by DEV003 on 2014/10/14.
 */
public class EmployeeUpdate extends EmployeeDetail {

    /**
     * 头像路径
     */
    private String photoUrl;

    /**
     * 职位
     */
    private Job job;

    /**
     * 组织Id
     */
    private Long OrganizationId;

    /**
     * 上级岗位
     */
    private Position managerPosition;


    /**
     * 银行账号
     */
    private BankAccount bankAccount;

    /**
     * 银行国家Id
     */
    private Long bankCountryId;

    /**
     * 银行省份Id
     */
    private Long bankProvinceId;

    /**
     * 居住地址
     */
    private Location residenceLocation;

    /**
     * 用户帐号
     */
    private String userAccount;


    public String getPhotoUrl() {
        return photoUrl;
    }

    public void setPhotoUrl(String photoUrl) {
        this.photoUrl = photoUrl;
    }

    public Job getJob() {
        return job;
    }

    public void setJob(Job job) {
        this.job = job;
    }

    public Long getOrganizationId() {
        return OrganizationId;
    }

    public void setOrganizationId(Long organizationId) {
        OrganizationId = organizationId;
    }

    public Position getManagerPosition() {
        return managerPosition;
    }

    public void setManagerPosition(Position managerPosition) {
        this.managerPosition = managerPosition;
    }

    public BankAccount getBankAccount() {
        return bankAccount;
    }

    public void setBankAccount(BankAccount bankAccount) {
        this.bankAccount = bankAccount;
    }

    public Location getResidenceLocation() {
        return residenceLocation;
    }

    public void setResidenceLocation(Location residenceLocation) {
        this.residenceLocation = residenceLocation;
    }

    public Long getBankCountryId() {
        return bankCountryId;
    }

    public void setBankCountryId(Long bankCountryId) {
        this.bankCountryId = bankCountryId;
    }

    public Long getBankProvinceId() {
        return bankProvinceId;
    }

    public void setBankProvinceId(Long bankProvinceId) {
        this.bankProvinceId = bankProvinceId;
    }

    public String getUserAccount() {
        return userAccount;
    }

    public void setUserAccount(String userAccount) {
        this.userAccount = userAccount;
    }
}
