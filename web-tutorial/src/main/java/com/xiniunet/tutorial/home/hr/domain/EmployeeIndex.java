package com.xiniunet.tutorial.home.hr.domain;


import com.xiniunet.master.domain.humanresource.EmployeeDetail;

/**
 * Created by DEV003 on 2014/10/9.
 */
public class EmployeeIndex extends EmployeeDetail {

    /**
     * 年龄,
     */
    private Long age;

    /**
     * 司龄,
     */
    private Double workAge;

    /**
     * 组织名称
     */
    private  String   organizationName;

    /**
     * 职位名称,
     */
    private  String   jobName;

    /**
     * 主管,
     */
    private  String   ownerName;

    /**
     * 照片地址
     */
    private String photoUrl;

    public Long getAge() {
        return age;
    }

    public void setAge(Long age) {
        this.age = age;
    }

    public Double getWorkAge() {
        return workAge;
    }

    public void setWorkAge(Double workAge) {
        this.workAge = workAge;
    }

    public String getOrganizationName() {
        return organizationName;
    }

    public void setOrganizationName(String organizationName) {
        this.organizationName = organizationName;
    }

    public String getJobName() {
        return jobName;
    }

    public void setJobName(String jobName) {
        this.jobName = jobName;
    }

    public String getOwnerName() {
        return ownerName;
    }

    public void setOwnerName(String ownerName) {
        this.ownerName = ownerName;
    }

    public String getPhotoUrl() {
        return photoUrl;
    }

    public void setPhotoUrl(String photoUrl) {
        this.photoUrl = photoUrl;
    }
}
