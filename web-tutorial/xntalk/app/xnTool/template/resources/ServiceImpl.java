/*
 * @(#){{ table.nameNoPrefix | pascalcase }}ServiceImpl.java
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
package com.{{ setting.companyCode | lower}}.{{ setting.applicationCode | lower}}.svc;

import com.{{ setting.companyCode | lower}}.framework.security.Passport;
import com.{{ setting.companyCode | lower}}.framework.util.ValidationUtil;
import com.{{ setting.companyCode | lower}}.{{ setting.applicationCode | lower}}.biz.*;
import com.{{ setting.companyCode | lower}}.{{ setting.applicationCode | lower}}.request.*;
import com.{{ setting.companyCode | lower}}.{{ setting.applicationCode | lower}}.response.*;
import com.{{ setting.companyCode | lower}}.{{ setting.applicationCode | lower}}.service.{{ table.nameNoPrefix | pascalcase }}Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

/**
 * {{ table.meaning }}的契约接口的实现.
 * @author {{ setting.developerName}}
 */
@Service
public class {{ table.nameNoPrefix | pascalcase }}ServiceImpl implements {{ table.nameNoPrefix | pascalcase }}Service {

    @Autowired
    @Qualifier("{{ setting.applicationCode | pascalcase}}{{ table.nameNoPrefix | pascalcase }}Manager")
    private {{ table.nameNoPrefix | pascalcase }}Manager {{ table.nameNoPrefix | camelcase }}Manager;

    /**
     * 根据Id获取{{ table.meaning}}
     *
     * @param request 获取{{ table.meaning}}请求
     * @param passport 用户护照
     * @return 获取{{ table.meaning}}应答
     */
    @Override
    public {{ table.nameNoPrefix | pascalcase }}GetResponse get{{ table.nameNoPrefix | pascalcase }}({{ table.nameNoPrefix | pascalcase }}GetRequest request, Passport passport) {
        {{ table.nameNoPrefix | pascalcase }}GetResponse response = new {{ table.nameNoPrefix | pascalcase }}GetResponse();
        ValidationUtil.validate(request,response);
        if(response.hasError()) {
            return response;
        }
        response = {{ table.nameNoPrefix | camelcase }}Manager.get(request,passport);
        return response;
    }

    /**
     * 模糊查询{{ table.meaning}}
     *
     * @param request 模糊查询{{ table.meaning}}请求
     * @param passport 用户护照
     * @return 模糊查询{{ table.meaning}}应答
     */
    @Override
    public {{ table.nameNoPrefix | pascalcase }}SearchResponse search{{ table.nameNoPrefix | pascalcase }}({{ table.nameNoPrefix | pascalcase }}SearchRequest request, Passport passport) {
        {{ table.nameNoPrefix | pascalcase }}SearchResponse response = new {{ table.nameNoPrefix | pascalcase }}SearchResponse();
        ValidationUtil.validate(request,response);
        if(response.hasError()) {
            return response;
        }
        response = {{ table.nameNoPrefix | camelcase }}Manager.search(request,passport);
        return response;
    }

    /**
     * 高级查询{{ table.meaning}}
     *
     * @param request 高级查询{{ table.meaning}}请求
     * @param passport 用户护照
     * @return 高级查询{{ table.meaning}}应答
     */
    @Override
    public {{ table.nameNoPrefix | pascalcase }}FindResponse find{{ table.nameNoPrefix | pascalcase }}({{ table.nameNoPrefix | pascalcase }}FindRequest request, Passport passport) {
        {{ table.nameNoPrefix | pascalcase }}FindResponse response = new {{ table.nameNoPrefix | pascalcase }}FindResponse();
        ValidationUtil.validate(request,response);
        if(response.hasError()) {
            return response;
        }
        response = {{ table.nameNoPrefix | camelcase }}Manager.find(request,passport);
        return response;
    }

    /**
     * 获取所有{{ table.meaning}}列表
     *
     * @param request 获取所有{{ table.meaning}}列表请求
     * @param passport 用户护照
     * @return 获取所有{{ table.meaning}}列表应答
     */
    @Override
    public {{ table.nameNoPrefix | pascalcase }}GetAllListResponse get{{ table.nameNoPrefix | pascalcase }}AllList({{ table.nameNoPrefix | pascalcase }}GetAllListRequest request, Passport passport) {
        {{ table.nameNoPrefix | pascalcase }}GetAllListResponse response = new {{ table.nameNoPrefix | pascalcase }}GetAllListResponse();
        ValidationUtil.validate(request,response);
        if(response.hasError()) {
            return response;
        }
        response = {{ table.nameNoPrefix | camelcase }}Manager.getAllList(request,passport);
        return response;
    }

