/**
 * 小程序配置文件
 */

let isDev=true;

var config = {
    apiUrl:'https://api.xiniunet.com/router?',
    app_key:'FEDA506D38D8E930626E850139E74E0C',
    secret:'9019951CC31D86A31D2E911D4BE51142',
};

if(isDev){
    config.apiUrl='https://api-dev.xiniunet.com/router?'
}

module.exports = config;
