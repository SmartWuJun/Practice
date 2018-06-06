/**
 * Created by DEV005 on 2017/5/15.
 */

(function () {
    "use strict";
    
    var applicationControl = function ($scope) {
        $scope.name = "这是个应用"
    };
    angular.module('myApp')
        .controller('ApplicationController', ["$scope", applicationControl]);
})();