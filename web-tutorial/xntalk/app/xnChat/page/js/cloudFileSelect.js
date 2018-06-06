/**
 * Created by YQ on 2016/8/4.
 */

(function () {

    $("body").on("click", function(e) {
        // console.log(e);
        if(e.target.id !="div_TenantShow" && e.target.id != 'a_select')
        {
            var controllerScope = $('div[ng-controller="cloudFileSelectController"]').scope();
            controllerScope.eleTenantShow = false;


        }
    });



    var cloudFileSelectController = function($rootScope, $scope, $http, $q, $location, $filter, myApp) {
        if(!$rootScope.tenantGetAllListByUnionIdRenponse)
        {
            var tenantGetAllListByUnionIdRequest = new TenantGetAllListByUnionIdRequest();
            tenantGetAllListByUnionIdRequest.setUnionId(userUID);
            xn_http_post(tenantGetAllListByUnionIdRequest, function(data){
                if (data == null || (data.errors && data.errors.length > 0)){
                    alert(data.errors[0].message);
                }else {
                    $rootScope.$apply(function () {
                        $rootScope.tenantGetAllListByUnionIdRenponse = data;
                        $scope.tenants = data.result;
                        $scope.tenant = data.result[0];
                    })
                }
            });
        }



        $('#div_TenantShow').on('click', function (e) {
            var ev = e || window.event;
            if(ev.stopPropagation){
               // ev.stopPropagation();
            }
            else if(window.event){
                window.event.cancelBubble = true;//兼容IE
            }
        });
        $scope.tenants = [];//承租人列表

        $scope.openObjectList = [];
        $scope.objectList = []; //当前文件夹
        $scope.tenant = {};//当前选中承租人
        $scope.selectObjectList = {length:0};


        $scope.bytesToSize = function (bytes) {
            if (bytes === 0) return '0 B';
            var k = 1024;
            sizes = ['B','KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

            i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseInt( (bytes / Math.pow(k, i)) + ' ') + sizes[i];
            //(0) 后面保留一位小数，如1.0GB                                                                                                                  //return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
        }

        $scope.showFolder = function () {
            
        }


        $scope.tenantSelect = function (tenant, index) {

            $scope.selectObjectList = {length:0};
            $scope.openObjectList = [];
            $scope.objectList = []; //当前文件夹


            var deferred = $q.defer();
            var promise = deferred.promise;

            $scope.tenant = tenant;
            var diskByObjectIdRequest = new DiskByObjectIdRequest();
            diskByObjectIdRequest.setTenantId(tenant.id);
            diskByObjectIdRequest.setUnionId(localStorage.getItem('uid'));
            xn_http_post(diskByObjectIdRequest, function(data)
            {
                if (data.errors == null || data.errors.length > 0)
                {

                }
                else
                {
                    //console.clear();
                    //console.log(data);
                    deferred.resolve(data.disk);
                }
            });
            promise.then(function(disk){
                console.clear();
                console.log(disk);
                var folderFileFindRequest = new FolderFileFindRequest();
                folderFileFindRequest.setParentId(disk.rootFolderId);
                folderFileFindRequest.setTenantId($scope.tenant.id);
                folderFileFindRequest.pageSize = 10;
                folderFileFindRequest.pageNumber = 1;
                xn_http_post(folderFileFindRequest, function(data)
                {
                    console.log(data);
                    if (data.errors == null || data.errors.length > 0)
                    {

                    }
                    else
                    {
                        $scope.$apply(function () {
                            $scope.objectList = [];
                            $scope.objectList = $scope.objectList.concat(data.folderList);
                            $scope.objectList = $scope.objectList.concat(data.folderFileList);
                        })


                       // deferred.resolve(data);
                    }
                });
            });
        };

        $scope.back = function (){
          //  $scope.openObjectList = $scope.openObjectList.concat(object);

            var object = $scope.openObjectList.pop();
            object.id = object.parentId;
          //  $scope.openOejectList.push(object);
            $scope.openFolder(object, 0);
        };

        $scope.itemClick = function (object, index) {
            console.log(object);
            if(object.file)
            {

                object.isCheck = !object.isCheck;
                if(object.isCheck)
                {
                    $scope.selectObjectList[object.id] = object;

                }
                else
                {
                    delete  $scope.selectObjectList[object.id];
                }
                $scope.selectObjectList.length = Object.getOwnPropertyNames($scope.selectObjectList).length-1;
            }
            else
            {

                var array = [];
                for(var i=0; i<$scope.openObjectList.length; i++)
                {

                    if($scope.openObjectList[i].id == object.id)
                    {
                        break;
                    }
                    array.push($scope.openObjectList[i]);
                }
                array.push(object);

                $scope.openObjectList = array;
                $scope.openFolder(object, index);
            }
        }
        $scope.openFolder = function (object, index) {
            $scope.selectObjectList = {length:0};
            var folderFileFindRequest = new FolderFileFindRequest();
            folderFileFindRequest.setParentId(object.id);
            folderFileFindRequest.setTenantId($scope.tenant.id);
            folderFileFindRequest.pageSize = 10;
            folderFileFindRequest.pageNumber = 1;
            xn_http_post(folderFileFindRequest, function(data)
            {
                console.log(data);
                if (data.errors == null || data.errors.length > 0)
                {

                }
                else
                {
                    $scope.$apply(function () {
                        $scope.objectList = [];
                        $scope.objectList = $scope.objectList.concat(data.folderList);
                        $scope.objectList = $scope.objectList.concat(data.folderFileList);
                    });


                    // deferred.resolve(data);
                }
            });

        }

        $rootScope.search = function() {

            $scope.selectObjectList = {length:0};
            $scope.openObjectList = [];
            $scope.objectList = []; //当前文件夹
            $scope.eleCloudFileSelectisShow = true;
            $scope.tenants = $rootScope.tenantGetAllListByUnionIdRenponse.result;
            $scope.tenantSelect($scope.tenants[0], 0);

         };

         $scope.sendFile = function () {
             var array = new Array();
             for(var name in $scope.selectObjectList)
             {
                 if(name != "length")
                 {
                     var object = $scope.selectObjectList[name];
                     var messageBatchSendRequest = new MessageBatchSendRequest();
                     messageBatchSendRequest.setMessageType(6);
                     var messageData = {};
                     var body = {};
                     body.name = object.file.name;
                     body.md5="0";
                     body.url = object.path;
                     body.ext = object.file.extension;
                     body.size = object.file.size;
                     messageData.body=body;
                     messageBatchSendRequest.setMessageData(JSON.stringify(body));
                     messageBatchSendRequest.setSendUnionId(localStorage.getItem('uid'));
                     var that = yunXin,
                         scene = that.$chatEditor.data('type'),
                         to = that.$chatEditor.data('to');
                     messageBatchSendRequest.setreceiveUnionIds([to]);
                     // xn_http_post(messageBatchSendRequest, function(data){
                     //        console.log(data);
                     // });

                     nim.sendFile({
                         scene: scene || 'p2p',
                         to: to,
                         type:'file',
                         file:body,
                         done: myApp.yunXin.sendMsgDone.bind(myApp.yunXin)
                     });

                 }
             }

            $scope.eleCloudFileSelectisShow = false;
            // if()
         }
        //
        // $scope.getList = function() {
        //     $scope.search($scope.page.localPath);
        // };
    };
    var myApp =  angular.module("xn.cloudFileSelect", []);
    myApp.service('myApp', function() {
        this.yunXin = yunXin;
    });
    myApp.config(['$locationProvider', function($locationProvider) {
        $locationProvider.html5Mode(true);
    }]);
    myApp.controller("cloudFileSelectController", ["$rootScope", "$scope", "$http","$q", "$location", "$filter", "myApp", cloudFileSelectController])


})();