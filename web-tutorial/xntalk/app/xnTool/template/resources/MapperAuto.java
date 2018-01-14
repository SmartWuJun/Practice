/*
 * @(#){{ table.nameNoPrefix | pascalcase }}MapperAuto.java
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

import com.{{ setting.companyCode | lower}}.framework.security.Passport;
import org.apache.ibatis.annotations.Param;
import com.{{ setting.companyCode | lower}}.{{ setting.applicationCode | lower}}.po.{{ table.nameNoPrefix | pascalcase }}PO;

import java.util.List;

/**
 * {{ table.meaning }}的数据库操作接口.
 * @author {{ setting.developerName}}
 */
public interface {{ table.nameNoPrefix | pascalcase }}MapperAuto {
    /**
     * 插入记录.
     *
     * @param {{ table.nameNoPrefix | camelcase }}  实体对象
     * @return 实体对象的ID
     */
    long insert(@Param("{{ table.nameNoPrefix | camelcase }}"){{ table.nameNoPrefix | pascalcase }}PO {{ table.nameNoPrefix | camelcase }} , @Param("passport")Passport passport);

    /**
     * 批量插入记录.
     *
     * @param list  实体对象集合
     * @return 受影响的记录条数
     */
    long insertBatch(@Param("list")List<{{ table.nameNoPrefix | pascalcase }}PO> list , @Param("passport")Passport passport);

    /**
     * 按主键ID删除记录
     *
     * @param id 主键
     * @return 受影响的记录条数
     */
    long delete(@Param("id")Long id , @Param("passport")Passport passport);

    /**
     * 按主键ID批量删除记录
     *
     * @param list ID集合
     */
    long deleteBatch(@Param("list")List<Long> list , @Param("passport")Passport passport);

    /**
     * 按主键ID获取实体对象
     *
     * @param id 主键
     * @return 实体对象
     */
    {{ table.nameNoPrefix | pascalcase }}PO getById(@Param("id")Long id,@Param("passport")Passport passport);

    /**
     * 按主键ID集合获取实体对象集合
     *
     * @param ids 主键ID集合
     * @return 实体对象集合
     */
    List<{{ table.nameNoPrefix | pascalcase }}PO> getListByIds(@Param("list")List<Long> ids, @Param("passport")Passport passport);

    /**
     * 按ID判断是否存在
     *
     * @param id 主键
     * @return 是否存在
     */
    long existById(@Param("id")Long id, @Param("passport")Passport passport);
}
