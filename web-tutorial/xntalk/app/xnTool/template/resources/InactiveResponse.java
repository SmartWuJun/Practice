/*
 * @(#){{ table.nameNoPrefix | pascalcase }}InactiveResponse.java
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

import com.{{ setting.companyCode | lower}}.framework.base.BaseUpdateResponse;

/**
 * 作废{{ table.meaning }}的响应.
 * @author {{ setting.developerName}}
 */
public class {{ table.nameNoPrefix | pascalcase }}InactiveResponse extends BaseUpdateResponse {
    /** 
     * 作废的{{ table.meaning }}数目
     */
    private Long result;

    public Long getResult() {
        return result;
    }

    public void setResult(Long result) {
        this.result = result;
    }
}
