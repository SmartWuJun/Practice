(function () {

    angular.module('myApp')
        .config(["$stateProvider","$urlRouterProvider",function ($stateProvider, $urlRouterProvider) {
        // 定义一个当请求的路径是无效路径时跳转的路径。
        $urlRouterProvider.otherwise('/chat');

        $stateProvider
            .state('chat', {
                url: '/chat',
                templateUrl: 'template/chat.html',
                controller: "ChatController"
            })
            .state('index', {
                url: '/index',
                templateUrl: 'template/main.html',
                controller: "IndexController"
            })
            .state('application', {
                url: '/application',
                templateUrl: 'template/application.html',
                controller: "ApplicationController"
            })
            .state('pan', {
                url: '/pan',
                templateUrl: 'template/pan.html',
                controller: "PanController"
            });
    }]);

})();


