(function () {
    var fs = require("fs");
    var remote=require('electron').remote;
    var electron = require('electron'); // 控制应用生命周期的模块。

    "use strict";
   // 根据系统显示不同
    (function () {
        switch ( remote.getGlobal('platform')){
            case "win32":

                $(".talk-logo").show();
                $(".operating-win-layout").show();
                break;
            case "darwin":
            case "linux":
                $(".operating-darwin-layout").show();
                break;
        }
    })();

   // 系统信息
    (function () {
        var appInfo= JSON.parse(remote.getGlobal('appInfo'));
        $("#xnGlobalInfo .name").html(appInfo.name);
        $("#xnGlobalInfo .version").html(appInfo.version);
        $("#xnGlobalInfo .description").html(appInfo.description);
        $("#xnGlobalInfo .author").html(appInfo.author);


        $(".xnGlobalInfo").on("click",function () {
            let  _this=$(this);
            let  status=_this.attr("data-info");
            if(status=="open"){
                $("#xnGlobalInfo").show();
            }else if(status=="close"){
                $("#xnGlobalInfo").hide();
            }
        })

    })();
    
    
   // 路由切换
    (function () {
        $(".xn-app-nav .app-nav").on("click",function () {
            let  _this=$(this);
            let  path=_this.attr("data-href");

            if(path=="xnChat"){
                window.location.href =remote.getGlobal('dirname')+"/xnChat/page/main.html";

            }else if(path=="xnTool") {
                window.location.href =remote.getGlobal('dirname')+"/xnTool/index.html";
            }else {
                let pageDemo=fs.readFileSync( remote.getGlobal('dirname')+"/"+path+"/page/main.html",'utf-8');
                $("#main-view").html(pageDemo)
            }
        })
    })();

    // 顶部操作
    (function () {

        $(".xnGlobalOperating").on("click",function () {
            let  _this=$(this);
            let  operating=_this.attr("data-operating");
            switch (operating){

                case "maximize":
                    if (require('electron').remote.getCurrentWindow().isMaximized()) {
                        require('electron').remote.getCurrentWindow().restore();
                    } else {
                        require('electron').remote.getCurrentWindow().maximize();
                    }
                    break;
                case "minimizable":
                    require('electron').remote.BrowserWindow.getFocusedWindow().minimize();
                    break;
                case "close":
                    const dialog = require('electron').remote.dialog;
                    var dialogOption = {
                        type:'question',
                        title:'退出',
                        buttons:['确定', '取消'],
                        defaultId:0,
                        message:'确定要退出XNTALK吗？',
                        detail:'',
                        cancelId:1
                    };

                    dialog.showMessageBox(dialogOption,function(e){
                        // e 是选择的目录
                        if(e == 0){
                            try {
                                localStorage.clear();
                            } catch (e){
                            }
                            require('electron').remote.app.quit();
                        }
                    });

                    break;
            }

        });

    })();


    //设置头像
    (function () {
        let avatarUrl=localStorage.getItem("avatarUrl");
        console.log(avatarUrl);
        $("#avatarUrl").prop("src",avatarUrl)
    })();


    (function () {
       //  获取承租人

        var vm={
            unionId:localStorage.getItem("uid")
        };
        xnService.xnTalkAllTenantListGet(vm).success(function (data) {
            console.log(data)
            if (data.errors == null || data.errors.length > 0){
                alert(data.errors);
            }else {
                global.tenantList = data.result;
                localStorage.setItem("tenantId",data.result[0].id);
            }
        });

    })()


})();


