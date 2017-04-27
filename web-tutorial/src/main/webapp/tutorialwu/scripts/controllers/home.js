/**
 * Created by wujun on 2017/3/28.
 */
(function(){
    "use strict";
    //首页
    var homeEditController = function($scope){
        $scope.name="wj2224411";
        console.log(1222223);
    };

    angular.module("xn.page",[])
        .controller("HomeEditController",["$scope",homeEditController]);
})();