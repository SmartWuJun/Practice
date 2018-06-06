/*
 * @(#){{ table.nameNoPrefix | pascalcase }}Mapper.java
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
package com.{{ setting.companyCode | lower}}.{{ setting.applicationCode | lower}}.dal;

import com.{{ setting.companyCode | lower}}.framework.annotation.MyBatisRepository;
import com.{{ setting.companyCode | lower}}.framework.security.Passport;
import org.apache.ibatis.annotations.Param;
import com.{{ setting.companyCode | lower}}.{{ setting.applicationCode | lower}}.po.{{ table.nameNoPrefix | pascalcase }}PO;
import com.xiniunet.{{ setting.applicationCode | lower}}.request.*;
import java.util.List;

/**
 * {{ table.meaning }}的数据库操作接口.
 * @author {{ setting.developerName}}
 */
@MyBatisRepository("{{ setting.applicationCode | pascalcase}}{{ table.nameNoPrefix | pascalcase }}Mapper")
public interface {{ table.nameNoPrefix | pascalcase }}Mapper extends {{ table.nameNoPrefix | pascalcase }}MapperAuto {

    /**
     * 更新实体对象
     *
     * @param request 请求对象
     * @return 受影响的记录条数
     */
    long update(@Param("request"){{ table.nameNoPrefix | pascalcase }}PO request , @Param("passport")Passport passport);

    /**
     * 获取所有对象列表
     *
     * @param passport 用户护照
     * @return 实体对象集合
     */
    List<{{ table.nameNoPrefix | pascalcase }}PO> getAllList(@Param("request"){{ table.nameNoPrefix | pascalcase }}GetAllListRequest request,@Param("passport")Passport passport);

    /**
     * 模糊搜索对象列表
     *
     * @param request 请求对象
     * @param passport 用户护照
     * @return 实体对象列表集合
     */
    List<{{ table.nameNoPrefix | pascalcase }}PO> search(@Param("request"){{ table.nameNoPrefix | pascalcase }}SearchRequest request, @Param("passport")Passport passport);

    /**
     * 模糊搜索对象列表总数
     *
     * @param request 请求对象
     * @param passport 用户护照
     * @return 实体对象列表集合总数
     */
    long searchCount(@Param("request"){{ table.nameNoPrefix | pascalcase }}SearchRequest request,@Param("passport")Passport passport);

    /**
     * 高级查询对象列表
     *
     * @param request 请求对象
     * @param passport 用户护照
     * @return 实体对象列表集合
     */
    List<{{ table.nameNoPrefix | pascalcase }}PO> find(@Param("request"){{ table.nameNoPrefix | pascalcase }}FindRequest request, @Param("passport")Passport passport);

    /**
     * 高级查询对象列表总数
     *
     * @param request 请求对象
     * @param passport 用户护照
     * @return 实体对象列表集合总数
     */
    long findCount(@Param("request"){{ table.nameNoPrefix | pascalcase }}FindRequest request,@Param("passport")Passport passport);

    {% if table.hasIsActive == "true" %}
    /**
     * 按主键ID作废记录
     *
     * @param id 主键
     * @return 受影响的记录条数
     */
    long inactive(@Param("id")Long id , @Param("passport")Passport passport);

    /**
     * 按主键ID激活记录
     *
     * @param id 主键
     * @return 受影响的记录条数
     */
    long active(@Param("id")Long id , @Param("passport")Passport passport);
    {% endif %}
}
