/*
 * @(#){{ table.nameNoPrefix | pascalcase }}.java
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
package com.{{ setting.companyCode | lower}}.{{ setting.applicationCode | lower}}.domain;

import com.{{ setting.companyCode | lower}}.framework.base.BaseDomain;
import java.util.Date;

/**
 * {{ table.meaning }}实体对象.
 * @author {{ setting.developerName}}
 */
public class {{ table.nameNoPrefix | pascalcase }} extends BaseDomain {
{% for column in table.columns %}
    /**
     * {{ column.meaning }}
     */
    private {{ column.java }} {{ column.name | camelcase }};
{% endfor %}{% for column in table.columns %}
    public {{ column.java }} get{{ column.name | pascalcase }}() {
        return {{ column.name | camelcase }};
    }

    public void set{{ column.name | pascalcase }}({{ column.java }}  {{ column.name | camelcase }}) {
        this.{{ column.name | camelcase }} = {{ column.name | camelcase }};
    }
{% endfor %}
}