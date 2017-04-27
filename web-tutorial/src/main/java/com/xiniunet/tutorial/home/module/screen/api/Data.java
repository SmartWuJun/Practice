package com.xiniunet.tutorial.home.module.screen.api;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.xiniunet.data.domain.Clazz;
import com.xiniunet.data.domain.LanguageEnum;
import com.xiniunet.data.request.ClassAttributeFindRequest;
import com.xiniunet.data.request.ClazzFindRequest;
import com.xiniunet.data.response.ClassAttributeFindResponse;
import com.xiniunet.data.response.ClazzFindResponse;
import com.xiniunet.data.service.DataApi;
import com.xiniunet.tutorial.home.data.domain.ClazzEx;
import com.xiniunet.tutorial.home.data.response.ClazzFindExResponse;
import com.xiniunet.framework.annotation.ApiName;
import com.xiniunet.framework.base.BaseResponse;
import com.xiniunet.framework.security.Passport;
import com.xiniunet.framework.util.TypeTransferUtil;

import java.util.ArrayList;
import java.util.List;

/**
 * Created on 2017-03-18.
 *
 * @author 小昊
 */
public class Data extends DataApi {

    @ApiName("api.foundation.clazz.find")
    public BaseResponse findClazz(JSONObject jsonObject, Passport passport) {
        ClazzFindRequest request = JSON.toJavaObject(jsonObject, ClazzFindRequest.class);
        request.setLanguage(LanguageEnum.ZH_CN);
        ClazzFindResponse clazzResponse = dataService.findClazz(request, passport);
        ClazzFindExResponse response = new ClazzFindExResponse();
        List<ClazzEx> result = new ArrayList();
        for (Clazz clazz : clazzResponse.getResult()) {
            ClazzEx transfer = new TypeTransferUtil<ClazzEx>().transfer(clazz, ClazzEx.class);
            ClassAttributeFindRequest classAttributeFindRequest = new ClassAttributeFindRequest();
            classAttributeFindRequest.setClassId(clazz.getId());
            ClassAttributeFindResponse classAttribute = dataService.findClassAttribute(classAttributeFindRequest, passport);
            transfer.setClassAttribute(classAttribute.getResult());
            result.add(transfer);
        }
        response.setTotalCount(clazzResponse.getTotalCount());
        response.setResult(result);
        return response;
    }
}
