package com.xiniunet.tutorial.tool;

import com.xiniunet.foundation.domain.ProfileAccessLevelEnum;
import com.xiniunet.foundation.request.ProfileOptionValueGetRequest;
import com.xiniunet.foundation.response.ProfileOptionValueGetResponse;
import com.xiniunet.foundation.service.FoundationService;
import com.xiniunet.framework.util.PropertiesPool;
import com.xiniunet.framework.util.SpringContext;
import com.xiniunet.framework.util.auth.ExtUser;
import com.xiniunet.framework.util.auth.LocalData;
import com.xiniunet.master.domain.system.User;
import com.xiniunet.master.request.system.UserGetRequest;
import com.xiniunet.master.response.system.UserGetResponse;
import com.xiniunet.master.service.MasterService;

import java.io.Serializable;
import java.util.List;


/**
 *
 * Created on 2014/09/15.
 * @author 沈振家
 * @version 0.1.0
 */
public class UserToolObject implements Serializable {
    private static final long serialVersionUID = -7507510429755782597L;

    /**
     * 从Spring中取得可以获得用户对象的工具类
     */
    private static final MasterService masterService =
            (MasterService) SpringContext.getApplicationContext().getBean(MasterService.class);
    private static final FoundationService foundationService =
            (FoundationService) SpringContext.getApplicationContext().getBean(FoundationService.class);

    //---------------------系统管理相关工具----------------
    /**
     * 通过用户ID获取用户名
     * @param userId
     * @return
     */
    public static String getUserName(Long userId) {
        UserGetRequest request = new UserGetRequest();
        request.setId(userId);
        UserGetResponse response = masterService.getUser(request, LocalData.getCurrentPassport());
        if (response.hasError()) {
            return "";
        }
        return response.getUser().getName();
    }

    /**
     * 通过用户ID获取用户信息
     * @param userId
     * @return
     */
    public static User getUser(Long userId) {
        UserGetResponse response = masterService.getUser(new UserGetRequest(userId), LocalData.getCurrentPassport());
        return response.getUser();
    }

    public static boolean hasAnyFunction(String... functionCodeList) {
        ExtUser extUser = LocalData.getCurrentUser();

        List<String> functionList = extUser.getFunctionList();
        for (String functionCode : functionCodeList) {
            for (String code : functionList) {
                if (code.toLowerCase().equals(functionCode)) {
                    return true;
                }
            }
        }
        return false;
    }

    public String getConfig(String key) {
        return PropertiesPool.get(key);
    }

    /**
     * 获取承租人配置信息
     * @param code  代码
     * @return      配置
     */
    public String getTenantProfile(String code) {
        ProfileOptionValueGetRequest getRequest = new ProfileOptionValueGetRequest();
        getRequest.setCode(code);
        getRequest.setLevel(ProfileAccessLevelEnum.TENANT);
        ProfileOptionValueGetResponse getResponse = foundationService.getProfileOptionValue(getRequest, LocalData.getCurrentPassport());
        return getResponse.getValue();
    }

    @Override
    public String toString() {
        return "";
    }
}
