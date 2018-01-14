/**
 * Created by DEV005 on 2016/4/20.
 */
var fs = require("fs");
var Path = require('path');

var json2xml = require('xml2js');  /*转换*/
var parseString = json2xml.parseString;  /*转换*/
var Builder = json2xml.Builder;  /*转换*/
var ini = require('ini');    /*配置文件转换*/


var nunjucks=require("nunjucks");
var jucks = new nunjucks.Environment();

//小驼峰
jucks.addFilter('camelcase', function(str) {
    if(str){
        var arr=str.split("_");
        for(var i=0;i<arr.length;i++){
            if(0==i){
                arr[i]=arr[i].toLowerCase();
            }else {
                arr[i]=arr[i].charAt(0).toUpperCase()+arr[i].substring(1).toLowerCase();
            }

        }
        return arr.join("");
    }else {
        return ''
    }

});
//大驼峰
jucks.addFilter('pascalcase', function(str) {
    if(str){
        var arr=str.split("_");
        for(var i=0;i<arr.length;i++){
            arr[i]=arr[i].charAt(0).toUpperCase()+arr[i].substring(1).toLowerCase();
        };
        return arr.join("");
    }else {
        return ''
    }
});
jucks.addFilter('uppercase', function(str) {
    if(str){
        return str.toUpperCase();
    }else {
        return ''
    }

});

