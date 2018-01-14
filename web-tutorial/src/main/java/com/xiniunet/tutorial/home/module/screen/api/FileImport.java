package com.xiniunet.tutorial.home.module.screen.api;

import com.alibaba.citrus.service.requestcontext.buffered.BufferedRequestContext;
import com.alibaba.citrus.turbine.dataresolver.Param;
import com.alibaba.fastjson.JSON;
import com.xiniunet.framework.base.BaseURLResponse;
import com.xiniunet.framework.exception.ErrorType;
import com.xiniunet.framework.log.LogUtil;
import com.xiniunet.framework.security.Passport;
import com.xiniunet.framework.util.auth.LocalData;
import com.xiniunet.tutorial.request.DepartmentListImportRequest;
import com.xiniunet.tutorial.request.EmployeeListImportRequest;
import com.xiniunet.tutorial.service.TutorialService;
import org.apache.commons.fileupload.FileItem;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import javax.servlet.http.HttpServletResponse;
import java.io.PrintWriter;

/**
 * Created on 2017-04-11.
 *
 * @author 吕浩
 * @since 1.0.0
 */
public class FileImport {
    private Logger logger = LoggerFactory.getLogger(this.getClass());
    @Autowired
    private TutorialService tutorialService;

    @Autowired
    private HttpServletResponse response;

    @Autowired
    private BufferedRequestContext brc;

    public void execute(@Param("file") FileItem fileItem,
                        @Param("method") String method) throws Exception {
        if (fileItem == null) {
            return;
        }
        BaseURLResponse baseResponse = new BaseURLResponse();
        Passport passport = LocalData.getCurrentPassport();
        try {
            // 必须关闭buffering，未完成的页面才会被显示在浏览器上。
            brc.setBuffering(false);

            // 设置content type，但不需要设置charset，框架会设置正确的charset。
            response.setContentType("text/plain");


            switch (method.toLowerCase()) {
                case "api.tutorial.departmentlist.import": {
                    DepartmentListImportRequest request = new DepartmentListImportRequest();
                    request.setBytes(fileItem.get());
                    baseResponse = tutorialService.importDepartmentList(request, passport);
                    break;
                }
                case "api.tutorial.employeelist.import": {
                    EmployeeListImportRequest request = new EmployeeListImportRequest();
                    request.setBytes(fileItem.get());
                    baseResponse = tutorialService.importEmployeeList(request, passport);
                    break;
                }
                default:
                    baseResponse.addError(ErrorType.INVALID_PARAMETER, "调用的方法不存在");
                    break;
            }
        } catch (Exception e) {
            baseResponse.addError(ErrorType.SYSTEM_ERROR, "服务器走了下神，稍后再试一次");
            baseResponse.addError(ErrorType.STACK_DUMP, LogUtil.dumpException(e));
            logger.error(e.getMessage(), e);
        } finally {
            String json = JSON.toJSONString(baseResponse);
            PrintWriter out = response.getWriter();
            out.println(json);
            logger.info("result:" + json);
            logger.info("method:" + method + " -- END");
        }
    }
}
