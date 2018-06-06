(function () {
    "use strict";
    var remote=require('electron').remote;

    var ref = [
        "ui.router",
        "xn.common",
        // "xn.directive.navigation",
        "xn.service.interceptor",
        // "xn.service.foundation",
        "xn.talk.filter",
        "xn.talk.service",
        "xn.talk.method"

    ];
    var app = angular.module("myApp", ref);

    app.value("xnConfig",{
        isDev:remote.getGlobal('isDev'),
        platform:remote.getGlobal('platform'),
        appInfo:JSON.parse(remote.getGlobal('appInfo'))
    });
    //拦截器
    app.config(["$httpProvider", function ($httpProvider) {
        $httpProvider.interceptors.push("httpInterceptor");
    }]);
})();


