/**
 * Created by YQ on 2016/8/4.
 */

(function () {


    $("body").on("click", function(e) {
        // console.log(e);
        if(e.target.id !="div_TenantShow2" && e.target.id != 'a_select2')
        {
            var controllerScope = $('div[ng-controller="groupMemberAddController"]').scope();
            controllerScope.eleTenantShow = false;

        }
    });

    $('#div_TenantShow2').on('click', function (e) {
        var ev = e || window.event;
        if(ev.stopPropagation){
            // ev.stopPropagation();
        }
        else if(window.event){
            window.event.cancelBubble = true;//兼容IE
        }
    });



    var groupMemberAddController = function($timeout, $rootScope, $scope, $http, $q, $location, $filter, myApp) {

        $scope.$watch('eleCloudFileSelectisShow', function(newValue, oldValue, scope){
            if(newValue == true)
            {
                $scope.objectList = [];
                $scope.objectMap = {};



            }
        });



        $scope.objectList = [];
        $scope.objectMap = {};
        $scope.teamId = 0;
        function doBranchQueryRequest(tenantId, parentId) {
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

        }




        $scope.tenantLogo = "https://img-xiniunet-com.alikunlun.com/#tenantId#/logo.jpg@100w_160h_90q.jpg";

       $timeout(function () {
          // alert($rootScope.tenantGetAllListByUnionIdRenponse.result);
           $scope.tenantList = $rootScope.tenantGetAllListByUnionIdRenponse.result;
            console.clear();
           console.log( $scope.tenantList );
       }, 1000);

        $scope.friendSelectedClick=function () {
            console.log(myApp.yunXin.cache.getFriendslist());
            var yunXinFriendList = myApp.yunXin.cache.getFriendslist();
            var personList = [];
            for(i=0; i<yunXinFriendList.length; i++)
            {
                var person = {};
                person.unionId = yunXinFriendList[i].account;
                person.avatar = yunXinFriendList[i].avatar;
                person.name = yunXinFriendList[i].nick;
                personList.push(person);
            }


            $scope.objectSearchList = personList;
        }
        $scope.isTenantGroup = function () {
            try
            {
                var team = myApp.yunXin.cache.getTeamById($scope.teamId);
                if(team.serverCustom != undefined && team.serverCustom != null)
                {
                    var serverCustom = JSON.parse(team.serverCustom);
                    if(serverCustom.type != undefined && serverCustom.type != null && serverCustom.type == "tenant")
                    {
                        return 1;
                    }
                }

            }
            catch(e)
            {
                console.error(e);
                return -1;
            }
            return 0;
        }
        $scope.tenantSelectClick = function (tenant, index) {


            $scope.branch = null;
            $scope.tenant = tenant;

            var branchQueryRequest = new BranchQueryRequest();
            branchQueryRequest.setTenantId(tenant.id);
            branchQueryRequest.setParentId("-1");
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

        }
        $scope.addClick= function () {
            try
            {
                var team = myApp.yunXin.cache.getTeamById($scope.teamId);
                if(team.serverCustom != undefined && team.serverCustom != null)
                {
                    var serverCustom = JSON.parse(team.serverCustom);
                    if(serverCustom.type != undefined && serverCustom.type != null && serverCustom.type != "tenant")
                    {
                        return;
                    }
                }

            }
            catch(e)
            {
                console.error(e);
                return ;
            }
            var unionIdList = [];
            for(var key in $scope.objectMap)
            {
                console.log($scope.objectMap[key]);
                if($scope.objectMap[key].unionId)
                {
                    unionIdList.push($scope.objectMap[key].unionId);
                }
            }
            myApp.yunXin.mysdk.addTeamMembers({
                teamId: $scope.teamId,
                accounts: unionIdList,
                ps: '',
                done: function(error, params) {
                    if (error) {alert('添加成员失败')}
                }
            });
            $scope.eleCloudFileSelectisShow = false;
            myTeam.$teamInfoContainer.addClass('hide');
        }
        $scope.objectEnterClick = function (object, index) {
            console.log(object);
            if(!object.unionId)
            {
                $scope.branch = object;
            }

            doBranchQueryRequest(object.tenantId, object.id);
            // var branchQueryRequest = new BranchQueryRequest();
            // branchQueryRequest.setTenantId(object.tenantId);
            // branchQueryRequest.setParentId(object.id);
            // xn_http_post(branchQueryRequest, function(data)
            // {
            //     $scope.$apply(function () {
            //         var objectList = [];
            //         objectList = objectList.concat(data.branchList);
            //         objectList = objectList.concat(data.personList);
            //         $scope.objectSearchList = objectList;
            //     })
            //     console.log(data);
            // });
        }
        $scope.objectSelectClick = function (object, index) {
            var id = object.id;
            if(!id)
            {
                id = object.unionId;
            }

            if($scope.objectMap[id] )
            {
                delete $scope.objectMap[id];
            }
            else
            {
                $scope.objectMap[id] = object;
                var userFindByOrganizationsRequest  = new UserFindByOrganizationsRequest();
                userFindByOrganizationsRequest.setTenantId(object.tenantId);
                userFindByOrganizationsRequest.setFlag(true);
                userFindByOrganizationsRequest.setOrganizationIds([id]);
                xn_http_post(userFindByOrganizationsRequest, function(data)
                {
                   // console.log(data);
                    $scope.$apply(function () {
                        $scope.objectMap[id].personList = data.users;
                    })
                  //  console.log(data);
                });
            }

            $scope.personSelected = 0;
            for(var key in $scope.objectMap)
            {
                console.log($scope.objectMap[key]);
                if($scope.objectMap[key].unionId)
                {
                    $scope.personSelected = $scope.personSelected + 1;
                }
                else
                {
                    $scope.personSelected = $scope.personSelected + parseInt($scope.objectMap[key].count);
                }
            }

            //  $scope.objectList.push(object);

          //  alert($scope.objectMap[object.id] == null)
        }

        // $scope.objectList.push('1111');
        // $scope.objectList.push('1111');
        // $scope.objectList.push('1111');
        // $scope.objectList.push('1111');
        // $scope.objectList.push('1111');
        // $scope.objectList.push('1111');
        // $scope.objectList.push('1111');
        //
        // $scope.objectList.push('1111');
        // $scope.objectList.push('1111');
        // $scope.objectList.push('1111');
        // $scope.objectList.push('1111');
        // $scope.objectList.push('1111');
        // $scope.objectList.push('1111');
        // $scope.objectList.push('1111');
        // $scope.objectList.push('1111');
        // $scope.objectList.push('1111');
        // $scope.objectList.push('1111');
        // $scope.objectList.push('1111');
        // $scope.objectList.push('1111');
        // $scope.objectList.push('1111');
        // $scope.objectList.push('1111');
        // $scope.objectList.push('1111');
        // $scope.objectList.push('1111');
        // $scope.objectList.push('1111');
        // $scope.objectList.push('1111');
        // $scope.objectList.push('1111');
        // $scope.objectList.push('1111');
        // $scope.objectList.push('1111');
        // $scope.objectList.push('1111');
        // $scope.objectList.push('1111');
        // $scope.objectList.push('1111');
        // $scope.objectList.push('1111');
        // $scope.objectList.push('1111');
        // $scope.objectList.push('1111');
        // $scope.objectList.push('1111');


       };
    var myApp =  angular.module("xn.groupMemberAdd", []);
    myApp.service('myApp', function() {
        this.yunXin = yunXin;
    });
    // myApp.config(['$locationProvider', function($locationProvider) {
    //     $locationProvider.html5Mode(true);
    // }]);

    myApp.controller("groupMemberAddController", ["$timeout","$rootScope", "$scope", "$http","$q", "$location", "$filter", "myApp", groupMemberAddController]);
    myApp.filter("replaceString",function(){
        return function(input, str1, str2){

            return input.replace(str1, str2);
        }
    });

    myApp.filter("altName",function(){
        return function(input, altName){
            if(altName != null && altName != "")
            {
                return altName;
            }
            return input;
        }
    });

    myApp.filter("isObjectNull",function(){
        return function(objectMap, key){
           // console.log(objectMap[key] == null);
            return objectMap[key] == null;
        }
    });

    myApp.filter("nameColor",function(){
        return function(inputId){
            var color = ["#65b3fe", "#ffb343", "#ee5e54", "#55c36e", "#55b2c3", "#799cf2", "#f6ca1b", "#cf8af6", "#68ccb1", "#ec89d4"];



       //     console.log(parseInt( inputId.substring(inputId.length-1, 1)) %10);
            return color[parseInt( inputId.substring(1,inputId.length-1 , 1)) %10];
        }
    });
    myApp.filter("leftName",function(){
        return function(name){
            return name.substring(0, 2);
        }
    });



    myApp.filter("rightName",function(){
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
//groupMemberAdd.js

})();/**
 * Created by YQ on 2016/9/9.
 */
