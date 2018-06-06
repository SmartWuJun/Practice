/*
 * @(#){{ table.nameNoPrefix | pascalcase }}ManagerImpl.java
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

import com.{{ setting.companyCode | lower}}.framework.base.BaseManagerImpl;
import com.{{ setting.companyCode | lower}}.framework.base.BaseResponse;
import com.{{ setting.companyCode | lower}}.framework.security.Passport;
import com.{{ setting.companyCode | lower}}.{{ setting.applicationCode | lower}}.request.*;
import com.{{ setting.companyCode | lower}}.{{ setting.applicationCode | lower}}.response.*;
import com.{{ setting.companyCode | lower}}.{{ setting.applicationCode | lower}}.domain.*;
import com.{{ setting.companyCode | lower}}.{{ setting.applicationCode | lower}}.Message;
import com.{{ setting.companyCode | lower}}.{{ setting.applicationCode | lower}}.dal.{{ table.nameNoPrefix | pascalcase }}Mapper;
import com.{{ setting.companyCode | lower}}.{{ setting.applicationCode | lower}}.po.{{ table.nameNoPrefix | pascalcase }}PO;
import com.{{ setting.companyCode | lower}}.foundation.service.FoundationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import com.xiniunet.framework.exception.ErrorType;


import java.util.ArrayList;
import java.util.List;

/**
 * {{ table.meaning }}的管理方法实现.
 * @author {{ setting.developerName}}
 */
@Transactional
@Service("{{ setting.applicationCode | pascalcase}}{{ table.nameNoPrefix | pascalcase }}Manager")
public class {{ table.nameNoPrefix | pascalcase }}ManagerImpl extends BaseManagerImpl implements {{ table.nameNoPrefix | pascalcase }}Manager {

    @Autowired
    private FoundationService foundationService;

    @Autowired
    private {{ table.nameNoPrefix | pascalcase }}Mapper {{ table.nameNoPrefix | camelcase }}Mapper;

