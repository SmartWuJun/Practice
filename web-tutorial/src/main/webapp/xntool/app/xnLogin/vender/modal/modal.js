"use strict";
const crypto = require('crypto');
var encryptUtils = new Object();
encryptUtils.aesEncrypt = function(data, secretKey) {
    var cipher = crypto.createCipher('aes-256-ctr',secretKey)
    var crypted = cipher.update(data,'utf8','hex')
    crypted += cipher.final('hex');
    return crypted;
};

/**
 * aes解密
 * @param data
 * @param secretKey
 * @returns {*}
 */
encryptUtils.aesDecrypt = function(text, secretKey) {
    var decipher = crypto.createDecipher('aes-256-ctr',secretKey)
    var dec = decipher.update(text,'hex','utf8')
    dec += decipher.final('utf8');
    return dec;
};
var Modal = new function()
{
    function f_check_uppercase(obj)
    {
        if (/^[A-Z]+$/.test( obj.value ))
        {
            return true;
        }

        return false;
    }
    var setMemberVariable = ['        this.get#Name# = function() {',
        '            return this.prototype.jsonObject["#name#"];',
        '        };',
        '        this.set#Name# = function(value){',
        '            this.prototype.jsonObject["#name#"] = value;',
        '        };',
        '        this.has#Name# = function()',
        '        {',
        '            if(this.prototype.jsonObject["#name#"] == undefined || this.prototype.jsonObject["#name#"] == null)',
        '            {',
        '                return false;',
        '            }',
        '            return true;',
        '        };'].join("");
    var getMemberVariableDefineString = function(name)
    {
        if (f_check_uppercase(name.substr(0, 1)) == true)
        {
            return setMemberVariable.replace(/#Name#/g, name).replace(/#name#/g, name.substr(0, 1).toLowerCase() + name.substr(1));
        }
        else
        {
            return setMemberVariable.replace(/#name#/g, name).replace(/#Name#/g, name.substr(0, 1).toUpperCase() + name.substr(1));
        }
    }

    this.Modal = function(json) {
        this.jsonObject = null;
        if (json != undefined && json != null )
        {
            if(typeof (json) == "string" && json.length > 0)
            {
                this.jsonObject = JSON.parse(json);
            }
            else if(typeof (json) == "object")
            {
                this.jsonObject = json;
            }
            else
            {
                this.jsonObject = new Object();
            }
        }
        else
        {
            this.jsonObject = new Object();
        }

        this.getJsonString = function()
        {
            return JSON.stringify(this.jsonObject);
        };
    };

    this.Union = function()
    {
        this.prototype = (new Modal.Modal());
        this.getAccount = function() {
            return this.prototype.jsonObject["account"];
        };

        this.setAccount = function(value){
            this.prototype.jsonObject["account"] = value;
        };
        this.hasAccount = function()
        {
            if(this.prototype.jsonObject["account"] == undefined || this.prototype.jsonObject["account"] == null)
            {
                return false;
            }
            return true;
        };

    };

    this.User = function(json)
    {
        this.prototype = (new Modal.Modal(json));
        eval(getMemberVariableDefineString("id"));
        eval(getMemberVariableDefineString("tenantId"));
        eval(getMemberVariableDefineString("account"));
        eval(getMemberVariableDefineString("name"));
        eval(getMemberVariableDefineString("nickName"));
        eval(getMemberVariableDefineString("email"));
        eval(getMemberVariableDefineString("isEmailBind"));
        eval(getMemberVariableDefineString("mobilePhone"));
        eval(getMemberVariableDefineString("isMobileBind"));
        eval(getMemberVariableDefineString("isActive"));
        eval(getMemberVariableDefineString("avatarId"));
        eval(getMemberVariableDefineString("avatar"));
        eval(getMemberVariableDefineString("activeDate"));
        eval(getMemberVariableDefineString("Date"));
        eval(getMemberVariableDefineString("sourceType"));
        eval(getMemberVariableDefineString("sourceId"));
        eval(getMemberVariableDefineString("diskId"));
        eval(getMemberVariableDefineString("brief"));
        eval(getMemberVariableDefineString("isBindIm"));
        eval(getMemberVariableDefineString("unionId"));

    };

    this.XNTalkConfig = function(json)
    {
        var that = this;

        this.prototype = (new Modal.Modal(json));
        this.saveConfig = function(callback)
        {
            var fs = require("fs");
            if(fs != null)
            {
                var electron =  require('electron');
                if(electron != null)
                {
                    var data = encryptUtils.aesEncrypt(this.prototype.getJsonString(), "111");
                    console.log("######################" + data);
                    fs.writeFile(electron.remote.app.getAppPath() +'/xntalk/xntalk.config' ,data,  {flags: 'w'}, function(err)
                    {
                        console.log(err);
                        if(callback != null)
                        {
                            callback(err);
                        }
                    });

                }

            }
        };

        this.loadConfig = function(callback)
        {
            var fs = require("fs");
            if(fs != null)
            {
                var electron =  require('electron');
                if(electron != null)
                {
                    fs.readFile(electron.remote.app.getAppPath() +'/xntalk/xntalk.config', {encoding:'utf-8'}, function (err,bytesRead) {
                        if (err) callback(err);
                        var data = encryptUtils.aesDecrypt(bytesRead, "111");
                        that.prototype = (new Modal.Modal(data));
                        if(callback != null)
                        {
                            console.log("#################callback");

                            callback();
                        }
                    });
                }

            }
        };
        this.setRecentUser = function(value)
        {
            this.prototype.jsonObject["recentUser"] = value;
        };
        this.getRecentUser = function()
        {
            return this.prototype.jsonObject["recentUser"];
        };
        this.hasRecentUser = function()
        {
            if(this.prototype.jsonObject["recentUser"] == undefined || this.prototype.jsonObject["recentUser"] == null)
            {
                return false;
            }
            return true;
        };



        this.setRecentUserPassword = function(value)
        {
            this.prototype.jsonObject["recentUserPassword"] = value;
        };
        this.getRecentUserPassword = function()
        {
            return this.prototype.jsonObject["recentUserPassword"];
        };

    };
};


