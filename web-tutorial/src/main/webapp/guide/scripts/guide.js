var initApp=function(){
    "use strict";
    var ref = [
        /*公共组件依赖*/
        "xn.common", /*公共指令 xn.directive.common 、xn.filter.common、xn.service.common*/
        "xn.service.interceptor",   /*拦截器*/
        "xn.directive.top",          /*灯塔组件*/
        "xn.directive.loading",     /*进度条*/
        /**/
        "xn.guide.filter",
        "xn.guide.service",
        /*当前项目页面*/
        "xn.page",
        /*项目需求加载组件*/
        "ui.bootstrap"
    ];

    var app =angular.module("xn", ref);

    /*基本配置设置*/
    app.value("xnConfig",xnConfig);
    /*拦截器设置*/
    app.config(["$httpProvider", function ($httpProvider) {
        $httpProvider.interceptors.push("httpInterceptor");
    }]);

    app.controller("BodyController",["$scope", function($scope) {

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



        /*导航*/
        $scope.navActive=null;
        $scope.doSetActive=function (index) {
            if($scope.navActive===index){
                $scope.navActive=null;
            }else {
                $scope.navActive=index;
            }
        };
        $scope.navList=[
            {
                title:"html / css",
                link:"",
                childList:[
                    {title:"H5",link:""},
                    {title:"CSS3",link:""},
                    {title:"Less",link:""}
                ]
            },
            {
                title:"JavaScript",
                link:"",
                childList:[
                    {title:"jquery",link:""}
                ]
            },
            {
                title:"移动端",
                link:"",
                childList:[
                    {title:"H5",link:""},
                    {title:"CSS3",link:""},
                    {title:"Less",link:""}
                ]
            },
            {
                title:"Angular",
                link:"",
                childList:[
                    {title:"项目",link:"/guide/angular/create/index.htm"},
                    {title:"基础知识",link:"/guide/angular/module/index.htm"},
                    {title:"bug",link:"/guide/angular/module/index.htm"},
                    {title:"组件",link:"/guide/angular/module/index.htm"}
                ]
            },
            {
                title:"Vue",
                link:"",
                childList:[
                    {title:"H5",link:""},
                    {title:"CSS3",link:""},
                    {title:"Less",link:""}
                ]
            },
            {
                title:"React",
                link:"",
                childList:[
                    {title:"H5",link:""},
                    {title:"CSS3",link:""},
                    {title:"Less",link:""}
                ]
            },
            {
                title:"Node",
                link:"",
                childList:[
                    {title:"H5",link:""},
                    {title:"CSS3",link:""},
                    {title:"Less",link:""}
                ]
            }
        ];

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

    }]);
};