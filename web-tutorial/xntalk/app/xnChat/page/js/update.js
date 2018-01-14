
var electron = require("electron");
var Application = electron.remote.app;
var AppPath = Application.getAppPath() + '/';
var os = require('os');
console.log(os.tmpdir());
var DOWNLOAD_DIR = os.tmpdir() + "/";
var http = require("http");
var url = require("url");
var fs= require("fs");
const Zip = electron.remote.require('adm-zip');
console.log(Zip);

var update ={



    fileSize : 0,
    compareVersion:function(oldVersion, newVersion)
    {
        var oldParts = oldVersion.split(".");

        var newParts = newVersion.split(".");

        return newParts[0] > oldParts[0] || newParts[1] > oldParts[1] || newParts[2] > oldParts[2];
    },
    checkUpdate:function(callback)
    {
        console.log("checkUpdate");
        var packageInfo = require(AppPath + '/package.json');
        var oldVersion =  packageInfo.version;
        var file_url = 'http://soft.xiniunet.com/xntalk/win/update.json';
       // file_url = 'http://soft.xiniunet.com/xntalk/win/1.0.1/app2.zip';
        var download_json_httpget = function(file_url) {
            var options = {
                host: url.parse(file_url).host,
                port: 80,
                path: url.parse(file_url).pathname
            };
            var file_name = url.parse(file_url).pathname.split('/').pop();
            console.log(file_name);
            var strJson = '';
            http.get(options, function(res) {
                console.log(res);
                if (res.statusCode == 200)
                {
                   // console.log(res.headers['content-length']);
                }
                res.on('data', function(data) {
                    strJson = strJson + data;
                }).on('end', function() {
                    var response = JSON.parse(strJson.substr(1));
                    console.log(response.version);
                    callback(update.compareVersion(oldVersion, response.version), response.url);
                });
            });


        };
        download_json_httpget(file_url);
        // return compareVersion(oldVersion, )
    },
    doUpdate:function(file_url)
    {
        console.log(file_url);
        var fileSize = 0;
        var downloaded_size = 0;
        var download_file_httpget = function(file_url) {
            var options = {
                host: url.parse(file_url).host,
                port: 80,
                path: url.parse(file_url).pathname
            };
            var file_name = url.parse(file_url).pathname.split('/').pop();
            var file = fs.createWriteStream(DOWNLOAD_DIR + file_name, {flags: 'w'});
            var rawData = '';

            http.get(options, function(res) {
                console.log(res);
                if (res.statusCode == 200)
                {
                    fileSize = parseInt(res.headers['content-length']);
                    console.log(fileSize);
                    //console.log(res.headers['content-length']);
                }
                res.on('data', function(data) {
                    if(fileSize > 0 )
                    {
                        var buffer = new Buffer(data);
                        downloaded_size = downloaded_size + buffer.length;
                        i = downloaded_size * 300 / fileSize;
                        draw();
                        file.write(data);
                    }
                }).on('end', function() {
                    file.end(function()
                    {
                        console.log(DOWNLOAD_DIR + file_name);
                        var zip = new Zip(DOWNLOAD_DIR + file_name);   /*update.zip*/
                        var zipEntries = zip.getEntries(); // an array of ZipEntry records
                        zipEntries.forEach(function(zipEntry) {


                        });
                        zip.extractAllTo(AppPath,true);
                        fs.unlink(DOWNLOAD_DIR + file_name);


                        const dialog = require('electron').remote.dialog;

                        var dialogOption = {
                            type:'question',
                            title:'更新完成',
                            buttons:['确定'],
                            defaultId:0,
                            message:'点击确定将关闭程序，请手动重新开启!',
                            detail:'',
                            cancelId:1
                        };
                        dialog.showMessageBox(dialogOption,function(e){
                            electron.remote.app.quit();
                        });
                    });



                });
            });


        };
        download_file_httpget(file_url);
    }
};
update.checkUpdate(function(bUpdate, file_url)
{

    console.log(file_url);
    console.log(bUpdate);
    if(bUpdate != null && bUpdate == true)
    {
        if(window.location.href.substr(window.location.href.length - 11, 11) != "update.html")
        {
            const dialog = require('electron').remote.dialog;

            var dialogOption = {
                type:'question',
                title:'更新',
                buttons:['确定', '取消'],
                defaultId:0,
                message:'是否要更新？',
                detail:'',
                cancelId:1
            };

            dialog.showMessageBox(dialogOption,function(e){
                // e 是选择的目录
                if(e == 0)
                {

                    const electron = require('electron'); // 控制应用生命周期的模块。
                    var BrowserWindow = electron.remote.BrowserWindow;  // 创建原生浏览器窗口的模块
                    mainWindow = new BrowserWindow({ useContentSize:true,center:true});
                    mainWindow.setMenuBarVisibility(false);
                    if(require('electron').remote.getGlobal('isDebug') == true)
                    {
                        mainWindow.openDevTools();
                    }
                    // 加载应用的 index.html
                    console.log(__dirname);

                    mainWindow.loadURL(("http://127.0.0.1:#port#/update.html").replace("#port#", require('electron').remote.getGlobal('port')));
                    //mainWindow.on('closed', function() {
                    //    // 取消引用 window 对象，如果你的应用支持多窗口的话，
                    //    // 通常会把多个 window 对象存放在一个数组里面，
                    //    // 但这次不是。
                    //    mainWindow = null;
                    //
                    //});
                    window.close();
                }
            });
        }
        else
        {
            update.doUpdate(file_url);
        }


        //////////////

    }
});

