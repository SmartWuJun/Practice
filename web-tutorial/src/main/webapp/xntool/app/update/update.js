var bSupportElectron = false;
var electron ;
try{
    electron = require("electron");
    bSupportElectron = true;
}catch (e){
    bSupportElectron = false;
}
if(bSupportElectron == true){

}

var Application = electron.remote.app;
var AppPath = Application.getAppPath() + '/';
var os = require('os');
console.log(os.tmpdir());

var http = require("http");
var url = require("url");
var fs= require("fs");

var DOWNLOAD_DIR = '';
if(os.platform() == 'win32')
{
    try{
        fs.mkdirSync((os.tmpdir() + "/").replace('Local', 'LocalLow'));
    }
    catch(e){

    }
    DOWNLOAD_DIR = (os.tmpdir() + "/").replace('Local', 'LocalLow');
}else{
    DOWNLOAD_DIR = os.tmpdir() + "/";
}


var electron = require("electron");

const Zip = electron.remote.require('adm-zip');
console.log(Zip);
var packageInfo = require(AppPath + '/package.json');
var update ={
    fileSize : 0,
    compareVersion:function(oldVersion, newVersion){
        var oldParts = oldVersion.split(".");
        var newParts = newVersion.split(".");
        console.log(oldVersion);
        console.log(newVersion);
        var i = 0;
        for (i=0; i<newParts.length && i<oldParts.length; i++){
            if (!(i<newParts.length && i<oldParts.length)) {
                return 0;
            }  if (newParts[i] > oldParts[i]) {
                return 1;
            }else if(newParts[i] < oldParts[i]) {
                return -1;
            }
        }
        return 0;
      //  return !(newParts[0] < oldParts[0] || newParts[1] < oldParts[1] || newParts[2] < oldParts[2]);
    },
    checkUpdate:function(callback){
        console.log("checkUpdate");
        var oldVersion =  packageInfo.version;
        var file_url = 'http://soft.xiniunet.com/xntalk/win/update.json';
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
                if (res.statusCode == 200) {
                    // console.log(res.headers['content-length']);
                }
                res.on('data', function(data) {
                    strJson = strJson + data;
                }).on('end', function() {
                    var response = JSON.parse(strJson.substr(1));
                    console.log(response.version);
                    callback(update.compareVersion(oldVersion, response.version), response);
                });
            });
        };
        download_json_httpget(file_url);
    },
    doUpdate:function($scope, file_url){
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
                }
                res.on('data', function(data) {
                    if(fileSize > 0 )
                    {
                        var buffer = new Buffer(data);
                        downloaded_size = downloaded_size + buffer.length;
                        i = downloaded_size * 250 / fileSize;
                        draw();
                        file.write(data);
                    }
                }).on('end', function() {
                    file.end(function(){

                        console.log(DOWNLOAD_DIR + file_name);
                        var zip = new Zip(DOWNLOAD_DIR + file_name);   /*update.zip*/
                        var zipEntries = zip.getEntries(); // an array of ZipEntry records
                        zipEntries.forEach(function(zipEntry) {
                        });
                        zip.extractAllTo(AppPath,true);
                        fs.unlink(DOWNLOAD_DIR + file_name);

                        $scope.$apply(function () {
                            $scope.div_update = false;
                            $scope.div_update_finish = true;
                            $scope.div_updating = false;

                        });
                       // const dialog = require('electron').remote.dialog;

                        // var dialogOption = {
                        //     type:'question',
                        //     title:'更新完成',
                        //     buttons:['确定'],
                        //     defaultId:0,
                        //     message:'点击确定将关闭程序，请手动重新开启!',
                        //     detail:'',
                        //     cancelId:1
                        // };
                        // dialog.showMessageBox(dialogOption,function(e){
                        //     electron.remote.app.quit();
                        // });
                    });
                });
            });
        };
        download_file_httpget(file_url);
    }
};

(function () {
    if(window.location.href.substr(window.location.href.length - 11, 11) == "update.html"){
        var bodyController = function($scope, $timeout) {
            var percent = 1;
            var intervalNumber = 0;
            $scope.div_update = true;
            $scope.div_update_finish = false;
            $scope.div_updating = false;
            $scope.update = {};
            update.checkUpdate(function(bUpdate, jsonObj){

                console.log(jsonObj);

                $scope.$apply(function () {
                    $scope.update.date = jsonObj.date;
                    $scope.update.localVersion =  packageInfo.version;
                    $scope.update.remoteVersion = jsonObj.version;
                    $scope.update.content=jsonObj.change;
                    $scope.update.fileUrl = jsonObj.url;
                });

            });
            $scope.click_update = function () {
                $scope.div_update = false;
                $scope.div_update_finish = false;
                $scope.div_updating = true;
                console.log($scope.update.fileUrl);
                update.doUpdate($scope, $scope.update.fileUrl);
                // var updateClock = function(percent){
                //     console.log(percent);
                //
                //         i = percent;
                //          draw();
                //     percent = percent + 50  ;
                //     $scope.clock = new Date();
                //     $timeout(function(){
                //         updateClock(percent);
                //     },1000);
                // };
                // updateClock(percent);
            };

            $scope.click_cancel = function () {
                window.close();
            };

            $scope.click_close = function () {
                electron.remote.app.quit();
            };
        };
        angular.module("myApp", []).controller("bodyController", ["$scope","$timeout", bodyController]);
    }else{
        update.checkUpdate(function(bUpdate, jsonObj) {
            console.log(jsonObj.url);
            console.log(bUpdate);
            if(bUpdate != null && bUpdate == true){
                const electron = require('electron'); // 控制应用生命周期的模块。
                var BrowserWindow = electron.remote.BrowserWindow;  // 创建原生浏览器窗口的模块
                mainWindow = new BrowserWindow({ frame: false, useContentSize:true,center:true, resizable:false, transparent:true,width:960, height:600});
                mainWindow.setMenuBarVisibility(false);
                if(require('electron').remote.getGlobal('isDebug') == true){
                    mainWindow.openDevTools();
                }
                // 加载应用的 index.html
                console.log(__dirname);
                mainWindow.loadURL(("http://127.0.0.1:#port#/update/update.html").replace("#port#", require('electron').remote.getGlobal('port')));
            }
        });
    }

})();
