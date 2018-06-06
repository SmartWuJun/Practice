

    (function () {
        "use strict";
        var remote=require('electron').remote;
        var fun=require(remote.getGlobal("dirname")+"/config/fun.js");
        angular.module("xn.talk.service", [])
            .config(['$httpProvider',
                function ($httpProvider) {
                    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
                    $httpProvider.defaults.withCredentials=true;
                    $httpProvider.defaults.useXDomain = true;
                }])
            .factory('talkService', ['$http', function ($http) {
                var url =require('electron').remote.getGlobal('serveUrl');

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
                    var postP =  fun.getPostParameter(data);
                    return $http({
                        method: 'POST',
                        url: url,
                        data: postP.data
                    });
                };


                /**
                 * 获取用户登陆者
                 * id
                 * @param data
                 * @returns {*}
                 */
                service.xnTalkUnionGet = function (data) {
                    data.method="xntalk.union.get";
                    var postP =  fun.getPostParameter(data);
                    return $http({
                        method: 'POST',
                        url: url,
                        data: postP.data
                    });
                };

                /**
                 * identityId
                 *  unionId
                 * @param data
                 * @returns {*}
                 */
                service.xnTalkScanLoginCreate = function (data) {
                    data.method="xntalk.scanLogin.create";
                    var postP =  fun.getPostParameter(data);
                    return $http({
                        method: 'POST',
                        url: url,
                        data: postP.data
                    });
                };

                /**
                 * id
                 * @param data
                 * @returns {*}
                 */
                service.xnTalkScanLoginGetCreate = function (data) {
                    data.method="xntalk.scanLogin.get";
                    var postP =  fun.getPostParameter(data);
                    return $http({
                        method: 'POST',
                        url: url,
                        data: postP.data
                    });
                };

                /**
                 * account
                 * isAllUnion
                 * @param data
                 * @returns {*}
                 */
                service.xnTalkScanLoginGetCreate = function (data) {
                    data.method="xntalk.unionByAccount.get";
                    var postP =  fun.getPostParameter(data);
                    return $http({
                        method: 'POST',
                        url: url,
                        data: postP.data
                    });
                };
                /**
                 * keyword
                 * @param data
                 * @returns {*}
                 */
                service.xnTalkGlobalSearch = function (data) {
                    data.method="xntalk.global.search";
                    var postP =  fun.getPostParameter(data);
                    return $http({
                        method: 'POST',
                        url: url,
                        data: postP.data
                    });
                };
                /**
                 * tenantId
                 * @param data
                 * @returns {*}
                 */
                service.xnTalkPassportIdByUnionIdAndTenantIdGet = function (data) {
                    data.method="xntalk.passportIdByUnionIdAndTenantId.get";
                    var postP =  fun.getPostParameter(data);
                    return $http({
                        method: 'POST',
                        url: url,
                        data: postP.data
                    });
                };
                /**
                 * userId
                 * unionId
                 * tenantId
                 * @param data
                 * @returns {*}
                 */
                service.xnTalkAllTenantListGet = function (data) {
                    data.method="xntalk.allTenantList.get";
                    var postP =  fun.getPostParameter(data);
                    return $http({
                        method: 'POST',
                        url: url,
                        data: postP.data
                    });
                };

                return service;
            }])
    })();