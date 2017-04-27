package com.xiniunet.tutorial.home.hr.domain;

import com.xiniunet.master.domain.humanresource.Employee;
import com.xiniunet.master.domain.humanresource.Organization;

/**
 * Created by DEV003 on 2014/10/14.
 */
public class OrganizationIndex extends Organization {
    private Employee owner;

    public Employee getOwner() {
        return owner;
    }

    public void setOwner(Employee owner) {
        this.owner = owner;
    }
}
