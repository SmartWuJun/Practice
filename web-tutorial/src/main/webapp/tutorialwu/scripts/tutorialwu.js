var initApp = function(){
    "use strict";
    var ref = [
        /*公共组件依赖*/
        "xn.common", /*公共指令 xn.directive.common 、xn.filter.common、xn.service.common*/
        "xn.service.interceptor",   /*拦截器*/
        "xn.directive.top",          /*灯塔组件*/
        "xn.directive.loading",     /*进度条*/
        //"xn.directive.common",
        //"xn.filter.common",
        //"xn.service.common",

        "xn.tutorialwu.service",
        "xn.tutorialwu.filter",

        "xn.page",

        "ui.bootstrap",
        "xn.directive.loading"

    ];
    var app=angular.module("xn", ref);

    app.value("xnConfig", xnConfig);


    app.controller("BodyController",["$scope",
        function($scope) {

            $scope.global={loadingInit:false};
            $scope.maxPageSize=5;

            /*导航栏效果*/
            var navShow='';
            var subNavShow='';
            $scope.$on('navShow',function(event,show){
               $scope.navShow=show;
                navShow=show;
                console.log(navShow);
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

        }]);
};
