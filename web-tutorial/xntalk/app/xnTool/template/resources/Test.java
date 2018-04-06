/*
 * @(#){{ table.nameNoPrefix | pascalcase }}Test.java
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

import com.{{ setting.companyCode | lower}}.framework.data.PagedResult;
import com.{{ setting.companyCode | lower}}.framework.security.Passport;
import com.{{ setting.companyCode | lower}}.framework.base.BaseTest;
import com.{{ setting.companyCode | lower}}.{{ setting.applicationCode | lower}}.request.*;
import com.{{ setting.companyCode | lower}}.{{ setting.applicationCode | lower}}.response.*;
import com.{{ setting.companyCode | lower}}.{{ setting.applicationCode | lower}}.domain.*;
import com.{{ setting.companyCode | lower}}.{{ setting.applicationCode | lower}}.service.{{ setting.applicationCode | pascalcase }}Service;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Date;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

/**
 *
 * @author {{ setting.developerName}}
 */

public class {{ table.nameNoPrefix | pascalcase }}Test extends BaseTest {

    @Autowired
    private {{ setting.applicationCode| pascalcase }}Service {{ setting.applicationCode | camelcase }}Service;

    @Autowired
    private Passport passport;

    @Before
    public void setUp() throws Exception {
    }

    @After
    public void tearDown() throws Exception {
    }

    @Test
    public void testCrud{{ table.nameNoPrefix | pascalcase }}() throws Exception {
        Long id;
        {
            //创建
            {{ table.nameNoPrefix | pascalcase }}CreateRequest request = new {{ table.nameNoPrefix | pascalcase }}CreateRequest();
            {% for column in table.columnsNoIdAndTenantId %}
            request.set{{ column.name | pascalcase }}({% if column.type == "String" %}"{{ column.meaning  }}"{% endif %}{% if column.type == "Id" %}12345L{% endif %}{% if column.type == "Integer" %}1234{% endif %}{% if column.type == "Amount" %}1688.68{% endif %}{% if column.type == "Decimal" %}1.68{% endif %}{% if column.type == "Boolean" %}true{% endif %}{% if column.type == "Text" %}"XXXXXXX"{% endif %}{% if column.type == "Data" %}""{% endif %}{% if column.type == "DateTime" %}new Date(){% endif %}{% if column.type == "Date" %}new Date(){% endif %});{% endfor %}

            {{ table.nameNoPrefix | pascalcase }}CreateResponse response ={{ setting.applicationCode| camelcase }}Service.create{{ table.nameNoPrefix | pascalcase }}(request,passport);
     
            System.out.println(String.format(" id=%d", response.getId()));
            assertTrue(response.getId() > 0);
            id = response.getId();
        }

        {
            //更新
            {{ table.nameNoPrefix | pascalcase }}UpdateRequest request = new {{ table.nameNoPrefix | pascalcase }}UpdateRequest();
            request.setId(id);
            request.setRowVersion(0L);//并发版本控制
            {% for column in table.columnsNoIdAndTenantId %}
            request.set{{ column.name | pascalcase }}({% if column.type == "String" %}"{{ column.meaning  }}"{% endif %}{% if column.type == "Id" %}12345L{% endif %}{% if column.type == "Integer" %}1234{% endif %}{% if column.type == "Amount" %}1688.68{% endif %}{% if column.type == "Decimal" %}1.68{% endif %}{% if column.type == "Boolean" %}true{% endif %}{% if column.type == "Text" %}"XXXXXXX"{% endif %}{% if column.type == "Data" %}""{% endif %}{% if column.type == "DateTime" %}new Date(){% endif %}{% if column.type == "Date" %}new Date(){% endif %});{% endfor %}
    
            {{ setting.applicationCode | camelcase }}Service.update{{ table.nameNoPrefix | pascalcase }}(request,passport);
        }

        {
            //获取
            {{ table.nameNoPrefix | pascalcase }}GetRequest request = new {{ table.nameNoPrefix | pascalcase }}GetRequest();
            request.setId(id);

            {{ table.nameNoPrefix | pascalcase }}GetResponse  response = {{ setting.applicationCode | camelcase }}Service.get{{ table.nameNoPrefix | pascalcase }}(request,passport);
            assertEquals(id,  response.get{{ table.nameNoPrefix | pascalcase }}().getId());
        }

        {
            //删除
            {{ table.nameNoPrefix | pascalcase }}DeleteRequest request=new {{ table.nameNoPrefix | pascalcase }}DeleteRequest();
            request.setId(id);
            {{ table.nameNoPrefix | pascalcase }}DeleteResponse response = {{ setting.applicationCode | camelcase }}Service.delete{{ table.nameNoPrefix | pascalcase }}(request,passport);
            assertEquals(new Long(1), response.getResult());
        }

    }

    @Test
    public void testGet{{ table.nameNoPrefix | pascalcase }}All(){
        {{ table.nameNoPrefix | pascalcase }}GetAllListRequest request=new {{ table.nameNoPrefix | pascalcase }}GetAllListRequest();
        {{ table.nameNoPrefix | pascalcase }}GetAllListResponse response={{ setting.applicationCode | camelcase }}Service.get{{ table.nameNoPrefix | pascalcase }}AllList(request, this.passport);
        assertEquals(0, response.getTotalCount());
    }

    @Test
    public void testSearch{{ table.nameNoPrefix | pascalcase }}(){
        {{ table.nameNoPrefix | pascalcase }}SearchRequest request=new {{ table.nameNoPrefix | pascalcase }}SearchRequest();
        {{ table.nameNoPrefix | pascalcase }}SearchResponse response={{ setting.applicationCode | camelcase }}Service.search{{ table.nameNoPrefix | pascalcase }}(request, this.passport);
        request.setPageSize(10);
        request.setPageNumber(1);
        request.setKeyword("");
        assertEquals(0, response.getTotalCount());
    }

    @Test
    public void testFind{{ table.nameNoPrefix | pascalcase }}(){
        {{ table.nameNoPrefix | pascalcase }}FindRequest request=new {{ table.nameNoPrefix | pascalcase }}FindRequest();
        {{ table.nameNoPrefix | pascalcase }}FindResponse response={{ setting.applicationCode | camelcase }}Service.find{{ table.nameNoPrefix | pascalcase }}(request, this.passport);
        request.setPageSize(10);
        request.setPageNumber(1);
        {% for column in table.columns %}{% if column.isQueryable == "true" %}
        request.set{{ column.name | pascalcase }}({% if column.type == "String" %}"{{ column.meaning  }}"{% endif %}{% if column.type == "Id" %}12345L{% endif %}{% if column.type == "Integer" %}1234{% endif %}{% if column.type == "Amount" %}1688.68{% endif %}{% if column.type == "Decimal" %}1.68{% endif %}{% if column.type == "Boolean" %}true{% endif %}{% if column.type == "Text" %}"XXXXXXX"{% endif %}{% if column.type == "Data" %}""{% endif %}{% if column.type == "DateTime" %}new Date(){% endif %}{% if column.type == "Date" %}new Date(){% endif %});{% endif %}{% endfor %}
        assertEquals(0, response.getTotalCount());
    }
}
