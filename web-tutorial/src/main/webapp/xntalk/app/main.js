const fs = require("fs");

const electron = require('electron'); // 控制应用生命周期的模块。
// 控制应用生命周期的模块。
const BrowserWindow = electron.BrowserWindow;  // 创建原生浏览器窗口的模块
const Menu = require('electron').Menu;
const Tray = require('electron').Tray;
const ipcMain = electron.ipcMain; //主进程 与渲染进程 交互
const app = electron.app;

const AutoLaunch = require('auto-launch');  //开机自动启动
const appLauncher = new AutoLaunch({name: 'xnApp'});

const config = require('./config.js');
const fun = require('./config/fun.js');

//赋值给全局变量
for ( var item in config) {
    global[item]=config[item];
}


var tray = null;
// 保持一个对于 window 对象的全局引用，不然，当 JavaScript 被 GC，
// window 会被自动地关闭


//这页列出了Chrome浏览器和Electron支持的命令行开关.
// 你也可以在app模块的ready事件发出之前使用app.commandLine.appendSwitch
// 来添加它们到你应用的main脚本里面:
app.commandLine.appendArgument('enable-file-cookies');
app.commandLine.appendArgument('allow-file-access-from-files');
app.commandLine.appendArgument('allow-displaying-insecure-content');

const nativeImageTray = electron.nativeImage.createFromPath(global.dirname + '/images/20x20-2.png');
const nativeImageTrayMsg = electron.nativeImage.createFromPath(global.dirname +"/images/20x20.png");


try{

// 当 Electron 完成了初始化并且准备创建浏览器窗口的时候
// 这个方法就被调用
    app.on('ready', function() {
        if(process.platform == 'darwin'){
            // Create the Application's main menu
            var template = [{
                label: "Application",
                submenu: [
                    { label: "About Application", selector: "orderFrontStandardAboutPanel:" },
                    { type: "separator" },
                    { label: "Quit", accelerator: "Command+Q", click: function() { app.quit(); }}
                ]}, {
                label: "Edit",
                submenu: [
                    { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
                    { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
                    { type: "separator" },
                    { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
                    { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
                    { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
                    { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
                ]}
            ];
            var menu = Menu.buildFromTemplate(template);
            Menu.setApplicationMenu(menu);
        }

        // 用一个 Tray 来表示一个图标,这个图标处于正在运行的系统的通知区
        tray = new Tray(nativeImageTray);

        var contextTemplate=[
            {label: '开机启动', type: 'checkbox', click:function(){
                if(contextMenu.items[0].checked == true){
                    appLauncher.enable();
                }else {
                    appLauncher.disable();
                }
            }},
            {label: '打开', type: 'normal',click:function(){
                var wins = BrowserWindow.getAllWindows();
                for(var i in wins){
                    console.log(wins[i].webContents);
                    if(wins[i].webContents.getURL().indexOf('login.html') >= 0){
                        wins[i].show();
                        return;
                    }
                    if(wins[i].webContents.getURL().indexOf('main.html') >= 0){
                        wins[i].show();
                        return;
                    }
                }
            }},
            {label: '退出', type: 'normal',click:function(){
                app.quit();
            }}
        ];
        const contextMenu = Menu.buildFromTemplate(contextTemplate);

        appLauncher.isEnabled().then(function(enabled){
            contextMenu.items[0].checked = enabled;
        });

        tray.on('double-click', function(){
            var wins = BrowserWindow.getAllWindows();
            tray.setImage(global.dirname  + "/images/win_icon.ico");
            for(var i in wins) {
                console.log("#####" +wins.length + "#####"  + wins[i].webContents.getURL());
                if(wins[i].webContents.getURL().indexOf('login.html') >= 0){
                    wins[i].show();
                    return;
                } if(wins[i].webContents.getURL().indexOf('main.html') >= 0) {
                    wins[i].show();
                    return;
                }
            }
        });

        tray.setToolTip('犀牛XNTALK');

        tray.setContextMenu(contextMenu);


        var mainWindow=fun.createWindow(global.dirname+"/xnLogin/page/login.html");

        //设置菜单栏是否可见.如果菜单栏自动隐藏，用户仍然可以按下 Alt 键来显示.
        mainWindow.setMenuBarVisibility(false);
        //窗口居中.
        mainWindow.center();
        // 当 window 被关闭，这个事件会被发出
        mainWindow.on('closed', function() {
            // 取消引用 window 对象，如果你的应用支持多窗口的话，
            // 通常会把多个 window 对象存放在一个数组里面，
            // 但这次不是。
            mainWindow = null;
        });
        // In main process.
        //退出
        ipcMain.on('xntalkMessage', function(event, arg1, arg2) {
           if (process.platform != 'darwin'){
                if(arg2 != undefined && arg2 != null && arg2 == "watch"){
                     tray.setImage(nativeImageTray);
                }else{
                    if(BrowserWindow.getFocusedWindow() == null || BrowserWindow.getFocusedWindow().webContents.getURL().indexOf('main.html') < 0){
                        tray.setImage(nativeImageTrayMsg);
                    }
                }
           }
        });
    });
    // 当所有窗口被关闭了，退出。
    app.on('window-all-closed', function() {
        // 在 OS X 上，通常用户在明确地按下 Cmd + Q 之前
        // 应用会保持活动状态
        if (process.platform != 'darwin') {
            app.quit();
        }
    });
    app.on('browser-window-created', function(arg1, arg2){
        if(arg2.webContents.getURL().indexOf('main.html')){
            arg2.on('focus', function(){
                 tray.setImage(nativeImageTray);
            });
        }
    });
} catch (e){
    app.quit();
}




