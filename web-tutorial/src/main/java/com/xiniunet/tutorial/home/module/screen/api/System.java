package com.xiniunet.tutorial.home.module.screen.api;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.xiniunet.framework.annotation.ApiName;
import com.xiniunet.framework.api.BaseApi;
import com.xiniunet.framework.security.Passport;
import com.xiniunet.master.request.system.UserFindRequest;
import com.xiniunet.master.response.system.UserFindResponse;
import com.xiniunet.master.service.MasterService;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * Created on 2017-04-11.
 *
 * @author 吕浩
 * @since 1.0.0
 */
public class System extends BaseApi {
    @Autowired
    private MasterService masterService;

    @ApiName("api.system.users.search.sourcetype")
    public UserFindResponse apiSystemUsersSearchBySourceType(JSONObject jsonObject, Passport passport) {
        UserFindRequest searchRequest = JSON.toJavaObject(jsonObject, UserFindRequest.class);
        searchRequest.setIsActive(true);
        return masterService.findUser(searchRequest, passport);
    }
}
