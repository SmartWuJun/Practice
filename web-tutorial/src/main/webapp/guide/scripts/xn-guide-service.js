(function(){
    "use strict";
    angular.module("xn.guide.service", [])
    .config(['$httpProvider',
            function ($httpProvider) {
                $httpProvider.defaults.headers.post['Content-Type'] = 'text/plain';
                $httpProvider.defaults.withCredentials=true;
                $httpProvider.defaults.useXDomain = true;
            }])
    .factory('guideService', ['$http', function ($http) {
        var service = {};
        var url = "/api/tutorial.do";
        /**
        * 根据Id获取部门
        */
        service.getDepartment = function (data) {
            return $http({method: 'POST', url: url, data: data, params: {"method": "api.tutorial.department.get"}});
        };
        return service;
        }])
        .factory('myService', ['$http', function ($http) {
            var service = {};
            var url = xnConfig.myUrl+"/api/foundation.do";
            var sysUrl=xnConfig.myUrl+"system/api.do";
            var diskUrl=xnConfig.myUrl+"/api/diskFileUpload.do";
            /*获取承租人信息*/
            service.getTenant = function (data) {
                return $http({
                    method: 'POST',
                    url: sysUrl,
                    data: data,
                    params: {"method": "api.system.tenant.get"} });
            };

            /*获取*/
            service.apiFoundationDiskGet = function (data) {
                return $http({
                    method: 'POST',
                    url: url,
                    data: data,
                    params: {"method": "api.foundation.disk.get"} });
            };

            //上传附件
            service.diskFileUpload = function (data) {
                return  $http({
                    method: 'POST',
                    url: diskUrl,
                    headers: {'Content-Type': undefined },
                    transformRequest: angular.identity,
                    data: data

                });
            };
        return service;
    }]);
})();