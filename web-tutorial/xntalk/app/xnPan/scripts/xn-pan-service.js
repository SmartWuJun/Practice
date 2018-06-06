

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

            /**
             * 创建文件夹
             * unionId
             * tenantId
             * @param data
             * @returns {*}
             */
            service.xnTalkFolderFileCreate = function (data) {
                data.method="xntalk.folderFile.create";
                var postP =  fun.getPostParameter(data);
                return $http({
                    method: 'POST',
                    url: url,
                    data: postP.data
                });
            };

            /**
             * 创建文件夹
             * unionId
             * tenantId
             * @param data
             * @returns {*}
             */
            service.xnTalkFolderDelete = function (data) {
                data.method="xntalk.folder.delete";
                var postP =  fun.getPostParameter(data);
                return $http({
                    method: 'POST',
                    url: url,
                    data: postP.data
                });
            };
            service.xnTalkFolderMove = function (data) {
                data.method="xntalk.folder.move";
                var postP =  fun.getPostParameter(data);
                return $http({
                    method: 'POST',
                    url: url,
                    data: postP.data
                });
            };

            /**
             * 根据文件夹删除文件
             * unionId
             * tenantId
             * @param data
             * @returns {*}
             */
            service.xnTalkFolderFileByIdsDelete = function (data) {
                data.method="xntalk.folderFileByIds.delete";
                var postP =  fun.getPostParameter(data);
                return $http({
                    method: 'POST',
                    url: url,
                    data: postP.data
                });
            };
            /**
             * 删除文件
             * unionId
             * tenantId
             * @param data
             * @returns {*}
             */
            service.xnTalkFolderFileDelete = function (data) {
                data.method="xntalk.folderFile.delete";
                var postP =  fun.getPostParameter(data);
                return $http({
                    method: 'POST',
                    url: url,
                    data: postP.data
                });
            };
 
            service.getDiskByObjectId = function (data) {
                data.method="xntalk.diskByObjectId.get";
                var postP =  fun.getPostParameter(data);
                console.log(url)
                console.log(postP)

                return $http({
                    method: 'POST',
                    url: url,
                    dataType: "json",
                    data: postP.data
                });
            };

            /**
             * 获取文件
             * DiskGetRequest
             * unionId
             * tenantId
             * @param data
             * @returns {*}
             */
            service.diskGetRequest = function (data) {
                data.method="xntalk.disk.get";
                var postP =  fun.getPostParameter(data);
                return $http({
                    method: 'POST',
                    url: url,
                    data: postP.data
                });
            };

            /**
             * 获取文件
             * DiskGetRequest
             * unionId
             * tenantId
             * @param data
             * @returns {*}
             */
            service.xntalkFolderFileFind = function (data) {
                data.method="xntalk.folderFile.find";
                var postP =  fun.getPostParameter(data);
                return $http({
                    method: 'POST',
                    url: url,
                    data: postP.data
                });
            };

            service.xnTalkFolderCreate = function (data) {
                data.method="xntalk.folder.create";
                var postP =  fun.getPostParameter(data);
                return $http({
                    method: 'POST',
                    url: url,
                    data: postP.data
                });
            };
            service.xnTalkFolderFileCreate = function (data) {
                data.method="'xntalk.folderFile.create";
                var postP =  fun.getPostParameter(data);
                return $http({
                    method: 'POST',
                    url: url,
                    data: postP.data
                });
            };
            service.xnTalkFolderUpdate = function (data) {
                data.method="xntalk.folder.update";
                var postP =  fun.getPostParameter(data);
                return $http({
                    method: 'POST',
                    url: url,
                    data: postP.data
                });
            };

            service.xnTalkFolderFileUpdate = function (data) {
                data.method="xntalk.folderFile.update";
                var postP =  fun.getPostParameter(data);
                return $http({
                    method: 'POST',
                    url: url,
                    data: postP.data
                });
            };
            service.xnTalkFolderFileMove = function (data) {
                data.method="xntalk.folderFile.move";
                var postP =  fun.getPostParameter(data);
                return $http({
                    method: 'POST',
                    url: url,
                    data: postP.data
                });
            };
            service.xnTalkFolderFind = function (data) {
                data.method="xntalk.folder.find";
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