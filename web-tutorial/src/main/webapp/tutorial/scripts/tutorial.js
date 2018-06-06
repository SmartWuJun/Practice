var initApp=function(){
    "use strict";
    var ref = [

        /*公共组件依赖*/
        "xn.common", /*公共指令 xn.directive.common 、xn.filter.common、xn.service.common*/
        "xn.service.interceptor",   /*拦截器*/
        "xn.directive.top",          /*灯塔组件*/
        "xn.directive.loading",     /*进度条*/
        /**/
        "xn.tutorial.filter",
        "xn.tutorial.service",
        /*当前项目页面*/
        "xn.page",
        /*项目需求加载组件*/
        "ui.bootstrap",
        "ngImgCrop",
        "xn.directive.select",
        "xn.directive.attachment",
        "xn.directive.approval", //审批流
        "xn.directive.import",  //批量导入
        "ui.sortable",
        "pascalprecht.translate"   // 国际化
    ];
    var app =angular.module("xn", ref);
    /*基本配置设置*/
    app.value("xnConfig",xnConfig);
    /*拦截器设置*/
    app.config(["$httpProvider", function ($httpProvider) {
        $httpProvider.interceptors.push("httpInterceptor");
    }]);

    app.controller("BodyController",["$scope", "$translate", "$location", "toolsService",
        function($scope, $translate, $location, toolsService) {

        $scope.global={loadingInit:false};
        $scope.maxPageSize=5;

        /*导航效果处理（一二级导航）*/
        var navShow=''; /*临时存储*/
        var subNavShow='';
        $scope.$on("navShow",function(event ,show){
            $scope.navShow=show;
            navShow=show;
            console.log(navShow)
        });
        /*二级导航*/
        $scope.$on("subNavShow",function(event ,show){
            $scope.subNavShow=show;
            subNavShow=show;
        });

        $scope.navMouseenter=function (number) {
            $scope.navShow=number;
            $scope.subNavShow=null;
        };
        /*移出导航*/
        $scope.cancelNav=function () {
            $scope.navShow=navShow;
            $scope.subNavShow=subNavShow;
        };
        $scope.cancelSubNav=function () {
            $scope.subNavShow=null;
        };

        //日期转换函数
        Date.prototype.format = function(format){
            var o = {
                "M+" : this.getMonth()+1, //month
                "d+" : this.getDate(),    //day
                "h+" : this.getHours(),   //hour
                "m+" : this.getMinutes(), //minute
                "s+" : this.getSeconds(), //second
                "q+" : Math.floor((this.getMonth()+3)/3),  //quarter
                "S" : this.getMilliseconds() //millisecond
            };
            if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
                (this.getFullYear()+"").substr(4 - RegExp.$1.length));
            for(var k in o)if(new RegExp("("+ k +")").test(format))
                format = format.replace(RegExp.$1,
                    RegExp.$1.length==1 ? o[k] :
                        ("00"+ o[k]).substr((""+ o[k]).length));
            return format;
        };

        //关闭错误
        $scope.closeAlert = function (index,form) {
            form.splice(index,1);
        };

        //常用数据
        $scope.hours=[
            {key:0,value:"00"},
            {key:1,value:"01"},
            {key:2,value:"02"},
            {key:3,value:"03"},
            {key:4,value:"04"},
            {key:5,value:"05"},
            {key:6,value:"06"},
            {key:7,value:"07"},
            {key:8,value:"08"},
            {key:9,value:"09"},
            {key:10,value:"10"},
            {key:11,value:"11"},
            {key:12,value:"12"},
            {key:13,value:"13"},
            {key:14,value:"14"},
            {key:15,value:"15"},
            {key:16,value:"16"},
            {key:17,value:"17"},
            {key:18,value:"18"},
            {key:19,value:"19"},
            {key:20,value:"20"},
            {key:21,value:"21"},
            {key:22,value:"22"},
            {key:23,value:"23"}
        ];

    }]);
};