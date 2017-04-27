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
public class ClerkShop extends User {
    private Long id;

    private List<Long> shopIds;
    private List<Shop> shops;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<Long> getShopIds() {
        return shopIds;
    }

    public void setShopIds(List<Long> shopIds) {
        this.shopIds = shopIds;
    }


    public List<Shop> getShops() {
        return shops;
    }

    public void setShops(List<Shop> shops) {
        this.shops = shops;
    }
}
