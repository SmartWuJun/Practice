angular.module("xn/template/dialog/confirm.html", []).run(["$templateCache", function($templateCache) {
    "use strict";
    $templateCache.put("xn/template/dialog/confirm.html",
            "<div class=\"modal-header\">\n" +
            "    <h3>{{dialogOptions.headerText}}</h3>\n" +
            "    <div class=\"xn-close xn-cursor\" data-ng-click=\"dialogOptions.close()\">\n" +
            "        <i class=\"icon icon-delete\"></i>\n" +
            "    </div>\n" +
            " </div>\n" +
            "    <div class=\"modal-body\" ng-if=\"dialogOptions.type!='delete'\">\n" +
            "        <p>{{dialogOptions.bodyText}}</p>\n" +
            "    </div>\n" +
            "    <div class=\"modal-body\" ng-if=\"dialogOptions.type=='delete'\">\n" +
            "        <div class=\"xn-exclamation\"><span>!</span></div>\n" +
            "        <div class=\"xn-body-text\">\n" +
            "            <h4>{{dialogOptions.bodyText}}</h4>\n" +
            "            <p></p>\n" +
            "        </div>\n" +
            "    </div>\n" +
            "<div class=\"modal-footer\">\n" +
            "   <button type=\"button\"class=\"btn\"\n" +
            "   data-ng-click=\"dialogOptions.close()\">{{dialogOptions.closeButtonText}}\n" +
            "    </button>\n" +
            "   <button class=\"btn btn-danger\"\n" +
            "   data-ng-click=\"dialogOptions.callback();\">{{dialogOptions.actionButtonText}}\n" +
            "     </button>\n" +
            " </div>");

}]);

angular.module("xn/template/dialog/info.html", []).run(["$templateCache", function($templateCache) {
    "use strict";
    $templateCache.put("xn/template/dialog/info.html",
            "<div class=\"modal-header\">\n" +
            "    <h3>{{dialogOptions.headerText}}</h3>\n" +
            " </div>\n" +
            "    <div class=\"modal-body\">\n" +
            "   <p>{{dialogOptions.bodyText}}</p>\n" +
            "    </div>\n" +
            "<div class=\"modal-footer\">\n" +
            "   <button type=\"button\"class=\"btn\"\n" +
            "   data-ng-click=\"dialogOptions.close()\">{{dialogOptions.closeButtonText}}\n" +
            "    </button>\n" +
            " </div>");

}]);

angular.module("xn/template/dialog/error.html", []).run(["$templateCache", function($templateCache) {
    "use strict";
    $templateCache.put("xn/template/dialog/error.html",
            "<div class=\"modal-header\">\n" +
            "    <h3>{{dialogOptions.headerText}}</h3>\n" +
            " </div>\n" +
            "    <div class=\"modal-body\">\n" +
            "   <p>{{dialogOptions.bodyText}}</p>\n" +
            "    </div>\n" +
            "<div class=\"modal-footer\">\n" +
            "   <button type=\"button\"class=\"btn\"\n" +
            "   data-ng-click=\"dialogOptions.close()\">{{dialogOptions.closeButtonText}}\n" +
            "    </button>\n" +
            " </div>");

}]);
angular.module("xn/template/dialog/warn.html", []).run(["$templateCache", function($templateCache) {
    "use strict";
    $templateCache.put("xn/template/dialog/warn.html",
            "<div class=\"modal-header\">\n" +
            "    <h3>{{dialogOptions.headerText}}</h3>\n" +
            " </div>\n" +
            "    <div class=\"modal-body\">\n" +
            "   <p>{{dialogOptions.bodyText}}</p>\n" +
            "    </div>\n" +
            "<div class=\"modal-footer\">\n" +
            "   <button type=\"button\"class=\"btn\"\n" +
            "   data-ng-click=\"dialogOptions.close()\">{{dialogOptions.closeButtonText}}\n" +
            "    </button>\n" +
            " </div>");

}]);
angular.module("xn/template/dialog/success.html", []).run(["$templateCache", function($templateCache) {
    "use strict";
    $templateCache.put("xn/template/dialog/success.html",
            "<div class=\"modal-header\">\n" +
            "    <h3>{{dialogOptions.headerText}}</h3>\n" +
            " </div>\n" +
            "    <div class=\"modal-body\">\n" +
            "   <p>{{dialogOptions.bodyText}}</p>\n" +
            "    </div>\n" +
            "<div class=\"modal-footer\">\n" +
            "   <button type=\"button\"class=\"btn\"\n" +
            "   data-ng-click=\"dialogOptions.close()\">{{dialogOptions.closeButtonText}}\n" +
            "    </button>\n" +
            " </div>");

}]);

