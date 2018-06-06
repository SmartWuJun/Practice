/**
 * Created by DEV005 on 2016/3/31.
 */



    'use strict';

    /*------------工具函数------------*/
    /*
     * 读取指定文件夹下的全部文件，可通过正则进行过滤，返回文件路径数组
     * @param root 指定文件夹路径
     *
     * 注：还可变形用于文件路径是否符合正则规则，路径可以是文件夹，也可以是文件，对不存在的路径也做了容错处理*/

    /**
     * 读取文件
     *
     */
    var fs = require('fs');
    var path = require('path');
    //加载electron 里的 remote
    const electron = require('electron');
    var remote =  require('electron').remote;
    var app =  electron.app;
    const ipcRenderer = electron.ipcRenderer;



    function mainController($scope,$timeout,$location,templateService,dialogService){
        $location.path('/');
        // 自动获取目录

        


        $scope.file={};
        $scope.typeList=[
            {key:"String",val:"String"},
            {key:"Id",val:"Id"},
            {key:"DateTime",val:"DateTime"},
            {key:"Data",val:"Data"},
            {key:"Integer",val:"Integer"},
            {key:"Decimal",val:"Decimal"},
            {key:"Amount",val:"Amount"},
            {key:"Boolean",val:"Boolean"},
            {key:"Text",val:"Text"},
            {key:"Date",val:"Date"}
        ];
        $scope.relateList=[
            {key:"FK",val:"FK"},
            {key:"Enum",val:"Enum"}
        ];

        //返回
        $scope.backMain=function(){
            window.location.href =remote.getGlobal('dirname')+"/xnLayout/page/main.html";
        };
        //退出
        $scope.exit=function(){
            ipcRenderer.sendSync('message', 'close');
        };

        //读取目录
        $scope.openDirectory=function(){

            ipcRenderer.send('selectDirectory');
        };
        /*返回读取目录*/
        ipcRenderer.on('savedDirectory', function (event, path) {
            var directory=path;
            if(directory){
                //判断与配置文件是否相同
                if(templateService.getConfig("fileUrl")!=directory){
                    $scope.$broadcast('childDirectory',directory[0]);
                    $location.path('/');
                    templateService.setConfig("fileUrl",directory[0])
                }
            }
        });

        //存储目录
        $scope.saveDialog=function(){
            ipcRenderer.send('saveTemplate');
        };
        /*返回保存内容*/
        ipcRenderer.on('savedTemplate', function (event, path) {
            templateService.setConfig("outputUrl",path[0])
        });


        //监听事件 目录到页面
        $scope.$on('parentFile', function(e,file){
            if($location.path()=='/'+file.type){
                $scope.$broadcast('childFile', file);
            }else {
                if("folder"==file.type){
                    $location.path("/folder");

                }else if("file"==file.type){
                    $location.path("/file");
                }
                $timeout(function () {
                    $scope.$broadcast('childFile', file);
                },350);
            }
        });

        //监听事件 判断是文件还是文件夹  目录到页面
        $scope.$on('parentFileUrl', function(e,file){
            $scope.file=file;
            $timeout(function () {
                $scope.$broadcast('fileUrl',file);
            },350);

        });

        //重命名  页面到目录
        $scope.$on('parentRename', function(e,file){
            $scope.$broadcast('childRename',file);
        });

        //删除 页面到目录
        $scope.$on('parentDelete', function(e,file){
            $scope.$broadcast('childDelete',file);
        });

        //添加子  页面到目录
        $scope.$on('parentAdd', function(e,file){
            $scope.$broadcast('childAdd',file);
        });




        //点击判断是否文件夹，及读取文件
        $scope.rightMenu={
            state:false,
            style:{}
        };
        //判断点击事件
        function rename(){
        }
        //增加文件
        function addFile(){

        }
        //增加文件文件夹
        function addFolder(){

        }

        /**
         * 右击处理*/
        //右击  页面到目录
        var rightFile='';
        $scope.$on('rightFile', function(e,file){
            rightFile=file;
        });

        $scope.clickMemu=function(name){
            $scope.rightMenu.state=false;
            switch (name){
                case "addFile":
                    break;
                case "addFolder":
                    break;
                case "delete":
                    break;
                case "template":
                    templateService.outputTemplate(rightFile);
                    break;
            }
        }
    };


    function  appMenu($scope,templateService,dialogService){


        // 模板文件的读取规则
        var reg = /\.t$/ ;

        $scope.xnMenu=[];
        // 树目录
        $scope.expandedNodes = [];


        function createTree(path){
            var xnMenu=[
                {
                    name:templateService.readPath(path),
                    layer:"0",
                    type : "folder",
                    path : path,
                    rPath:"",
                    children : [],
                    parent:""
                }
            ];
            templateService.readAllFile(xnMenu[0],reg);

            $scope.xnMenu=xnMenu;

            if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
                $scope.$apply();
            }

            $scope.expandedNodes = [$scope.xnMenu[0]];
        }
        //增加文件
        $scope.$on('childDirectory', function(e,path){
            createTree(path)
        });

        /*自动获取生成目录*/
        function getDirectory() {
            var directory=templateService.getConfig("fileUrl");
            if(directory){
                createTree(directory);
            }
        }
        getDirectory();
        var fileItem={};
        //目录选择文件
        $scope.showSelected=function(item,$event){
            fileItem=item;
            //传递 文件路径
            $scope.$emit('parentFileUrl', item);

            if($event.button=="2"){
                // 右击事件
                $scope.rightMenu.state=true;
                $scope.rightMenu.style={
                   "top":($event.clientY+10)+"px",
                   "left":$event.clientX+"px"
                };
                $scope.$emit('rightFile', item);
            }else {
                $scope.rightMenu.state=false;
                /*选择文件 在页面中读取*/
                $scope.$emit('parentFile', item);
            }

        };

        function renameFolder(node){
            if(node.children && node.children.length>0){
                angular.forEach(node.children,function(item){
                    item.path=node.path+"/"+item.name;
                    renameFolder(item);
                })
            }
        }
        //重命名
        $scope.$on('childRename', function(e,newFile){
            console.log(newFile);
            fileItem.name=newFile.name;
            fileItem.path=newFile.path;

            if(newFile.type=="folder"){
                renameFolder(fileItem);
            }
        });

        //删除
        $scope.$on('childDelete', function(e,file){
            for(var i=0;i<file.parent.children.length;i++){
                if(file.parent.children[i].name==file.name){
                    file.parent.children.splice(i,1);
                }
            }
        });

        //增加文件
        $scope.$on('childAdd', function(e,file){
            fileItem.children.push(file);
        });
    }

    var ref=[
        "ui.router",
        "ngMaterial",
        "ngAnimate",
        "app.service",
        "app.directive",
        "app.filter",
        "ui.bootstrap",
        "treeControl",
        "app.template",
        "ng-context-menu",
        "angular-sortable-view"
    ];

    var app=angular.module('app',ref);
    app.controller('MainController', ["$scope","$timeout","$location","templateService","dialogService",mainController])
        .controller("AppMenuController",["$scope","templateService","dialogService",appMenu]);






