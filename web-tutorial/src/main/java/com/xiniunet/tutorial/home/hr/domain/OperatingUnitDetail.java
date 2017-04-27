package com.xiniunet.tutorial.home.hr.domain;

import com.xiniunet.master.domain.humanresource.OperatingUnit;

/**
 * Created by DEV003 on 2014/12/12.
 */
public class OperatingUnitDetail extends OperatingUnit {

    /**
     * 法律实体名称
     */
    private String legalEntityName;

    /**
     * 组织名称
     */
    private String organizationName;

    /**
     * 图片路径
     */
    private String pictureUrl;

    public String getLegalEntityName() {
        return legalEntityName;
    }

    public void setLegalEntityName(String legalEntityName) {
        this.legalEntityName = legalEntityName;
    }

    public String getOrganizationName() {
        return organizationName;
    }

    public void setOrganizationName(String organizationName) {
        this.organizationName = organizationName;
    }

    public String getPictureUrl() {
        return pictureUrl;
    }

    public void setPictureUrl(String pictureUrl) {
        this.pictureUrl = pictureUrl;
    }
}
