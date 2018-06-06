/*
 * @(#){{ table.nameNoPrefix | pascalcase }}CreateResponse.java
 *
 * Copyright (c) 2014-2017  {{ setting.companyName }} 版权所有
 * {{ setting.companyCode}}. All rights reserved.
 *
 * This software is the confidential and proprietary
 * information of  {{ setting.companyCode}}.
 * ("Confidential Information"). You shall not disclose
 * such Confidential Information and shall use it only
 * in accordance with the terms of the contract agreement
 * you entered into with {{ setting.companyCode}}.
 */
package com.{{ setting.companyCode | lower}}.{{ setting.applicationCode | lower}}.response;

import com.{{ setting.companyCode | lower}}.framework.base.BaseResponse;

/**
 * 创建{{ table.meaning }}的响应.
 * @author {{ setting.developerName}}
 */
public class {{ table.nameNoPrefix | pascalcase }}CreateResponse extends BaseResponse {
    /**
     * 新创建的{{ table.meaning }}ID 
     */
    private Long id;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
