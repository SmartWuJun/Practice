/**
 * Created by DEV005 on 2017/8/15.
 */

const fs = require("fs");
const package=require( "./package.json");

let config={
    isDev:false,
    isDebug:false,
    dirname:__dirname,
    // win32 、linux、darwin
    platform:process.platform,
    serveUrl:"https://xntalk-api.xiniunet.com/router?",
    app_key:"0617CA8376F9901F28FF46B69BF9CF47",
    secret:"28570C9D069ED51226DD9F028BD5E6DC",

    appKey:"708e73e559eb1c86b6573f72c47afbdc",
    //配置信息
    appInfo:JSON.stringify(package),
};


//开发环境
if(config.isDev){
    config.serveUrl="https://xntalk-api-dev.xiniunet.com/router?";
    config.app_key="0617CA8376F9901F28FF46B69BF9CF44";
    config.secret="28570C9D069ED51226DD9F028BD5E6DD";
    config.appKey='232b9bc7c221f25576e3b80458fb812f';
}


module.exports=config;