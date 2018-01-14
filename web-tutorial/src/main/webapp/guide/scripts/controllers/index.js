/**
 * Created by DEV005 on 2017/3/28.
 */
(function () {
    "user strict";
    var employeeIndexController = function ($scope) {
        /*向父级控制器传递参数*/
        $scope.$emit('navShow', 0);
        $scope.$emit('subNavShow', 0);
        
    };
    angular.module("xn.page", [])

    .controller("IndexController", ["$scope", employeeIndexController])
})();
