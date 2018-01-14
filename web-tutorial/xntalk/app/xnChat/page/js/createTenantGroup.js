/**
 * Created by YQ on 2016/9/22.
 */

(function () {

    var createTenantGroupController = function($rootScope, $scope, $http, $q, $filter, $timeout, myApp)
    {

        $rootScope.createTenantGroupClick = function () {
            $scope.eleCreateTenantGroup = true;
        }
        $scope.$watch('eleCreateTenantGroup', function(newValue, oldValue, scope){
            if(newValue == true)
            {
                $scope.objectSearchList = {};
                $scope.objectMap = {};
                $scope.personList = {};
                $scope.personList = {};

                for(var i=0; i< $rootScope.tenantGetAllListByUnionIdRenponse.result.length; i++)
                {
                    if($rootScope.tenantGetAllListByUnionIdRenponse.result[i].id  == $('#unionName').attr('data-id'))
                    {
                        $scope.tenant = $rootScope.tenantGetAllListByUnionIdRenponse.result[i];
                        $scope.doBranchQueryRequest($scope.tenant.id, -1);
                        break;
                    }
                }

            }
        });



        $timeout(function () {
            // alert($rootScope.tenantGetAllListByUnionIdRenponse.result);
            for(var i=0; i< $rootScope.tenantGetAllListByUnionIdRenponse.result.length; i++)
            {
                if($rootScope.tenantGetAllListByUnionIdRenponse.result[i].id  == $('#unionName').attr('data-id'))
                {
                    $scope.tenant = $rootScope.tenantGetAllListByUnionIdRenponse.result[i];
                    $scope.doBranchQueryRequest($scope.tenant.id, -1);
                    break;
                }
            }

        }, 1000);

        $scope.selectCount = 0;
        
        
        $scope.objectDeleteClick = function (id) {

            delete $scope.objectMap[id];
        }
        $scope.objectClick = function (object, index) {
            var id = object.id;
            if(!id)
            {
                id = object.unionId;
            }

            if($scope.objectMap[id] )
            {
                delete $scope.objectMap[id];
            }
            else if(object.count != undefined && object.count != null)
            {

                $scope.branch = object;


                $scope.doBranchQueryRequest($scope.tenant.id, id);
                // $scope.objectMap[id] = object;
                // var userFindByOrganizationsRequest  = new UserFindByOrganizationsRequest();
                // userFindByOrganizationsRequest.setTenantId(object.tenantId);
                // userFindByOrganizationsRequest.setFlag(true);
                // userFindByOrganizationsRequest.setOrganizationIds([id]);
                // xn_http_post(userFindByOrganizationsRequest, function(data)
                // {
                //     // console.log(data);
                //     $scope.$apply(function () {
                //         $scope.objectMap[id].personList = data.users;
                //     })
                //     //  console.log(data);
                // });
            }
            else if((!object.unionId) == false)
            {
                $scope.objectMap[id] = object;

            }

            // $scope.personSelected = 0;
            // for(var key in $scope.objectMap)
            // {
            //     console.log($scope.objectMap[key]);
            //     if($scope.objectMap[key].unionId)
            //     {
            //         $scope.personSelected = $scope.personSelected + 1;
            //     }
            //     else
            //     {
            //         $scope.personSelected = $scope.personSelected + parseInt($scope.objectMap[key].count);
            //     }
            // }

            //  $scope.objectList.push(object);
            //
            //  alert($scope.objectMap[object.unionId] == null );
            //  alert(object.unionId);

        }

        $scope.tenantSelectClick = function (tenant) {
            $scope.branch = null;
            $scope.tenant = tenant;
            $scope.doBranchQueryRequest(tenant.id);
            // var branchQueryRequest = new BranchQueryRequest();
            // branchQueryRequest.setTenantId(tenant.id);
            // branchQueryRequest.setParentId("-1");
            // xn_http_post(branchQueryRequest, function(data)
            // {
            //     $scope.$apply(function () {
            //         var objectList = [];
            //         objectList = objectList.concat(data.branchList);
            //         for(var i=0; i<data.personList.length; i++)
            //         {
            //             if(data.personList[i].unionId)
            //             {
            //                 objectList.push(data.personList[i]);
            //             }
            //         }
            //
            //         $scope.objectSearchList = objectList;
            //     })
            //     console.log(data);
            // });

        }
        $scope.createClick=function () {
            var user = myApp.yunXin.cache.getUserById(localStorage.getItem('uid'));

            var custom = null;
            try
            {
                custom = JSON.parse(user.custom);
            }
            catch (e)
            {}
            var groupCreateRequest = new GroupCreateRequest();
            groupCreateRequest.setName($scope.groupName);
            var unionIds = [];
            for(var key in $scope.objectMap)
            {
                unionIds.push(key);
            }
            groupCreateRequest.setGroupMemberUnionIds(unionIds);
            groupCreateRequest.setOwnerUnionId(user.account);
            if(custom!= undefined && custom!= null && custom.realName != undefined && custom.realName != null)
            {
                groupCreateRequest.setOwnerUnionName(custom.realName);
            }
            else
            {
                groupCreateRequest.setOwnerUnionName(user.nick);
            }
            groupCreateRequest.setType("tenant");
            groupCreateRequest.setTenantId($scope.tenant.id);
            xn_http_post(groupCreateRequest, function(data)
            {


                myApp.yunXin.openChatBox(data.id, 'team');//

            });
            $scope.eleCreateTenantGroup = false;


        }
        $scope.selectAllClick = function (branch) {
            if(document.getElementById("isSelectAll").checked== true)
            {
                var branchList = [];
                for(var i=0 ;i<$scope.objectSearchList.length; i++)
                {
                    if($scope.objectSearchList[i].count != null && ($scope.objectSearchList[i].count != undefined))
                    {
                        branchList.push($scope.objectSearchList[i]);
                    }
                }
                var personFindByBranchRequest  = new PersonFindByBranchRequest();
                if( branch == undefined || branch == null)
                {
                    personFindByBranchRequest.setBranchList(branchList);
                }
                else
                {
                    personFindByBranchRequest.setBranchList([branch]);
                }

                xn_http_post(personFindByBranchRequest, function(data)
                {
                    console.log(data);
                    var uniontList = data.result;
                    $scope.$apply(function () {
                        for(var i=0; i<data.result.length; i++)
                        {
                            if((!uniontList[i].unionId) == false)
                            {
                                $scope.objectMap[uniontList[i].unionId] = uniontList[i];
                            }
                        }
                        //$scope.objectMap[id].personList = data.users;
                    })
                    //  console.log(data);
                });
            }
            else
            {
                $scope.objectMap = {};
            }
        }
       $scope.doBranchQueryRequest = function(tenantId, parentId) {
           if(!parentId)
           {
               parentId = "-1";
           }
           var branchQueryRequest = new BranchQueryRequest();
           branchQueryRequest.setTenantId(tenantId);
           branchQueryRequest.setParentId(parentId);
           xn_http_post(branchQueryRequest, function(data)
           {
               $scope.$apply(function () {
                   var objectList = [];
                   objectList = objectList.concat(data.branchList);
                   for(var i=0; i<data.personList.length; i++)
                   {
                       if(data.personList[i].unionId)
                       {
                           objectList.push(data.personList[i]);
                       }
                   }

                   $scope.objectSearchList = objectList;
               })
               console.log(data);
           });
       };



    };

    var myModule =  angular.module("xn.createTenantGroup", []);
    myModule.service('myApp', function() {
        this.yunXin = yunXin;
    });
    myModule.controller("createTenantGroupController", ["$rootScope", "$scope", "$http","$q", "$filter", "$timeout", "myApp", createTenantGroupController]);

    myModule.filter("leftName",function(){
        return function(name){
            return name.substring(0, 2);
        }
    });

    myModule.filter("altName",function(){
        return function(input, altName){
            if(altName != null && altName != "")
            {
                return altName;
            }
            return input;
        }
    });
    myModule.filter("isObjectNull",function(){
        return function(objectMap, key){
            // console.log(objectMap[key] == null);
            return objectMap[key] == null;
        }
    });
    myModule.filter("getPropertyLength",function(){
        return function(object){
            if(object == null || object == undefined)
            {
                return 0;
            }
            else
            {
                return Object.getOwnPropertyNames(object).length;
            }

        }
    });

    myModule.filter("rightName",function(){
        return function(name, len){
            if(isNaN(len)||len==null)
            {
                len = name.length;

            }
            else
            {
                if(parseInt(len)<0||parseInt(len)>name.length)
                {
                    len = name.length;
                }
            }
            return name.substring(name.length-len,name.length);
        }
    });
})();