/*
 * @(#){{ table.nameNoPrefix | pascalcase }}InactiveRequest.java
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
package com.{{ setting.companyCode | lower}}.{{ setting.applicationCode | lower}}.request;

import com.{{ setting.companyCode | lower}}.framework.base.BaseUpdateRequest;

import javax.validation.constraints.NotNull;

/**
 * 作废{{ table.meaning }}的请求.
 * @author {{ setting.developerName}}
 */
public class {{ table.nameNoPrefix | pascalcase }}InactiveRequest extends BaseUpdateRequest {
    /**
     * {{ table.meaning}}ID
     */
    @NotNull(message = "{{table.meaning}}ID不能为空")
    private Long id;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
