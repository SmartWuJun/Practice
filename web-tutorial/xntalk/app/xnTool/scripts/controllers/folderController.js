/**
 * Created by DEV005 on 2016/3/31.
 */
(function () {
    'use strict';
    var fs = require("fs");
    var path = require('path');
    var json2xml = require('xml2js');
    var parseString = json2xml.parseString;
    var Builder = json2xml.Builder;


    function FolderController($scope,$modal,$location,templateService,dialogService) {
        //数据修复
        function recoveryData(){
            angular.forEach($scope.vm.table.columns.column,function(item){
                if(item.max){
                    Number(item)
                }
            })
        }

        //文件夹接收
        $scope.$on('childFile', function(e,file){
            console.log("folderController")
            //读取文件
            fs.readFile(file.path+"/setting.xml",{encoding:'utf-8'},function(err,files){
                if(err){
                    //如果没有 则创建
                    var settingData={
                        "setting":{
                            applicationCode:"",
                            applicationName:"",
                            companyCode:"xiniunet",
                            companyName:"",
                            developerName:"",
                            tablePrefix:"XXX_"
                        }
                    };

                    var builder = new json2xml.Builder();  // JSON->xml
                    var xml =  builder.buildObject( settingData);

                    fs.writeFile(file.path+"/setting.xml",xml,function(err) {
                        if (err) {
                            dialogService.tip([{"message":"没有权限！"}],null,1000);
                            return;
                        }

                        $scope.setting=settingData;
                        if(!$scope.setting.setting.tablePrefix || $scope.setting.setting.tablePrefix==""){
                            $scope.setting.setting.tablePrefix="XXX_";
                        }
                    });

                }else {
                    var parseString = require('xml2js').parseString;
                    var xml =files;
                    parseString(xml,{ explicitArray : false, ignoreAttrs : true }, function (err, result) {
                        console.log(result);
                        $scope.setting=result;
                        if(!$scope.setting.setting.tablePrefix || $scope.setting.setting.tablePrefix==""){
                            $scope.setting.setting.tablePrefix="XXX_";
                        }
                    });
                }
                $scope.$apply();
            })
        });

        /*判断是文件还是文件夹*/
        $scope.$on('fileUrl', function(e,file){
            $scope.errors="";
            $scope.file=file;
            $scope.file.isNew=false;
            if(file.type=='folder'){
                $scope.file.newName=$scope.file.name;
            }else {
                $scope.file.newName=$scope.file.name.substring(0,($scope.file.name.length-2))
            }
        });

        //选择文件夹
        $scope.$on('childDirectory', function(e,path){
            $scope.file={};
        });

        $scope.setting={
            "setting":{
                applicationCode:"",
                applicationName:"",
                companyCode:"",
                companyName:"xiniunet",
                developerName:"",
                tablePrefix:"XXX_"
            }
        };

        //新增文件
        $scope.addFile=function(){
            $location.path("/file").search($scope.file);
        };

        //新增文件夹
        $scope.addFolder=function(){

            $scope.setting={
                "setting":{
                    applicationCode:"",
                    applicationName:"",
                    companyCode:"xiniunet",
                    companyName:"",
                    developerName:"",
                    tablePrefix:"XXX_"
                }
            };

            var  parentFile=$scope.file;
            $scope.file={
                isNew:true,
                type:"folder",
                children : [],
                name:"",
                newName:"",
                parent:parentFile
            };
        };
        
        //删除文件
        $scope.delete=function(){
            var dialogDefaults = {
                size:"sm"
            };
            var dialogOptions = {
                closeButtonText: "取消",
                actionButtonText: "确定删除",
                headerText: "继续....?",
                bodyText: "您确定要删除吗？",
                type:"delete",
                callback: function () {
                    if($scope.file.type=='file'){
                        fs.unlinkSync($scope.file.path)
                    }else if( $scope.file.type=='folder'){
                        templateService.deleteFolder($scope.file.path);
                    }
                    $scope.$emit('parentDelete', $scope.file);
                    dialogService.tip([{"message":"删除成功!"}],null,1000);
                    $scope.file={};
                }
            };
            dialogService.confirm(dialogDefaults, dialogOptions);

        };

        //重命名
        $scope.rename=function(){
            if (!$scope.file.newName || $scope.file.newName==""){
                $scope.errors="请填写文件夹名称！";
                return ;
            }else {
                var state=false;
                angular.forEach($scope.file.parent.children,function(brother){
                    if(brother.type=="folder" && brother.name==$scope.file.newName && $scope.file.newName!=$scope.file.name){
                        state=true;
                    }
                });
                if(state){
                    state=undefined;
                    $scope.errors="文件夹名称已存在！";
                    return ;
                }

            }
            $scope.file.name=$scope.file.newName;

            //重命名
            fs.rename($scope.file.path,$scope.file.parent.path+"/"+$scope.file.newName,function(err){
                if (err) {
                    dialogService.tip([{"message":"没有权限！"}],null,1000);
                    return;
                }
                $scope.file.name=$scope.file.newName;
                $scope.file.path=$scope.file.parent.path+"/"+$scope.file.newName;
                $scope.$emit('parentRename', $scope.file);
            });
        };

        $scope.closeAlert=function(){
            $scope.errors="";
        };

        //保存文件夹
        $scope.doSubmit=function(){
            //转换成xml
            if($scope.file.isNew){
                if (!$scope.file.newName || $scope.file.newName==""){
                    $scope.errors="请填写文件夹名称！";
                    return ;
                }
                var state=false;
                angular.forEach($scope.file.parent.children,function(brother){
                    if(brother.type=="folder" && brother.name==$scope.file.newName && $scope.file.newName!=$scope.file.name){
                        state=true;
                    }
                });
                if(state){
                    state=undefined;
                    $scope.errors="文件夹名称已存在！";
                    return ;
                }

                $scope.file.name=$scope.file.newName;
            }else {
                $scope.rename();
            }

            if(!$scope.file.isNew){
                if(!$scope.setting.setting.applicationCode){
                    $scope.errors="应用代码不能为空！";
                    return
                }
                if(!$scope.setting.setting.companyCode){
                    $scope.errors="公司代码不能为空！";
                    return
                }
            }

            //如果创建创建文件夹
            if($scope.file.isNew){
                fs.mkdirSync($scope.file.parent.path+"/"+$scope.file.name);
                $scope.file.path=$scope.file.parent.path+"/"+$scope.file.name;

            }
            var builder = new json2xml.Builder();  // JSON->xml
            var xml =  builder.buildObject( $scope.setting);


            fs.writeFile($scope.file.path+"/setting.xml", xml,function(err){
                if (err) {
                    dialogService.tip([{"message":"没有权限！"}],null,1000);
                    return;
                }
                //如果创建创建文件夹向上传递
                if($scope.file.isNew){
                    $scope.$emit('parentAdd', $scope.file);
                    dialogService.tip([{"message":"文件夹新建成功!"}],null,1000);
                    $scope.file={};
                }else {
                    dialogService.tip([{"message":"文件夹修改成功!"}],null,1000);
                }
            });
        };
    }
    
    

    angular.module('app')
        .controller('FolderController', ["$scope","$modal","$location","templateService","dialogService",FolderController]);
})();