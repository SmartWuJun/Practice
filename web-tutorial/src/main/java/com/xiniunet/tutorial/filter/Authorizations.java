package com.xiniunet.tutorial.filter;

import com.alibaba.dubbo.common.utils.StringUtils;
import com.alibaba.fastjson.JSON;
import com.xiniunet.framework.constant.LanguageEnum;
import com.xiniunet.framework.security.Passport;
import com.xiniunet.framework.util.auth.ExtUser;
import com.xiniunet.framework.util.auth.LocalData;
import com.xiniunet.master.domain.system.Function;
import com.xiniunet.master.domain.system.Tenant;
import com.xiniunet.master.domain.system.User;
import com.xiniunet.master.request.system.*;
import com.xiniunet.master.response.system.FunctionGetAllListByTenantIdResponse;
import com.xiniunet.master.response.system.TenantGetResponse;
import com.xiniunet.master.response.system.UserGetResponse;
import com.xiniunet.master.service.MasterService;
import com.xiniunet.security.request.PassportGetRequest;
import com.xiniunet.security.response.PassportGetResponse;
import com.xiniunet.security.service.SecurityService;
import com.xiniunet.supporting.sso.SSOHelper;
import org.springframework.context.ApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import javax.servlet.*;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * Created on 2014/8/17.
 * @author 吕浩
 * @since 0.1.0
 */
public class Authorizations implements Filter {
    private SecurityService securityService;
    private MasterService masterService;

    @SuppressWarnings("unchecked")
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        ServletContext context = filterConfig.getServletContext();
        ApplicationContext appContext = WebApplicationContextUtils.getRequiredWebApplicationContext(context);

        securityService = appContext.getBean(SecurityService.class);
        masterService = appContext.getBean(MasterService.class);
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        LocalData.setCurrentPassport(null);
        /* 获取要访问的路径 */
        HttpServletRequest hsr = (HttpServletRequest) request;
        String path = hsr.getRequestURI().replace("//", "/");        //格式为:  /system/role/create.htm

		/* 验证过滤器例外文件(css || js || 图片)，当文件名包含这些内容时，将直接放行，不予过滤。 */
        String[] suffixes = {".css", ".js", "$", ".jpg", ".gif", ".png", ".ttf", ".woff", ".ico", ".xls"};
        for (String suffix : suffixes) {
            if (path.contains(suffix)) {
                chain.doFilter(request, response);
                return;
            }
        }

        if(path.startsWith("/workflow/") && path.contains(".do")) {
            chain.doFilter(request, response);
            return;
        }

        // 通过Token获取Passport的ID
        Long passportId = Long.parseLong(SSOHelper.attrToken(hsr).getUid());
        PassportGetRequest passportGetRequest = new PassportGetRequest();
        passportGetRequest.setId(passportId);
        PassportGetResponse passportGetResponse = securityService.getPassport(passportGetRequest);

        Passport passport = passportGetResponse.getPassport();

        // 判断语言
        LanguageEnum language = null;
        // 优先读取URL中的语言
        if(request.getParameter("lang") != null) {
            try{
                language = LanguageEnum.valueOf(request.getParameter("lang").toUpperCase());
            } catch(Exception e) {

            }
        }
        // 如果URL中没有语言，尝试从Cookie中读取
        if(language == null) {
            Cookie[] cookies = ((HttpServletRequest) request).getCookies();
            for(Cookie cookie : cookies) {
                if(cookie.getName().equals("FOREIGN_LANGUAGE")) {
                    try {
                        language = LanguageEnum.valueOf(cookie.getValue().toUpperCase());
                    } catch(Exception e) {
                    }
                }
            }
        }
        // 如果Cookie中也没有，则设置为默认语言 TODO 默认语言应该根据用户的区域来获取
        if(language == null) {
            language = LanguageEnum.ZH_CN;
        }
        // 将当前语言保存至Cookie中
        Cookie cookie = new Cookie("FOREIGN_LANGUAGE", language.name());
        cookie.setPath("/");
        cookie.setMaxAge(3600 * 24 * 365);  // Cookie保留一年
        ((HttpServletResponse)response).addCookie(cookie);

        if(passport == null || passport.getRevokeType() != null
                || passport.getExpireTime().getTime() < System.currentTimeMillis()) {
            // 注销单点登录
            SSOHelper.clearRedirectLogin(hsr, (HttpServletResponse) response);
            return;
        }

        // 设置语言
        passport.setLanguage(language);
        ExtUser extUser = JSON.parseObject(JSON.toJSONString(passport), ExtUser.class);
        extUser.setPassportId(passportId);

        // 查询用户信息
        UserGetRequest userGetRequest = new UserGetRequest(passport.getUserId());
        UserGetResponse userGetResponse = masterService.getUser(userGetRequest, passport);
        User user = userGetResponse.getUser();
        if (user != null) {
            extUser.setUserName(user.getName());
            extUser.setNickName(user.getNickName());
            extUser.setType(user.getSourceType());
        }

        // 查询企业信息
        TenantGetResponse tenantGetResponse = masterService.getTenant(new TenantGetRequest(), passport);
        Tenant tenant = tenantGetResponse.getTenant();
        if (tenant != null) {
            extUser.setTenantNumber(tenant.getNumber());
            extUser.setTenantName(StringUtils.isBlank(tenant.getNameAlt())?tenant.getName():tenant.getNameAlt());
        }

        // 如果是管理员，则权限点列表为所有应用的权限点合集
        if (extUser.getUserId().equals(passport.getOwnerId()) || extUser.getUserId().equals(passport.getAdminId())) {

            List<String> functionCodeList = new ArrayList<>();
            // 查询当前承租人购买应用的所有function列表
            FunctionGetAllListByTenantIdRequest idRequest = new FunctionGetAllListByTenantIdRequest();
            FunctionGetAllListByTenantIdResponse idResponse = masterService.getFunctionAllListByTenantId(idRequest, passport);
            for(List<Function> functions : idResponse.getFunctionList()) {
                for(Function function : functions) {
                    functionCodeList.add(function.getCode());
                }
            }
            extUser.setFunctionList(functionCodeList);
        } else {
            // 如果是普通用户，则权限点列表为配置的数据
            AuthGetListRequest authRequest = new AuthGetListRequest();
            List<String> functionList = masterService.getAuthList(authRequest, passport).getResult();
            extUser.setFunctionList(functionList);
        }

        HttpSession session = ((HttpServletRequest)request).getSession();
        CreateMemcachedSessionRequest createMemcachedSessionRequest = new CreateMemcachedSessionRequest();
        createMemcachedSessionRequest.setHttpSession(session.toString());
        createMemcachedSessionRequest.setPassportId(passportId);
        masterService.createMemcachedSession(createMemcachedSessionRequest);

        // 保存在本地线程变量中
        hsr.setAttribute("_passport", passport);
        LocalData.setCurrentUser(extUser);
        LocalData.setCurrentPassport(passport);

        chain.doFilter(request, response);
    }

    @Override
    public void destroy() {
    }
}
