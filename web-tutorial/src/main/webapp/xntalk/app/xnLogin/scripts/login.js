"use strict";
var remote=require('electron').remote;
var electron = require('electron'); // 控制应用生命周期的模块。
var BrowserWindow = electron.remote.BrowserWindow;  // 创建原生浏览器窗口的模块

var ref = [
	"xn.common",
	"xn.service.interceptor",
	"xn.talk.service",
	"xn.talk.method",
	"ui.bootstrap",
	"xn.directive.form",
	"monospaced.qrcode"
];
var app = angular.module("myApp", ref);

app.value("xnConfig",{
	isDev:remote.getGlobal('isDev'),
	platform:remote.getGlobal('platform')
});
//拦截器
app.config(["$httpProvider", function ($httpProvider) {
	$httpProvider.interceptors.push("httpInterceptor");
}]);
// 全局配置 form提交验证
app.config(["xnValidatorProvider", function (xnValidatorProvider) {
	// 全局配置
	xnValidatorProvider.config({
		blurTrig: false,
		showError: false,
		removeError: false
	});
	xnValidatorProvider.setRules({
		account:{
			required : "用户名不能为空！"
		},
		password:{
			required : "密码不能为空！"
		}
	});
}]);
app.controller("BodyController", ["$scope", "talkService","xnAppTool","dialogService",function ($scope ,talkService,xnAppTool,dialogService) {


	$scope.global={
		tab:"ACCOUNT"
	};

	//路径跳转
	$scope.winLogin=function (account, pwd) {
		xnAppTool.setCookie('uid',account.toLocaleLowerCase());
		xnAppTool.setCookie('sdktoken',pwd);//MD5

		var	mainWindow = new BrowserWindow({frame: false, resizable: true,center:true, useContentSize:true,class:'Main',width:960, height: 620,minWidth:960,
			webPreferences:	{
				webSecurity: false,allowDisplayingInsecureContent:true, allowRunningInsecureContent:true
			}
		});
		mainWindow.setMenuBarVisibility(false);
		if(remote.getGlobal('isDebug') == true){
			mainWindow.openDevTools();
		}
		mainWindow.class = 'Main';
		// 加载应用的 index.html
		mainWindow.loadURL(remote.getGlobal('dirname')+"/xnTalk/page/main.html");

		if(remote.getGlobal('isDebug')){
			mainWindow.setSize(1024, 768);
		}

		mainWindow.center();
		window.close();
	};
	
	//正常登陆
	$scope.vm={
		account:null,
		password:null
	};



	$scope.doLogin=function () {

		if(!$scope.vm.account){
			$scope.uniteFormErrors="用户名不能为空！";
			return;
		}

		if(!$scope.vm.password){
			$scope.uniteFormErrors="密码不能为空！";
			return;
		}

		var vm={
			account:$scope.vm.account,
			password:MD5($scope.vm.password),
			deviceId:"0",
			deviceType:"PC",
			id:"127.0.0.1"
		};

		talkService.login(vm).success(function (data) {
			if (data.errors == null || data.errors.length > 0){
				dialogService.tip(data.errors);
			}else {
				xnAppTool.setCookie('xn_session',data.identity.id);//MD5
				$scope.winLogin(data.union.id, data.union.id)
			}
		});
	};
	
	//扫码登陆
	$scope.code={
		loginId:null,
		interval:null
	};
	function bCheckLogin () {
		talkService.scanLoginGet({id:$scope.code.loginId}).success(function (data) {
			if(data.identity != null && data.identity != undefined){
				$scope.winLogin(data.identity.unionId, data.identity.unionId)
			}
		});
	};

	function createScanLogin() {
		talkService.scanLoginCreate({}).success(function (data) {
			$scope.code.loginId=data.id;
			if($scope.global.tab=="QRCODE"){
				$scope.code.interval=setInterval(bCheckLogin, 1000);
			}
		});
	}

	//切换
	$scope.tab=function (type) {
		$scope.global.tab=type;

		if(type=='QRCODE'){
			/*扫码*/
			createScanLogin();
		}else {
			window.clearInterval($scope.code.interval);
		}
	};

	
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
					delCookie('uid');
					delCookie('sdktoken');
				} catch (e){
				}
				require('electron').remote.app.quit();
			}
		});
	};
}]);
