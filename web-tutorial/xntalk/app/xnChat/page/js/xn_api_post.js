//"use strict";
function isArray(o) {
    return Object.prototype.toString.call(o) === '[object Array]';
}
// var nim_http_post = function (data) {
//     var app_key = '0617CA8376F9901F28FF46B69BF9CF44'; //dev
//
//     var secret = '28570C9D069ED51226DD9F028BD5E6DD'; //dev
//
//     if(require('electron').remote.getGlobal('isDev') != true)
//     {//生产
//         app_key = '0617CA8376F9901F28FF46B69BF9CF47';//
//         secret = '28570C9D069ED51226DD9F028BD5E6DC';
//     }
//     else
//     {
//         app_key = '0617CA8376F9901F28FF46B69BF9CF44'; //dev
//         secret = '28570C9D069ED51226DD9F028BD5E6DD'; //dev
//     }
//
//
//     var appkey = require('electron').remote.getGlobal('appKey') ;
//     var nonce = "1";
//
//     var curTime =  Math.floor((new Date()).getTime() / 1000).toString();
//     var checkSum = SHA1(secret.toLowerCase()+nonce+curTime);
//     $(function(){
//         $.ajax(
//             {
//                 type:'post',
//                 url : 'https://api.netease.im/nimserver/msg/sendMsg.action',
//                 data:JSON.stringify(data),
//                 success  : function(data) {
//                     //data = JSON.parse(data);
//                   //  callback(data);
//                     console.clear();
//                     console.log(data);
//                     // console.log(data);
//                 },
//                 error : function() {
//                     //  alert('fail');
//                     callback("error");
//                 },
//                 headers:{AppKey:'708e73e559eb1c86b6573f72c47afbdc', Nonce:nonce, CurTime:curTime, CheckSum:checkSum, 'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'},
//
//             }
//         );
//     })
// }

var getPostParameter = function (request) {

    //300017
    var app_key = '0617CA8376F9901F28FF46B69BF9CF44'; //dev

    var secret = '28570C9D069ED51226DD9F028BD5E6DD'; //dev

    if(require('electron').remote.getGlobal('isDev') != true)
    {//生产
        app_key = '0617CA8376F9901F28FF46B69BF9CF47';//
        secret = '28570C9D069ED51226DD9F028BD5E6DC';
    }
    else
    {
        app_key = '0617CA8376F9901F28FF46B69BF9CF44'; //dev
        secret = '28570C9D069ED51226DD9F028BD5E6DD'; //dev
    }


    var post_data = '';
    var param_array = new Object();
    this.session = localStorage.getItem('xn_session');



    if(this.session != undefined && this.session != null && this.session > 0)
    {
        param_array.session = this.session;
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
            if(isArray( param_array[arrayKeyTemp[i]]))
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
            if(isArray( param_array[arrayKeyTemp[i]]))
            {
                post_data =  post_data  +  '&' +  arrayKeyTemp[i] + '=' + encodeURI(JSON.stringify( param_array[arrayKeyTemp[i]] ))  ;
            }
            else
            {
                post_data =  post_data  +  '&' +  arrayKeyTemp[i] + '=' + encodeURI(param_array[arrayKeyTemp[i]])  ;
            }

        }

        //  console.log(post_data);
        //console.log(param_sign);
    }


    //var post_option = {
    //    method: "POST",
    //    host: "pos-api-dev.xiniunet.com",
    //    port: 443,
    //    path: "/router",
    //    headers: {
    //        "Content-Type": 'application/x-www-form-urlencoded',
    //        "Content-Length": post_data.length
    //    }
    //};
    console.log(post_data);
    var post_url;
    if(require('electron').remote.getGlobal('isDev') != true)
    {
        post_url = 'https://xntalk-api.xiniunet.com/router?';
    }
    else
    {
        post_url = 'https://xntalk-api-dev.xiniunet.com/router?';
      //  post_url = 'http://127.0.0.1:8088/router?';
    }

    var returnValue = {};
    returnValue.url = post_url;
    returnValue.data = post_data;
    return returnValue;
}
var xn_http_post = function(request,callback){

    var postP = getPostParameter(request);
    $(function(){
        $.ajax(
            {
                type:'post',
                url : postP.url,
                data:postP.data,
                success  : function(data) {
                    if(data.subErrors != null && data.subErrors.length > 0)
                    {
                        if(data.errors == undefined || data.errors == null  || data.errors instanceof Array  == false)
                        {
                            data.errors = [];

                        }
                        data.errors.push(data.subErrors);
                    }
                    //data = JSON.parse(data);
                    callback(data);
                 // console.log(data);
                },
                error : function(error) {

                  //  alert('fail');
                    callback("error");
                }
            }
        );
    })

    //console.log(post_data);
    //var post_request = https.request(post_option, function(res){
    //    res.on('data', function(buffer){
    //        console.log(buffer.toString());
    //    })});
    //post_request.write(post_data);
    //post_request.end();
};