    /**
     * 创建{{ table.meaning}}
     *
     * @param request 创建{{ table.meaning}}请求
     * @param passport 用户护照
     * @return 创建{{ table.meaning}}应答
     */
    @Override
    public {{ table.nameNoPrefix | pascalcase }}CreateResponse create{{ table.nameNoPrefix | pascalcase }}({{ table.nameNoPrefix | pascalcase }}CreateRequest request, Passport passport) {
        {{ table.nameNoPrefix | pascalcase }}CreateResponse response = new {{ table.nameNoPrefix | pascalcase }}CreateResponse();
        ValidationUtil.validate(request,response);
        if(response.hasError()) {
            return response;
        }
        response = {{ table.nameNoPrefix | camelcase }}Manager.create(request,passport);
        return response;
    }

    /**
     * 更新{{ table.meaning}}
     *
     * @param request 更新{{ table.meaning}}请求
     * @param passport 用户护照
     * @return 更新{{ table.meaning}}应答
     */
    @Override
    public {{ table.nameNoPrefix | pascalcase }}UpdateResponse update{{ table.nameNoPrefix | pascalcase }}({{ table.nameNoPrefix | pascalcase }}UpdateRequest request, Passport passport) {
        {{ table.nameNoPrefix | pascalcase }}UpdateResponse response = new {{ table.nameNoPrefix | pascalcase }}UpdateResponse();
        ValidationUtil.validate(request,response);
        if(response.hasError()) {
            return response;
        }
        response = {{ table.nameNoPrefix | camelcase }}Manager.update(request,passport);
        return response;
    }

    /**
     * 删除{{ table.meaning}}
     *
     * @param request 删除{{ table.meaning}}请求
     * @param passport 用户护照
     * @return 删除{{ table.meaning}}应答
     */
    @Override
    public {{ table.nameNoPrefix | pascalcase }}DeleteResponse delete{{ table.nameNoPrefix | pascalcase }}({{ table.nameNoPrefix | pascalcase }}DeleteRequest request, Passport passport) {
        {{ table.nameNoPrefix | pascalcase }}DeleteResponse response = new {{ table.nameNoPrefix | pascalcase }}DeleteResponse();
        ValidationUtil.validate(request,response);
        if(response.hasError()) {
            return response;
        }
        response = {{ table.nameNoPrefix | camelcase }}Manager.delete(request,passport);
        return response;
    }

    {% if table.hasIsActive == "true" %}/**
     * 作废{{ table.meaning}}
     *
     * @param request 作废{{ table.meaning}}请求
     * @param passport 用户护照
     * @return 作废{{ table.meaning}}应答
     */
    @Override
    public {{ table.nameNoPrefix | pascalcase }}InactiveResponse inactive{{ table.nameNoPrefix | pascalcase }}({{ table.nameNoPrefix | pascalcase }}InactiveRequest request, Passport passport) {
        {{ table.nameNoPrefix | pascalcase }}InactiveResponse response = new {{ table.nameNoPrefix | pascalcase }}InactiveResponse();
        ValidationUtil.validate(request,response);
        if(response.hasError()) {
            return response;
        }
        response = {{ table.nameNoPrefix | camelcase }}Manager.inactive(request,passport);
        return response;
    }

    /**
     * 激活{{ table.meaning}}
     *
     * @param request 激活{{ table.meaning}}请求
     * @param passport 用户护照
     * @return 激活{{ table.meaning}}应答
     */
    @Override
    public {{ table.nameNoPrefix | pascalcase }}ActiveResponse active{{ table.nameNoPrefix | pascalcase }}({{ table.nameNoPrefix | pascalcase }}ActiveRequest request, Passport passport) {
        {{ table.nameNoPrefix | pascalcase }}ActiveResponse response = new {{ table.nameNoPrefix | pascalcase }}ActiveResponse();
        ValidationUtil.validate(request,response);
        if(response.hasError()) {
            return response;
        }
        response = {{ table.nameNoPrefix | camelcase }}Manager.active(request,passport);
        return response;
    }{% endif %}
}