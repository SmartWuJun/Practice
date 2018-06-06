(function () {
    var remote=require('electron').remote;
    var electron = require('electron'); // 控制应用生命周期的模块。
    angular.module('myApp')
        .config(["$stateProvider","$urlRouterProvider",function ($stateProvider, $urlRouterProvider) {
        // 定义一个当请求的路径是无效路径时跳转的路径。
        $urlRouterProvider.otherwise('/chat');

        $stateProvider
            .state('chat', {
                url: '/chat',
                templateUrl: remote.getGlobal('dirname')+'/xnMain/page/template/chat.html',
                controller: "ChatController"
            })

    }]);

})();


