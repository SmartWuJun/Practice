/**
 * Created by DEV005 on 2017/5/15.
 */
(function () {
    "use strict";
    
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
    $scope.tabNav=function (number) {
        $scope.global.nav=number;
    };

    /**
     * 获取承租人
     * */
    $scope.tenantList=[];
    function getTenant () {
        talkService.xnTalkAllTenantListGet({unionId:xnAppTool.readCookie("uid")}).success(function (data) {
            if (data.errors == null || data.errors.length > 0){
                dialogService.tip(data.errors);
            }else {
                $scope.tenantList = data.result;
                $scope.global.tenant=$scope.tenantList[0];
            }
        });
    };

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
    //     xnAppTool.setCookie('nickName',user.nick);
    //     xnAppTool.setCookie('avatar',user.avatar);
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
                    xnAppTool.clearCookie()
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