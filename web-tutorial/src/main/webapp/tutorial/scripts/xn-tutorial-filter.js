(function(){
    "use strict";
    angular.module("xn.tutorial.filter", [])
        .filter("employeeSex", [
            function () {
                return function (input) {
                    var sex="未知";
                    switch (input)
                    {
                        case "FEMALE":
                            sex="女";
                            break;
                        case "MALE":
                            sex="男";
                            break;
                        default :
                            sex="未知";
                            break;
                    }
                    return sex;
                };
            }
        ])
        .filter("leaveType", [
            function () {
                return function (input) {
                    var item="未知";
                    switch (input)
                    {
                        case "PERSONAL_LEAVE":
                            item="事假";
                            break;
                        case "SICK_LEAVE":
                            item="病假";
                            break;
                        case "ANNUAL_LEAVE":
                            item="年假";
                            break;
                        case "DEFERED_LEAVE":
                            item="调休";
                            break;
                        case "MARITAL_LEAVE":
                            item="婚假";
                            break;
                        case "FUNERAL_LEAVE":
                            item="丧假";
                            break;
                        case "MATERNITY_LEAVE":
                            item="产假";
                            break;
                        case "NURSE_LEAVE":
                            item="看护假";
                            break;
                        default :
                            item="未知";
                            break;
                    }
                    return item;
                };
            }
        ])
        .filter("approvefilter", [
            function () {
                return function (input) {
                    switch (input)
                    {
                        case "APPROVED":
                            input="同意";
                            break;
                        case "REJECTED":
                            input="拒绝";
                            break;
                        default:
                            input=input;
                            break;
                    }
                    return input;
                };
            }
        ])
        .filter("videoStatusType",[
            function(){
                return function(input){
                    switch(input){
                        case 1:
                            input = "待上传";
                            break;
                        case 2:
                            input ="上传中";
                            break;
                        case 4:
                            input ="上传失败";
                            break;
                        case 5:
                            input ="上传完成";
                            break;
                        default :
                            break;
                    }
                    return input;
                }
            }
        ])
        .filter("fileSize",[function() {
            return function (input) {
                if(input){
                    if (input < 1024) {
                        return input + "B";
                    } else if (input < 1024 * 1024) {
                        return Math.round(input / 1024) + "KB";
                    } else if (input < 1024 * 1024 * 1024){
                        return (input / 1024 / 1024).toFixed(2) + "MB";
                    } else {
                        return (input / 1024 / 1024 / 1024).toFixed(2) + "GB";
                    }
                }
            };
        }])
        .filter("duration", [
            function() {
                return function (duration) {
                    if(duration == undefined || duration == "") {
                        return "0秒";
                    }
                    if(duration < 60) {
                        return duration + "秒";
                    } else if(duration < 3600) {
                        return parseInt(duration / 60) + "分" + duration % 60 + "秒";
                    } else {
                        return parseInt(duration / 3600) + "时" + parseInt(duration / 60) + "分" + duration % 60 + "秒";
                    }
                }
            }
        ])
})();