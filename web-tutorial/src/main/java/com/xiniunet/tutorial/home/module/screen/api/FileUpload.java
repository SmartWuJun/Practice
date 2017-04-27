package com.xiniunet.tutorial.home.module.screen.api;

import com.alibaba.citrus.service.requestcontext.buffered.BufferedRequestContext;
import com.alibaba.citrus.turbine.dataresolver.Param;
import com.alibaba.fastjson.JSON;
import com.xiniunet.tutorial.tool.Constants;
import com.xiniunet.foundation.contract.UploadTypeEnum;
import com.xiniunet.foundation.request.FileUploadRequest;
import com.xiniunet.foundation.service.FoundationService;
import com.xiniunet.framework.base.BaseResponse;
import com.xiniunet.framework.exception.ErrorType;
import com.xiniunet.framework.log.Log;
import com.xiniunet.framework.log.LogUtil;
import com.xiniunet.framework.security.Passport;
import com.xiniunet.framework.util.auth.LocalData;
import org.apache.commons.fileupload.FileItem;
import org.springframework.beans.factory.annotation.Autowired;

import javax.servlet.http.HttpServletResponse;
import java.io.PrintWriter;

/**
 * Created by DEV001 on 2014/8/20.
 */
public class FileUpload {

    @Autowired
    private HttpServletResponse response;

    @Autowired
    private BufferedRequestContext brc;

    @Autowired
    private FoundationService foundationService;

    public void execute(@Param("File") FileItem fileItem,
                        @Param("Ext") String ext,
                        @Param("FileName") String fileName,
                        @Param("Type") UploadTypeEnum type) throws Exception {
        BaseResponse baseResponse = new BaseResponse();
        try {
            if (fileItem == null) {
                return;
            }
            // 必须关闭buffering，未完成的页面才会被显示在浏览器上。
            brc.setBuffering(false);

            // 设置content type，但不需要设置charset，框架会设置正确的charset。
            response.setContentType("text/plain");
            Passport passport = LocalData.getCurrentPassport();

            FileUploadRequest req = new FileUploadRequest();
            req.setFileStream(fileItem.get());
            req.setFileName(fileName);
            req.setFileExt(ext);
            req.setType(type);

            baseResponse = foundationService.uploadFile(req, passport);
        } catch (Exception e) {
            baseResponse.addError(ErrorType.SYSTEM_ERROR, Constants.ERROR_MESSAGE_500);
            baseResponse.addError(ErrorType.STACK_DUMP, LogUtil.dumpException(e));
            LogUtil.writeLog(new Log("debug", "web", "", e.getMessage(), null));
        }
        String json = JSON.toJSONString(baseResponse);
        PrintWriter out = response.getWriter();
        out.println(json);
    }
}
