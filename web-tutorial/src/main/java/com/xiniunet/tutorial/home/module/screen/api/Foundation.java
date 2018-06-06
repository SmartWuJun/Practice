package com.xiniunet.tutorial.home.module.screen.api;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.xiniunet.foundation.request.AttachmentDeleteRequest;
import com.xiniunet.foundation.request.AttachmentGetByBizInfoRequest;
import com.xiniunet.foundation.response.AttachmentDeleteResponse;
import com.xiniunet.foundation.response.AttachmentGetByBizInfoResponse;
import com.xiniunet.foundation.service.FoundationApi;
import com.xiniunet.framework.annotation.ApiName;
import com.xiniunet.framework.security.Passport;

/**
 * Created on 2017-04-12.
 *
 * @author 吕浩
 * @since 1.0.0
 */
public class Foundation extends FoundationApi {
    @ApiName("api.foundation.attachment.getlist.bybizinfo")
    public AttachmentGetByBizInfoResponse apiFoundationAttachmentGetListByBizInfo(JSONObject jsonObject, Passport passport){
        AttachmentGetByBizInfoRequest attachmentGetByBizInfoRequest = JSON.toJavaObject(jsonObject,AttachmentGetByBizInfoRequest.class);
        return foundationService.getAttachmentsByBizInfo(attachmentGetByBizInfoRequest,passport);
    }

    @ApiName("api.foundation.attachment.delete")
    public AttachmentDeleteResponse apiFoundationAttachmentDelete(JSONObject jsonObject, Passport passport){
        AttachmentDeleteRequest attachmentDeleteRequest = JSON.toJavaObject(jsonObject,AttachmentDeleteRequest.class);
        return foundationService.deleteAttachment(attachmentDeleteRequest, passport);
    }

}
