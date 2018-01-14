
    (function () {
        "use strict";

        var getPostParameter = function (request ,app_key,secret) {
            //读取cookies
            function readCookie(name) {
                var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
                if(arr=document.cookie.match(reg)){
                    return unescape(arr[2]);
                }else{
                    return null;
                }
            }
            //300017
            var app_key = app_key; //dev
            var secret = secret; //dev
            var post_data = '';
            var param_array = new Object();
            var session = readCookie('xn_session')||0;

            if(session != undefined && session != null && session > 0)
            {
                param_array.session = session;
            }
            param_array.format='json';
            param_array.sign_method='md5';
            param_array.timestamp = Date.parse(new Date());
            param_array.app_key = app_key;
            param_array.v = '1.0';

            for ( var p in request ){ // 方法
                if ( request [ p ] != null && request [ p ] != undefined  &&  typeof ( request [ p ]) != "function" ){

                    param_array[p] =  request [ p ];
                }
            }
            {
                var param_sign;
                var arrayKey = [];
                var strTemp;
                var arrayKeyTemp = [];
                for ( var p in param_array ){ // 方法
                    if ( typeof ( param_array [ p ]) != "function"   ){
                        arrayKeyTemp.push(p);
                        // console.log(param_array [ p ] );
                    }
                } // 最后显示所有的属性
                arrayKeyTemp.sort();
                var strTemp = secret;
                for(var i=0; i<arrayKeyTemp.length; i++)
                {
                    if(angular.isArray( param_array[arrayKeyTemp[i]]))
                    {
                        strTemp = strTemp  + arrayKeyTemp[i] +   JSON.stringify( param_array[arrayKeyTemp[i]] )   ;
                    }
                    else
                    {

                        strTemp = strTemp  + arrayKeyTemp[i] +      param_array[arrayKeyTemp[i]]  ;
                    }

                }
                strTemp = strTemp + secret;

                param_sign =  MD5(strTemp).toUpperCase();

                post_data = 'sign=' + param_sign.toUpperCase();
                for(var i=0; i<arrayKeyTemp.length; i++)
                {
                    if(angular.isArray( param_array[arrayKeyTemp[i]]))
                    {
                        post_data =  post_data  +  '&' +  arrayKeyTemp[i] + '=' + encodeURI(JSON.stringify( param_array[arrayKeyTemp[i]] ))  ;
                    }
                    else
                    {
                        post_data =  post_data  +  '&' +  arrayKeyTemp[i] + '=' + encodeURI(param_array[arrayKeyTemp[i]])  ;
                    }

                }

            }

            var post_url;
            if(require('electron').remote.getGlobal('isDev') != true){
                post_url = 'https://xntalk-api.xiniunet.com/router?';
            }else{
                post_url = 'https://xntalk-api-dev.xiniunet.com/router?';
                //  post_url = 'http://127.0.0.1:8088/router?';
            }

            var returnValue = {};
            returnValue.url = post_url;
            returnValue.data = post_data;
            return returnValue;
        };
        angular.module("xn.talk.service", [])
            .config(['$httpProvider',
                function ($httpProvider) {
                    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
                    $httpProvider.defaults.withCredentials=true;
                    $httpProvider.defaults.useXDomain = true;
                }])
            .factory('talkService', ['$http', function ($http) {
                var url =require('electron').remote.getGlobal('serveUrl');
                var app_key =require('electron').remote.getGlobal('app_key');
                var secret =require('electron').remote.getGlobal('secret');

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
                    var postP = getPostParameter(data,app_key,secret);
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
                    var postP = getPostParameter(data,app_key,secret);
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
                    var postP = getPostParameter(data,app_key,secret);
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
                    var postP = getPostParameter(data,app_key,secret);
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
                    var postP = getPostParameter(data,app_key,secret);
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
                    var postP = getPostParameter(data,app_key,secret);
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
                    var postP = getPostParameter(data,app_key,secret);
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
                    var postP = getPostParameter(data,app_key,secret);
                    return $http({
                        method: 'POST',
                        url: url,
                        data: postP.data
                    });
                };

                return service;
            }])
    })();