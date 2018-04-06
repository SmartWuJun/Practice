(function () {
    "use strict";
    
    var chatController = function($scope ,talkService) {

        $scope.vm={
            keyword:'',
            menuActive:'conversations',
            conversations:1
        };
        $scope.doSearch=function () {

        };
        /**
         * 切换目录
         * */
        $scope.tabChatMenu=function (type) {
            $scope.vm.menuActive=type;

        }

    };
    angular.module('myApp')
        .controller("ChatController", ["$scope","talkService", chatController]);

})();


