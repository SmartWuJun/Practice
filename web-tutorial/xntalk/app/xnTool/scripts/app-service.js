/**
 * Created by DEV005 on 2016/4/20.
 */
(function () {
    "use strict";
        angular.module('app.service',[])
            .run(["$templateCache", function($templateCache) {
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
                    "   data-ng-click=\"dialogOptions.cancel()\">{{dialogOptions.closeButtonText}}\n" +
                    "    </button>\n" +
                    "   <button class=\"btn btn-danger\"\n" +
                    "   data-ng-click=\"dialogOptions.callback();\">{{dialogOptions.actionButtonText}}\n" +
                    "     </button>\n" +
                    " </div>");

            }])
        .service("dialogService",["$modal","$timeout","$document",
            function ($modal,$timeout,$document) {
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

                            $scope.dialogOptions.cancel = function () {
                                $modalInstance.close();
                                if(customDialogOptions.cancel){
                                    customDialogOptions.cancel();
                                }
                            };

                            $scope.dialogOptions.callback = function () {
                                $modalInstance.close();
                                customDialogOptions.callback();
                            };
                        }];
                    }

                    $modal.open(tempDialogDefaults);

                };

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

                    var modalId="modal"+new Date().getTime();

                    for( var i=0;i < dialogDefaults.bodyText.length;i++ ){
                        if(dialogDefaults.bodyText[i].type!="STACK_DUMP"){
                            tipbox += "<p><span>"+(i+1)+".</span>"+dialogDefaults.bodyText[i].message+"</p>\n";
                        }else{
                            errorDump += dialogDefaults.bodyText[i].message;
                        }
                    }

                    var tip="<div id='"+modalId+"' class=\"modal ng-isolate-scope xn-modal xn-modal-sm\" >\n"+
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


                    var  remove=function(){

                        document.getElementById(modalId).parentNode.removeChild(document.getElementById(modalId));
                        if( !(modalUrl==undefined || modalUrl==null)){
                            window.location = modalUrl;
                        }
                    };

                    var closeModal=function(){
                        $timeout(remove ,dialogDefaults.removeTime);
                    };

                    (function timeout (){
                        console.log(1111);
                        $timeout(closeModal,dialogDefaults.stopTime);
                    })();

                };

            }
        ])
        .factory('myService', function() {
            
        });
})();