package com.xiniunet.tutorial.home.hr.domain;

import com.xiniunet.master.domain.humanresource.Shop;
import com.xiniunet.master.domain.system.User;

import java.util.List;

/**
 * ***************************************************************
 * <p/>
 * <pre>
 * Copyright (c) 2014 –苏州犀牛网络科技有限公司
 *  Title: com.xiniunet.erp.hr.domain
 *  Description:
 * ***************************************************************
 *  2/6 0006  V1.0  xiniu    New Files for com.xiniunet.erp.hr.domain
 * </pre>
 */
public class ShopClerk extends Shop{
    private List<Long> userList;
    private List<User> users;
    public List<Long> getUserList() {
        return userList;
    }

    public void setUserList(List<Long> userList) {
        this.userList = userList;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }
}
