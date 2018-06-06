(function () {
    "use strict";
    var ref = [
        "ui.router",
        "xn.common",
        // "xn.directive.navigation",
        "xn.service.interceptor",
        // "xn.service.foundation",
        "xn.talk.filter",
        "xn.talk.service",
        "xn.talk.method",
        "ui.bootstrap",
        "xn.directive.form",
        "xn.directive.calendar",
        "xn.directive.location"
    ];
    var app = angular.module("myApp", ref);

    app.value("xnConfig",{
        isDev:require('electron').remote.getGlobal('isDev'),
        platform:require('electron').remote.getGlobal('platform'),
        appInfo:require('electron').remote.getGlobal('appInfo')
    });
    //拦截器
    app.config(["$httpProvider", function ($httpProvider) {
        $httpProvider.interceptors.push("httpInterceptor");
    }]);
    // 全局配置 form提交验证
    app.config(["xnValidatorProvider", function (xnValidatorProvider) {
        // 全局配置
        xnValidatorProvider.config({
            blurTrig: false,
            showError: false,
            removeError: false
        });
        xnValidatorProvider.setRules({});
    }]);

})();


