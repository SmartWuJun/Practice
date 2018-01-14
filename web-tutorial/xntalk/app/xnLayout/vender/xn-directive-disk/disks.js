/**
 * Created by DEV005 on 2017/7/25.
 * 
 */

angular.module("xn/template/pan.html", [])
    .run(["$templateCache", function ($templateCache) {
    "use strict";
    $templateCache.put("xn/template/pan/templates.html",
        "<div class=\"xn-directive-cloudDisk\" >" +
        "   <div class='cloudDisk-layout'>" +
        "       <div class='cloudDisk-left'  ng-if='!isImg'>" +
        "            <ul class='pan-menu'>"+
        "                 <li class='menu-li' ng-repeat='menu in panMenu'  ng-class=\"{'menu-li-active':menu.state,'bb':menu.bb}\"  ng-click='doMenu($index)'  >" +
        "                    <i class='xn-icon-pan {{menu.img}}' ></i>{{menu.value}}</li>"+
        "            </ul>"+
        "       </div>" +
        "       <div class='cloudDisk-left-b' ng-if='!isImg'>" +
       "            <div class='progress'>"+
       "            <div class='plan' ng-style='vm.plan'></div>"+
       "            </div>"+
       "            <div class='progress-title'> {{page.disk.usedSize | fileSize}}/{{page.disk.maxSize | fileSize}}</div>"+
        "       </div>" +
        "       <div class='cloudDisk-main'>" +
        "           <div class='main-top clearfix'>" +
        "               <div class='top-operating'>" +
        "                    <div class=\'top-l\' ng-show=\'panMenu[0].state || isImg\'>"+
        "                        <input type=\'file\' id=\'attachment\' class=\'file-none\' ng-click=\'uploadFile()\'  accept=\"{{accept}}\"   multiple/>"+
        "                        <label class=\'btn btn-primary mr-15\'  for=\'attachment\'><i class=\'xn-icon-pan icon-uploading pl_10 pr_15\'></i>上传文件</label>"+
        "                        <button class=\'btn btn-default mr-15\' ng-click=\'showCreateFolder();newCreate=true\' >"+
        "                            <i class=\'xn-icon-pan icon-create pr-15\'></i><span>新建文件夹</span>"+
        "                        </button>"+
        "                    </div>"+
        "                    <div class=\'top-r\'>"+
        "                        <button class=\'btn btn-link\' ng-click=\'batchDownload()\' ><i class=\'xn-icon-pan  icon-download top-r-three\'></i>下载</button>"+
        "                        <button class=\'btn btn-link\' ng-click=\'batchDeleteFolder()\'><i class=\'xn-icon-pan  icon-delete top-r-three\'></i>删除</button>"+
        "                    </div>" +
        "               </div>" +
        "               <div class='top-setting clearfix'>" +
        "                   <div class='crumb-path clearfix'>"+
        "                       <span class='path'>" +
        "                           <a class='path-back' ng-if='vm.parentId!=undefined && page.path.length > 1'" +
        "                                ng-click=\'jumpTo(page.path[page.path.length-2].id, page.path[page.path.length-2].name)\'>返回上一级 |</a>"+
        "                       </span>"+
        "                       <span class='path' ng-repeat='category in page.path' ng-if='page.path.length>1'>"+
        "                           <a class='path-back' ng-show='$index==0' ng-click='jumpTo(category.id,category.name)'> {{category.name}}</a>"+
        "                           <a class='path-back' ng-show='$index!=0 && $index!=page.path.length-1' ng-click='jumpTo(category.id,category.name)'>/ {{category.name}}</a>"+
        "                           <a class='path-item' ng-show='$index==page.path.length-1' ng-click='jumpTo(category.id,category.name)'>/ {{category.name}}</a>"+
        "                       </span>"+
        "                       <span class='path' ng-repeat='category in page.path' ng-if='page.path.length==1'>"+
        "                           <a class='path-item' ng-show='$index==0' ng-click='jumpTo(category.id,category.name)'> {{category.name}}</a>"+
        "                       </span>"+
        "                   </div>"+
        "                   <div class='xn-display-mode'>"+
        "                       <span class='text' title='切换到列表视图' ng-click='tabView(\"LIST\")' ng-class=\"{'text-hover':viewModule=='LIST'}\"><i class='xn-icon-pan icon-list pl-20'></i></span>"+
        "                       <span class='text' title='切换到大图视图'  ng-click='tabView(\"PIECE\")' ng-class=\"{'text-hover':viewModule=='PIECE'}\"><i class='xn-icon-pan icon-thumbnail pl-15'></i></span>"+
        "                   </div>"+
        "                   <div class='xn-sort'  ng-class=\"{'sort-list-active':viewActive}\" "+
        "                        ng-mouseenter='viewActive=true' ng-mouseleave='viewActive=false' >"+
        "                           <h2  class='sort-title'>"+
        "                                  <i class='xn-icon-pan icon-descendingorder'></i><span class='span'>{{sortName}}</span>" +
        "                           </h2>"+
        "                           <ul class='sort-list'>"+
        "                               <li class='sort-item' ng-repeat=\'sort in sortColumns\' ng-click=\'sortColumn(sort.key)\'>" +
        "                                   <i class=\'{{sort.img}}\'></i>" +
        "                                   <span class='span'>{{sort.value}}</span>" +
        "                               </li>"+
        "                           </ul>"+
        "                   </div>"+
        "               </div>" +
        "          </div>" +
        "          <div class='main-page clearfix'>" +
        "               <div class=\"page-left\">共{{page.totalCount}}条</div>" +
        "               <div class=\"page-right\">" +
        "                   <span class='page-item item-pre' ng-class=\"{'page-disabled':vm.pageNumber==1}\" ng-click=\"setPage('PRE')\"></span>" +
        "                   <span class='page-item'>{{vm.pageNumber}}</span>" +
        "                   <span class='page-item item-next' ng-class=\"{'page-disabled':vm.pageNumber==vm.maxPage}\" ng-click=\"setPage('NEXT')\"></span>" +
        "               </div>" +
        "          </div>" +
        "          <div class='main-body'>" +
        "             <div class='disk-main'>" +
        "                   <div class='disk-list-layout' ng-show='viewModule==\"LIST\"' >" +
        "                       <ul class='disk-list'>" +
        "                           <li class='disk-item header-title clearfix'>" +
        "                               <div class='xn-col-md-1'><label class=\"item-lable\" for=\"isAllSelect\"><input class='f-left'id='isAllSelect' type=\"checkbox\" ng-change=\"allSelect()\" ng-model=\"isAllSelect\"></lable></div>" +
        "                               <div class='xn-col-md-9'>文件名</div>" +
        "                               <div class='xn-col-md-3'>大小</div>" +
        "                               <div class='xn-col-md-4'>创建时间</div>" +
        "                               <div class='xn-col-md-4'>更新时间</div>" +
        "                               <div class='xn-col-md-3 xn-text-center'>操作</div>" +
        "                           <li>" +
        "                           <li class='disk-item clearfix' ng-show=\"page.createFolder\">" +
        "                               <div class='xn-col-md-1'></div>" +
        "                               <div class='xn-col-md-9'> " +
        "                                   <input ng-show=\"newCreate\" class=\"form-control xn-input-sm newCreate\" type=\"text\" name=\"newFolderName\" " +
        "                                       ng-model=\"page.newFolderName\" ng-blur=\"newCreate=false;createFolderFile()\"  autofocus=\"autofocus\"></div>" +
        "                               <div class='xn-col-md-3'></div>" +
        "                               <div class='xn-col-md-4'></div>" +
        "                               <div class='xn-col-md-4'></div>" +
        "                               <div class='xn-col-md-3 '></div>" +
        "                           <li>" +

        "                           <li class='disk-item clearfix'  ng-class=\"{'disk-item-active':folder.state}\"  ng-show=\"page.path.length > 0\"  ng-repeat=\"folder in page.folderList\"   " +
        "                                    title=\" {{folder.name}}&#10;创建时间：{{folder.creationTime}}&#10;更新时间：{{folder.lastUpdateTime}}\" >" +

        "                               <div class='xn-col-md-1'><label class=\"item-lable\" for=\"folder{{$index}}\" ><input type=\"checkbox\" id=\"folder{{$index}}\" ng-model=\"folder.state\" ></label></div>" +
        "                               <div class='xn-col-md-9' ng-init=\"hasRename=false\">" +
        "                                    <div class='item-icon' ng-click=\"openFolder(folder)\"></div>" +
        "                                    <div class=\"item-title\"  ng-show=\"!hasRename\" ng-click=\"openFolder(folder)\" >{{folder.name}}</div>" +
        "                                    <div class=\"item-title\" ng-show=\"hasRename\" >" +
        "                                       <input  class=\"form-control \" type=\"text\"  name=\"folderName\"    ng-model=\"folder.name\" ng-blur=\"hasRename=false;renameFolder(folder)\">" +
        "                                   </div>" +
        "                                </div>" +
        "                               <div class='xn-col-md-3' ng-click=\"folderSingleClick(folder)\" ></div>" +
        "                               <div class='xn-col-md-4' ng-click=\"folderSingleClick(folder)\" >{{folder.creationTime}}</div>" +
        "                               <div class='xn-col-md-4' ng-click=\"folderSingleClick(folder)\" >{{folder.lastUpdateTime}}</div>" +
        "                               <div class='xn-col-md-3 xn-text-center'  ng-init='showDetail=false' >" +
        "                                   <div class=\'view auto\' ng-mouseenter='showDetail=true'"+
        "                                        ng-mouseleave='showDetail=false' ng-class='{\"showMessage\":showDetail}'>"+
        "                                       <a class=\'view-a\' ng-click=\'openFolder(folder)\'>打开<i></i></a>"+
        "                                       <ul class=\'view-ul\'>"+
        "                                           <li><a ng-click=\'hasRename=true\'> 重命名</a></li>"+
        "                                           <li><a ng-click=\"openSelectFolder('folder',folder)\"> 移动</a></li>"+
        "                                           <li><a ng-click=\'deleteFolder(folder.id)\'> 删除</a></li>"+
        "                                       </ul>"+
        "                                    </div>"+
        "                               </div>" +
        "                           <li>" +
        "                           <li class='disk-item clearfix' ng-class=\"{'disk-item-active':file.state}\"  ng-show=\"page.path.length > 0\"  ng-repeat=\"file in page.fileList\"   " +
        "                                    title=\"{{file.fileName}}&#10;大小：{{file.file.size | fileSize}}&#10;创建时间：{{file.creationTime}}\" >" +
        "                               <div class='xn-col-md-1'><label class=\"item-lable\" for=\"file{{$index}}\" ><input type=\"checkbox\" id=\"file{{$index}}\" ng-model=\"file.state\"   ></label></div>" +
        "                               <div class='xn-col-md-9' ng-init=\"hasRename=false\">" +
        "                                    <div class='item-icon item-{{file.file.extension | diskFileType}}'  ng-click=\"fileSingleClick(file)\" " +
        "                                          ng-dblclick=\"attachmentViewOpen(file)\"  ng-style=file.newlineImgUrl   ></div>" +
        "                                    <div class=\"item-title\"  ng-show=\"!hasRename\" ng-click=\"fileSingleClick(file)\"  ng-dblclick=\"attachmentViewOpen(file)\">{{file.fileName}}</div>" +
        "                                    <div class=\"item-title\" ng-show=\"hasRename\" >" +
        "                                       <input  class=\"form-control \" type=\"text\"  name=\"folderName\"    ng-model=\"file.fileName\" ng-blur=\"hasRename=false;renameFile(file)\">" +
        "                                   </div>" +
        "                                </div>" +
        "                               <div class='xn-col-md-3'  ng-click=\"fileSingleClick(file)\" ng-dblclick=\"attachmentViewOpen(file)\">{{file.file.size | fileSize}}</div>" +
        "                               <div class='xn-col-md-4'  ng-click=\"fileSingleClick(file)\" ng-dblclick=\"attachmentViewOpen(file)\">{{file.creationTime}}</div>" +
        "                               <div class='xn-col-md-4'  ng-click=\"fileSingleClick(file)\" ng-dblclick=\"attachmentViewOpen(file)\">{{file.lastUpdateTime}}</div>" +
        "                               <div class='xn-col-md-3 xn-text-center'  ng-init='showDetail=false' ng-click='preventDefault($event)'>" +
        "                                   <div class=\'view auto\' ng-mouseenter='showDetail=true'"+
        "                                        ng-mouseleave='showDetail=false' ng-class='{\"showMessage\":showDetail}'>"+
        "                                       <a class=\'view-a\' ng-href=\"$config.getOssUrl(\"{{file.file.storagePath}}\")\" download=\"{{file.fileName}}\" target=\"_blank\">下载<i></i></a>"+
        "                                       <ul class=\'view-ul\'>"+
        "                                           <li><a ng-click=\'hasRename=true\'> 重命名</a></li>"+
        "                                           <li><a ng-click=\"openSelectFolder('file',file)\"> 移动</a></li>"+
        "                                           <li><a ng-click=\'deleteFile(file.id)\'> 删除</a></li>"+
        "                                       </ul>"+
        "                                    </div>"+
        "                               </div>" +
        "                           <li>" +
        "                           <li class='disk-item clearfix xn-text-conter' ng-if=\"vm.totalCount == 0\"> 无法找到相应的记录 <li>" +
        "                       </ul>" +
        "                   </div>" +
        "                   <div class='disk-piece-layout' ng-show='viewModule==\"PIECE\"' >" +
        "                       <ul class='disk-list'>" +
        "                           <li class='disk-item clearfix' ng-show=\"page.createFolder\">" +
        "                             <div class=\"item-icon\"></div>" +
        "                               <div class='clearfix'> " +
        "                                   <input ng-show=\"newCreate\" class=\"form-control\" type=\"text\" name=\"newFolderName\" " +
        "                                       ng-model=\"page.newFolderName\" ng-blur=\"newCreate=false;createFolderFile()\"  autofocus=\"autofocus\"></div>" +
        "                           <li>" +

        "                           <li class='disk-item clearfix' ng-class=\"{'disk-item-active':folder.state}\" ng-show=\"page.path.length > 0\"  ng-repeat=\"folder in page.folderList\"  " +
        "                                ng-click=\"folderSingleClick(folder)\"  title=\"{{folder.name}} &#10;创建时间：{{folder.creationTime}}&#10;更新时间：{{folder.lastUpdateTime}}\"  ng-init=\"hasRename=false\">" +
        "                               <div class=\"item-icon\"></div>" +
        "                               <div class=\"item-title\"  ng-show=\"!hasRename\" ng-click=\"openFolder(folder)\" >{{folder.name |substr:5}}</div>" +
        "                               <div class=\"item-title\" ng-show=\"hasRename\" >" +
        "                                   <input  class=\"form-control \" type=\"text\"  name=\"folderName\"    ng-model=\"folder.name\" ng-blur=\"hasRename=false;renameFolder(folder)\">" +
        "                               </div>" +
        "                           <li>" +

        "                           <li class='disk-item clearfix' ng-class=\"{'disk-item-active':file.state}\"  ng-show=\"page.path.length > 0\"  ng-repeat=\"file in page.fileList\"  " +
        "                                ng-click=\"fileSingleClick(file)\" ng-dblclick=\"attachmentViewOpen(file)\" " +
        "                                ng-init=\"hasRename=false\"   title=\"{{file.fileName}}&#10;大小：{{file.file.size | fileSize}}&#10;创建时间：{{file.creationTime}}\" >" +
        "                               <div class=\"item-icon item-{{file.file.extension|diskFileType}}\" ng-style=file.newImgUrl ></div>" +
        "                               <div class=\"item-title\"  ng-show=\"!hasRename\"  >{{file.fileName |substr:5}}</div>" +
        "                               <div class=\"item-title\" ng-show=\"hasRename\" >" +
        "                                   <input  class=\"form-control \" type=\"text\"  name=\"folderName\"     ng-model=\"file.fileName\" ng-blur=\"hasRename=false;renameFile(file)\">" +
        "                               </div>" +
        "                           <li>" +
        "                       </ul>" +
        "                   </div>" +
        "             </div>" +
        "          </div>" +
        "       </div>" +
        "   </div>" +
        "   <div class=\'xn-attachmentView-bj\' ng-show=\'attachmentState\' ng-click=\'attachmentViewClose()\'></div>"+
        "       <div class=\'xn-attachmentView-box\'  ng-show=\'attachmentState\'>"+
        "        <div class=\'xn-attachmentView-box-nr\' >"+
        "            <span class=\'attachmentView-close\' ng-click=\'attachmentViewClose()\'>X</span>"+
        "            <img class=\'xn-attachmentView-box-img\' ng-src=\'{{attachmentView}}\'>"+
        "        </div>"+
        "   </div>"+
        "</div> "
    );
}])
    .run(["$templateCache", function ($templateCache) {
    "use strict";
    $templateCache.put("xn/template/pan/selectFolder.html",
        "<div class=\"xn-directive-cloudDisk\" >" +
        "   <div class=\"xn-table-wrap\" >" +
        "       <table  class=\'table table-bordered\'>"+
        "            <thead>"+
        "            <tr>"+
        "                <th class=\'col-md-8\'>选择文件夹</th>"+
        "            </tr>"+
        "            </thead>"+
        "            <tbody id=\'tbody\'>"+
        "            <tr class=\'tree-header-{{tree.level}} td_{{tree.level}}\' ng-repeat=\'tree in trees\' ng-if=\'tree.visable\'"+
        "                ng-mouseenter=\'showDetail=true\' ng-init=\'showDetail=false\' ng-mouseleave=\'showDetail=false\'>"+
        "                <td class=\'first_td\'>"+
        "                    <i class=\'vertical-line-{{tree.level}}\'></i>"+
        "                    <div class=\'pt-15 f-left tree-{{tree.level}}\'>"+
        "                        <a ng-if=\'tree.childState && tree.collapsed\' class=\'btn-sm icon-a xn-tree-i\'  ng-click=\'toggle($index)\' >+"+
        "                        </a>"+
        "                                <span class=\'xn-tree-icon-span\'>"+
        "                                    <a ng-if=\'!(tree.childState && tree.collapsed)\' class=\'btn-sm icon-a xn-tree-i\'  ng-click=\'toggle($index)\' >-"+
        "                                    </a>"+
        "                                </span>"+
        "                        {{tree.name}}"+
        "                    </div>"+
        "                        <span class=\'f-right xn-text-left mt_7 pr_10\' ng-show=\'showDetail\'>"+
        "                            <button  class=\'btn icon-a disk-move btn-link \' ng-click=\'selectTarget(tree)\'></button>"+
        "                        </span>"+
        "                </td>"+
        "            </tr>"+
        "            <tr ng-if=\'trees.length == 0\'>"+
        "                <td colspan=\'4\' class=\'xn-center\'>无法找到相应的记录</td>"+
        "            </tr>"+
        "            </tbody>"+
        "        </table>"+
        "   </div> "+
        "</div> "
    );
}]);


