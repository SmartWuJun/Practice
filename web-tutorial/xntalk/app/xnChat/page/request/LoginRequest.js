/**
 * Created by YQ on 2016/6/16.
 */
//function PosLoginRequest()
//{
//    this.setUserAccount = function(value)
//    {
//        this.userAccount = value;
//    };
//    this.setPassword = function(value)
//    {
//        this.password = value;
//    };
//    this.setTenantNumber = function(value)
//    {
//        this.tenantNumber = value;
//    };
//};



function LoginRequest()
{
    this.method = 'xntalk.login';
    this.getAccount = function(){
        return this.account;
    };

    this.setAccount = function(account) {
        this.account = account;
    };

    this.getPassword = function(){
        return this.password;
    };

    this.setPassword = function(password) {
        this.password = password;
    };

    this.getDeviceType = function(){
        return this.deviceType;
    };

    this.setDeviceType = function( deviceType) {
        this.deviceType = deviceType;
    };

    this.getDeviceId = function() {
        return this.deviceId;
    };

    this. setDeviceId = function( deviceId) {
        this.deviceId = deviceId;
    };

    this.getIp = function() {
        return this.ip;
    };

    this. setIp = function( ip) {
        this.ip = ip;
    };
}


