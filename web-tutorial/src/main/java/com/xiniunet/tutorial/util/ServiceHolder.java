package com.xiniunet.tutorial.util;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.xiniunet.framework.security.Passport;
import com.xiniunet.framework.util.SpringContext;
import com.xiniunet.master.domain.ecommerce.StoreAccount;
import com.xiniunet.master.domain.wechat.Account;
import com.xiniunet.master.request.ecommerce.StoreAccountFindRequest;
import com.xiniunet.master.request.wechat.AccountGetRequest;
import com.xiniunet.master.response.ecommerce.StoreAccountFindResponse;
import com.xiniunet.master.response.wechat.AccountGetResponse;
import com.xiniunet.master.service.MasterService;
import me.chanjar.weixin.mp.api.WxMpInMemoryConfigStorage;
import me.chanjar.weixin.mp.api.impl.WxMpServiceImpl;

/**
 * Created on 2015-08-24.
 *
 * @author 吕浩
 * @since 1.0.0
 */
public class ServiceHolder {
    private ServiceHolder() {
    }

    private static MasterService masterService = SpringContext.getApplicationContext().getBean(MasterService.class);

    public static WxMpServiceImpl get(Long accountId, Passport passport) {

        AccountGetRequest getRequest = new AccountGetRequest();
        getRequest.setId(accountId);
        AccountGetResponse getResponse = masterService.getWechatAccount(getRequest, passport);
        Account account = getResponse.getAccount();
        if(account == null) {
            //查询支付配置信息
            StoreAccountFindRequest request = new StoreAccountFindRequest();
            request.setStoreId(accountId);
            request.setCapitalAccountType("WECHAT");
            StoreAccountFindResponse storeAccountFindResponse = masterService.findStoreAccount(request, passport);
            if(!storeAccountFindResponse.hasError()){
                if (storeAccountFindResponse.getResult() != null && storeAccountFindResponse.getResult().size()>0) {
                    StoreAccount storeAccount = storeAccountFindResponse.getResult().get(0);
//                    for (StoreAccount storeAccount : storeAccountFindResponse.getResult()) {
//                        if (storeAccount.getCapitalAccountType().equals("WECHAT")) {
                            if (storeAccount.getIsActive()) {
                                JSONObject jsonObject = JSON.parseObject(storeAccount.getIntegrationAccountConfig());

                                WxMpInMemoryConfigStorage storage = new WxMpInMemoryConfigStorage();
                                storage.setAppId(jsonObject.getString("appid"));
                                storage.setSecret(jsonObject.getString("secret"));
                                storage.setToken(jsonObject.getString("token"));
                                storage.setAesKey(jsonObject.getString("aeskey"));
                                WxMpServiceImpl service = new WxMpServiceImpl();
                                service.setWxMpConfigStorage(storage);
                                return service;
                            }
//                        }
//                    }
                }
            }
            return null;
        }

        WxMpInMemoryConfigStorage storage = new WxMpInMemoryConfigStorage();
        storage.setAppId(account.getAppId());
        storage.setSecret(account.getAppSecret());
        storage.setToken(account.getToken());
        storage.setAesKey(account.getEncodingAesKey());

        WxMpServiceImpl service = new WxMpServiceImpl();
        service.setWxMpConfigStorage(storage);
        return service;
    }

}
