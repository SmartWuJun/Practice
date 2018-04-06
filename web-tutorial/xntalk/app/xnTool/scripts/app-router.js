(function () {

    angular.module('app')
        .run(['$rootScope','$window', '$location', '$log',function ($rootScope, $window, $location, $log) {

            $rootScope.routeChange=false;

            //路由开始切换
            /**
             * args[0]: 事件
             * args[1]: 要切换的路由
             * args[2]: 第一次进入该方法,没有当前路由,为undefined
             */
            $rootScope.$on('$routeChangeStart',function (event,next,current) {
                console.log([event,next,current]);
            });

            //路由切换成功
            /**
             * args[0]: 事件
             * args[1]: 当前的路由
             * args[2]: 上一个路由,第一次进入该方法,没有上一个路由,为undefined
             */
            $rootScope.$on('$routeChangeSuccess',function (event,current,previous) {
                console.log('$routeChangeSuccess');
                console.log([event,current,previous]);
            });

            //路由切换失败(比如resolve中有错误等待),都会导致路由切换失败
            $rootScope.$on('$routeChangeError',function (event,msg) {
                console.log([event,msg]);
            });

            //当$location.path发生变化或者$location.url发生变化时触发
            $rootScope.$on('$locationChangeStart',function (event,msg) {
                $rootScope.routeChange=true;
                console.log([event,msg]);
            });

            //当且仅当path或url变化成功后触发
            $rootScope.$on('$locationChangeSuccess',function (event,msg) {
                $rootScope.routeChange=false;
                console.log([event,msg]);
            });

        }])
        .config(["$stateProvider","$urlRouterProvider",function ($stateProvider, $urlRouterProvider) {
        // 定义一个当请求的路径是无效路径时跳转的路径。


        $stateProvider
            .state('/', {
                url: '/',
                templateUrl: 'page/main.html',
                controller: function () {
                    
                }
            })
            .state('file', {
                url: '/file',
                templateUrl: 'page/file/file.html',
                controller: "FileController"
            })
            .state('folder', {
                url: '/folder',
                templateUrl: 'page/folder/folder.html',
                controller: "FolderController"
            });

        $urlRouterProvider.otherwise('/');

    }])
})();


