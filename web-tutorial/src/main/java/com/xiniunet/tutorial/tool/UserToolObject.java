package com.xiniunet.tutorial.tool;

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

    /**
     * 通过用户ID获取用户名
     * @param userId    用户ID
     * @return  ID对应的用户名
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
     * @param userId    用户ID
     * @return  ID对应的用户信息
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


    @Override
    public String toString() {
        return "";
    }
}
