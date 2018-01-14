

(function (win,$) {
    "use strict";

    var remote=require('electron').remote;
    var fun=require(remote.getGlobal("dirname")+"/config/fun.js");
    var url =require('electron').remote.getGlobal('serveUrl');
    var xnService =win.xnService={};



    xnService.xnTalkAllTenantListGet=function (data) {
        data.method="xntalk.allTenantList.get";
        var postP =  fun.getPostParameter(data);
        
        return  $.ajax({
            contentType:"application/x-www-form-urlencoded;charset=UTF-8",
            type: "post",
            url: url,
            dataType: "json",
            data: postP.data
        });
    }

})(window,$);