angular.module("xn.directive.disk", ["xn/template/pan.html"])
    .directive("xnCloudDisk",[ "$timeout","$filter","$modal","cloudDiskService","dialogService", function ($timeout,$filter,$modal,cloudDiskService,dialogService) {
        return {
            restrict: "A",
            templateUrl: "xn/template/pan/templates.html",
            scope: {
                diskId:'=',
                isImg:'@'
            },
            replace: true,
            require: "?ngModel",
            link: function (scope, elem, attrs, ngModel) {

                scope.page= {
                    disk : {},
                    folderList : [],
                    fileList : [],
                    createFolder : false,
                    totalCount : 0,
                    newFolderName : {},
                    localPath:{},
                    path : []
                };

                scope.viewModule="LIST";
                scope.viewActive=false;
                scope.tabView=function (type) {
                    scope.viewModule=type;
                };

                scope.isAllSelect=false;
                scope.attachmentView="";
                scope.newCreate = false;
                scope.sortName='文件名';


                /*禁止上相传递*/
                scope.preventDefault=function ($event) {
                    $event.preventDefault();
                    $event.stopPropagation();
                };

                //网盘目录的定义
                scope.panMenu=[
                    {img:"icon-allfile",key:"ALL",value:"所有文件",bb:false,state:false},
                    {img:"icon-video",key:"AUDIO_VIDEO",value:"影音",bb:false ,state:false},
                    {img:"icon-file",key:"DOCUMENT",value:"文档",bb:false ,state:false},
                     {img:"icon-photo",key:"PICTURE",value:"图片",bb:true ,state:false},
                     {img:"icon-dustbin",key:"ALL",value:"回收站",bb:true ,state:false}
                ];
                //doMenu
                scope.doMenu=function(index){
                    angular.forEach(scope.panMenu,function(menu){
                        menu.state=false;
                    });
                    scope.panMenu[index].state=true;

                    // 初始化页面时，查询用户的磁盘信息
                    scope.vm.type=scope.panMenu[index].key;

                    if(index==4){
                        /*回收站*/
                        xnDisk.initGetHome(scope.panMenu[index].value,scope.page.disk.trashFolderId)
                    }else {
                        xnDisk.initGetHome(scope.panMenu[index].value,scope.page.disk.rootFolderId)
                    }


                };

                // 排序
                scope.sortColumns=[
                    {img:"xn-icon-pan icon-descendingorder",key:"FILE_NAME",value:"文件名"},
                    {img:"xn-icon-pan icon-descendingorder",key:"SIZE",value:"大小"},
                    {img:"xn-icon-pan icon-descendingorder",key:"CREATION_TIME",value:"最近上传"},
                    {img:"xn-icon-pan icon-descendingorder",key:"LAST_UPDATE_TIME",value:"修改日期"}
                ];

                scope.sortColumn=function(keyword){
                    angular.forEach(scope.sortColumns,function (column) {
                        if(keyword==column.key){
                            scope.vm.sortColumn=column.key;
                            scope.sortName=column.value;
                        }
                    });
                    scope.viewActive=false;
                    //重新获取
                    scope.vm.pageNumber=1;
                    scope.search(undefined,undefined,true);
                };
                // 返回根目录
                scope.backHome = function() {
                    scope.page.folderList=[];
                    scope.page.fileList=[];
                    scope.page.totalCount =0;
                    scope.page.path=[];
                };

                scope.vm={
                    pageNumber:1,
                    pageSize : 50
                };

                /*判断是否是图片空间*****************************************************************/
                if(scope.isImg){
                    scope.vm.type="PICTURE";
                    scope.panMenu[3].state=true;
                    scope.accept="image/gif, image/jpeg ,image/jpg,image/png";
                    scope.isImg=true;
                }else {
                    scope.vm.type="ALL";
                    scope.panMenu[0].state=true;
                    scope.accept="";
                    scope.isImg=false;
                };


                var xnDisk = new Object();
             /*   // 初始化页面时，查询用户的磁盘信息
                xnDisk.getUser=function () {
                    cloudDiskService.apiSystemUserinformationGet().success(function(user) {
                        if (user.errors == null || user.errors.length > 0) {
                            dialogService.tip(user.errors)
                        } else {
                            if(user.user.diskId == null) {
                                dialogService.tip([{"message":"您还没有开通网盘！" }]);
                            } else {
                                scope.page.disk.id = user.user.diskId;
                                xnDisk.getDisk();
                            }
                        }
                    });
                };*/
                xnDisk.getDisk=function (diskId) {
                    cloudDiskService.apiFoundationDiskGet({id:diskId}).success(function (disk) {
                        if (disk.errors == null || disk.errors.length > 0) {
                            dialogService.tip(disk.errors)
                        } else {
                            scope.page.disk = disk.disk;
                            scope.vm.diskId = disk.disk.id;

                            scope.vm.plan = {
                                width: parseInt(scope.page.disk.usedSize * 100 / scope.page.disk.maxSize) + "%"
                            };
                            scope.search(scope.page.disk.rootFolderId, '所有文件');
                            scope.backHome();
                        }
                    });
                };
                /*返回第一层*/
                xnDisk.initGetHome=function (name,id) {
                    scope.vm.pageNumber=1;
                    var folderName=name||"所有文件";
                    var folderId=id||scope.page.disk.rootFolderId;

                    scope.search(folderId,folderName);
                    scope.backHome();
                };
                /*返回返回上一层*/
                xnDisk.initBack=function (folderId,folderName) {
                    scope.vm.pageNumber=1;
                    scope.search(folderId, folderName);
                };

                /*等待网盘id*/
                scope.$watch("diskId" ,function (newId,oldId) {
                    if(newId){
                        xnDisk.getDisk(newId);
                    }
                });



                // 查询目录下的文件夹和文件
                scope.search = function(folderId,folderName,isPage) {

                    scope.page.fileList=[];
                    scope.page.folderList = [];
                    if(!isPage){
                        scope.vm.parentId = folderId;
                        scope.vm.parentName = folderName;
                    }

                    cloudDiskService.apiFoundationFolderFileFind(scope.vm).success(function (data) {
                        if (data.errors == null || data.errors.length > 0) {
                            dialogService.tip(data.errors)
                        } else {
                            if(data.folderFileList != null) {
                                scope.page.fileList = data.folderFileList;
                                for(var i=0; i<scope.page.fileList.length;i++){
                                    if($filter('diskFileType')(scope.page.fileList[i].file.extension)=="img"){
                                        scope.page.fileList[i].newlineImgUrl={"background-image":"url(\""+scope.page.fileList[i].path+"?x-oss-process=image/resize,m_lfit,w_40,h_34\")"};
                                        scope.page.fileList[i].newImgUrl={"background-image":"url(\""+scope.page.fileList[i].path+"?x-oss-process=image/resize,m_lfit,w_85,h_68\")"};
                                    }else{
                                        scope.page.fileList[i].newlineImgUrl="";
                                        scope.page.fileList[i].newimgUrl="";
                                    }

                                    scope.page.fileList[i].state=false;
                                }
                            }
                            if(data.folderList != null) {
                                scope.page.folderList = data.folderList;
                                for(var j=0; j<scope.page.folderList.length;j++){
                                    scope.page.folderList[j].state=false;
                                    scope.page.folderList[j].lastClick=0;
                                }
                            }
                            scope.page.totalCount = data.totalCount;

                            scope.vm.maxPage=Math.ceil(scope.page.totalCount/scope.vm.pageSize);

                            //是否是分页
                            if(!isPage){
                                if(folderName != null) {
                                    scope.page.path.push({
                                        "id": folderId,
                                        "name": folderName
                                    });
                                }
                                scope.page.localPath = folderId;
                                scope.page.createFolder = false;
                            }
                        }
                    })
                };

                scope.getList = function() {
                    scope.search(scope.page.localPath);
                };

                //
                scope.setPage=function (type) {
                    if(type=='PRE'&& scope.vm.pageNumber>1){
                        scope.vm.pageNumber--;
                    }else if(type=='NEXT'&& scope.vm.pageNumber<scope.vm.maxPage){
                        scope.vm.pageNumber++;
                    }else {
                        return;
                    }
                    scope.search(undefined,undefined,true);
                };

                //打开预览
                scope.attachmentViewOpen=function(file){
                    if($filter('diskFileType')(file.file.extension)=="img"){
                        scope.attachmentView=file.path;
                        scope.attachmentState=true;
                    }
                };
                //关闭预览
                scope.attachmentViewClose=function(){
                   scope.attachmentView="";
                   scope.attachmentState=false;
                };

                // 文件夹的单击和双击事件
                scope.folderSingleClick = function(folder) {
                    var time = new Date().getTime();
                    if(time - folder.lastClick < 500) {
                        scope.vm.pageNumber=1;
                        scope.search(folder.id,folder.name)
                    } else {
                        folder.lastClick = time;
                        folder.state = !folder.state;
                    }
                };

                scope.openFolder=function (folder) {
                   scope.vm.pageNumber=1;
                    scope.search(folder.id,folder.name)
                };


                // 文件的单击和双击事件
                scope.fileSingleClick = function(folder) {
                    var time = new Date().getTime();
                    if(time - folder.lastClick < 500) {
                        /*scope.search(folder.id,folder.name)*/

                    } else {
                        folder.lastClick = time;
                        folder.state = !folder.state;
                    }
                };



                //全选
                scope.allSelect=function(){
                    console.log(scope.isAllSelect);


                    for(var i=0;i<scope.page.folderList.length;i++){
                        scope.page.folderList[i].state=scope.isAllSelect;
                    }
                    for(var j=0;j<scope.page.fileList.length;j++){
                        scope.page.fileList[j].state=scope.isAllSelect;
                    }
                };

                //批量下载文件
                scope.batchDownload=function(){
                    var folderCount = 0;
                    for(var j=0; j<scope.page.folderList.length; j++) {
                        if(scope.page.folderList[j].state) {
                            folderCount ++;
                        }
                    }
                    if(folderCount>0) {
                        dialogService.tip([{"message":"暂不支持文件夹下载"}]);
                        return;
                    }
                    var count = 0;
                    for(var i=0; i<scope.page.fileList.length;i++){
                        if(scope.page.fileList[i].state) {
                            count ++;
                            window.open(scope.page.fileList[i].path, "_blank");
                        }
                    }
                    if(count == 0) {
                        dialogService.tip([{"message":"请选择需要下载的文件"}]);
                    }
                };

                // 从导航栏回到某一上级目录
                scope.jumpTo = function(folderId,folderName) {
                    for(var i=0;i<scope.page.path.length;i++) {
                        if(folderId === scope.page.path[i].id) {
                            scope.page.path = scope.page.path.slice(0, i);
                            break;
                        }
                    }

                    //返回上一级
                    xnDisk.initBack(folderId, folderName);
                };

                // 显示创建文件夹的栏位
                scope.showCreateFolder = function() {
                    var defaultName = "新建文件夹";
                    cloudDiskService.apiFoundationFolderFind({diskId : scope.page.disk.id, parentId : scope.vm.parentId,name : defaultName, pageSize : 0}).success(function (data) {
                        if (data.errors == null || data.errors.length > 0) {
                            // dialogService.tip(data.errors)
                        } else {
                            if(data.result.length == 0) {
                                scope.page.newFolderName = defaultName;
                            } else {
                                for(var i=0; i<data.result.length+1; i++) {
                                    var flag = true;
                                    var newName = i==0 ? defaultName : defaultName + "(" + i + ")";
                                    for(var j=0; j<data.result.length; j++) {
                                        if(data.result[j].name == newName) {
                                            flag = false;
                                            break;
                                        }
                                    }
                                    if(flag) {
                                        scope.page.newFolderName = newName;
                                        break;
                                    }
                                }
                            }
                            scope.page.createFolder = true;
                        }
                    });
                };

                // 创建文件夹
                scope.createFolderFile = function() {
                    console.log("createFolderFile");
                    scope.folder = {
                        parentId : scope.page.path[scope.page.path.length-1].id,
                        name : scope.page.newFolderName
                    };
                    if(scope.page.createFolder) {
                        cloudDiskService.apiFoundationFolderCreate(scope.folder).success(function (data) {
                            if (data.errors == null || data.errors.length > 0) {
                                dialogService.tip(data.errors)
                            } else {
                                scope.page.createFolder = false;
                                scope.search(scope.page.localPath);
                            }
                        });
                    }
                };

                // 重命名文件夹
                scope.renameFolder=function(folder) {
                    cloudDiskService.apiFoundationFolderUpdate(folder).success(function(data) {
                        if (data.errors == null || data.errors.length > 0) {
                            dialogService.tip(data.errors)
                        } else {
                            scope.search(scope.page.localPath);
                        }
                    });
                };

                // 打开选择目录的弹框
                scope.openSelectFolder = function(type,obj) {
                    var modalInstance = $modal.open({
                        templateUrl: "xn/template/pan/selectFolder.html",
                        controller: ["$scope","$modalInstance", "$http", "$modal","diskId", "rootId", "object", "cloudDiskService", "dialogService",
                            function($scope, $modalInstance,$http, $modal,diskId,rootId,object, cloudDiskService, dialogService) {
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

                                cloudDiskService.apiFoundationFolderFind($scope.param).success(function(data) {
                                    if (data.errors == null || data.errors.length > 0) {
                                        dialogService.tip(data.errors)
                                    } else {
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


                                $scope.cancel = function () {
                                    $modalInstance.dismiss('cancel');
                                };

                            }],
                        size:"",
                        resolve: {
                            diskId: function () {
                                return scope.page.disk.id;
                            },
                            rootId : function() {
                                return scope.page.disk.rootFolderId;
                            },
                            object : function() {
                                return obj;
                            }
                        }
                    });
                    modalInstance.result.then(function (targetId) {
                        if(type == "folder") {
                            scope.moveFolder(targetId, obj);
                        } else {
                            scope.moveFile(targetId, obj);
                        }
                        scope.vm.pageNumber=1;
                        scope.search(scope.page.localPath);
                    });
                };

                // 移动文件夹
                scope.moveFolder = function(targetId, object) {
                    scope.param = {
                        folderId : object.id,
                        targetId : targetId,
                        rowVersion : object.rowVersion
                    };
                    cloudDiskService.apiFoundationFolderMove(scope.param).success(function(data) {
                        if (data.errors == null || data.errors.length > 0) {
                            dialogService.tip(data.errors)
                        } else {
                            scope.search(scope.page.localPath);
                        }
                    });
                };

                // 删除文件夹
                scope.deleteFolder = function(id) {
                    var dialogDefaults={
                        size:"sm"
                    };
                    var dialogOptions={
                        closeButtonText: "取消",
                        actionButtonText: "确定删除",
                        headerText: "继续....?",
                        bodyText: "您确定要删除吗？",
                        callback:function(){
                            scope.folder = {
                                id : id
                            };
                            cloudDiskService.apiFoundationFolderDelete(scope.folder).success(function(data) {
                                if (data.errors == null || data.errors.length > 0) {
                                    dialogService.tip(data.errors)
                                } else {
                                    scope.search(scope.page.localPath);
                                }
                            });
                        }
                    };
                    dialogService.confirm(dialogDefaults,dialogOptions);

                };

                //删除选中文件夹
                scope.list={
                    folderIdList:[],
                    folderFileIdList:[]
                };

                // 批量删除
                scope.batchDeleteFolder=function(){
                    var flag=0;
                    var parme=0;
                    //文件夹
                    for(var i=0;i<scope.page.folderList.length;i++){
                        if(scope.page.folderList[i].state==false){
                            flag++;
                        }
                    }

                    //文件
                    for(var j=0;j<scope.page.fileList.length;j++){
                        if(scope.page.fileList[j].state==false){
                            parme++;
                        }
                    }
                    if(flag==scope.page.folderList.length && parme==scope.page.fileList.length){
                        dialogService.tip([{"message":"请选择需要删除的文件"}]);
                        return;
                    }

                    var dialogDefaults={
                        size:"sm"
                    };
                    var dialogOptions={
                        closeButtonText: "取消",
                        actionButtonText: "确定删除",
                        headerText: "继续....?",
                        bodyText: "您确定要删除吗？",
                        callback:
                            function(){
                                for(var i=0;i<scope.page.folderList.length;i++){
                                    if(scope.page.folderList[i].state){
                                        scope.list.folderIdList.push(scope.page.folderList[i].id)
                                    }
                                }
                                for(var j=0;j<scope.page.fileList.length;j++){
                                    if(scope.page.fileList[j].state){
                                        scope.list.folderFileIdList.push(scope.page.fileList[j].id)
                                    }
                                }
                                cloudDiskService.apiFoundationFolderFileDeleteByIds(scope.list).success(function(data) {
                                    if (data.errors == null || data.errors.length > 0) {
                                        dialogService.tip(data.errors)
                                    } else {
                                        scope.search(scope.page.localPath);
                                        scope.list.folderIdList=[];
                                        scope.list.folderFileIdList=[];
                                    }
                                });
                            }
                    };
                    dialogService.confirm(dialogDefaults, dialogOptions);

                };

                // 上传文件
                scope.uploadFile = function() {
                    var fileId=document.getElementById("attachment");
                    fileId.onchange=function(){
                        var fileList = document.getElementById("attachment").files;
                        for(var i = 0; i<fileList.length;i++) {
                            var file = fileList[i];
                            var fileReader = new FileReader();
                            fileReader.readAsDataURL(file);
                            fileReader.onload = function () {
                                document.getElementById("attachment").src = fileReader.result;
                            };
                            cloudDiskService.apiFoundationDiskFileUpload(file, scope.page.disk.id, scope.page.localPath).success(function (data) {
                                if (data.errors == null || data.errors.length > 0) {
                                    dialogService.tip(data.errors)
                                } else {
                                    scope.search(scope.page.localPath);
                                }
                            });
                        }
                    };
                };

                //重命名文件
                scope.renameFile = function(file) {
                    cloudDiskService.apiFoundationFolderFileUpdate(file).success(function(data) {
                        if (data.errors == null || data.errors.length > 0) {
                            dialogService.tip(data.errors)
                        } else {
                            scope.search(scope.page.localPath);
                        }
                    });
                };

                // 移动文件
                scope.moveFile = function(targetId, object) {
                    scope.param = {
                        id : object.id,
                        targetId : targetId,
                        rowVersion : object.rowVersion
                    };
                    cloudDiskService.apiFoundationFolderFileMove(scope.param).success(function(data) {
                        if (data.errors == null || data.errors.length > 0) {
                            dialogService.tip(data.errors)
                        } else {
                            scope.search(scope.page.localPath);
                        }
                    });
                };

                // 删除文件
                scope.deleteFile = function(id) {
                    var dialogDefaults={
                        size:"sm"
                    };
                    var dialogOptions={
                        closeButtonText: "取消",
                        actionButtonText: "确定删除",
                        headerText: "继续....?",
                        bodyText: "您确定要删除吗？",
                        callback:function(){
                            scope.file = {
                                id : id
                            };
                            cloudDiskService.apiFoundationFolderFileDelete(scope.file).success(function(data) {
                                if (data.errors == null || data.errors.length > 0) {
                                    dialogService.tip(data.errors)
                                } else {
                                    scope.search(scope.page.localPath);
                                }
                            });
                        }

                    };
                    dialogService.confirm(dialogDefaults,dialogOptions)
                };

              

                angular.element(".rightClick").bind('contextmenu', function(event) {
                    event.preventDefault();
                });

            }
        };

    }])
    .config(['$httpProvider',function ($httpProvider) {
        $httpProvider.defaults.headers.post['Content-Type'] = 'text/plain';
        $httpProvider.defaults.withCredentials=true;
        $httpProvider.defaults.useXDomain = true;
    }])
    .factory('cloudDiskService', ['$http',"xnConfig", function ($http,xnConfig ) {
        var service = {};
        var url = xnConfig.myUrl+"api/foundation.do";
        var sysUrl=xnConfig.myUrl+"system/api.do";
        var attachmentUrl=xnConfig.myUrl+"api/attachmentUpload.do";
        var fileUrl=xnConfig.myUrl+"api/diskFileUpload.do";

        service.apiSystemUserinformationGet = function () {
            return $http({
                method: 'POST',
                url: sysUrl,
                params: {"method": "api.system.userinformation.get"} });
        };
        /*获取网盘*/
        service.apiFoundationDiskApply = function (data) {
            return $http({
                method: 'POST',
                url: url,
                data: data,
                params: {"method": "api.foundation.disk.apply"} });
        };
        /*获取网盘*/
        service.apiFoundationDiskGet = function (data) {
            return $http({
                method: 'POST',
                url: url,
                data: data,
                params: {"method": "api.foundation.disk.get"} });
        };

        service.apiFoundationFilePathGetList = function (data) {
            return $http({
                method: 'POST',
                url: url,
                data: data,
                params: {"method": "api.foundation.filepath.getlist"} });
        };
        /**
         * 获取附件列表
         *
         * @param data
         * @returns {*}
         */
        service.apiFoundationAttachmentGetListByBizInfo = function(data){
            return $http({
                method: 'POST',
                responseType:"json",
                /*    dataType: "json",*/
                url: url,
                params: {"method": "api.foundation.attachment.getlist.bybizinfo"},
                data:data
            });
        };
        /*文件上传*/
        service.apiFoundationFileUpload = function (data) {
            return  $http({
                method: 'POST',
                url: fileUrl,
                headers: {'Content-Type': undefined },
                transformRequest: angular.identity,
                data: data
            });
        };

        //上传附件
        service.apiFoundationAttachmentUpload = function(file,businessId,businessType,businessCategory){
            var fileName = file.name;
            var ext =fileName.substr(fileName.lastIndexOf(".")+1,fileName.length);
            var name = fileName.substr(0,fileName.lastIndexOf("."));
            var fd = new FormData();
            fd.append("file",file);
            fd.append("FileName",name);
            fd.append("Ext",ext);
            fd.append("method","api.foundation.attachment.upload");
            fd.append("businessId",businessId);
            fd.append("businessType",businessType);
            fd.append("businessCategory",businessCategory);
            return($http({
                method : 'POST',
                url : attachmentUrl,
                headers: {'Content-Type': undefined },
                transformRequest: angular.identity,
                data:fd
            })) ;
        };

        service.apiFoundationDiskFileUpload  = function (file, diskId, folderId) {
            var fd = new FormData();
            fd.append("File", file);
            fd.append("DiskId", diskId);
            fd.append("FolderId", folderId);
            return($http({
                method: 'POST',
                url: fileUrl,
                headers: {'Content-Type': undefined },
                transformRequest: angular.identity,
                data: fd
            }));
        };

        //删除附件
        service.apiFoundationAttachmentDelete = function(data){
            return $http({
                method: 'POST',
                url: url,
                params: {"method": "api.foundation.attachment.delete"},
                data: data
            });
        };
        service.apiFoundationFilePathGet = function (data) {
            return $http({
                method: 'POST',
                url: url,
                data: data,
                params: {"method": "api.foundation.filepath.get"} });
        };
        service.apiFoundationAttachmentUploadbyfileid = function (data) {
            return $http({
                method: 'POST',
                url: url,
                data: data,
                params: {"method": "api.foundation.attachment.uploadbyfileid"} });
        };

        // service.apiFoundationFolderFileFind = function (data) {
        //     return $http({
        //         method: 'POST',
        //         url: url,
        //         data: data,
        //         params: {"method": "api.foundation.folder.file.find"} });
        // };

        service.apiFoundationFolderFileSearch   = function(data){return $http({method: 'POST', url: url, params: {"method": "api.foundation.folder.file.search"}, data: data});};
        // 高级查询文件夹文件 常用
        service.apiFoundationFolderFileFind     = function(data){return $http({method: 'POST', url: url, params: {"method": "api.foundation.folder.file.find"}, data: data});};
        // 创建文件
        service.apiFoundationFolderFileCreate   = function(data){return $http({method: 'POST', url: url, params: {"method": "api.foundation.folder.file.create"}, data: data});};
        // 更新文件信息
        service.apiFoundationFolderFileUpdate   = function(data){return $http({method: 'POST', url: url, params: {"method": "api.foundation.folder.file.update"}, data: data});};
        // 移动文件
        service.apiFoundationFolderFileMove     = function(data){return $http({method: 'POST', url: url   , params: {"method": "api.foundation.folder.file.move"}, data: data});};
        // 删除文件
        service.apiFoundationFolderFileDelete   = function(data){return $http({method: 'POST', url: url, params: {"method": "api.foundation.folder.file.delete"}, data: data});};
        service.apiFoundationFolderFileDeleteByIds   = function(data){return $http({method: 'POST', url: url, params: {"method": "api.foundation.folder.file.delete.by.ids"}, data: data});};
        // 搜索文件夹
        service.apiFoundationFolderFind         = function(data){return $http({method: 'POST', url: url, params: {"method": "api.foundation.folder.find"}, data: data});};
        // 创建文件夹
        service.apiFoundationFolderCreate       = function(data){return $http({method: 'POST', url: url, params: {"method": "api.foundation.folder.create"}, data: data});};
        // 更新文件夹信息
        service.apiFoundationFolderUpdate       = function(data){return $http({method: 'POST', url: url, params: {"method": "api.foundation.folder.update"}, data: data});};
        // 移动文件夹
        service.apiFoundationFolderMove         = function(data){return $http({method: 'POST', url: url, params: {"method": "api.foundation.folder.move"}, data: data});};
        // 删除文件夹
        service.apiFoundationFolderDelete       = function(data){return $http({method: 'POST', url: url, params: {"method": "api.foundation.folder.delete"}, data: data});};

        return service;
    }])
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
    ]);


