/**
 * Created by DEV005 on 2017/5/15.
 */
(function () {
    "use strict";
    
    //定义module,并指明依赖模块。
    var indexController = function ($scope) {

    };

    angular.module('myApp')
        .controller("IndexController", ["$scope", indexController]);
})();