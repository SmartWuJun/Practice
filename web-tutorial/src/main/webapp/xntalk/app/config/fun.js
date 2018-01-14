/**
 * Created by DEV005 on 2017/8/15.
 */
const fs = require("fs");
// const MD5=require("vender/md5");

const electron = require('electron'); // 控制应用生命周期的模块。
const BrowserWindow = electron.BrowserWindow;  // 创建原生浏览器窗口的模块

const config = require('../config.js');


/**
 *  启动一个Window
 */
let  createWindow = function (url) {
    /*frame Boolean - 指定 false 来创建一个 Frameless Window. 默认为 true。  是否有边框
     *  useContentSize  使用web网页size, 这意味着实际窗口的size应该包括窗口框架的size，
     *  center  居中
     *  resizable 改变窗口大小
     *  transparent :  背景透明
     *
     *  启动服务为了存储Cookie
     * */

    if(config.isDebug){
        var  window = new BrowserWindow({frame: false, useContentSize:true,center:true, resizable:false, transparent:true,width:12000, height:1000});//
    }else {
        var  window = new BrowserWindow({frame: false, useContentSize:true,center:true, resizable:false, transparent:true,width:960, height:600});//
    }

    window.loadURL(url);
    if(config.isDebug){
        window.openDevTools();
    }
    return window;
};

/**
 *   获取版本号
 */
let getPackage=function () {

     fs.readFile(config.dirname+ "/package.json",{encoding:'utf8',flag:'r'},function readData(err, data) {
        if(err){
            console.log(err);
        }else {
           return JSON.parse(data);
        }
    });
};

/**
 * 传递的参数设置
 * @param request
 * @returns {{}}
 */
let getPostParameter=function (request) {
    //读取cookies
    function readCookie(name) {
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg)){
            return unescape(arr[2]);
        }else{
            return null;
        }
    }

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
    param_array.app_key = config.app_key;
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
        var strTemp = config.secret;
        for(var i=0; i<arrayKeyTemp.length; i++)
        {
            if(Array.isArray( param_array[arrayKeyTemp[i]])){
                strTemp = strTemp  + arrayKeyTemp[i] +   JSON.stringify( param_array[arrayKeyTemp[i]] )   ;
            }else{
                strTemp = strTemp  + arrayKeyTemp[i] +      param_array[arrayKeyTemp[i]]  ;
            }

        }
        strTemp = strTemp + config.secret;

        param_sign =  MD5(strTemp).toUpperCase();

        post_data = 'sign=' + param_sign.toUpperCase();
        for(var i=0; i<arrayKeyTemp.length; i++)
        {
            if(Array.isArray( param_array[arrayKeyTemp[i]]))
            {
                post_data =  post_data  +  '&' +  arrayKeyTemp[i] + '=' + encodeURI(JSON.stringify( param_array[arrayKeyTemp[i]] ))  ;
            }
            else
            {
                post_data =  post_data  +  '&' +  arrayKeyTemp[i] + '=' + encodeURI(param_array[arrayKeyTemp[i]])  ;
            }

        }
    }
    return {
        url:config.serveUrl,
        data:post_data
    };
};


module.exports={
    createWindow:createWindow,
    getPackage:getPackage,
    getPostParameter:getPostParameter
};