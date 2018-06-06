

(function () {
    //定义module,并指明依赖模块。
    var listController = function($scope, $http,$q, $modal,$filter,dialogService) {
       $scope.tenantIdList="";
       $scope.tenantNameList="";
        //点击企业通讯录
        $("#addressListDiv").on('click',".panel_item",function(){
            $(".right-panel").addClass("hide");
            $("#j-right-addressList").removeClass("hide");
            $scope.tenantIdList=$(this).attr("data-id");
            $scope.tenantNameList=$(this).find(".panel_single-row").html();
            $scope.getList("-1",$scope.tenantNameList);
            $scope.path=[];
        });
        $scope.path=[];
        $scope.branchList=[];
        $scope.personList=[];
        $scope.totalCount=0;
        $scope.tenantName=[];
        $scope.newBranchList=[];
        $scope.tenantName.push($scope.tenantNameList);
        $scope.inIndex=0;
        $scope.inIndexName="";


        $scope.getList=function(parentId,parentName){
            var branchQueryRequest = new BranchQueryRequest();
            branchQueryRequest.setParentId(parentId);
            branchQueryRequest.setTenantId($scope.tenantIdList);
            xn_http_post(branchQueryRequest, function(data){
                if (data.errors != null && data.errors.length > 0){
                    dialogService.tip(data.errors)
                }
                else if(!!data.subErrors == true && data.subErrors.length > 0)
                {
                        dialogService.tip(data.subErrors)
                }
                else{
                    console.log(data.branchList);
                    console.log(data.personList);
                    $scope.newBranchList=data.branchList;
                    $scope.$apply(function(){
                        angular.forEach($scope.newBranchList, function(data){
                            $scope.dataLen=data.id.length;
                            $scope.inIndex=data.id.substr($scope.dataLen-1,1);
                            $scope.inIndexName=data.name.substr(0,1);
                            data.idIndex=$scope.inIndex;
                            data.idName=$scope.inIndexName;
                        });
                        $scope.branchList = $scope.newBranchList;
                        $scope.personList = data.personList;
                        $scope.listTotalCount=$scope.branchList.length+$scope.personList.length;
                        //if(parentId!=-1){
                            $scope.path.push({"id":parentId ,"name":parentName});
                        //}

                    })

                }
            });
        };
        $scope.openChat=function(account,scene){
            if(account.isUnionActived){
                yunXin.openChatBox(account.unionId,scene);
                $("#j-right-addressList").addClass("hide");
            }else{
                dialogService.tip([{"message":"暂未激活，无法聊天！"}],null,1000) ;
            }

        };
        $scope.showInfo=function(account,scene){
            if(scene == 'p2p')
            {
                var user = yunXin.cache.getUserById(account.unionId);
                yunXin.showInfoBox(user);
            }
            // if(account.isUnionActived){
            //     yunXin.openChatBox(account.unionId,scene);
            //     $("#j-right-addressList").addClass("hide");
            // }else{
            //     dialogService.tip([{"message":"暂未激活，无法聊天！"}],null,1000) ;
            // }

        };
        // 从导航栏回到某一上级目录
        $scope.jumpTo = function(id,name) {
            for(var i=0;i<$scope.path.length;i++) {
                if(id === $scope.path[i].id) {
                    $scope.path = $scope.path.slice(0, i);
                    break;
                }
            }
            $scope.flag=false;
            $scope.getList(id,name);
        };

        //$("#j-right-friends-ul").on("click",".panel_item",function(){
        //    var scene=$(this).attr("data-scene");
        //    var account=$(this).attr("data-account");
        //    yunXin.openChatBox(account,scene);
        //})



    };

    angular.module("xn.my.list", [])
        .controller("ListController", ["$scope", "$http","$q", "$modal","$filter","dialogService", listController])

})();