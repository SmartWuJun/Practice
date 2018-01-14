/**
 * Created by DEV005 on 2016/3/31.
 */
(function () {
    'use strict';
    var fs = require("fs");
    var json2xml = require('xml2js');

    var EditController=["$scope","$modalInstance","items",
        function ($scope, $modalInstance,items) {

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

            $scope.selectType=function(item){
                if('String'== $scope.item.type) {
                    item.min="0";
                    item.max="100";
                } else {
                    item.min="";
                    item.max="";
                }
            };


            $scope.item=items;
            $scope.doSave =function(){
                if($scope.item.name){
                    if(!$scope.item.type || $scope.item.type ==""){
                        $scope.errors="类型不能为空！";
                        return ;
                    }else if(!$scope.item.meaning || $scope.item.meaning ==""){
                        $scope.errors="含义不能为空！";
                        return;
                    }
                }
                $modalInstance.dismiss($scope.items);
            };
            $scope.cancel = function () {
                $modalInstance.close('cancel');
            };
            //关闭错误
            $scope.closeAlert=function(){
                $scope.errors="";
            };
        }];


    function customerController($scope,$modal,dialogService) {
        //数据修复
        function recoveryData(){
            angular.forEach($scope.vm.table.columns.column,function(item){
                if(item.max){
                    Number(item)
                }
            })
        }
        //文件接收
        $scope.$on('childFileData', function(e,fileData){
            $scope.vm=fileData;
            console.log(fileData);

            if(angular.isArray($scope.vm.table.columns.column)){
                $scope.vm.table.columns.column[0].isRequired=true;
            }else {
                   var newColumn=$scope.vm.table.columns.column;
                   $scope.vm.table.columns.column=[];
                   $scope.vm.table.columns.column[0]=newColumn;
                   $scope.vm.table.columns.column[0].isRequired=true;
            }

            //判断承租人
            $scope.selectTenant();
        });

        //文件夹接收
        $scope.$on('childFolderData', function(e,fileData){
            $scope.setting=fileData;
            if(!$scope.setting.setting.tablePrefix || $scope.setting.setting.tablePrefix==""){
                $scope.setting.setting.tablePrefix="XXX_";
            }
        });

        $scope.$on('childFile', function(e,file){
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
                companyName:"",
                developerName:"",
                tablePrefix:"XXX_"
            }
        };

        $scope.vm={
            "table":{
                "name":"",
                "meaning":"",
                "description":"",
                "isByTenant":false,
                "uniqueIndex":"",
                "columns":{
                    "column":[
                        {  "name":"ID",
                            "type":"Id",
                            "meaning":"主键",
                            "description":"",
                            "isRequired":true,
                            "min":"",
                            "max":"",
                            "referenceType":"",
                            "referenceObject":"",
                            "isListable":true,
                            "isExportable":false,
                            "isQueryable":false,
                            "isSortable":true
                        }
                    ]
                }
            }
        };





        //行操作
        $scope.addLine=function(index){
            var item={
                "name":"",
                "type":"",
                "meaning":"",
                "description":"",
                "isRequired":false,
                "min":"",
                "max":"",
                "referenceType":"",
                "referenceObject":"",
                "isListable":false,
                "isExportable":false,
                "isQueryable":false,
                "isSortable":false
            };
            $scope.vm.table.columns.column.splice( index+1,0,item);
        };


        $scope.deleteLine=function(index){

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
                    if(  $scope.vm.table.columns.column.length=="1"){
                        $scope.vm.table.columns.column.splice(index,1);
                        //新加一条空数据
                        $scope.addLine(0);
                    }else{
                        if($scope.vm.table.columns.column[index].name=="TENANT_ID"){
                            $scope.vm.table.isByTenant=false;
                        }
                        $scope.vm.table.columns.column.splice(index,1);
                    }
                }
            };
            dialogService.confirm(dialogDefaults, dialogOptions);
        };
        $scope.selectType=function(item){
            if('String'==item.type) {
                item.min="0";
                item.max="100";
            } else {
                item.min="";
                item.max="";
            }
        };


        //业务操作
        $scope.selectTenant=function(){
            if($scope.vm.table.isByTenant && $scope.vm.table.isByTenant!="false" ){
                var isHave=false;
                angular.forEach($scope.vm.table.columns.column,function(data,index){
                    if(data.name=="TENANT_ID"){
                        isHave=true;
                    }
                });
                //添加
               if(!isHave){
                   var item={
                       "name":"TENANT_ID",
                       "type":"Id",
                       "meaning":"承租人ID",
                       "description":"",
                       "isRequired":true,
                       "min":"",
                       "max":"",
                       "referenceType":"FK",
                       "referenceObject":"SYS_TENANT.ID",
                       "isListable":true,
                       "isExportable":true,
                       "isQueryable":true,
                       "isSortable":true
                   };
                   $scope.vm.table.columns.column.splice(1,0,item)
               }
            }else {
                //angular.forEach($scope.vm.table.columns.column,function(data,index){
                //    if(data.name=="TENANT_ID"){
                //        $scope.vm.table.columns.column.splice(index,1)
                //    }
                //});
            }
        };



        //添加字段
        function addFieldFactory(addArray,protoArray,property){
            if(angular.isArray(addArray) && angular.isArray(protoArray)){
                for (var i= 0,addLength=addArray.length; i<addLength;i++){
                    var isHave=false;
                    angular.forEach(protoArray,function(data,index){
                        if(addArray[i][property]==data[property]){
                            isHave=true;
                        }
                    });
                    if(!isHave){
                        protoArray.push(addArray[i]);
                    }
                }
            }else {
                console.error("提供的参数请是数组!")
            }
        }


        //addRoutine 标准字段
        function  addRoutine(){
            var routineArray=[
                {
                    "name":"CODE",
                    "type":"String",
                    "meaning":$scope.vm.table.meaning+"代码",
                    "description":"",
                    "isRequired":true,
                    "min":"",
                    "max":"50",
                    "referenceType":"",
                    "referenceObject":"",
                    "isListable":true,
                    "isExportable":true,
                    "isQueryable":true,
                    "isSortable":true
                },
                {
                    "name":"TYPE",
                    "type":"String",
                    "meaning":$scope.vm.table.meaning+"类型",
                    "description":"",
                    "isRequired":true,
                    "min":"",
                    "max":"50",
                    "referenceType":"",
                    "referenceObject":"",
                    "isListable":true,
                    "isExportable":true,
                    "isQueryable":true,
                    "isSortable":true
                },
                {
                    "name":"NAME",
                    "type":"String",
                    "meaning":$scope.vm.table.meaning+"名称",
                    "description":"",
                    "isRequired":true,
                    "min":"",
                    "max":"100",
                    "referenceType":"",
                    "referenceObject":"",
                    "isListable":true,
                    "isExportable":true,
                    "isQueryable":true,
                    "isSortable":true
                },
                {
                    "name":"DESCRIPTION",
                    "type":"String",
                    "meaning":$scope.vm.table.meaning+"描述",
                    "description":"",
                    "isRequired":false,
                    "min":"",
                    "max":"500",
                    "referenceType":"",
                    "referenceObject":"",
                    "isListable":true,
                    "isExportable":true,
                    "isQueryable":true,
                    "isSortable":true
                }
            ];
            addFieldFactory(routineArray,$scope.vm.table.columns.column,"name");
        }

        //addRoutine 标准字段
        function  addOperative(){
            var operativeArray=[
                {"name":"IS_ACTIVE","type":"Boolean", "meaning":"是否有效","description":"","isRequired":true,"min":"", "max":"","referenceType":"","referenceObject":"","isListable":true,"isExportable":true,"isQueryable":true,"isSortable":true},
                {"name":"ACTIVE_DATE", "type":"Date", "meaning":"生效日期","description":"","isRequired":true, "min":"","max":"", "referenceType":"","referenceObject":"","isListable":true,"isExportable":true,"isQueryable":false,"isSortable":false},
                {"name":"INACTIVE_DATE", "type":"Date", "meaning":"失效日期","description":"","isRequired":false, "min":"","max":"", "referenceType":"","referenceObject":"","isListable":true,"isExportable":true,"isQueryable":false,"isSortable":false}
            ];
            addFieldFactory(operativeArray,$scope.vm.table.columns.column,"name");
        }

        //addRoutine 标准字段
        function  addForm(){
            var formArray=[
                {"name":"IS_SUBMIT","type":"Boolean", "meaning":"是否已提交","description":"","isRequired":true,"min":"", "max":"","referenceType":"","referenceObject":"","isListable":true,"isExportable":true,"isQueryable":false,"isSortable":false},
                {"name":"SUBMIT_USER_ID", "type":"Id", "meaning":"提交用户ID","description":"","isRequired":false, "min":"","max":"", "referenceType":"FK","referenceObject":"SYS_USER.ID","isListable":true,"isExportable":true,"isQueryable":true,"isSortable":false},
                {"name":"SUBMIT_USER_NAME", "type":"String", "meaning":"提交用户姓名","description":"","isRequired":false, "min":"","max":"200", "referenceType":"FK","referenceObject":"SYS_USER.NAME","isListable":true,"isExportable":true,"isQueryable":true,"isSortable":false},
                {"name":"SUBMIT_TIME", "type":"DateTime", "meaning":"提交时间","description":"","isRequired":false, "min":"","max":"", "referenceType":"","referenceObject":"","isListable":true,"isExportable":true,"isQueryable":false,"isSortable":false},
                {"name":"IS_APPROVED", "type":"Boolean", "meaning":"是否已审批","description":"","isRequired":false, "min":"","max":"", "referenceType":"","referenceObject":"","isListable":true,"isExportable":true,"isQueryable":false,"isSortable":false},
                {"name":"APPROVE_USER_ID", "type":"Id", "meaning":"审批用户ID","description":"","isRequired":false, "min":"","max":"", "referenceType":"FK","referenceObject":"SYS_USER.ID","isListable":true,"isExportable":true,"isQueryable":true,"isSortable":false},
                {"name":"APPROVE_USER_NAME", "type":"String", "meaning":"审批用户姓名","description":"","isRequired":false, "min":"","max":"200", "referenceType":"FK","referenceObject":"SYS_USER.NAME","isListable":true,"isExportable":true,"isQueryable":true,"isSortable":false},
                {"name":"APPROVE_TIME", "type":"DateTime", "meaning":"审批时间","description":"","isRequired":false, "min":"","max":"", "referenceType":"","referenceObject":"","isListable":true,"isExportable":true,"isQueryable":false,"isSortable":false},
                {"name":"APPROVE_RESULT", "type":"String", "meaning":"审批结果","description":"","isRequired":false, "min":"","max":"200", "referenceType":"Enum","referenceObject":"AGREE,DISAGREE","isListable":true,"isExportable":true,"isQueryable":false,"isSortable":false},
                {"name":"IS_POSTED", "type":"Boolean", "meaning":"是否已过帐","description":"","isRequired":true, "min":"","max":"", "referenceType":"","referenceObject":"","isListable":true,"isExportable":true,"isQueryable":false,"isSortable":false},
                {"name":"POST_USER_ID", "type":"Id", "meaning":"过账用户ID","description":"","isRequired":false, "min":"","max":"", "referenceType":"FK","referenceObject":"SYS_USER.ID","isListable":true,"isExportable":true,"isQueryable":true,"isSortable":false},
                {"name":"POST_USER_NAME", "type":"String", "meaning":"过账用户姓名","description":"","isRequired":false, "min":"","max":"200", "referenceType":"FK","referenceObject":"SYS_USER.NAME","isListable":true,"isExportable":true,"isQueryable":true,"isSortable":false},
                {"name":"POST_TIME", "type":"DateTime", "meaning":"过账时间","description":"","isRequired":false, "min":"","max":"", "referenceType":"","referenceObject":"","isListable":true,"isExportable":true,"isQueryable":false,"isSortable":false}
            ];
            addFieldFactory(formArray,$scope.vm.table.columns.column,"name");
        }


        $scope.addField=function(parameter){
            switch (parameter){
                case "routine" :
                    addRoutine();
                    break;
                case "operative":
                    addOperative();
                    break;
                case "form":
                    addForm();
                    break;
            }
        };



            //新增文件夹
        $scope.addFile=function(){

            $scope.vm={
                "table":{
                    "name":"",
                    "meaning":"",
                    "description":"",
                    "isByTenant":false,
                    "uniqueIndex":"",
                    "columns":{
                        "column":[
                            {  "name":"ID",
                                "type":"Id",
                                "meaning":"主键",
                                "description":"",
                                "isRequired":true,
                                "min":"",
                                "max":"",
                                "referenceType":"",
                                "referenceObject":"",
                                "isListable":true,
                                "isExportable":false,
                                "isQueryable":false,
                                "isSortable":true
                            }
                        ]
                    }
                }
            };

            var  parentFile=$scope.file;
            $scope.file={
                isNew:true,
                type:"file",
              /*  path:parentFile.path+"/"+parentFile.name,*/
                children : [],
                name:"",
                newName:"",
                parent:parentFile
            };
        };


        //新增文件夹
        $scope.addFolder=function(){

            $scope.setting={
                "setting":{
                    applicationCode:"",
                    applicationName:"",
                    companyCode:"",
                    companyName:"",
                    developerName:"",
                    tablePrefix:"XXX_"
                }
            };

            var  parentFile=$scope.file;
            $scope.file={
                isNew:true,
                type:"folder",
              /*  path:parentFile.path+"/"+parentFile.name,*/
                children : [],
                name:"",
                newName:"",
                parent:parentFile
            };
        };


        //编辑
        $scope.editLine=function(item){

            var modalInstance = $modal.open({
                templateUrl: "editLine.html",
                controller: EditController,
                resolve: {
                    items: function () {
                        return  item;
                    }
                }
            });
            modalInstance.result.then(function (data) {
                item=data;
            });

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
                        deleteFolderRecursive($scope.file.path);
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
            if($scope.file.type=='file' && $scope.file.name!=$scope.vm.table.name+".t"){
                //重命名

                //文件名称与表名称相同
                fs.rename($scope.file.path,$scope.file.parent.path+"/"+$scope.vm.table.name+'.t',function(err){
                    if (err) {
                        dialogService.tip([{"message":"没有权限！"}],null,1000);
                        return;
                    }
                    $scope.file.name=$scope.vm.table.name+'.t';
                    $scope.file.path=$scope.file.parent.path+"/"+$scope.vm.table.name+'.t';
                    $scope.$emit('parentRename', $scope.file);
                });

            }else if( $scope.file.type=='folder' && $scope.file.newName!=$scope.file.name) {
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
                fs.rename($scope.file.path,$scope.file.parent.path+"/"+$scope.file.newName,function(){
                    if (err) {
                        dialogService.tip([{"message":"没有权限！"}],null,1000);
                        return;
                    }
                    $scope.file.name=$scope.file.newName;
                    $scope.file.path=$scope.file.parent.path+"/"+$scope.file.newName;
                    $scope.$emit('parentRename', $scope.file);
                });

            }
        };

        $scope.closeAlert=function(){
            $scope.errors="";
        };

        //保存文件
        $scope.doSubmitFile=function(){
            //转换成xml
            console.log($scope.vm.table.columns.column);


            //转换成xml   $scope.file.newName
            if(!$scope.vm.table.name || $scope.vm.table.name==""){
                $scope.errors="请填写表名称！";
                return ;
            }else {
                //判断名称是否存在

                var state=false;
                angular.forEach($scope.file.parent.children,function(brother){
                    if(brother.type=="file"  && brother.name!=$scope.file.name && brother.name==$scope.vm.table.name+".t"){
                        state=true;
                    }
                });
                if(state){
                    state=undefined;
                    $scope.errors="文件名称已存在！";
                    return ;
                }

            }

            //判断是否需要重命名
            if($scope.file.isNew){
                $scope.file.name=$scope.vm.table.name+'.t';
                $scope.file.path=$scope.file.parent.path+"/"+$scope.vm.table.name+'.t';
            }else {
                $scope.rename();
            }


            for(var length=$scope.vm.table.columns.column.length;length>0;length--){
                if(!$scope.vm.table.columns.column[length-1].name){
                    $scope.vm.table.columns.column.splice(length-1,1);
                }
            }

            for(var i=0;i<$scope.vm.table.columns.column.length;i++){
                for(var j=i+1;j<$scope.vm.table.columns.column.length;j++){
                    if($scope.vm.table.columns.column[i].name==$scope.vm.table.columns.column[j].name){
                        $scope.errors="第"+(i+1)+"条数据与第"+(j+1)+"条数据名称相同！";
                        return;
                    }
                }
                if(!$scope.vm.table.columns.column[i].type ||$scope.vm.table.columns.column[i].type ==""){
                    $scope.errors="第"+(i+1)+"条数据类型不能为空！";
                    return ;
                }else if(!$scope.vm.table.columns.column[i].meaning || $scope.vm.table.columns.column[i].meaning ==""){
                    $scope.errors="第"+(i+1)+"条数据含义不能为空！";
                    return;
                }
            }

            var builder = new json2xml.Builder();  // JSON->xml
            var xml =  builder.buildObject($scope.vm);

            fs.writeFile($scope.file.parent.path+"/"+$scope.vm.table.name+".t", xml,function(err){
                if (err) {
                    dialogService.tip([{"message":"没有权限！"}],null,1000);
                    return;
                }
                //增加地址
                /*
                 $scope.file.path=$scope.file.parent.path+"/"+$scope.file.name;*/
                //如果创建创建文件夹向上传递
                if($scope.file.isNew){
                    $scope.$emit('parentAdd', $scope.file);
                    dialogService.tip([{"message":"文件新建成功!"}],null,1000);
                    $scope.file={};
                }else {
                    dialogService.tip([{"message":"文件修改成功!"}],null,1000);
                }

            });
        };
        //保存文件夹
        $scope.doSubmit=function(){
            //转换成xml
            if($scope.file.isNew){
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
            }else {
                $scope.rename();
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
    
    //删除文件夹
    function deleteFolderRecursive(path) {
        var files = [];
        if( fs.existsSync(path) ) {
            files = fs.readdirSync(path);

            files.forEach(function(file,index){
                var curPath = path + "/" + file;
                if(fs.statSync(curPath).isDirectory()) { // recurse

                    deleteFolderRecursive(curPath);

                } else { // delete file
                    fs.unlinkSync(curPath);
                }
            });
            fs.rmdirSync(path);
        }

    };

    angular.module('app')
        .controller('CustomerController', ["$scope","$modal","dialogService",customerController]);
})();