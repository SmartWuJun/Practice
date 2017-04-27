package com.xiniunet.tutorial.home.hr.domain;

import com.xiniunet.framework.base.BaseDomain;
import com.xiniunet.master.domain.humanresource.Job;
import com.xiniunet.master.domain.humanresource.PositionSimple;

/**
 * Created by DEV003 on 2015/1/5.
 */
public class PositionDetail extends BaseDomain {
    /**
     * 主键
     */
    private Long id;

    /**
     * 组织Id
     */
    private Long organizationId;

    /**
     * 员工Id
     */
    private Long employeeId;

    /**
     * 职位
     */
    private Job job;

    /**
     * 上级岗位
     */
    private PositionSimple parent;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    public Long getOrganizationId() {
        return organizationId;
    }

    public void setOrganizationId(Long organizationId) {
        this.organizationId = organizationId;
    }

    public Job getJob() {
        return job;
    }

    public void setJob(Job job) {
        this.job = job;
    }

    public PositionSimple getParent() {
        return parent;
    }

    public void setParent(PositionSimple parent) {
        this.parent = parent;
    }
}
