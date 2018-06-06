/*
 * @(#){{ table.nameNoPrefix | pascalcase }}SearchRequest.java
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

import com.{{ setting.companyCode | lower}}.framework.base.BaseSearchRequest;
import java.util.List;

/**
 * 模糊查询{{ table.meaning }}的请求.
 * @author {{ setting.developerName}}
 */
public class {{ table.nameNoPrefix | pascalcase }}SearchRequest extends BaseSearchRequest {

}
