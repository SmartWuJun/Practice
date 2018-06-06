/**
 * Created by DEV005 on 2017/5/15.
 */

(function () {
    "use strict";
    var remote=require('electron').remote;
    var electron = require('electron'); // 控制应用生命周期的模块。
    var BrowserWindow = electron.remote.BrowserWindow;  // 创建原生浏览器窗口的模块
    angular.module('myApp')
        .controller("BodyController", ["$scope","xnConfig", "talkService","xnAppTool","dialogService",function ($scope,xnConfig,talkService,xnAppTool,dialogService) {

    $scope.global={
        nav:1,
        platform:xnConfig.platform,  //系统环境
        tenant:{},
        showInfo:false,
        appInfo:xnConfig.appInfo
    };
    /**
     * 切换栏目
     */

    $scope.tabNav=function (name,router) {
        // $scope.global.nav=number;
        window.location.href=remote.getGlobal('dirname')+"/"+name+"/page/main.html#/"+router;
    //     var	mainWindow = new BrowserWindow({frame: false, resizable: true,center:true, useContentSize:true,class:'Main',width:960, height: 620,minWidth:960,webPreferences:	{
    //             webSecurity: false,allowDisplayingInsecureContent:true, allowRunningInsecureContent:true
    //         }
    //     });
    //
    //     mainWindow.setMenuBarVisibility(false);
    //     if(remote.getGlobal('isDebug') == true){
    //         mainWindow.openDevTools();
    //     }
    //     mainWindow.class = 'Main';
    //     // 加载应用的 index.html
    //     mainWindow.loadURL(remote.getGlobal('dirname')+"/"+name+"/page/main.html#/"+router);
    //
    //     if(remote.getGlobal('isDebug')){
    //         mainWindow.setSize(1800, 1268);
    //     }
    //
    //     mainWindow.center();
    };

    /**
     * 获取承租人
     * */
    $scope.tenantList=[];
            
    function getTenant () {

        talkService.xnTalkAllTenantListGet({unionId:xnAppTool.getStorage("uid")}).success(function (data) {
            console.log(data)
            if (data.errors == null || data.errors.length > 0){
                dialogService.tip(data.errors);
            }else {
                $scope.tenantList = data.result;
                $scope.global.tenant=$scope.tenantList[0];
            }
        });
    };

       getTenant()

    /**
     * 获取用户
     */
    this.getAvatar=function (name) {
        var re=/^((http|https|ftp):\/\/)?(\w(\:\w)?@)?([0-9a-z_-]+\.)*?([a-z0-9-]+\.[a-z]{2,6}(\.[a-z]{2})?(\:[0-9]{2,6})?)((\/[^?#<>\/\\*":]*)+(\?[^#]*)?(#.*)?)?$/i;
        if(re.test(url)){
            return url+"?imageView&thumbnail=80x80&quality=85";
        }else{
            return "images/default-icon.png"
        }
    };


    // function getUser() {
    //     xnAppTool.setStorage('nickName',user.nick);
    //     xnAppTool.setStorage('avatar',user.avatar);
    // }

        
    /**
     * 关闭工程
     */
    $scope.xnTalkClose=function () {

        // window.location.href = '/index.html';

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
                    xnAppTool.clearStorage()
                } catch (e){
                }
                require('electron').remote.app.quit();
            }
        });
    };

    /**
     * 最大化
     */
    $scope.xnTalkMaximize=function () {
        if (require('electron').remote.getCurrentWindow().isMaximized()) {
            require('electron').remote.getCurrentWindow().restore();
        } else {
            require('electron').remote.getCurrentWindow().maximize();
        }
    };
    /**
     * 最小化
     */
    $scope.xnTalkMinimizable=function () {
        require('electron').remote.BrowserWindow.getFocusedWindow().minimize();
    };
    //关于我们及更多设置
     $scope.showInfo=function (active) {
         $scope.global.showInfo=active;
     }
        
}]);
})();