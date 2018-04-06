/*
 * @(#){{ table.nameNoPrefix | pascalcase }}GetResponse.java
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

import com.{{ setting.companyCode | lower}}.{{ setting.applicationCode | lower}}.domain.{{ table.nameNoPrefix | pascalcase }};
import com.{{ setting.companyCode | lower}}.framework.base.BaseResponse;

/**
 * 通过id查询{{ table.meaning }}的响应.
 * @author {{ setting.developerName}}
 */
public class {{ table.nameNoPrefix | pascalcase }}GetResponse extends BaseResponse {

    /**
     * {{ table.meaning}}信息
     */
    private {{ table.nameNoPrefix | pascalcase }} {{ table.nameNoPrefix | camelcase }};

    public {{ table.nameNoPrefix | pascalcase }} get{{ table.nameNoPrefix | pascalcase }}() {
        return {{ table.nameNoPrefix | camelcase }};
    }

    public void set{{ table.nameNoPrefix | pascalcase }}({{ table.nameNoPrefix | pascalcase }} {{ table.nameNoPrefix | camelcase }}) {
        this.{{ table.nameNoPrefix | camelcase }} = {{ table.nameNoPrefix | camelcase }};
    }
}