(function () {
    "use strict";
        angular.module('app.template',[])
        .factory('templateService', ["$timeout","dialogService",function($timeout,dialogService) {
            var config= ini.parse(fs.readFileSync(__dirname+"/config.ini",'utf-8'));
            var templatePathList={
                isRead:false,
                name:"目录",
                layer:"0",
                type : "folder",
                path :__dirname+config.templateUrl,
                rPath:"",
                children : [],
                parent:""
            };
            /*获取配置文件*/
            function getConfig(key){
                return config[key];
            }

            function setConfig(key,val){
                config[key]=val;
                fs.writeFileSync(__dirname+"/config.ini",ini.stringify(config));
            }


            /*读取文件目录*/
            function readAllFile(parent,reg){
                //判断路径是否存在
                if (fs.existsSync(parent.path)) {
                    //读取文件信息
                    var item = fs.lstatSync(parent.path);
                    //判断是否是文件夹
                    if(item.isDirectory()){
                        var files = fs.readdirSync(parent.path);
                        files.forEach(function (_file,index) {
                            var file = fs.lstatSync(parent.path + "/" + _file);
                            if(file.isDirectory()) {
                                var folder={
                                    type : "folder",
                                    path : parent.path+"/"+_file,
                                    rPath: parent.rPath+"/"+_file,
                                    children : [],
                                    name:_file,
                                    parent:parent
                                };
                                parent.children.push(folder);
                                readAllFile(folder,reg);
                            } else {
                                if(filterFile(parent.path + "/" + _file,reg)) {
                                    var obj={
                                        type : "file",
                                        path : parent.path+"/"+_file,
                                        rPath: parent.rPath+"/"+_file,
                                        name:_file,
                                        parent:parent
                                    };
                                    parent.children.push(obj);
                                }
                            }
                        });
                    }else {

                    }


                }
            }

            /**
             * 删除文件夹
             * @param path  路径
             */
            function deleteFolder(path) {
                var files = [];
                if( fs.existsSync(path) ) {
                    files = fs.readdirSync(path);
                    files.forEach(function(file,index){
                        var curPath = path + "/" + file;
                        if(fs.statSync(curPath).isDirectory()) { // recurse
                            deleteFolder(curPath);
                        } else { // delete file
                            fs.unlinkSync(curPath);
                        }
                    });
                    fs.rmdirSync(path);
                }
            };
            /**
             * 清空文件
             * @param path  路径
             */
            function clearFolder(path,state) {
                var files = [];
                if( fs.existsSync(path) ) {
                    files = fs.readdirSync(path);
                    files.forEach(function(file,index){
                        var curPath = path + "/" + file;
                        if(fs.statSync(curPath).isDirectory()) { // recurse
                            clearFolder(curPath,true);
                        } else { // delete file
                            fs.unlinkSync(curPath);
                        }
                    });
                    if(state){
                        fs.rmdirSync(path);
                    }
                }
            };


            /**
             * 正则验证
             * @param file
             * @returns {boolean}
             */
            function filterFile (root,reg) {
                if (reg !== undefined) {
                    if (typeof reg.test == 'function' && reg.test(root)) {
                        return true;
                    }
                }else {
                    return true;
                }
            }

            /**
             * 读取文件
             * @param path路径
             * @param fn  返回结果，
             */
            function readFile(path,fn) {
                var item = fs.lstatSync(path);
                //判断是否是文件夹
                if(item.isFile()){
                    fs.readFile(path, 'utf8', function(err, str){
                        if (err) return fn(err);
                        fn(null, str,'DIRECTORY');
                    });
                }else if(item.isDirectory()){
                    fn(null, null ,'DIRECTORY');
                }
            }
            
            //文件路径解析
            function readPath(path){
                // Path.dirname(path);
                return Path.basename(path);
            }

            /**
             * 单文件模板话
             * @param data
             */
            function output(data) {
                if(!config.outputUrl){
                    console.log("请先选择存储路径");
                    return;
                }

                //判断文件路径是否已经读取
                if(!templatePathList.isRead){
                    readAllFile(templatePathList);
                    templatePathList.isRead=true;
                }

                function getFolder(node){
                    if(node.children && node.children.length>0){
                        angular.forEach(node.children,function(item){
                            readFile(item.path,function(err,str,type) {
                                if(type=="FILE"){
                                   var strData = jucks.renderString(str,data);
                                    fs.writeFile(config.outputUrl+item.rPath,strData,function(err){
                                        if (err) {
                                            console.log(err)
                                            return;
                                        }
                                    });
                                }else if(type=="DIRECTORY"){
                                    fs.mkdir(config.outputUrl+item.rPath,function(err){
                                        if (err) {
                                            console.log(err)
                                            return;
                                        }
                                    });
                                }

                            });
                            getFolder(item);
                        })
                    }
                }
                getFolder(templatePathList);
            }

            /**
             * 创建文件夹
             * @param path
             * @param fn
             */
            function createDirectory(path,fn) {
                //判断父级文件夹是否存在
                if(!fs.existsSync(Path.dirname(path))){
                    fn({"message":"父级不存在，请先创建！"});
                    return;
                }
                if(!fs.existsSync(path)){
                    fs.mkdirSync(path);
                }
            }

            /**
             * 创建文件
             * @param path
             * @param fn
             */
            function createFile(path,options,fn) {
                fs.writeFile(path,options,function(err) {
                    fn(err)
                });
            }
            /**
             * 根据模板创建文件
             * @param templatepath  输入模板路径
             * @param outPath   输出模板路径
             * @param options  配置项，数据
             * @param fn    回调函数
             */
            function createTemplateFile(templatepath,outPath,options,fn) {
                if(!fs.existsSync(templatepath)){
                    fn({"message":"模板文件不存在，请添加！"});
                    return;
                }
                fs.readFile(templatepath,'utf8', function(err, str){
                    if (err) return fn(err);
                    str = jucks.renderString(str, options);
                    if(str){
                        fs.writeFile(outPath,str,function(err){
                            if (err) {
                                console.log(err)
                                console.warn("写入失败！")
                                return;
                            }
                        });
                    }else {
                        console.warn("模板错误:"+path)
                    }
                });
            }

            /**
             * 创建目录下的所以文件夹
             * @param pPath  目录
             * @param list   目录下的文件夹
             */
            function createDirectoryList(pPath,list) {

                for(var i=0;i<list.length;i++){
                    createDirectory(pPath+"/"+list[i],function (err) {
                        dialogService.tip([err],null,1000);
                        return
                    });
                }

            }

            //模板输出
            function outputTemplate(directory) {
                if(!config.outputUrl){
                    dialogService.tip([{"message":"请先选择存储路径！"}],null,1000);
                    return;
                }


                //获取setting 配置信息
                fs.readFile(directory.path+"/setting.xml",{encoding:'utf-8'},function(err,files){
                    if(err) {
                        dialogService.tip([{"message": "请先修改文件夹资料！"}], null, 1000);
                        return
                    }

                    var xml =files;
                    parseString(xml,{ explicitArray : false, ignoreAttrs : true }, function (err, result) {
                        var filesJSON =result;
                        if(!filesJSON.setting.applicationCode){
                            dialogService.tip([{"message":"请先填写文件夹应用代码！"}],null,1000);
                            return
                        }
                        //清空目录
                        clearFolder(config.outputUrl+"/"+filesJSON.setting.applicationCode);

                        output(filesJSON);
                    });

                });



                /**
                 * 新建文件夹
                 * @param filesJSON  传递的xml配置文件数据
                 */
               function outputDirectory (filesJSON) {

                    var outputUrl=config.outputUrl+"/"+filesJSON.setting.applicationCode;
                    var outputMainUrl=config.outputUrl+"/"+filesJSON.setting.applicationCode+"/"+filesJSON.setting.applicationCode;
                    //新建文件夹
                    createDirectory(outputUrl,function (err) {
                        dialogService.tip([err],null,1000);
                        return
                    });
                    //   文件目录-business
                    createDirectory(outputMainUrl+"-business",function (err) {
                        dialogService.tip([err],null,1000);
                        return
                    });
                    //   文件目录-contract
                    createDirectory(outputMainUrl+"-contract",function (err) {
                        dialogService.tip([err],null,1000);
                        return
                    });

                    // business
                    createDirectoryList(outputMainUrl+"-business",['src']);
                    createDirectoryList(outputMainUrl+"-business/src",["main","test"]);
                    createDirectoryList(outputMainUrl+"-business/src/main",["java","resources"]);

                    //business/src/main/java  目录
                    createDirectoryList(outputMainUrl+"-business/src/main/java",["com"]);
                    createDirectoryList(outputMainUrl+"-business/src/main/java/com",[filesJSON.setting.companyCode]);
                    createDirectoryList(outputMainUrl+"-business/src/main/java/com/"+filesJSON.setting.companyCode,[filesJSON.setting.applicationCode]);
                    createDirectoryList(outputMainUrl+"-business/src/main/java/com/"+filesJSON.setting.companyCode
                        +"/"+filesJSON.setting.applicationCode,["biz","dal","po","svc"]);

                    //business/src/main/resources  目录
                    createDirectoryList(outputMainUrl+"-business/src/main/resources",["mapper","table"]);

                    //-business/src/test  目录
                    createDirectoryList(outputMainUrl+"-business/src/test",["java"]);
                    createDirectoryList(outputMainUrl+"-business/src/test/java",["com"]);
                    createDirectoryList(outputMainUrl+"-business/src/test/java/com",[filesJSON.setting.companyCode]);
                    createDirectoryList(outputMainUrl+"-business/src/test/java/com/"+filesJSON.setting.companyCode,[filesJSON.setting.applicationCode]);
                    createDirectoryList(outputMainUrl+"-business/src/test/java/com/"+filesJSON.setting.companyCode
                        +"/"+filesJSON.setting.applicationCode,["svc"]);

                    // contract
                    console.log(filesJSON.setting.companyCode);
                    createDirectoryList(outputMainUrl+"-contract",['src']);
                    createDirectoryList(outputMainUrl+"-contract/src",["main"]);
                    createDirectoryList(outputMainUrl+"-contract/src/main",["java"]);
                    createDirectoryList(outputMainUrl+"-contract/src/main/java",["com"]);
                    createDirectoryList(outputMainUrl+"-contract/src/main/java/com",[filesJSON.setting.companyCode]);
                    createDirectoryList(outputMainUrl+"-contract/src/main/java/com/"+filesJSON.setting.companyCode,[filesJSON.setting.applicationCode]);
                    createDirectoryList(outputMainUrl+"-contract/src/main/java/com/"+filesJSON.setting.companyCode
                        +"/"+filesJSON.setting.applicationCode,["domain","request","response","service"]);
                    //新建文件

                }

                /**
                 * 新建Pom文件
                 * @param filesJSON  传递的xml配置文件数据
                 */
               function outputPom (filesJSON) {
                    var outputUrl=config.outputUrl+"/"+filesJSON.setting.applicationCode;
                    var outputMainUrl=config.outputUrl+"/"+filesJSON.setting.applicationCode+"/"+filesJSON.setting.applicationCode;
                    var templateUrl=__dirname+config.templateUrl;
                    //新建文件夹

                   //新建 pom.xml
                   createTemplateFile(templateUrl+"/parentPom.xml",outputUrl+"/pom.xml", filesJSON, function (err) {
                       if (err) {
                           dialogService.tip([{"message":config.outputUrl+"/pom.xml 创建失败！"}],null,1000);
                       }
                   });
                   //新建 businessPom.xml
                   createTemplateFile(templateUrl+"/businessPom.xml",outputMainUrl+"-business/pom.xml",filesJSON,function (err) {
                       if (err) {
                           dialogService.tip([{"message":"businessPom.xml 创建失败！"}],null,1000);
                       }
                   });
                   //新建 contractPom.xml
                   createTemplateFile(templateUrl+"/contractPom.xml",outputMainUrl+"-contract/pom.xml",filesJSON, function (err) {
                       if (err) {
                           dialogService.tip([{"message": "contractPom.xml 创建失败！"}],null,1000);
                       }
                   });
               }

                /**
                 * 新建文件
                 * @param filesJSON  传递的xml配置文件数据
                 */
               function outputPomFile (filesJSON,directory) {
                    var outputMainUrl=config.outputUrl+"/"+filesJSON.setting.applicationCode+"/"+filesJSON.setting.applicationCode;
                    var templateUrl=__dirname+config.templateUrl;

                    //获取所有.t文件路径
                    var tList=[];
                    findFileUrl(tList,directory);
                    /*生成 biz 目录下的文件*/
                    //businessJavaUrl  "biz","dal","po","svc"
                    var businessJavaUrl=outputMainUrl+"-business/src/main/java/com/"+filesJSON.setting.companyCode+"/"+filesJSON.setting.applicationCode;
                    createDirectoryFile({
                        filesJSON:filesJSON,
                        tList:tList,
                        outUrl:businessJavaUrl+"/biz",
                        templateUrl:templateUrl,
                        templateList:["Manager.java","ManagerImpl.java"]
                    });

                    createDirectoryFile({
                        filesJSON:filesJSON,
                        tList:tList,
                        outUrl:businessJavaUrl+"/dal",
                        templateUrl:templateUrl,
                        templateList:["Mapper.java","MapperAuto.java"]
                    });
                    createDirectoryFile({
                        filesJSON:filesJSON,
                        tList:tList,
                        outUrl:businessJavaUrl+"/po",
                        templateUrl:templateUrl,
                        templateList:["PO.java"]
                    });
                    createDirectoryFile({
                        filesJSON:filesJSON,
                        tList:tList,
                        outUrl:businessJavaUrl+"/svc",
                        templateUrl:templateUrl,
                        templateList:["ServiceImpl.java"]
                    });

                    //businessResourcesUrl  "mapper","table""
                    var businessResourcesUrl=outputMainUrl+"-business/src/main/resources";
                    //todo 文件有问题
                    createDirectoryFile({
                        filesJSON:filesJSON,
                        tList:tList,
                        outUrl:businessResourcesUrl+"/mapper",
                        templateUrl:templateUrl,
                        templateList:["Mapper.xml","MapperAuto.xml"]
                    });
                    //todo 文件有问题
                    createDirectoryFile({
                        filesJSON:filesJSON,
                        tList:tList,
                        outUrl:businessResourcesUrl+"/table",
                        templateUrl:templateUrl,
                        templateList:["Table.sql"]
                    });

                    //"businessTestUrl   "svc"
                    var businessTestUrl=outputMainUrl+"-business/src/test/java/com/"+filesJSON.setting.companyCode+"/"+filesJSON.setting.applicationCode;
                    createDirectoryFile({
                        filesJSON:filesJSON,
                        tList:tList,
                        outUrl:businessTestUrl+"/svc",
                        templateUrl:templateUrl,
                        templateList:["Test.java"]
                    });


                    //"contractOutputUrl   "domain","request","response","service"
                    var contractOutputUrl=outputMainUrl+"-contract/src/main/java/com/"+filesJSON.setting.companyCode+"/"+filesJSON.setting.applicationCode;

                    //Domain.java
                    createDirectoryFile({
                        filesJSON:filesJSON,
                        tList:tList,
                        outUrl:contractOutputUrl+"/domain",
                        templateUrl:templateUrl,
                        templateList:[
                            "Domain.java"
                        ]
                    });
                    createDirectoryFile({
                        filesJSON:filesJSON,
                        tList:tList,
                        outUrl:contractOutputUrl+"/request",
                        templateUrl:templateUrl,
                        templateList:[
                            "ActiveRequest.java",
                            "InactiveRequest.java",
                            "CreateRequest.java",
                            "DeleteRequest.java",
                            "FindRequest.java",
                            "GetRequest.java",
                            "SearchRequest.java",
                            "UpdateRequest.java"
                        ]
                    });
                    createDirectoryFile({
                        filesJSON:filesJSON,
                        tList:tList,
                        outUrl:contractOutputUrl+"/response",
                        templateUrl:templateUrl,
                        templateList:[
                            "ActiveResponse.java",
                            "InactiveResponse.java",
                            "CreateResponse.java",
                            "DeleteResponse.java",
                            "FindResponse.java",
                            "GetResponse.java",
                            "SearchResponse.java",
                            "UpdateResponse.java"
                        ]
                    });
                    createDirectoryFile({
                        isLast:true,
                        filesJSON:filesJSON,
                        tList:tList,
                        outUrl:contractOutputUrl+"/service",
                        templateUrl:templateUrl,
                        templateList:["Service.java"]
                    });


               }
                /**
                 * 遍历所以.t 文件路径
                 */
                function findFileUrl(tList,directory) {
                    for(var i=0;i<directory.children.length;i++){
                        if("file"==directory.children[i].type){
                            tList.push({
                                name:directory.children[i].name,
                                path:directory.children[i].path
                            })
                        }else {
                            findFileUrl(tList,directory.children[i]);
                        }
                    }
                };


                /**
                 * 输出模板文件夹里的所以文件
                 * @param filesJSON       setting文件数据
                 * @param templateUrl  模板的路径
                 * @param tList         数据文件路径
                 * @param templateList  数据文件路径
                 * @param outUrl       输出文件路径

                 */
                function createDirectoryFile(options){
                    var filesJSON=options.filesJSON;
                    var templateUrl=options.templateUrl;
                    var tList=options.tList ||[];
                    var templateList=options.templateList||[];
                    var outUrl=options.outUrl;



                    for(var i=0;i<options.templateList.length;i++){
                        for(var j=0;j<tList.length;j++){
                            //读取文件信息
                            doLogic(j,i)
                        }
                    }

                    function doLogic(j,i) {

                        function setName(str){
                            var arr=str.split("_");
                            for(var i=0;i<arr.length;i++){
                                arr[i]=arr[i].charAt(0).toUpperCase()+arr[i].substring(1).toLowerCase();
                            }
                            if(arr.length>1){
                                //删除前缀
                                arr.shift();
                            }
                            return arr.join("");
                        };

                        function nameNoPrefix(str){
                            var arr=str.split("_");
                            if(arr.length>1){
                                //删除前缀
                                arr.shift();
                            }
                            return arr.join("_");
                        };


                        readFile(tList[j].path,function(err,str) {
                            parseString(str,{ explicitArray : false, ignoreAttrs : true }, function (err, result) {

                                if(!result){
                                    console.log(tList[j].path);
                                    return
                                }
                                var data={
                                    setting:filesJSON.setting,
                                    table:result.table
                                };

                                //名称去除前缀
                                var name=setName(result.table.name);

                                data.table.nameNoPrefix=nameNoPrefix(result.table.name);
                                data.table.hasIsActive="false";
                                data.table.columns=data.table.columns.column;

                                data.table.columnsNoIdAndTenantId=[];
                                data.table.columnsNoId=[];
                                data.table.columnsNoTenantId=[];
                                data.table.columnsAll=[];
                                data.table.columnsWithWho=[];
                                data.table.columnNameList=[];

                                //是否有IsActive
                                function hasIsActive(){
                                    for(var index=0;index<data.table.columns.length;index++){
                                        var item=data.table.columns[index];
                                        if("IS_ACTIVE"==item.name){
                                            data.table.hasIsActive="true";
                                        }
                                        //类型处理
                                        switch(item.type){
                                            case 'String':
                                                item.java="String";
                                                item.mysqlDataType="VARCHAR("+item.max+")";
                                                item.jdbcType="VARCHAR";
                                                break;
                                            case 'Id':
                                                item.java="Long";
                                                item.mysqlDataType="BIGINT(20)";
                                                item.jdbcType="NUMERIC";
                                                break;
                                            case 'DateTime':
                                                item.java="Date";
                                                item.mysqlDataType="DATETIME";
                                                item.jdbcType="TIMESTAMP";
                                                break;
                                            case 'Data':
                                                item.java="Object";
                                                item.mysqlDataType="BLOB";
                                                item.jdbcType="BLOB";
                                                break;
                                            case 'Integer':
                                                item.java="Integer";
                                                item.mysqlDataType="INTEGER(20)";
                                                item.jdbcType="NUMERIC";
                                                break;
                                            case 'Decimal':
                                                item.java="Double";
                                                item.mysqlDataType="DECIMAL(19,5)";
                                                item.jdbcType="NUMERIC";
                                                break;
                                            case 'Amount':
                                                item.java="Double";
                                                item.mysqlDataType="DECIMAL(19,5)";
                                                item.jdbcType="NUMERIC";
                                                break;
                                            case 'Boolean':
                                                item.java="Boolean";
                                                item.mysqlDataType="TINYINT(1)";
                                                item.jdbcType="TINYINT";
                                                break;
                                            case 'Text':
                                                item.java="String";
                                                item.mysqlDataType="TEXT";
                                                item.jdbcType="VARCHAR";
                                                break;
                                            case 'Date':
                                                item.java="Date";
                                                item.mysqlDataType="DATETIME";
                                                item.jdbcType="TIMESTAMP";
                                                break;
                                            default:

                                        };

                                        if(item.isRequired=="true"){
                                            item.defaultNull="NOT NULL";
                                        }else {
                                            item.defaultNull="DEFAULT NULL";
                                        }


                                        //  NoIdAndTenantId
                                        if(item.name!="ID" && item.name!="TENANT_ID"){
                                            data.table.columnsNoIdAndTenantId.push(item)
                                        }
                                        //  columnsNoId
                                        if(item.name!="ID"){
                                            data.table.columnsNoId.push(item)
                                        }
                                        //  columnsNoTenantId
                                        if(item.name!="TENANT_ID"){
                                            data.table.columnsNoTenantId.push(item)
                                        }

                                        data.table.columnsAll.push(item);
                                        data.table.columnsWithWho.push(item);
                                        //columnNameList
                                        data.table.columnNameList.push(item.name);
                                    }
                                }

                                hasIsActive();
                                //columnsAll  和columnsWithWho设置
                                (function () {
                                    data.table.columnsAll.push({name:"ATTRIBUTE1",mysqlDataType:"VARCHAR(500)",defaultNull:"DEFAULT NULL",meaning:"扩展栏位1"});
                                    data.table.columnsAll.push({name:"ATTRIBUTE2",mysqlDataType:"VARCHAR(500)",defaultNull:"DEFAULT NULL",meaning:"扩展栏位2"});
                                    data.table.columnsAll.push({name:"ATTRIBUTE3",mysqlDataType:"VARCHAR(500)",defaultNull:"DEFAULT NULL",meaning:"扩展栏位3"});
                                    data.table.columnsAll.push({name:"ATTRIBUTE4",mysqlDataType:"VARCHAR(500)",defaultNull:"DEFAULT NULL",meaning:"扩展栏位4"});
                                    data.table.columnsAll.push({name:"ATTRIBUTE5",mysqlDataType:"VARCHAR(500)",defaultNull:"DEFAULT NULL",meaning:"扩展栏位5"});
                                    data.table.columnsAll.push({name:"ATTRIBUTE6",mysqlDataType:"VARCHAR(500)",defaultNull:"DEFAULT NULL",meaning:"扩展栏位6"});
                                    data.table.columnsAll.push({name:"ATTRIBUTE7",mysqlDataType:"VARCHAR(500)",defaultNull:"DEFAULT NULL",meaning:"扩展栏位7"});
                                    data.table.columnsAll.push({name:"ATTRIBUTE8",mysqlDataType:"VARCHAR(500)",defaultNull:"DEFAULT NULL",meaning:"扩展栏位8"});
                                    data.table.columnsAll.push({name:"ATTRIBUTE9",mysqlDataType:"VARCHAR(500)",defaultNull:"DEFAULT NULL",meaning:"扩展栏位9"});
                                    data.table.columnsAll.push({name:"ATTRIBUTE10",mysqlDataType:"VARCHAR(500)",defaultNull:"DEFAULT NULL",meaning:"扩展栏位10"});
                                    data.table.columnsAll.push({name:"ROW_VERSION",mysqlDataType:"BIGINT(20)",defaultNull:"DEFAULT NULL",meaning:"行版本"});
                                    data.table.columnsAll.push({name:"IS_DELETED",mysqlDataType:"TINYINT(1)",defaultNull:"DEFAULT NULL",meaning:"是否已删除"});
                                    data.table.columnsAll.push({name:"CREATED_BY",mysqlDataType:"BIGINT(20)",defaultNull:"NOT NULL",meaning:"创建用户"});
                                    data.table.columnsAll.push({name:"CREATION_TIME",mysqlDataType:"DATETIME",defaultNull:"NOT NULL",meaning:"创建时间"});
                                    data.table.columnsAll.push({name:"LAST_UPDATED_BY",mysqlDataType:"BIGINT(20)",defaultNull:"DEFAULT NULL",meaning:"最后更新用户"});
                                    data.table.columnsAll.push({name:"LAST_UPDATE_TIME",mysqlDataType:"DATETIME",defaultNull:"DEFAULT NULL",meaning:"最后更新时间"});


                                    data.table.columnsWithWho.push({name:"ROW_VERSION",jdbcType:"NUMERIC",mysqlDataType:"BIGINT(20)",defaultNull:"DEFAULT NULL",meaning:"行版本"});
                                    data.table.columnsWithWho.push({name:"IS_DELETED",jdbcType:"TINYINT",mysqlDataType:"TINYINT(1)",defaultNull:"DEFAULT NULL",meaning:"是否已删除"});
                                    data.table.columnsWithWho.push({name:"CREATED_BY",jdbcType:"NUMERIC",mysqlDataType:"BIGINT(20)",defaultNull:"NOT NULL",meaning:"创建用户"});
                                    data.table.columnsWithWho.push({name:"CREATION_TIME",jdbcType:"TIMESTAMP",mysqlDataType:"DATETIME",defaultNull:"NOT NULL",meaning:"创建时间"});
                                    data.table.columnsWithWho.push({name:"LAST_UPDATED_BY",jdbcType:"NUMERIC",mysqlDataType:"BIGINT(20)",defaultNull:"DEFAULT NULL",meaning:"最后更新用户"});
                                    data.table.columnsWithWho.push({name:"LAST_UPDATE_TIME",jdbcType:"TIMESTAMP",mysqlDataType:"DATETIME",defaultNull:"DEFAULT NULL",meaning:"最后更新时间"});
                                })();



                                //Domain 文件夹处理
                                if("Domain.java"==templateList[i]){
                                    var newOutUrl=outUrl+"/"+name+".java";
                                }else if("Table.sql"==templateList[i]){
                                    var newOutUrl=outUrl+"/"+result.table.name.toUpperCase()+".sql";
                                } else {
                                    var newOutUrl=outUrl+"/"+name+templateList[i];
                                }


                                var isActive="true"; //是否生成模板
                                switch (templateList[i]){
                                    case "ActiveResponse.java":
                                    case "InactiveResponse.java":
                                    case "ActiveRequest.java":
                                    case "InactiveRequest.java":
                                        isActive=data.table.hasIsActive;
                                        break;
                                }

                                //是否生成模板
                                if(isActive=="true"){
                                    createTemplateFile(templateUrl+"/"+templateList[i],newOutUrl,data,function (err) {
                                        if (err) {
                                            console.log(outUrl+"/"+name+templateList[i]+"创建失败！");
                                        }
                                    })
                                }
                            });

                            // fs.writeFile(config.outputUrl+item.rPath,str,function(err){
                            //     if (err) {
                            //         console.log(err)
                            //         return;
                            //     }
                            // });
                        });
                    }

                    // createTemplateFile(templateUrl+"/contractPom.xml",outputMainUrl+"-contract/pom.xml",filesJSON, function (err) {
                    //     if (err) {
                    //         dialogService.tip([{"message": "contractPom.xml 创建失败！"}],null,1000);
                    //     }
                    // });

                    if(options.isLast){
                        $timeout(function () {
                            dialogService.tip([{"message":"生成成功！"},{"message":"生成文件目录："+config.outputUrl}],null,1000);
                        },1000)

                    }

                }

                //输出文件夹
                function output(filesJSON){
                    outputDirectory(filesJSON);
                    outputPom(filesJSON);
                    outputPomFile(filesJSON,directory);

                }
            }

            return {
                readAllFile:readAllFile,
                deleteFolder:deleteFolder,
                clearFolder:clearFolder,
                filterFile:filterFile,
                getConfig:getConfig,
                setConfig:setConfig,
                readPath:readPath,
                output: output,
                outputTemplate:outputTemplate
            }
        }]);
})();