angular.module("xn.service.tpl", [
    "xn/template/dialog/confirm.html",
    "xn/template/dialog/info.html",
    "xn/template/dialog/error.html",
    "xn/template/dialog/warn.html",
    "xn/template/dialog/success.html"
]);

angular.module("xn.service.common", ["xn.service.tpl", "ui.bootstrap"])
    .service("toolsService",[function () {
        "use strict";
        /**
         * 获取网址上的参数
         * @param name  网址上的参数.例如（id）
         * @param url   网址连接。
         * @returns {*}  返回网址参数的值
         */
        this.parameter = function (name, url) {
            var parameterString = null;
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            parameterString = url.substr(url.indexOf("?"), url.length);//获取截取？以后的字符串
            var r = parameterString.substr(1).match(reg);
            if (r != null){
                return  unescape(r[2]);
            }
            return null;
        };
    }
    ])
    .service("dialogService",["$modal","$timeout","$document","$http",
        function ($modal,$timeout,$document,$http) {
            "use strict";
            this.confirm = function (customDialogDefaults, customDialogOptions) {
                var dialogDefaults = {
                    backdrop: true,
                    keyboard: true,
                    backdropClick: true,
                    dialogFade: true,
                    templateUrl: "xn/template/dialog/confirm.html",
                    size:"sm"
                };

                var dialogOptions = {
                    closeButtonText: "关闭",
                    actionButtonText: "确定",
                    headerText: "继续...?",
                    bodyText: "执行这个操作?"
                };
                //Create temp objects to work with since we're in a singleton service
                var tempDialogDefaults = {};
                var tempDialogOptions = {};

                //Map angular-ui dialog custom defaults to dialog defaults defined in this service
                angular.extend(tempDialogDefaults, dialogDefaults, customDialogDefaults);

                //Map dialog.html $scope custom properties to defaults defined in this service
                angular.extend(tempDialogOptions, dialogOptions, customDialogOptions);

                if (!tempDialogDefaults.controller) {
                    tempDialogDefaults.controller =["$scope","$modalInstance", function ($scope,  $modalInstance) {
                        $scope.dialogOptions = tempDialogOptions;
                        $scope.dialogOptions.close = function (result) {
                            $modalInstance.close(result);
                        };
                        $scope.dialogOptions.callback = function () {
                            $modalInstance.close();
                            customDialogOptions.callback();
                        };
                    }];
                }

                $modal.open(tempDialogDefaults);

            };

            this.info=function(message){
                var dialogOptions = {
                    closeButtonText: "关闭",
                    headerText: "提示信息",
                    bodyText:  message
                };

                $modal.open({
                    backdrop: true,
                    keyboard: true,
                    backdropClick: true,
                    dialogFade: true,
                    size:"sm",
                    templateUrl: "xn/template/dialog/info.html",
                    controller:["$scope","$modalInstance", function ($scope,  $modalInstance) {
                        $scope.dialogOptions=dialogOptions;
                        $scope.dialogOptions.close = function () {
                            $modalInstance.close();
                        };
                    }]

                });
            };
            this.success=function(message){
                var dialogOptions = {
                    closeButtonText: "关闭",
                    headerText: "成功信息",
                    bodyText:  message
                };

                $modal.open({
                    backdrop: true,
                    keyboard: true,
                    backdropClick: true,
                    dialogFade: true,
                    size:"sm",
                    templateUrl: "xn/template/dialog/success.html",
                    controller:["$scope","$modalInstance",function ($scope,  $modalInstance) {
                        $scope.dialogOptions=dialogOptions;
                        $scope.dialogOptions.close = function () {
                            $modalInstance.close();
                        };
                    }]

                });
            };
            this.error=function(message){
                var dialogOptions = {
                    closeButtonText: "关闭",
                    headerText: "错误信息",
                    bodyText:  message
                };

                $modal.open({
                    backdrop: true,
                    keyboard: true,
                    backdropClick: true,
                    dialogFade: true,
                    size:"sm",
                    templateUrl: "xn/template/dialog/error.html",
                    controller:["$scope","$modalInstance", function ($scope,  $modalInstance) {
                        $scope.dialogOptions=dialogOptions;
                        $scope.dialogOptions.close = function () {
                            $modalInstance.close();
                        };
                    }]

                });
            };
            this.warn=function(message){
                var dialogOptions = {
                    closeButtonText: "关闭",
                    headerText:"警告信息",
                    bodyText:  message
                };
                $modal.open({
                    backdrop: true,
                    keyboard: true,
                    backdropClick: true,
                    dialogFade: true,
                    size:"sm",
                    templateUrl: "xn/template/dialog/warn.html",
                    controller:["$scope","$modalInstance", function ($scope,  $modalInstance) {
                        $scope.dialogOptions=dialogOptions;
                        $scope.dialogOptions.close = function () {
                            $modalInstance.close();
                        };
                    }]

                });
            };
            /**
             * tip 弹出提示窗口 dialogService.tip([{"message": "保存成功！"}],"index1.htm",time);
             * @param message  数组{} 弹出的内容“操作成功！”
             * @param modalUrl "index1.htm"
             * @param time time
             */
            this.tip=function(message, modalUrl,time){
                var dialogDefaults = {
                    headerText:"信息提示",
                    bodyText:message,
                    show:"show",
                    size:"sm",
                    top:"30%",
                    removeTime:1000,
                    stopTime:3000
                };
                var  tipbox="";
                var  errorDump="";

                if(time != null){
                    dialogDefaults.stopTime = time;
                }

                for( var i=0;i < dialogDefaults.bodyText.length;i++ ){
                    if(dialogDefaults.bodyText[i].type!="STACK_DUMP"){
                        tipbox += "<p><span>"+(i+1)+".</span>"+dialogDefaults.bodyText[i].message+"</p>\n";
                    }else{
                        errorDump += dialogDefaults.bodyText[i].message;
                    }
                }

                var tip= "<div class=\"modal ng-isolate-scope xn-modal xn-modal-sm\" >\n"+
                    "<div class=\"modal-content \">\n"+
                    "<div class=\"modal-header\">\n"+
                    " <h3>"+dialogDefaults.headerText+"</h3>\n" +
                    " </div>\n" +
                    "<div class=\"modal-body\">\n" +
                    tipbox+
                    "</div>";

                if(errorDump!=""){
                    errorDump = escape(errorDump);
                    tip +="<form action='/api/errorHandler.do' method='post' target='_blank'>" +
                        "<div class=\"modal-foot xn-text-right xn-padding-bottom xn-padding-right\">" +
                        "<input type='submit' value='更多' class='btn btn-link' />" +
                        "<input type='hidden' name='error' value='" + errorDump + "' />" +
                        "</div></form>" ;
                }

                //消息明细获取
                var body = $document.find("body").eq(0);
                body.append(tip);
                body.find(".xn-modal").css({ top: dialogDefaults.top,opacity:dialogDefaults.show });
                body.find(".xn-modal").fadeIn(dialogDefaults.show);
                var closeModal=function(){
                    body.find(".xn-modal").animate({ "top": "0", "opacity":"hide"},dialogDefaults.removeTime);
                    var  remove=function(){
                        body.find(".xn-modal").remove();
                        if( !(modalUrl==undefined || modalUrl==null)){
                            window.location = modalUrl;
                        }
                    };
                    $timeout(remove ,dialogDefaults.removeTime);
                };
                $timeout(closeModal ,dialogDefaults.stopTime);
            };
        }
    ])
    .factory('permissionService',["$rootScope", function ($rootScope) {
        var permissionList;
        return {
            setPermissions: function(permissions) {
                console.log("XN:permissionService ,设置权限列表集合"+permissions)
                permissionList = permissions;
                $rootScope.$broadcast('permissionsChanged')
            },
            hasPermission: function (permission) {
                console.log("XN:权限项判断， value＝"+permission);
                console.log("XN:权限项判断， permissionList＝"+permissionList);
                permission = permission.trim().toLowerCase();
                return _.some(permissionList, function(item) {
                    console.log("遍历项＝"+item);
                    if(_.isString(item))
                        return item.trim().toLowerCase() === permission
                });
            }
        };
    }]);



