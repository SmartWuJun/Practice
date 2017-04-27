package com.xiniunet.tutorial.home.hr.domain;

import com.xiniunet.master.domain.humanresource.LegalEntity;

/**
 * Created by DEV003 on 2014/12/12.
 */
public class LegalEntityDetail extends LegalEntity {

    /**
     *企业性质名称
     */
    private String businessNatureName;

    /**
     *所属行业名称
     */
    private String businessTradeName;

    /**
     *银行名称
     */
    private String bankName;

    /**
     * 组织名称
     */
    private String organizationName;

    public String getBusinessNatureName() {
        return businessNatureName;
    }

    public void setBusinessNatureName(String businessNatureName) {
        this.businessNatureName = businessNatureName;
    }

    public String getBusinessTradeName() {
        return businessTradeName;
    }

    public void setBusinessTradeName(String businessTradeName) {
        this.businessTradeName = businessTradeName;
    }

    public String getBankName() {
        return bankName;
    }

    public void setBankName(String bankName) {
        this.bankName = bankName;
    }

    public String getOrganizationName() {
        return organizationName;
    }

    public void setOrganizationName(String organizationName) {
        this.organizationName = organizationName;
    }
}
