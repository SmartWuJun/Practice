package com.xiniunet.tutorial.home.hr.domain;

import com.xiniunet.master.domain.humanresource.OperatingUnit;
import com.xiniunet.master.domain.humanresource.Organization;
import com.xiniunet.master.domain.humanresource.Shop;
import com.xiniunet.master.domain.ledger.CapitalAccount;
import com.xiniunet.master.domain.system.User;

/**
 *
 * Created on 2014/12/12.
 * @author 吕浩
 * @version 1.0.0
 */
public class ExtShop extends Shop {
    /**
     * 负责人姓名
     */
    private User owner;

    /**
     * 所属经营单元
     */
    private OperatingUnit operatingUnit;

    /**
     * 图片路径
     */
    private String pictureUrl;

    /**
     * 组织信息
     */
    private Organization organization;

    /**
     * 地址名称
     */
    private String locationName;

    /**
     * 银行账户
     */
    private CapitalAccount bankAccount;

    /**
     * 现金帐号
     */
    private CapitalAccount cashAccount;

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }

    public OperatingUnit getOperatingUnit() {
        return operatingUnit;
    }

    public void setOperatingUnit(OperatingUnit operatingUnit) {
        this.operatingUnit = operatingUnit;
    }

    public String getPictureUrl() {
        return pictureUrl;
    }

    public void setPictureUrl(String pictureUrl) {
        this.pictureUrl = pictureUrl;
    }

    public Organization getOrganization() {
        return organization;
    }

    public void setOrganization(Organization organization) {
        this.organization = organization;
    }

    public String getLocationName() {
        return locationName;
    }

    public void setLocationName(String locationName) {
        this.locationName = locationName;
    }

    public CapitalAccount getCashAccount() {
        return cashAccount;
    }

    public void setCashAccount(CapitalAccount cashAccount) {
        this.cashAccount = cashAccount;
    }

    public CapitalAccount getBankAccount() {
        return bankAccount;
    }

    public void setBankAccount(CapitalAccount bankAccount) {
        this.bankAccount = bankAccount;
    }
}
