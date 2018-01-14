
    (function () {
        "use strict";
        angular.module("xn.talk.method", [])
            .service("xnAppTool",function () {
                "use strict";
                /**
                 * 设置cookie
                 * name:名称
                 *value:值
                 * url:设置网址
                * */
                this.setCookie=function (name,value,url) {
                    var days = 1;
                    var exp = new Date();
                    var url=url||"/";
                    exp.setTime(exp.getTime() + days*24*60*60*1000);
                    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString()+";path="+url+";";
                };
                /**
                 *读取cookies
                 * @param name
                 * @param value
                 * @param url
                 */
                this.readCookie=function (name) {
                    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
                    if(arr=document.cookie.match(reg)){
                        return unescape(arr[2]);
                    }else{
                        return null;
                    }
                };
                /**
                 *删除Cookie
                 * @param name
                 * @returns {null}
                 */
                this.delCookie=function (name) {
                    var cval=readCookie(name);
                    if(cval!=null){
                        document.cookie= name + "="+cval+";expires="+(new Date(0)).toGMTString();
                    }
                };
                
            })
    })();

