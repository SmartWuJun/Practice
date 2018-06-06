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
    angular.module("xn.page", ["xn.directive.form"])
    // 全局配置 form提交验证
    .config(["xnValidatorProvider", function (xnValidatorProvider) {
        // 全局配置
        xnValidatorProvider.config({
            blurTrig   : false,
            showError  : false,
            removeError: false
        });
        xnValidatorProvider.setRules({
        });
    }])
    .controller("IndexController", ["$scope", employeeIndexController])
})();
