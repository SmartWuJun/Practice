/**
 * @(#){{ table.nameNoPrefix | pascalcase }}SO.java
 *
 * Copyright (c) 2014-2014  {{ setting.companyName }} 版权所有
 * {{ setting.companyCode}}. All rights reserved.
 *
 * This software is the confidential and proprietary
 * information of  {{ setting.companyCode}}.
 * ("Confidential Information"). You shall not disclose
 * such Confidential Information and shall use it only
 * in accordance with the terms of the contract agreement
 * you entered into with {{ setting.companyCode}}.
 */
package com.{{ setting.companyCode | lower}}.{{ setting.applicationCode | lower}}.contract;
import java.util.Date;

/**
 * Created by {{ setting.developerName}} on {% now | date_format: "yyyy-MM-dd HH:mm:ss" %}.
 * @author {{ setting.developerName}}
 */
public class {{ table.nameNoPrefix | pascalcase }}SO extends  BaseSO {

{% for column in table.columns %}

{% if column.isQueryable == "true" %}
/**
 * {{ column.meaning  }},{{ column.description  }}
 */
private  {{ column.java }}   {{ column.name | camelcase }};
{% endif %}
{% endfor %}

{% for column in table.columns %}
{% if column.isQueryable == "true" %}
public {{ column.java }} get{{ column.name | pascalcase }}() {
return this.{{ column.name | camelcase }};
}

public void set{{ column.name | pascalcase }}({{ column.java }} {{ column.name | camelcase }}) {
this.{{ column.name | camelcase }} = {{ column.name | camelcase }};
}
{% endif %}
{% endfor %}
}