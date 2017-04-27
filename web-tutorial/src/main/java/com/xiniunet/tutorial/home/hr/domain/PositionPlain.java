package com.xiniunet.tutorial.home.hr.domain;


import com.xiniunet.master.domain.humanresource.PositionSimple;

/**
 * Created by DEV003 on 2014/10/15.
 */
public class PositionPlain extends PositionSimple {

    /**
     * 上级岗位
     */
    private PositionSimple parent;

    public PositionSimple getParent() {
        return parent;
    }

    public void setParent(PositionSimple parent) {
        this.parent = parent;
    }
}
