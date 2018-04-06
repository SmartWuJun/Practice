/*
 * @(#){{ table.nameNoPrefix | pascalcase }}Manager.java
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
package com.{{ setting.companyCode | lower}}.{{ setting.applicationCode | lower}}.biz;

import com.{{ setting.companyCode | lower}}.framework.security.Passport;
import com.{{ setting.companyCode | lower}}.{{ setting.applicationCode | lower}}.request.*;
import com.{{ setting.companyCode | lower}}.{{ setting.applicationCode | lower}}.response.*;

/**
 * {{ table.meaning }}的管理方法.
 * @author {{ setting.developerName}}
 */
public interface {{ table.nameNoPrefix | pascalcase }}Manager {
    /**
     * 根据Id获取{{ table.meaning}}
     *
     * @param request 获取{{ table.meaning}}请求
     * @param passport 用户护照
     * @return 获取{{ table.meaning}}应答
     */
    {{ table.nameNoPrefix | pascalcase }}GetResponse get({{ table.nameNoPrefix | pascalcase }}GetRequest request, Passport passport);

    /**
     * 模糊查询{{ table.meaning}}
     *
     * @param request 模糊查询{{ table.meaning}}请求
     * @param passport 用户护照
     * @return 模糊查询{{ table.meaning}}应答
     */
    {{ table.nameNoPrefix | pascalcase }}SearchResponse search({{ table.nameNoPrefix | pascalcase }}SearchRequest request, Passport passport);

    /**
     * 高级查询{{ table.meaning}}
     *
     * @param request 高级查询{{ table.meaning}}请求
     * @param passport 用户护照
     * @return 高级查询{{ table.meaning}}应答
     */
    {{ table.nameNoPrefix | pascalcase }}FindResponse find({{ table.nameNoPrefix | pascalcase }}FindRequest request, Passport passport);

    /**
     * 获取所有{{ table.meaning}}列表
     *
     * @param request 获取所有{{ table.meaning}}列表请求
     * @param passport 用户护照
     * @return 获取所有{{ table.meaning}}列表应答
     */
    {{ table.nameNoPrefix | pascalcase }}GetAllListResponse getAllList({{ table.nameNoPrefix | pascalcase }}GetAllListRequest request, Passport passport);

    /**
     * 创建{{ table.meaning}}
     *
     * @param request 创建{{ table.meaning}}请求
     * @param passport 用户护照
     * @return 创建{{ table.meaning}}应答
     */
    {{ table.nameNoPrefix | pascalcase }}CreateResponse create({{ table.nameNoPrefix | pascalcase }}CreateRequest request, Passport passport);

    /**
     * 更新{{ table.meaning}}
     *
     * @param request 更新{{ table.meaning}}请求
     * @param passport 用户护照
     * @return 更新{{ table.meaning}}应答
     */
    {{ table.nameNoPrefix | pascalcase }}UpdateResponse update({{ table.nameNoPrefix | pascalcase }}UpdateRequest request, Passport passport);

    /**
     * 删除{{ table.meaning}}
     *
     * @param request 删除{{ table.meaning}}请求
     * @param passport 用户护照
     * @return 删除{{ table.meaning}}应答
     */
    {{ table.nameNoPrefix | pascalcase }}DeleteResponse delete({{ table.nameNoPrefix | pascalcase }}DeleteRequest request, Passport passport);

    {% if table.hasIsActive == "true" %}
    /**
     * 作废{{ table.meaning}}
     *
     * @param request 作废{{ table.meaning}}请求
     * @param passport 用户护照
     * @return 作废{{ table.meaning}}应答
     */
    {{ table.nameNoPrefix | pascalcase }}InactiveResponse inactive({{ table.nameNoPrefix | pascalcase }}InactiveRequest request, Passport passport);

    /**
     * 激活{{ table.meaning}}
     *
     * @param request 激活{{ table.meaning}}请求
     * @param passport 用户护照
     * @return 激活{{ table.meaning}}应答
     */
    {{ table.nameNoPrefix | pascalcase }}ActiveResponse active({{ table.nameNoPrefix | pascalcase }}ActiveRequest request, Passport passport);{% endif %}
}