    /**
     * 根据Id获取{{ table.meaning}}
     *
     * @param request 获取{{ table.meaning}}请求
     * @param passport 用户护照
     * @return 获取{{ table.meaning}}应答
     */
    @Override
    @Transactional(propagation = Propagation.NOT_SUPPORTED, readOnly = true)
    public {{ table.nameNoPrefix | pascalcase }}GetResponse get({{ table.nameNoPrefix | pascalcase }}GetRequest request, Passport passport) {
        {{ table.nameNoPrefix | pascalcase }}GetResponse response = new {{ table.nameNoPrefix | pascalcase }}GetResponse();
        {{ table.nameNoPrefix | pascalcase }}PO entity = {{ table.nameNoPrefix | camelcase }}Mapper.getById(request.getId(), passport);
        if (entity != null) {
            {{ table.nameNoPrefix | pascalcase }} {{ table.nameNoPrefix | camelcase }} = this.getMapper().map(entity, {{ table.nameNoPrefix | pascalcase }}.class);
            response.set{{ table.nameNoPrefix | pascalcase }}({{ table.nameNoPrefix | camelcase }} );
        } else {
            response.addError(ErrorType.EXPECTATION_NULL, Message.COMMON_GET_FAILURE);
        }
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
    @Transactional(propagation = Propagation.NOT_SUPPORTED, readOnly = true)
    public {{ table.nameNoPrefix | pascalcase }}SearchResponse search({{ table.nameNoPrefix | pascalcase }}SearchRequest request, Passport passport) {
        {{ table.nameNoPrefix | pascalcase }}SearchResponse response = new {{ table.nameNoPrefix | pascalcase }}SearchResponse();
        List<{{ table.nameNoPrefix | pascalcase }}> modelList = new ArrayList<>();
        Long count = {{ table.nameNoPrefix | camelcase }}Mapper.searchCount(request, passport);
    
        if (count > 0) {
            // 处理分页参数
            if (request.getPageSize() > 0) {
                //如果输入的页码大于实际的分页数，将页码设置为最后一页的页码
                int lastPageNumber = (int) ((count - 1) / request.getPageSize() + 1);
                if (request.getPageNumber() > lastPageNumber) {
                    request.setPageNumber(lastPageNumber);
                }
            }
    
            //通过关键字查询出用户集合
            List<{{ table.nameNoPrefix | pascalcase }}PO> entityList = {{ table.nameNoPrefix | camelcase }}Mapper.search(request, passport);
    
            for ({{ table.nameNoPrefix | pascalcase }}PO entity : entityList) {
                {{ table.nameNoPrefix | pascalcase }} {{ table.nameNoPrefix | camelcase }} = this.getMapper().map(entity, {{ table.nameNoPrefix | pascalcase }}.class);
                modelList.add({{ table.nameNoPrefix | camelcase }});
            }
        }
    
        response.setTotalCount(count);
        response.setResult(modelList);
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
    @Transactional(propagation = Propagation.NOT_SUPPORTED, readOnly = true)
    public {{ table.nameNoPrefix | pascalcase }}FindResponse find({{ table.nameNoPrefix | pascalcase }}FindRequest request, Passport passport) {
        {{ table.nameNoPrefix | pascalcase }}FindResponse response = new {{ table.nameNoPrefix | pascalcase }}FindResponse();
        List<{{ table.nameNoPrefix | pascalcase }}> modelList = new ArrayList<>();
        Long count = {{ table.nameNoPrefix | camelcase }}Mapper.findCount(request, passport);
        if (count >0) {
            // 处理分页参数
            if (request.getPageSize() > 0) {
                //如果输入的页码大于实际的分页数，将页码设置为最后一页的页码
                int lastPageNumber = (int) ((count - 1) / request.getPageSize() + 1);
                if (request.getPageNumber() > lastPageNumber) {
                    request.setPageNumber(lastPageNumber);
                }
            }
    
            List<{{ table.nameNoPrefix | pascalcase }}PO> entityList = {{ table.nameNoPrefix | camelcase }}Mapper.find(request, passport);
            for ({{ table.nameNoPrefix | pascalcase }}PO entity : entityList) {
                {{ table.nameNoPrefix | pascalcase }} {{ table.nameNoPrefix | camelcase }} = this.getMapper().map(entity, {{ table.nameNoPrefix | pascalcase }}.class);
                modelList.add({{ table.nameNoPrefix | camelcase }});
            }
        }
    
        response.setTotalCount(count);
        response.setResult(modelList);
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
    @Transactional(propagation = Propagation.NOT_SUPPORTED, readOnly = true)
    public {{ table.nameNoPrefix | pascalcase }}GetAllListResponse getAllList({{ table.nameNoPrefix | pascalcase }}GetAllListRequest request, Passport passport) {
        {{ table.nameNoPrefix | pascalcase }}GetAllListResponse response = new {{ table.nameNoPrefix | pascalcase }}GetAllListResponse();
    
        List<{{ table.nameNoPrefix | pascalcase }}PO> entityList = {{ table.nameNoPrefix | camelcase }}Mapper.getAllList(request, passport);
    
        List<{{ table.nameNoPrefix | pascalcase }}> modelList = new ArrayList<>();
        for ({{ table.nameNoPrefix | pascalcase }}PO entity : entityList) {
        {{ table.nameNoPrefix | pascalcase }} {{ table.nameNoPrefix | camelcase }} = this.getMapper().map(entity, {{ table.nameNoPrefix | pascalcase }}.class);
        modelList.add({{ table.nameNoPrefix | camelcase }});
        }
    
        response.setResult(modelList);
    
        response.setTotalCount(modelList.size());
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
    public {{ table.nameNoPrefix | pascalcase }}CreateResponse create({{ table.nameNoPrefix | pascalcase }}CreateRequest request, Passport passport) {
        {{ table.nameNoPrefix | pascalcase }}CreateResponse response = new {{ table.nameNoPrefix | pascalcase }}CreateResponse();

        {{ table.nameNoPrefix | pascalcase }}PO entity = this.getMapper().map(request, {{ table.nameNoPrefix | pascalcase }}PO.class);
        if(entity.getId() == null) {
            long id = foundationService.getNewId();
            entity.setId(id);
        }

        // 先检查关键数据是否有重复，在检查通过后才能做插入操作
        checkValidate(entity,passport,response);
        if(response.hasError()) {
            return response;
        }

        if ({{ table.nameNoPrefix | camelcase }}Mapper.insert(entity, passport) == 0) {
            response.addError(ErrorType.EXPECTATION_NULL, Message.COMMON_CREATE_FAILURE);
            return response;
        }

        response.setId(entity.getId());
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
public {{ table.nameNoPrefix | pascalcase }}UpdateResponse update({{ table.nameNoPrefix | pascalcase }}UpdateRequest request, Passport passport) {
        {{ table.nameNoPrefix | pascalcase }}UpdateResponse response = new {{ table.nameNoPrefix | pascalcase }}UpdateResponse();

        {{ table.nameNoPrefix | pascalcase }}PO entity = this.getMapper().map(request, {{ table.nameNoPrefix | pascalcase }}PO.class);
        // 先检查关键数据是否有重复，在检查通过后才能做插入操作
        checkValidate(entity,passport,response);
        if(response.hasError()) {
            return response;
        }

        Long result={{ table.nameNoPrefix | camelcase }}Mapper.update(entity, passport);
        if (result != 1) {
            response.addError(ErrorType.BUSINESS_ERROR, Message.COMMON_UPDATE_FAILURE);
            return response;
        }
        response.setResult(result);
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
    public {{ table.nameNoPrefix | pascalcase }}DeleteResponse delete({{ table.nameNoPrefix | pascalcase }}DeleteRequest request, Passport passport) {
        {{ table.nameNoPrefix | pascalcase }}DeleteResponse response = new {{ table.nameNoPrefix | pascalcase }}DeleteResponse();
         Long result= {{ table.nameNoPrefix | camelcase }}Mapper.delete(request.getId(), passport);
         response.setResult(result);
        return response;
    }
    
    {% if table.hasIsActive == "true" %}
    /**
     * 作废{{ table.meaning}}
     *
     * @param request 作废{{ table.meaning}}请求
     * @param passport 用户护照
     * @return 作废{{ table.meaning}}应答
     */
    @Override
    public {{ table.nameNoPrefix | pascalcase }}InactiveResponse inactive({{ table.nameNoPrefix | pascalcase }}InactiveRequest request, Passport passport) {
        {{ table.nameNoPrefix | pascalcase }}InactiveResponse response = new {{ table.nameNoPrefix | pascalcase }}InactiveResponse();
        Long result= {{ table.nameNoPrefix | camelcase }}Mapper.inactive(request.getId(), passport);
        response.setResult(result);
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
    public {{ table.nameNoPrefix | pascalcase }}ActiveResponse active({{ table.nameNoPrefix | pascalcase }}ActiveRequest request, Passport passport) {
        {{ table.nameNoPrefix | pascalcase }}ActiveResponse response = new {{ table.nameNoPrefix | pascalcase }}ActiveResponse();
        Long result= {{ table.nameNoPrefix | camelcase }}Mapper.active(request.getId(), passport);
        response.setResult(result);
        return response;
    }
    
    {% endif %}

    /**
     * 验证对象
     * @param {{ table.nameNoPrefix | camelcase }} {{ table.meaning }}
     * @param passport 用户护照
     */
    private void checkValidate({{ table.nameNoPrefix | pascalcase }}PO {{ table.nameNoPrefix | camelcase }}, Passport passport, BaseResponse response) {
        // TODO
    }
}