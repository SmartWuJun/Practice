
(function () {
    "use strict";

    //定义module,并指明依赖模块。
    var panController = function ($scope) {

    };
    angular.module('myApp')
        .controller("PanController", ["$scope", panController]);
})();