package com.xiniunet.tutorial.home.module.screen.api;

import com.alibaba.citrus.service.requestcontext.buffered.BufferedRequestContext;
import com.alibaba.citrus.turbine.dataresolver.Param;
import com.xiniunet.framework.util.UrlUtil;
import org.springframework.beans.factory.annotation.Autowired;

import javax.servlet.http.HttpServletResponse;
import java.io.PrintWriter;

/**
 * Created by 范智凝 on 2014-10-24 13:00:30.
 *
 * @author 范智凝
 */
public class ErrorHandler {

    @Autowired
    private HttpServletResponse response;

    @Autowired
    private BufferedRequestContext brc;

    public void execute(@Param("error") String error) throws Exception {
        // 必须关闭buffering，未完成的页面才会被显示在浏览器上。
        brc.setBuffering(false);

        // 设置content type，但不需要设置charset，框架会设置正确的charset。
        response.setContentType("text/plain");

        PrintWriter out = response.getWriter();


        String errorOutput = "\n\n以下是发生错误的详细原因，请将错误信息复制并提交请求，以便我们的开发人员处理\n\n";
        errorOutput += UrlUtil.unescape(error);
        out.println(errorOutput);
    }
}