var httpInterceptor= function($q,$injector,$location,XN_BEGIN_REQUEST,XN_END_REQUEST){
    "use strict";
    var $http,  rootScope;
    var interceptor={
        request:function(config){
            /*  console.log("XN:提交请求的成功,信息如下：");
             console.log(config);*/
            config.requestTimestamp = new Date().getTime();
            // get $rootScope via $injector because of circular dependency problem
            rootScope = rootScope || $injector.get('$rootScope');
            // send notification a request has started
            rootScope.$broadcast(XN_BEGIN_REQUEST);
            return config;
        },
        response:function(response){
            /*       console.log("XN:服务器响应成功,信息如下：");*/
            /*   console.log(response);*/
            /*  console.log(response.data);*/
            response.config.responseTimestamp = new Date().getTime();
            var time = response.config.responseTimestamp - response.config.requestTimestamp;
            console.log('请求共花费了： ' + (time / 1000) + '秒.');
            // get $http via $injector because of circular dependency problem
            $http = $http || $injector.get('$http');
            // don't send notification until all requests are complete
            if ($http.pendingRequests.length < 1) {
                // get $rootScope via $injector because of circular dependency problem
                rootScope = rootScope || $injector.get('$rootScope');
                // send a notification requests are complete
                rootScope.$broadcast(XN_END_REQUEST);
            }

            return response ;
        },
        requestError:function(rejection){
            /*   console.log("XN:提交服务器请求失败,信息如下：");
             console.log(rejection);*/
            return $q.reject(rejection);
        },
        responseError:function(rejection){
            /*  console.log("XN:服务器响应失败,信息如下：");
             console.log(rejection);*/
            // get $http via $injector because of circular dependency problem
            $http = $http || $injector.get('$http');
            // don't send notification until all requests are complete
            if ($http.pendingRequests.length < 1) {
                // get $rootScope via $injector because of circular dependency problem
                rootScope = rootScope || $injector.get('$rootScope');
                // send a notification requests are complete
                rootScope.$broadcast(XN_END_REQUEST);
            }
            switch (rejection.status)
            {
                case 401:
                    console.error("XN:服务器返回401错误");
                    break;
                case 403:
                    console.error("XN:服务器返回403错误");
                    break;
                case 404:
                    console.error("XN:服务器返回404错误");
                    break;
                case 500:
                    console.error("XN:服务器返回500错误");
                    break;
                default :
                    console.error("XN:服务器返回错误");
                    break;
            }

            return $q.reject(rejection);
        }
    };
    return interceptor;
};

angular.module("xn.service.interceptor", ["xn.service.common"])
    .constant('XN_BEGIN_REQUEST', 'XN_BEGIN_REQUEST')
    .constant('XN_END_REQUEST', 'XN_END_REQUEST')
    .factory("httpInterceptor",["$q","$injector","$location","XN_BEGIN_REQUEST","XN_END_REQUEST"
        ,httpInterceptor]);
