package com.xiniunet.tutorial.home.module.screen.api;

import com.alibaba.citrus.service.requestcontext.buffered.BufferedRequestContext;
import com.alibaba.citrus.turbine.dataresolver.Param;
import com.alibaba.fastjson.JSON;
import com.xiniunet.foundation.request.FolderFileCreateRequest;
import com.xiniunet.foundation.service.FoundationService;
import com.xiniunet.framework.base.BaseResponse;
import com.xiniunet.framework.exception.ErrorType;
import com.xiniunet.framework.log.LogUtil;
import com.xiniunet.framework.security.Passport;
import com.xiniunet.framework.util.FilenameUtil;
import com.xiniunet.framework.util.auth.LocalData;
import org.apache.commons.fileupload.FileItem;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import javax.servlet.http.HttpServletResponse;
import java.io.PrintWriter;

/**
 * Created by DEV001 on 2014/8/20.
 */
public class DiskFileUpload {

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private HttpServletResponse response;

    @Autowired
    private BufferedRequestContext brc;

    @Autowired
    private FoundationService foundationService;

    public void execute(@Param("File") FileItem fileItem,
                        @Param("DiskId")Long diskId,
                        @Param("FolderId")Long folderId) throws Exception {
        BaseResponse baseResponse = new BaseResponse();
        Passport passport = LocalData.getCurrentPassport();
        try {
            if(fileItem == null){
                return;
            }
            // 必须关闭buffering，未完成的页面才会被显示在浏览器上。
            brc.setBuffering(false);

            // 设置content type，但不需要设置charset，框架会设置正确的charset。
            response.setContentType("text/plain");

            FolderFileCreateRequest createRequest = new FolderFileCreateRequest();
            createRequest.setDiskId(diskId);
            createRequest.setFolderId(folderId);
            createRequest.setFileName(fileItem.getName());
            createRequest.setFileStream(fileItem.get());
            createRequest.setFileExt(FilenameUtil.getExtName(fileItem.getName()));

            logger.info("method:api.foundation.diskfile.upload -- START");
            logger.info("param:" + JSON.toJSONString(createRequest));

            createRequest.setFileStream(fileItem.get());
            baseResponse = foundationService.createFolderFile(createRequest, passport);
        } catch (Exception e) {
            baseResponse.addError(ErrorType.SYSTEM_ERROR, "服务器走了下神，稍后再试一次");
            baseResponse.addError(ErrorType.STACK_DUMP, LogUtil.dumpException(e));
            logger.error(e.getMessage(), e);
        } finally {
            String json = JSON.toJSONString(baseResponse);
            PrintWriter out = response.getWriter();
            out.println(json);
            logger.info("result:"+json);
            logger.info("method:api.foundation.diskfile.upload -- END");
        }
    }
}
