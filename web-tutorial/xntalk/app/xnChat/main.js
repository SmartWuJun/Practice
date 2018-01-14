
var AutoLaunch = require('auto-launch');
var appLauncher = new AutoLaunch({
    name: 'XNTALK App'
});

var net = require('net');
var http = require("http"),
    url = require("url"),
    fs = require("fs");

const electron = require('electron'); // 控制应用生命周期的模块。
// 控制应用生命周期的模块。
var BrowserWindow = electron.BrowserWindow;  // 创建原生浏览器窗口的模块
const app = electron.app;
const Menu = require('electron').Menu;
const Tray = require('electron').Tray;

app.commandLine.appendArgument('enable-file-cookies');
app.commandLine.appendArgument('allow-file-access-from-files');
app.commandLine.appendArgument('allow-displaying-insecure-content');

const ipcMain = electron.ipcMain;
{

    global.isDev = true;
    global.isDebug = true;
    global.platform = process.platform;
   
    if(global.isDev == true)
    {
        global.appKey = '232b9bc7c221f25576e3b80458fb812f';
    }
    else
    {
        global.appKey = '708e73e559eb1c86b6573f72c47afbdc';
    }


}

// 保持一个对于 window 对象的全局引用，不然，当 JavaScript 被 GC，
// window 会被自动地关闭
var mainWindow = null;

var tray = null;

{
    var nativeImageTray = electron.nativeImage.createFromPath(__dirname + '/images/20x20-2.png');
    var nativeImageTrayMsg = electron.nativeImage.createFromPath(__dirname +"/images/20x20.png");
}

try
{
    global.port = 7543;
    var createHttp = function(port)
    {
        var server = http.createServer(function(req,res){
            var pathname = url.parse(req.url).pathname;
            fs.readFile(__dirname+ "/"+ pathname, function readData(err, data) {
                res.writeHead(200);
                res.end(data);
            });
        }).listen(port);
        server.on('listening', function () { // 执行这块代码说明端口未被占用
            global.port = port;
            console.log("################port##########" + port);
        });
        server.on('error', function (err) {
            createHttp(++port);
        });
    };
    createHttp(global.port);

// 当所有窗口被关闭了，退出。
    app.on('window-all-closed', function() {
        // 在 OS X 上，通常用户在明确地按下 Cmd + Q 之前
        // 应用会保持活动状态
        if (process.platform != 'darwin') {
            app.quit();
        }
    });


// 当 Electron 完成了初始化并且准备创建浏览器窗口的时候
// 这个方法就被调用
    app.on('ready', function() {
        console.log(process.execPath);
        if(process.platform == 'darwin')
        {

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

            Menu.setApplicationMenu(Menu.buildFromTemplate(template));

        }
        tray = new Tray(nativeImageTray);
        const contextMenu = Menu.buildFromTemplate([
            {label: '开机启动', type: 'checkbox', click:function()
            {
                if(contextMenu.items[0].checked == true)
                {
                    appLauncher.enable();
                }
                else
                {
                    appLauncher.disable();
                }

            }},
            {label: '打开', type: 'normal',click:function()
            {
                var wins = BrowserWindow.getAllWindows();
                console.log(wins.length);
                //    console.log(wins[1]);
                for(var i in wins)
                {
                    console.log(wins[i].webContents);
                    if(wins[i].webContents.getURL().indexOf('login.html') >= 0)
                    {
                        wins[i].show();
                        return;
                    }
                    if(wins[i].webContents.getURL().indexOf('main.html') >= 0)
                    {
                        wins[i].show();
                        return;
                    }
                }

            }},
            {label: '退出', type: 'normal',click:function(){
                app.quit();
            }}
        ]);
        appLauncher.isEnabled().then(function(enabled){
            contextMenu.items[0].checked = enabled;
        });
        tray.on('double-click', function()
        {
            var wins = BrowserWindow.getAllWindows();
            tray.setImage(__dirname  + "/images/win_icon.ico");
            for(var i in wins)
            {
                console.log("##################" +wins.length + "#################"  + wins[i].webContents.getURL());
                if(wins[i].webContents.getURL().indexOf('login.html') >= 0)
                {
                    wins[i].show();
                    return;
                }
                if(wins[i].webContents.getURL().indexOf('main.html') >= 0)
                {
                    wins[i].show();
                    return;
                }

            }
        });
        tray.setToolTip('犀牛XNTALK');
        tray.setContextMenu(contextMenu);



        // 加载应用的 index.html
        console.log(__dirname);

        // 打开开发工具
        if(global.isDebug  == true)
        {
            mainWindow = new BrowserWindow({ frame: false, useContentSize:true,center:true, resizable:false, transparent:true,width:960, height:600});//
            // mainWindow = new BrowserWindow({ frame: true, useContentSize:true,center:true, resizable:false, transparent:false,width:800, height:700});//
            mainWindow.loadURL(("http://127.0.0.1:#port#/xntalk/login.html").replace("#port#", global.port));
            mainWindow.openDevTools();
        }
        else
        {
            mainWindow = new BrowserWindow({ frame: false, useContentSize:true,center:true, resizable:false, transparent:true,width:960, height:600});//
            mainWindow.loadURL(("http://127.0.0.1:#port#/xntalk/login.html").replace("#port#", global.port));
        }
        mainWindow.setMenuBarVisibility(false);
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
           // if (process.platform != 'darwin')
            {
                if(arg2 != undefined && arg2 != null && arg2 == "watch")
                {
                     tray.setImage(nativeImageTray);
                }
                else
                {
                    if(BrowserWindow.getFocusedWindow() == null || BrowserWindow.getFocusedWindow().webContents.getURL().indexOf('main.html') < 0)
                    {
                        tray.setImage(nativeImageTrayMsg);

                    }
                }
            }

        });


    });
    app.on('browser-window-created', function(arg1, arg2){
//	if (process.platform != 'darwin')
        if(arg2.webContents.getURL().indexOf('main.html'))
        {
            arg2.on('focus', function()
            {
                 tray.setImage(nativeImageTray);
            });
        }

    });


}
catch (e)
{
    console.log("exceptionexceptionexceptionexceptionexceptionexceptionexceptionexceptionexceptionexceptionexceptionexceptionexceptionexceptionexception");
    console.log(e);
    app.quit();
}




