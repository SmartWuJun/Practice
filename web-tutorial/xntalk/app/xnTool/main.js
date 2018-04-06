const electron = require('electron'); // 控制应用生命周期的模块。
 // 控制应用生命周期的模块。
var BrowserWindow = electron.BrowserWindow;  // 创建原生浏览器窗口的模块
const app = electron.app;

const ipcMain = electron.ipcMain;
const dialog = electron.dialog;
// 保持一个对于 window 对象的全局引用，不然，当 JavaScript 被 GC，
// window 会被自动地关闭
var mainWindow = null;


// 当 Electron 完成了初始化并且准备创建浏览器窗口的时候
// 这个方法就被调用
app.on('ready', function() {

    const EBU = require('electron-basic-updater');
    // Initiate the module
    EBU.init({
        'api':'http://xn-static.oss-cn-hangzhou.aliyuncs.com/soft/xn_box/xnbox.txt' // The API EBU will talk to
    });

    mainWindow = new BrowserWindow({title:"xn_box"}); //fullscreen:true,skipTaskbar:true,
    //屏幕最大化
    mainWindow.maximize();
    // 加载应用的 index.html
    mainWindow.loadURL('file://' + __dirname + '/index.html');
    // 打开开发工具
    //  mainWindow.openDevTools();
    // 当 window 被关闭，这个事件会被发出
    mainWindow.on('closed', function() {
        // 取消引用 window 对象，如果你的应用支持多窗口的话，
        // 通常会把多个 window 对象存放在一个数组里面，
        // 但这次不是。
        mainWindow = null;
    });

    // In main process.

    //退出
    ipcMain.on('message', function(event, arg) {
        app.quit();
    });

    ipcMain.on('selectDirectory', function (event) {
        const options = {
            title: '选择文件夹',
            // defaultPath:__dirname,    //默认路径
            // filters: [
            //     { name: 'Images', extensions: ['jpg', 'png', 'gif'] }
            //     {name: 'Images', extensions: ['jpg', 'png', 'gif']},
            //     {name: 'Movies', extensions: ['mkv', 'avi', 'mp4']},
            //     {name: 'Custom File Type', extensions: ['as']},
            //     {name: 'All Files', extensions: ['*']}
            // ],
            properties: ['openDirectory']
        };
        dialog.showOpenDialog(options,function (directory) {
            event.sender.send('savedDirectory', directory)
        })

    });

    ipcMain.on('saveTemplate', function (event) {
        const options = {
            title: '选择文件夹',
            properties: ['openDirectory']
        };
        dialog.showOpenDialog(options,function (directory) {
            event.sender.send('savedTemplate', directory)
        })
        /*存储文件*/
        // dialog.showSaveDialog(options, function (filename) {
        //     event.sender.send('savedTemplate', filename)
        // })
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



