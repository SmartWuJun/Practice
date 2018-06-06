/*
 * @(#){{ table.nameNoPrefix | pascalcase }}UpdateRequest.java
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
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Date;


/**
 * 修改{{ table.meaning }}的请求.
 * @author {{ setting.developerName}}
 */
public class {{ table.nameNoPrefix | pascalcase }}UpdateRequest extends BaseUpdateRequest {
    {% for column in table.columnsNoTenantId %}
    /**
     * {{ column.meaning  }} {{ column.description  }}
     */
    {% if column.type == "String" %}{% if column.isRequired == "true" %}@NotBlank(message = "{{ column.meaning  }}不能为空"){% endif %}@Length(min={{column.min}}, max={{column.max}}, message = "{{ column.meaning  }}长度不合法"){% else %}{% if column.isRequired == "true" %}@NotNull(message = "{{ column.meaning  }}不能为空"){% endif %}{% endif %}
    private {{ column.java }} {{ column.name | camelcase }};
    {% endfor %}
    {% for column in table.columnsNoTenantId %}
    public {{ column.java }} get{{ column.name | pascalcase }}() {
        return {{ column.name | camelcase }};
    }

    public void set{{ column.name | pascalcase }}({{ column.java }}  {{ column.name | camelcase }}) {
        this.{{ column.name | camelcase }} = {{ column.name | camelcase }};
    }
    {% endfor %}
}
