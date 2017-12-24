(function () {
    "use strict";
    angular.module("xn.filter.common", [])
        .filter("titleCase", function () {
            return function (input) {
                var words = input.split(" ");
                for (var i = 0; i < words.length; i++) {
                    words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
                }
                return words.join(" ");
            };
        })
        .filter('pageOffset', function() {
            return function(input, start) {
                if(input){
                    start = parseInt(start, 10);
                    return input.slice(start);
                };
            }
        })
        .filter('substr', function() {
            return function(input,start) {

                String.prototype.lengthB = function( ){
                    var b = 0, l = this.length;
                    if( l ){
                        for( var i = 0; i < l; i ++ ){
                            if(this.charCodeAt( i ) > 255 ){
                                b += 2;
                            }else{
                                b ++ ;
                            }
                        }
                        return b;
                    }else{
                        return 0;
                    }
                };

                if(input){
                    var data="";
                    if(start){
                        if(input.lengthB()>start){
                            data =input.substr(0, start)+"...";
                        }else{
                            data =input.substr(0, start)
                        }
                    }else{
                        data=input;
                    }
                    return data;
                };
            }
        })
        .filter("isImg", [
            function (){
                return function (input) {
                    var filename=[];
                    var state=false;
                    var index=input.lastIndexOf(".");
                    filename=input.substring(index+1);
                    switch (filename)
                    {   case "gif":
                        case "bmp":
                        case "jpeg":
                        case "jpg":
                        case "png":
                            state=true;
                            break;
                    }

                    return state;
                };
            }
        ])

        .filter("money", function () {
            return function (input, retain, isState, sign) {
                /**
                 * retain  小数的位数
                 * isState  小数是否保留0，true为保留，falase为舍弃
                 * @type {boolean}
                 */
                if(!retain)
                    retain = 2;
                if(!isState)
                    isState = false;
                if(sign==undefined)
                    sign = "￥";
                if(input){
                    var number=Number(retain);
                    var moneyList =[];
                    moneyList =Number(input).toFixed(number).toString().split(".");
                    var money = moneyList[0].split("");
                    var frac = moneyList[1].split("");
                    frac.unshift(".");
                    //整数加“，”
                    var index=0;
                    if(money[0]==="-"){
                        for( var i=money.length;i>1;i--){
                            index++;
                            if(index%4===0){
                                money.splice(i,0,",");
                                index++;
                            }
                        }
                        index=0;
                    }else{
                        for( var i=money.length;i>0;i--){
                            index++;
                            if(index%4===0){
                                money.splice(i,0,",");
                                index++;
                            }
                        }
                        index=0;
                    }
                    //小数舍弃
                    if(!isState){
                        for(var i=frac.length ; i>3;i--){
                            if(frac[i-1]==0){
                                frac.pop();
                            }else{
                                break;
                            }
                        }
                    }
                    money=money.concat(frac);
                    money.splice(0,0,""+sign);
                    return money.join("");
                }else{
                    return sign+"0.00";
                }
            };
        })

        .filter("moneySingle", function () {
            return function (input,retain,isState) {
                /**
                 * retain  小数的位数
                 * isState  小数是否保留0，true为保留，false为舍弃
                 * @type {boolean}
                 */

                var state =false;
                if(isState){
                    state=true;
                }

                if(!isNaN(input)){
                    var number=2;
                    if(retain){
                        number=Number(retain);
                    }

                    var moneyList =[];
                    moneyList =Number(input).toFixed(number).toString().split(".");

                    var money = moneyList[0].split("");
                    var frac = moneyList[1].split("");
                    frac.unshift(".");


                    //整数加“，”
                    var index=0;
                    if(money[0]==="-"){
                        for( var i=money.length;i>1;i--){
                            index++;
                            if(index%4===0){
                                money.splice(i,0,",");
                                index++;
                            }
                        }
                        index=0;
                    }else{
                        for( var i=money.length;i>0;i--){
                            index++;
                            if(index%4===0){
                                money.splice(i,0,",");
                                index++;
                            }
                        }
                        index=0;
                    }

                    //小数舍弃

                    if(!state){
                        for(var i=frac.length ; i>3;i--){
                            if(frac[i-1]==0){
                                frac.pop();
                            }else{
                                break;
                            }
                        }
                    }else{}

                    money=money.concat(frac);
                    money.splice(0,0," ");
                    return money.join("");
                }else{
                    return "0.00";
                }
            };
        })
        .filter("moneyNoSymbol", function () {
            return function (input) {
                if(input){
                    var money = Number(input).toFixed(2).toString().split("");
                    var index=0;
                    if(money[0]==="-"){
                        for( var i=money.length-3;i>1;i--){
                            index++;
                            if(index%4===0){
                                money.splice(i,0,",");
                                index++;
                            }
                        }
                        index=0;
                    }else{
                        for( var i=money.length-3;i>0;i--){
                            index++;
                            if(index%4===0){
                                money.splice(i,0,",");
                                index++;
                            }
                        }
                        index=0;
                    }
                    return money.join("");
                }else{
                    return "0.00";
                }
            };
        })
        .filter("moneyCharacter", [
            function () {
                return function (input) {
                    var money="";
                    switch (input)
                    {
                        case "0":
                            money="零";
                            break;
                        case "1":
                            money="壹";
                            break;
                        case "2":
                            money="贰";
                            break;
                        case "3":
                            money="叁";
                            break;
                        case "4":
                            money="肆";
                            break;
                        case "5":
                            money="伍";
                            break;
                        case "6":
                            money="陆";
                            break;
                        case "7":
                            money="柒";
                            break;
                        case "8":
                            money="捌";
                            break;
                        case "9":
                            money="玖";
                            break;
                        default :
                            money="";
                            break;

                    }
                    return money;
                };
            }
        ])
        .filter("website", function () {
            return function (input) {
                var website = input;
                if(website != null && website.length > 4){
                    if (input.substring(0, 4) != "http") {
                        website = ( "http://" + input);
                    }
                }
                return website;
            };
        })
        .filter("percent", function () {
            return function (input) {
                if(input){
                    var percent=Number(input*100).toFixed(2);
                    percent=percent+"%";
                    return percent;
                }else{
                    return  input;
                }

            };
        })
        .filter("intPercent", function () {
            return function (input) {
                if(input){
                    var percent=Number(input*100).toFixed(0);
                    percent=percent+"%";
                    return percent;
                }else{
                    return  input;
                }

            };
        })
        .filter("mobilePhone", function () {
            return function (input) {
                var phone = input;

                if (input && input.length === 11) {
                    phone = (input.substring(0, 3) + " " + input.substring(3, 7) + " " + input.substring(7, 11));
                }
                return phone;
            };
        })
        .filter("firstText", [
            function () {
                return function (input) {
                    return input ? input.substring(0, 1).toLocaleUpperCase() : "";
                };
            }
        ])
        .filter("dateFormat", [
            function () {
                return function (input) {
                    input=Number(input);
                    return input ?  moment(input).format("YYYY-MM-DD") : "";
                };
            }
        ])
        .filter("timeFullFormat", [
            function () {
                return function (input) {
                    input=Number(input);
                    return input ?  moment(input).format("YYYY-MM-DD HH:mm") : "";
                };
            }
        ])
        .filter("timeReturnFormat", [
            function () {
                return function (input) {

                    if(input){
                        if(input.indexOf(" ")==10){
                            var time ;
                            time =input.substr(0,10)+"\r\n"+input.substr(11,5);
                            return time ;
                        }else{
                            input=Number(input);
                            return input ?  moment(input).format("YYYY-MM-DD")+ "\r\n" + moment(input).format("HH:mm") : "";
                        }
                    }else{
                        return;
                    }

                };
            }
        ])
        .filter("timeFormat", [
            function () {
                return function (input) {
                    input=Number(input);
                    return input ?  moment(input).format("HH:mm") : "";
                };
            }
        ])
        .filter("sex", [
            function () {
                return function (input) {
                    var sex="未知";
                    switch (input)
                    {
                        case "F":
                            sex="女";
                            break;
                        case "M":
                            sex="男";
                            break;
                        case "X":
                            sex="保密";
                            break;
                        default :
                            sex="未知";
                            break;

                    }
                    return sex;
                };
            }
        ])
        .filter("sexIcon", [
            function () {
                return function (input) {
                    var icon="icon-user";
                    switch (input)
                    {
                        case "F":
                            icon="icon-female";
                            break;
                        case "M":
                            icon="icon-male";
                            break;
                        default :
                            break;

                    }
                    return icon;
                };
            }
        ])
        .filter("isActive", [
            function () {
                return function (input) {
                    var isActive="有效";
                    switch (input)
                    {
                        case false:
                            isActive="无效";
                            break;
                        case true:
                            isActive="有效";
                            break;
                        default :
                            break;

                    }
                    return isActive;
                };
            }
        ])
        .filter("yesNo", [
            function () {
                return function (input) {
                    var yesNo="";
                    switch (input)
                    {
                        case false:
                            yesNo="否";
                            break;
                        case true:
                            yesNo="是";
                            break;
                        default :
                            break;

                    }
                    return yesNo;
                };
            }
        ])
        .filter("moneyType", [
            function () {
                return function (input) {
                    switch (input)
                    {
                        case "CNY":
                            input="人民币";
                            break;
                        case "HKD":
                            input="港币";
                            break;
                        case "USD":
                            input="美元";
                            break;
                    }
                    return input;
                };
            }
        ])
        .filter("xnSearch", [
            function () {
                return function (arr, key) {
                    if(!key) {
                        return arr;
                    } else {
                        var list = [];
                        for(var i=0; i<arr.length; i++) {
                            if(arr[i].name.indexOf(key)>=0)
                                list.push(arr[i]);
                        }
                        return list;
                    }
                };
            }
        ]);

})();
