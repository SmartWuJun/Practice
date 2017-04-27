package com.xiniunet.tutorial.home.module.screen.api;

import com.xiniunet.foundation.request.AttachmentUploadRequest;
import com.xiniunet.foundation.response.AttachmentUploadResponse;
import com.xiniunet.foundation.service.FoundationService;
import com.xiniunet.framework.annotation.ApiName;
import com.xiniunet.framework.api.ApiParam;
import com.xiniunet.framework.api.BaseApi;
import com.xiniunet.framework.security.Passport;
import org.apache.commons.fileupload.FileItem;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * Created by DEV003 on 2014/9/24.
 */
public class AttachmentUpload extends BaseApi {
    @Autowired
    private FoundationService foundationService;

    @ApiName("api.foundation.attachment.upload")
    public AttachmentUploadResponse apiFoundationAttachmentUpload(
            @ApiParam("file") FileItem fileItem,
            @ApiParam("Ext") String ext,
            @ApiParam("FileName") String fileName,
            @ApiParam("businessId") Long businessId,
            @ApiParam("businessType") String businessType,
            @ApiParam("businessCategory") String businessCategory,
            Passport passport) {
        AttachmentUploadRequest attachmentUploadRequest = new AttachmentUploadRequest();
        attachmentUploadRequest.setFileExt(ext);
        attachmentUploadRequest.setBusinessId(businessId);
        attachmentUploadRequest.setBusinessType(businessType);
        attachmentUploadRequest.setBusinessCategory(businessCategory);
        attachmentUploadRequest.setFileStream(fileItem.get());
        attachmentUploadRequest.setFileName(fileName);
        return foundationService.uploadAttachment(attachmentUploadRequest, passport);
    }
}
