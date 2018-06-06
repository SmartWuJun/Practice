
    (function () {
        "use strict";
        var remote=require('electron').remote;
        var fun=require(remote.getGlobal("dirname")+"/config/fun.js");
        
        angular.module("xn.talk.service", [])
            .config(['$httpProvider',
                function ($httpProvider) {
                    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
                    $httpProvider.defaults.useXDomain = true;
                }])
            .factory('talkService', ['$http', function ($http) {
                var url =remote.getGlobal('serveUrl');

                var service = {};

                //登陆接口
                /**
                 * account
                 * deviceId
                 * ip
                 * @param data
                 * @returns {*}
                 */
                service.login = function (data) {
                    data.method="xntalk.login";
                    var postP = fun.getPostParameter(data);
                    return $http({
                            method: 'POST',
                            url: url,
                            data: postP.data
                    });
                };

                /**
                 * 生成扫码
                 * @param data
                 * @returns {*}
                 */
                service.scanLoginCreate = function (data) {
                    data.method="xntalk.scanLogin.create";
                    var postP = fun.getPostParameter(data);
                    return $http({
                            method: 'POST',
                            url: url,
                            data: postP.data
                    });
                };
                /**
                 * 读取扫码
                 * @param data
                 * @returns {*}
                 */
                service.scanLoginGet = function (data) {
                    data.method="xntalk.scanLogin.get";
                    var postP = fun.getPostParameter(data);
                    return $http({
                            method: 'POST',
                            url: url,
                            data: postP.data
                    });
                };

                return service;
            }])
    })();