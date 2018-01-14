
(function () {
    "use strict";
    var remote=require('electron').remote;
    var electron = require('electron'); // 控制应用生命周期的模块。
    //定义module,并指明依赖模块。

    var panController = function($scope, $http,$q, $modal,$filter,talkService,xnAppTool,dialogService) {
        $scope.isShow = true;
        var disk=null;
        var diskId=null;
        var tenantId=xnAppTool.getStorage("tenantId");
        console.log("tenantId");
        console.log(tenantId);

        $scope.page= {
            disk : {},
            folderList : [],
            fileList : [],
            createFolder : false,
            totalCount : 0,
            newFolderName : {},
            localPath:{}
        };
        $scope.page.path = [];
        $scope.vm = {
            pageNumber : 1,
            pageSize : 0,
            type:"ALL",
            sortColumn:"FILE_NAME"
        };
        $scope.tab=0;
        $scope.flag=false;
        $scope.attachmentView="";
        $scope.sortColumns=[
            {img:"xn-icon icon-descendingorder",key:"FILE_NAME",value:"文件名"},
            {img:"xn-icon icon-descendingorder",key:"SIZE",value:"大小"},
            {img:"xn-icon icon-descendingorder",key:"CREATION_TIME",value:"最近上传"},
            {img:"xn-icon icon-descendingorder",key:"LAST_UPDATE_TIME",value:"修改日期"}
        ];

        //打开预览
        $scope.attachmentViewOpen=function(file){
            if($filter('diskFileType')(file.file.extension)=="img"){
                $scope.attachmentView=file.path;
                $scope.attachmentState=true;
            }
        };

        //关闭预览
        $scope.attachmentViewClose=function(){
            $scope.attachmentView="";
            $scope.attachmentState=false;
        };

        //logo切换承租人
        $(".union-ul").on("click","li",function(){
            event.stopPropagation();
            var nameLi=$(this).find(".logo-name").html();
            if(nameLi.length>6){
                nameLi=nameLi.substr(0,5)+"...";
            }
            $("#unionName").html(nameLi);
            var thisId=$(this).find(".logo-name").attr("data-id");
            $("#unionName").attr("data-id",thisId);
            $(".more-content").addClass("xn-hidden");
            $scope.$apply(function(){
                tenantId=thisId;
            });

            var diskByObjectIdRequest ={
                unionId:xnAppTool.getStorage("uid"),
                tenantId:tenantId
            };
            talkService.getDiskByObjectId(diskByObjectIdRequest).success( function(data) {
                if (data.errors == null || data.errors.length > 0) {
                    dialogService.tip(data.errors)
                }
                else {
                    disk = data.disk;
                    diskId = disk.id;

                    var diskGetRequest ={
                       id:diskId,
                        tenantId:tenantId
                    }
                    talkService.diskGetRequest(diskGetRequest).success( function(data){
                        if (data.errors == null || data.errors.length > 0){
                            dialogService.tip(data.errors)
                        }else{
                            $scope.$apply(function() {
                                $scope.page.disk = data.disk;
                                $scope.flag = false;
                                $scope.search($scope.page.disk.rootFolderId, $scope.page.disk.name);
                                $scope.vm.plan = "width:" + $scope.page.disk.usedSize / $scope.page.disk.maxSize * 100 + "%";
                                $scope.backHome();
                            })
                        }
                    });


                }
            })

        });

        //目录
        $scope.panMenu=[
            {img:"xn-icon icon-allfile",key:"ALL",value:"我的文件",bb:true,state:true},
            {img:"xn-icon icon-allfile",key:"AUDIO_VIDEO",value:"企业公共",bb:false},
            {img:"xn-icon icon-allfile",key:"DOCUMENT",value:"企业个人",bb:false }
        ];

        //doMenu
        $scope.doMenu=function(index){
            $scope.tab=1;
            angular.forEach($scope.panMenu,function(menu){
                menu.state=false;
            });
            $scope.panMenu[index].state=true;
            {
                // tenantId = $('#unionName').attr('data-id');
                $scope.flag=false;
                if(index == 0){
                    $scope.isShow=true;

                    // tenantId = 0;

                    var diskByObjectIdRequest = {
                        unionId:xnAppTool.getStorage("uid")
                    }
                    talkService.getDiskByObjectId(diskByObjectIdRequest).success( function(data){
                        if (data.errors == null || data.errors.length > 0){
                            dialogService.tip(data.errors)
                        }else{
                            console.log("网盘id");
                            disk=data.disk;
                            diskId=disk.id;

                            $scope.page.disk = disk;
                            $scope.search($scope.page.disk.rootFolderId, $scope.page.disk.name);
                            $scope.vm.plan="width:"+"0%";
                            $scope.vm.plan="width:"+ $scope.page.disk.usedSize/ $scope.page.disk.maxSize*100 +"%";
                            $scope.backHome();

                        }
                    });
                } else if(index == 1){
                    $scope.isShow=true;

                    console.log(tenantId)
                    var vm={
                        tenantId:tenantId
                    }
                    talkService.getDiskByObjectId(vm).success(function(data){
                        if (data.errors == null || data.errors.length > 0){
                            dialogService.tip(data.errors)
                        }else{
                            console.log("网盘id");
                            disk=data.disk;
                            diskId=disk.id;

                            var diskGetRequest ={
                                id:diskId,
                                tenantId:tenantId
                            }
                            talkService.diskGetRequest(diskGetRequest).success(function(data){
                                if (data.errors == null || data.errors.length > 0){
                                    dialogService.tip(data.errors)
                                }else{
                                    $scope.page.disk = data.disk;
                                    $scope.search($scope.page.disk.rootFolderId, $scope.page.disk.name);
                                    $scope.vm.plan="width:"+"0%";
                                    $scope.vm.plan="width:"+ $scope.page.disk.usedSize/ $scope.page.disk.maxSize*100 +"%";
                                    $scope.backHome();
                                }
                            });
                        }
                    });

                }else if(index == 2){
                    $scope.isShow=true;

                    var vm={
                        tenantId:tenantId,
                        unionId:xnAppTool.getStorage("uid")
                    }
                    talkService.getDiskByObjectId(vm).success(function(data){
                        if (data.errors == null || data.errors.length > 0){
                            dialogService.tip(data.errors)
                        }else{
                            console.log("网盘id");
                            disk=data.disk;
                            diskId=disk.id;
                            console.log(diskId);

                            var diskGetRequest ={
                                id:diskId,
                                tenantId:tenantId
                            }
                            talkService.diskGetRequest(diskGetRequest).success(function(data){
                                if (data.errors == null || data.errors.length > 0){
                                    dialogService.tip(data.errors)
                                }else{
                                    $scope.page.disk = data.disk;
                                    $scope.search($scope.page.disk.rootFolderId, $scope.page.disk.name);
                                    $scope.vm.plan="width:"+"0%";
                                    $scope.vm.plan="width:"+ $scope.page.disk.usedSize/ $scope.page.disk.maxSize*100 +"%";
                                    $scope.backHome();
                                }
                            });
                        }
                    });
                }

            }

        };
        $scope.doMenu(0);

        $scope.backHome = function() {
            $scope.page.folderList=[];
            $scope.page.folderDelete=[];
            $scope.page.fileList=[];
            $scope.page.totalCount = 2;
            $scope.page.path=[];
        };

        $scope.sortName='文件名';
        $scope.sortColumn=function(keyword){
            if(keyword=='FILE_NAME'){
                $scope.vm.sortColumn=keyword;
                $scope.sortName='文件名';
            }
            if(keyword=='SIZE'){
                $scope.vm.sortColumn=keyword;
                $scope.sortName='大小';
            }
            if(keyword=='CREATION_TIME'){
                $scope.vm.sortColumn=keyword;
                $scope.sortName='最近上传';
            }
            if(keyword=='LAST_UPDATE_TIME'){
                $scope.vm.sortColumn=keyword;
                $scope.sortName='修改日期';
            }
            $scope.flag=true;
            $scope.search($scope.page.disk.rootFolderId,$scope.page.disk.name, $scope.flag);
        };

        // 查询目录下的文件夹和文件
        $scope.search = function(folderId,folderName) {
            console.log("folderId folderName");
            console.log(folderId,folderName);
            $scope.vm.parentId = folderId;
            $scope.vm.parentName = folderName;
            
            
            var folderFileFindRequest = {
                tenantId:tenantId,
                parentId:folderId,
                sortColumn: $scope.vm.sortColumn
            };

            talkService.xntalkFolderFileFind(folderFileFindRequest).success(function(data){
                if (data.errors == null || data.errors.length > 0){
                    dialogService.tip(data.errors)
                }else{
                    console.log("文件夹******************************");
                    console.log(data);
                    $scope.page.fileList=[];
                    $scope.page.folderList = [];
                    $scope.page.folderDelete=[];
                    if(data.folderFileList) {
                        $scope.page.fileList = data.folderFileList

                        for (var i = 0, len = data.folderFileList.length; i < len; i++) {
                            if ($filter('diskFileType')($scope.page.fileList[i].file.extension) == "img") {
                                $scope.page.fileList[i].newlineImgUrl = {"background-image": "url(\"" + $scope.page.fileList[i].path + "@40w_34h_0e\")"};
                                $scope.page.fileList[i].newImgUrl = {"background-image": "url(\"" + $scope.page.fileList[i].path + "@85w_68h_0e\")"};
                            } else {
                                $scope.page.fileList[i].newlineImgUrl = "";
                                $scope.page.fileList[i].newimgUrl = "";
                            }
                            $scope.page.fileList[i].state = false;
                        }
                    }

                    if(data.folderList != null) {
                        console.log("所有文件******************************");
                        $scope.page.folderList = data.folderList
                        for (var j = 0; j < $scope.page.folderList.length; j++) {
                            $scope.page.folderList[j].state = false;
                            $scope.page.folderList[j].lastClick = 0;
                        }
                    }
                    $scope.page.totalCount = data.totalCount
                    if(!$scope.flag){
                        if(folderName != null) {
                            console.log("添加：" + folderId + ":" + folderName);
                            $scope.page.path.push({
                                "id": folderId,
                                "name": folderName
                            });
                        }
                    }
                    $scope.page.localPath = folderId;
                    $scope.page.createFolder = false;

                }
            });
        };

        $scope.getList = function() {
            $scope.search($scope.page.localPath);
        };

        // 文件夹的单击和双击事件
        $scope.folderSingleClick = function(folder) {
            console.log("folder****************************");
            console.log(folder);
            var time = new Date().getTime();
            if(time - folder.lastClick < 500) {
                $scope.search(folder.id,folder.name)
            } else {
                folder.lastClick = time;
                folder.state = !folder.state;
            }
        };

        // 文件的单击和双击事件
        $scope.fileSingleClick = function(folder) {
            var time = new Date().getTime();
            if(time - folder.lastClick < 500) {
                /*$scope.search(folder.id,folder.name)*/

            } else {
                folder.lastClick = time;
                folder.state = !folder.state;
            }
        };
        $scope.keydown = function($event) {
            console.log("in keydown");
            console.log($event.keyCode);
        };

        $scope.keyup = function($event) {
            console.log("in keyup");
            console.log($event.keyCode);
        };

        //全选
        $scope.allSelect=function(){
            for(var i=0;i<$scope.page.folderList.length;i++){
                $scope.page.folderList[i].state=!$scope.page.folderList[i].state;
            }
            for(var j=0;j<$scope.page.fileList.length;j++){
                $scope.page.fileList[j].state=!$scope.page.fileList[j].state;
            }
        };
        //批量下载文件
        $scope.checkLenght=0;
        $scope.batchDownload=function(){
            for(var i=0; i<$scope.page.fileList.length;i++){
                if($scope.page.fileList[i].state) {
                    $scope.checkLenght++;
                }
            }
            if($scope.checkLenght){
                $scope.checkLenght=0;
                for(var i=0; i<$scope.page.fileList.length;i++){
                    if($scope.page.fileList[i].state) {
                        var electron = require('electron'); // 控制应用生命周期的模块。
                        var BrowserWindow = electron.remote.BrowserWindow;  // 创建原生浏览器窗口的模块
                       var mainWindow = new BrowserWindow({frame: false, resizable: false,center:true, useContentSize:true, class:'Main',width:900, height: 600,minWidth:900, webPreferences:{webSecurity: false,allowDisplayingInsecureContent:true}});
                        mainWindow.setMenuBarVisibility(false);
                        mainWindow.loadURL($scope.page.fileList[i].path);
                    }
                }
            }else{
                dialogService.tip([{"message":"请选择要下载的文件"}]);
                return;
            }

        };
        // 从导航栏回到某一上级目录
        $scope.jumpTo = function(folderId,folderName) {
            for(var i=0;i<$scope.page.path.length;i++) {
                if(folderId === $scope.page.path[i].id) {
                    $scope.page.path = $scope.page.path.slice(0, i);
                    break;
                }
            }
            $scope.flag=false;
            $scope.search(folderId,folderName);
        };
        // 显示创建文件夹的栏位
        $scope.showCreateFolder = function() {
            var i = 0;
            var flag = true;
            for(var t=0;t<$scope.page.folderList.length;t++) {
                var existFolder = $scope.page.folderList[t];
                if("新建文件夹"==existFolder.name) {
                    flag = false;
                    break;
                }
            }
            while(!flag) {
                i ++;
                flag = true;
                for(t=0;t<$scope.page.folderList.length;t++) {
                    existFolder = $scope.page.folderList[t];
                    if("新建文件夹(" + i + ")"==existFolder.name) {
                        flag = false;
                        break;
                    }
                }
            }
            if(i == 0) {
                $scope.page.newFolderName = "新建文件夹";
            } else {
                $scope.page.newFolderName = "新建文件夹(" + i + ")";
            }
            $scope.page.createFolder = true;
        };

        // 创建文件夹
        $scope.createFolderFile = function() {
            $scope.folder = {
                parentId : $scope.page.path[$scope.page.path.length-1].id,
                name : $scope.page.newFolderName
            };
            console.log("this is param " + $scope.folder);
            
            
            var folderCreateRequest ={
                name:$scope.folder.name,
                parentId:$scope.folder.parentId,
                tenantId:tenantId,
                diskId:diskId,
            };

            talkService.xnTalkFolderCreate(folderCreateRequest).success(function(data){
                if (data.errors == null || data.errors.length > 0){
                    dialogService.tip(data.errors)
                }else{
                    $scope.page.createFolder = false;
                    $scope.flag=false;
                    $scope.search($scope.page.localPath);
                }
            });


        };

        // 重命名文件夹
        $scope.renameFolder=function(folder) {
            var folderUpdateRequest ={
                name:folder.name,
                id:folder.id,
                tenantId:tenantId,
                rowVersion:folder.rowVersion,
            };

            talkService.xnTalkFolderUpdate(folderUpdateRequest).success(function(data){
                if (data.errors == null || data.errors.length > 0){
                    dialogService.tip(data.errors)
                }else{
                    $scope.flag=false;
                    $scope.search($scope.page.localPath);
                }
            });

        };

        // 打开选择目录的弹框
        $scope.openSelectFolder = function(type,obj) {
            var modalInstance = $modal.open({
                templateUrl:remote.getGlobal('dirname')+"/xnPan/page/selectFolder.html",
                controller: FolderController,
                size:"",
                resolve: {
                    items: function () {
                        return {
                            diskId: $scope.page.disk.id,
                            rootId :$scope.page.disk.rootFolderId,
                            object :obj,
                            tenantId :tenantId
                        };
                    }

                }
            });
            modalInstance.result.then(function (targetId) {
                if(type == "folder") {
                    $scope.moveFolder(targetId, obj);
                } else {
                    $scope.moveFile(targetId, obj);
                }
                $scope.flag=false;
                $scope.search($scope.page.localPath);
            }, function () {
            });
        };

        // 移动文件夹
        $scope.moveFolder = function(targetId, object) {
            $scope.param = {
                folderId : object.id,
                targetId : targetId,
                rowVersion : object.rowVersion
            };
            var vm = {
                folderId:$scope.param.folderId,
                targetId:$scope.param.targetId,
                tenantId:tenantId,
                rowVersion:$scope.param.rowVersion,
            };
            talkService.xnTalkFolderMove(vm).success(function(data){
                if (data.errors == null || data.errors.length > 0){
                    dialogService.tip(data.errors);
                }else{
                    $scope.flag=false;
                    $scope.search($scope.page.localPath);

                }
            })
        };

        // 删除文件夹
        $scope.deleteFolder = function(id) {
            var dialogDefaults={
                size:"sm"
            };
            var dialogOptions={
                closeButtonText: "取消",
                actionButtonText: "确定删除",
                headerText: "删除文件夹",
                bodyText: "您确定要删除该文件夹吗？",
                callback:function(){
                    $scope.folder = {
                        id : id
                    };
                    var vm ={
                        id:$scope.folder.id,
                        tenantId:tenantId
                    };

                    talkService.xnTalkFolderDelete(vm).success(function(data){

                        if (data.errors == null || data.errors.length > 0){
                            dialogService.tip(data.errors)
                        }else{
                            $scope.flag=false;
                            $scope.search($scope.page.localPath);
                        }
                    })
                }
            };
            dialogService.confirm(dialogDefaults,dialogOptions);

        };
        //删除选中文件夹
        $scope.list={
            folderIdList:[],
            folderFileIdList:[]
        };

        $scope.batchDeleteFolder=function(){
            var flag=0;
            var parme=0;
            //文件夹
            for(var i=0;i<$scope.page.folderList.length;i++){
                if($scope.page.folderList[i].state==false){
                    flag++;
                }
            }

            //文件
            for(var j=0;j<$scope.page.fileList.length;j++){
                if($scope.page.fileList[j].state==false){
                    parme++;
                }
            }
            if(flag==$scope.page.folderList.length && parme==$scope.page.fileList.length){
                dialogService.tip([{"message":"请选择需要删除的文件"}]);
                return;
            }

            var dialogDefaults={
                size:"sm"
            };
            var dialogOptions={
                closeButtonText: "取消",
                actionButtonText: "确定删除",
                headerText: "删除文件?",
                bodyText: "您确定要删除吗？",
                callback:
                    function(){
                        for(var i=0;i<$scope.page.folderList.length;i++){
                            if($scope.page.folderList[i].state){
                                $scope.list.folderIdList.push($scope.page.folderList[i].id)
                            }
                        }
                        for(var j=0;j<$scope.page.fileList.length;j++){
                            if($scope.page.fileList[j].state){
                                $scope.list.folderFileIdList.push($scope.page.fileList[j].id)
                            }
                        }
                        var vm ={
                            folderFileIdList:$scope.list.folderFileIdList,
                            folderIdList:$scope.list.folderIdList,
                            tenantId:tenantId,
                        }

                        talkService.xnTalkFolderFileByIdsDelete(vm).success(function(data){
                            if (data.errors == null || data.errors.length > 0){
                                dialogService.tip(data.errors)
                            }else{
                                $scope.flag=false;
                                $scope.search($scope.page.localPath);
                                $scope.list.folderIdList=[];
                                $scope.list.folderFileIdList=[];
                                $scope.all.state=false;

                            }
                        });


                        var diskGetRequest={
                            id:diskId,
                            tenantId:tenantId
                        };
              
                        talkService.diskGetRequest(diskGetRequest).success(function(data){
                            if (data.errors == null || data.errors.length > 0){
                                dialogService.tip(data.errors)
                            }else{
                                $scope.page.disk = data.disk;
                            }
                        });
                    }
            };
            dialogService.confirm(dialogDefaults, dialogOptions);

        };
        // 上传文件
        $scope.uploadFile = function() {
            var fileId=document.getElementById("attachment");
            fileId.onchange=function(){
                var fileList = document.getElementById("attachment").files;
                for(var i = 0; i<fileList.length;i++) {
                    var file = fileList[i];
                    var fileReader = new FileReader();
                    fileReader.readAsDataURL(file);
                    fileReader.onload = function () {
                        document.getElementById("attachment").src = fileReader.result;
                        console.log(fileReader.result);
                        $scope.doUpload();
                    };
                    $scope.doUpload=function(){
                        //上传接口
                        var folderFileCreateRequest ={
                            tenantId:tenantId,
                            diskId:$scope.page.disk.id,
                            fileData:fileReader.result,
                            fileExt:file.type,
                            fileName:file.name,
                            folderId:$scope.page.path[$scope.page.path.length-1].id

                        };
                        talkService.xnTalkFolderFileCreate(folderFileCreateRequest).success(  function(data){
                            if (data.errors == null || data.errors.length > 0){
                                dialogService.tip(data.errors);
                            }else{
                                dialogService.tip("上传成功！");
                                $scope.search($scope.page.localPath);
                            }
                        });
                    };
                }
            };
        };

        //重命名文件
        $scope.renameFile = function(file) {

            var vm={
                tenantId:tenantId,
                id:file.id,
                fileName:file.fileName,
                rowVersion:file.rowVersion
            }
            talkService.xnTalkFolderFileUpdate(vm).success(function(data){
                if (data.errors == null || data.errors.length > 0){
                    dialogService.tip(data.errors)
                }else{
                    $scope.flag=false;
                    $scope.search($scope.page.localPath);
                }
            });
        };

        // 移动文件
        $scope.moveFile = function(targetId, object) {
            $scope.param = {
                id : object.id,
                targetId : targetId,
                rowVersion : object.rowVersion
            };

            var vm={
                tenantId:tenantId,
                id:$scope.param.id,
                targetId:$scope.param.targetId,
                rowVersion:$scope.param.rowVersion
            }
            talkService.xnTalkFolderFileMove(vm).success(function(data){
                if (data.errors == null || data.errors.length > 0){
                    dialogService.tip(data.errors)
                }else{
                    $scope.flag=false;
                    $scope.search($scope.page.localPath);

                }
            });

        };

        // 删除文件
        $scope.deleteFile = function(id) {
            var dialogDefaults={
                size:"sm"
            };
            var dialogOptions={
                closeButtonText: "取消",
                actionButtonText: "确定删除",
                headerText: "删除文件",
                bodyText: "您确定要删除吗？",
                callback:function(){
                    $scope.file = {
                        id : id
                    };
                    var folderFileDeleteRequest ={
                        id:id,
                        tenantId:tenantId
                    }

                    talkService.xnTalkFolderFileDelete(folderFileDeleteRequest).success( function(data){
                        if (data.errors == null || data.errors.length > 0){
                            dialogService.tip(data.errors)
                        }else{
                            $scope.flag=false;
                            $scope.search($scope.page.localPath);

                        }
                    });
                }

            };
            dialogService.confirm(dialogDefaults,dialogOptions)
        };
        /**
         * 下载单个文件
         * @param id    文件的ID
         */
        $scope.download = function(id) {

        };

        /**
         * 打开文件
         */
        $scope.openFile = function(id) {

        };

        angular.element(".rightClick").bind('contextmenu', function(event) {
            event.preventDefault();
        });

    };
    var FolderController =["$scope","$modalInstance", "$http", "$modal","items","talkService","dialogService","xnAppTool", "toolsService",
        function($scope, $modalInstance,$http, $modal,items,talkService,dialogService,xnAppTool,toolsService) {

          var  diskId=items.diskId;
          var  rootId =items.rootId;
          var object=items.obj;
          var tenantId=items.tenantId;

        $scope.param={
            diskId : diskId,
            pageNumber : 1,
            pageSize : 0
        };


        //绑定页面的树
        $scope.trees=[];

        //整个树
        $scope.allTrees=[];

        $scope.collapsed=false;

        /**
         * 选择靶文件夹
         * @param tree  选中的文件夹
         */
        $scope.selectTarget = function(tree) {
            $modalInstance.close(tree.id);
        };

        /**
         * 递归查找下一级
         * @param pid  父级id
         * @param orgList   查找的数组
         * @param level     层级数
         */
        var getChild = function(pid,orgList,level){
            level ++;
            angular.forEach(orgList,function(org){
                if(org.parentId === pid){
                    if(org.id != object.id) {
                        org.level = level;
                        org.visable = false;
                        $scope.allTrees.push(org);
                        getChild(org.id, orgList, level);
                    }
                }
            });
        };
        var getParent = function(pId,orgList){
            angular.forEach($scope.allTrees,function(org){
                if(org.id === pId){
                    orgList.push(org);
                    getParent(org.parentId,orgList);
                }
            });
        };

        var countChild = function(pid,orgList){
            angular.forEach($scope.allTrees,function(org){
                if(org.parentId === pid){
                    orgList.push(org);
                    countChild(org.id,orgList);
                }
            });
        };
        var folderFindRequest = new FolderFindRequest();
        folderFindRequest.setDiskId($scope.param.diskId);
        folderFindRequest.setTenantId(tenantId);
        folderFindRequest.setPageSize(0);


        var vm={
            tenantId:tenantId,
            diskId:$scope.param.diskId,
            pageSize:0
        }
        talkService.xnTalkFolderFind(vm).success(  function(data){
            if (data.errors == null || data.errors.length > 0){
                dialogService.tip(data.errors)
            }else{
                //组建新的树
                if(data.result.length > 0){
                    angular.forEach(data.result,function(folder){
                        if(folder.id == rootId){
                            if(folder.id != object.id) {       // 排除自已
                                folder.level = 0;
                                folder.visable = true;
                                $scope.allTrees.push(folder);
                                getChild(folder.id, data.result, 0);
                            }
                        }
                    });
                    //新建状态及是否有子栏目
                    for( var i=0; i< $scope.allTrees.length-1;i++){
                        if($scope.allTrees[i].id == $scope.allTrees[i+1].parentId){
                            $scope.allTrees[i].childState=true;
                            $scope.allTrees[i].collapsed=true;
                        }else{
                            $scope.allTrees[i].childState=false;
                            $scope.allTrees[i].collapsed=false;
                        }
                    }
                    $scope.allTrees[$scope.allTrees.length-1].childState=false;
                    angular.extend($scope.trees,$scope.allTrees);


                }
            }
        });


        $scope.collapseTree = function(tree,parent){
            angular.forEach(tree,function(organization) {
                if(organization.parentId === parent.id){
                    organization.visable = (!parent.collapsed && parent.visable);
                    $scope.collapseTree(tree,organization);
                }
            });
        };
        $scope.toggle = function(i) {
            $scope.trees[i].collapsed=! $scope.trees[i].collapsed;
            $scope.collapseTree($scope.trees,$scope.trees[i]);
        };

        //删除树
        $scope.delete = function(tree) {
            var dialogDefaults = {
                size:"sm"
            };
            var dialogOptions = {
                closeButtonText: "取消",
                actionButtonText: "确定删除",
                headerText: "继续....?",
                bodyText: "您确定要删除组织吗？",
                callback: function () {
                    HrService.apiHrOrgDelete({id:tree.id}).success(function(data){
                        if(data.errors === null || data.errors.length > 0){
                            dialogService.tip(data.errors);
                        }else{
                            /**
                             * 获取树的值在数组中的位置
                             * @param data 当前数据
                             * @returns {number} 返回位置
                             */
                            var location = function(data,dataList){
                                for(var i=0; i < dataList.length; i++){
                                    if(dataList[i].id===data.id){
                                        return  i;
                                    }
                                }
                            };

                            /**
                             * 查找兄弟的个数
                             * @param data       当前数据
                             * @param dataList    查询的数组
                             * @returns {number}  返回兄弟和自己的个数
                             */

                            var brothers = function(data,dataList){
                                var number = 0;
                                for(var i=0; i < dataList.length; i++){
                                    if(dataList[i].parentId===data.parentId){
                                        number++;
                                    }
                                }
                                return number;
                            };

                            /**
                             * 查找父级别位置
                             * @param data
                             * @param dataList
                             * @returns {number}
                             */

                            var locationParent = function(data,dataList){
                                for(var i=0; i < dataList.length; i++){
                                    if(dataList[i].id ===data.parentId){
                                        return i;
                                    }
                                }
                            };
                            if( brothers(tree,$scope.trees)===1){
                                if(locationParent(tree,$scope.trees)!=null){
                                    $scope.trees[locationParent(tree,$scope.trees)].childState = false;
                                }
                            }

                            if( brothers(tree,$scope.allTrees)===1){
                                if(locationParent(tree,$scope.allTrees)!=null){
                                    $scope.allTrees[locationParent(tree,$scope.allTrees)].childState = false;
                                }
                            }

                            $scope.trees.splice(location(tree,$scope.trees),1);
                            $scope.allTrees.splice(location(tree,$scope.allTrees),1);
                            dialogService.tip([{"message":"删除成功！" }]);


                        }
                    });
                }
            };
            dialogService.confirm(dialogDefaults, dialogOptions);

        };

        //树编辑
        $scope.edit = function (tree) {
            $scope.org={};
            //复制
            angular.extend($scope.org ,tree);

            //弹出窗口
            var modalInstance = $modal.open({
                templateUrl: "treeEidt.html",
                controller:TreeEidt,
                size:"",
                resolve: {
                    items: function () {
                        return $scope.org;
                    }
                }
            });
            modalInstance.result.then(function (data){

                /**
                 * 获取树的值在数组中的位置
                 * @param data 当前数据
                 * @returns {number} 返回位置
                 */
                var location = function(data,dataList){
                    for(var i=0; i < dataList.length; i++){
                        if($scope.trees[i].id==data.id){
                            return i;
                        }
                    }
                };

                //数据替换
                $scope.trees.splice(location(data,$scope.trees),1,data);
                $scope.allTrees.splice(location(data,$scope.allTrees),1,data);
            });
        };

        //新建树节点
        $scope.addTree = function (tree) {

            $scope.org={};
            if(tree != null){
                $scope.org = {
                    parentName  :tree.name,
                    parentId :tree.id
                };
            }else{
                $scope.org = {
                    parentName  :"",
                    parentId :""
                };
            }
            //弹出窗口
            var modalInstance = $modal.open({
                templateUrl: "treeEidt.html",
                controller:TreeEidt,
                size:"",
                resolve: {
                    items: function () {
                        return $scope.org;
                    }
                }
            });
            modalInstance.result.then(function (data) {
                //获取父级位置
                var location = function(data,dataList){
                    for(var i=0; i < dataList.length; i++){
                        if(dataList[i].id==data.parentId){
                            return  i;
                        }
                    }
                };
                var locationEndChild=function(index,treeList){
                    for(var i=treeList.length-1;i>=0; i--){
                        if(treeList[index].id==treeList[i].parentId){
                            return locationEndChild(i,treeList);
                        }
                    }
                    return index;
                };

                if(data.parentId==""){
                    //增加顶级树
                    data.childState = false;
                    data.collapsed = false;
                    data.visable = true;
                    data.level=0;
                    $scope.trees.push(data);
                    $scope.allTrees.push(data);

                }else{

                    //增加子级树
                    $scope.trees[location(data,$scope.trees)].childState = true;
                    $scope.trees[location(data,$scope.trees)].collapsed = false;

                    for(var i=0;i<$scope.trees.length; i++){
                        if($scope.trees[i].parentId===data.parentId){
                            $scope.trees[i].visable=true;
                        }
                    }

                    data.childState = false;
                    data.collapsed = false;
                    data.visable = true;
                    data.level =  $scope.trees[location(data,$scope.trees)].level+1;

                    $scope.trees.splice(locationEndChild(location(data,$scope.trees),$scope.trees)+1,0,data);
                    $scope.allTrees.splice(locationEndChild(location(data,$scope.allTrees),$scope.allTrees)+1,0,data);
                }
            });
        };

        //树搜索
        $scope.treeSearch = function () {
            $scope.organizationSearch = [];
            if($scope.keyword != null){
                $scope.SearchName($scope.allTrees,$scope.keyword);
            } else{
                angular.extend($scope.organizationSearch,$scope.allTrees);
            }
            $scope.trees = $scope.organizationSearch;
        };
        $scope.SearchName = function (data,searchText) {
            var searchLength = searchText.length;
            var jsonArray = data;
            for(var i=0 ;i<jsonArray.length ; i++ ){
                var jsonObject = jsonArray[i];
                var name = jsonObject.name;
                var nameLength = name.length;
                var flag = false;
                for(var temp=0;temp< (nameLength-searchLength+1);temp++){
                    if(searchText == name.substring(temp,temp+searchLength)){
                        flag = true;
                        break;
                    }
                }
                if(flag){
                    var j = 0 ;
                    if(jsonObject.parentId != null){
                        var parentList = [];
                        getParent(jsonObject.parentId,parentList)
                        for(j = parentList.length-1; j >= 0 ;j--){
                            parentList[j].collapsed = false;
                            parentList[j].visable = true;
                            $scope.organizationSearch.push(parentList[j]);
                        }
                    }
                    var tempObj = {};
                    angular.extend(tempObj,jsonObject);
                    var childList = [];
                    countChild(jsonObject.id,childList);
                    if(childList.length == 0){
                        tempObj.collapsed = false;
                        tempObj.visable = true;
                        $scope.organizationSearch.push(tempObj);
                    } else {
                        tempObj.collapsed = true;
                        tempObj.visable = true;
                        $scope.organizationSearch.push(tempObj);
                        for(j = 0; j < childList.length ;j++){
                            $scope.organizationSearch.push(childList[j]);
                        }
                        i =  i + childList.length;
                    }
                }
            }
        };

        $scope.clean = function(){
            $scope.organization = null;
        };

        $scope.move = function() {

        };
        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
        //关闭错误
        $scope.closeAlert = function (index,form) {
            form.splice(index,1);
        };
    }];

    angular.module('myApp')
        .filter("fileSize",function() {
            return function (input) {
                if(input){
                    if (input < 1024) {
                        return input + "B";
                    } else if (input < 1024 * 1024) {
                        return Math.round(input / 1024) + "KB";
                    } else if (input < 1024 * 1024 * 1024){
                        return (input / 1024 / 1024).toFixed(2) + "MB";
                    } else {
                        return (input / 1024 / 1024 / 1024).toFixed(2) + "GB";
                    }
                }
            };
        })
        .filter("diskFileType", [
            function () {
                return function (input) {
                    switch (input)
                    {
                        case "folder":
                            input="folder";
                            break;
                        case "xlsx":
                        case "xls":
                            input="xls";
                            break;
                        case "docx":
                        case "doc":
                            input="doc";
                            break;
                        case "pptx":
                        case "ppt":
                            input="ppt";
                            break;
                        case "txt":
                            input="txt";
                            break;
                        case "pdf":
                            input="pdf";
                            break;
                        case "zip":
                        case "rar":
                            input="zip";
                            break;
                        case "jpeg":
                        case "jpg":
                        case "png":
                        case "gif":
                            input="img";
                            break;
                        default:
                            input="other";
                            break;
                    }
                    return input;
                };
            }
        ])
        .controller("PanController", ["$scope", "$http", "$modal", panController])
        .controller("PanController", ["$scope", "$http","$q", "$modal","$filter","talkService","xnAppTool","dialogService", panController])
})();

