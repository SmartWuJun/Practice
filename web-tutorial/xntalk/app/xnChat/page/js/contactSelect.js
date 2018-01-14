/**
 * Created by YQ on 2016/9/26.
 */
(function () {

    $("body").on("click", function(e) {

        if(e.target.id !="contactSelectController" && e.target.id != 'searchName-input')
        {
            var controllerScope = $('div[ng-controller="contactSelectController"]').scope();
            controllerScope.$apply(function () {

                controllerScope.contactSelectControllerShow = false;
            })

        }
    });

    $('#contactSelectController').on('click', function (e) {
        var ev = e || window.event;
        if(ev.stopPropagation){
        }
        else if(window.event){
            window.event.cancelBubble = true;//兼容IE
        }
    });

    function cutwords(input,num) {
        var cutNum = num || 2;
        if(input.length>cutNum) {
            return input.substr(input.length-cutNum,cutNum);
        } else {
            return input;
        }
    };
    var contactSelectController = function($rootScope, $scope, $http, $q, $filter, $timeout, myApp){

        // $rootScope.$watch('searchContactText', function(newValue, oldValue, scope){
        //         alert(oldValue);
        //     });

        // $timeout(function () {
        //     $rootScope.$watch('searchContactText' ,function(){
        //         alert($rootScope.searchContactText);
        //         console.log("changed");
        //     },true);
        // },5000);


        $scope.totalCount = 0;
        $rootScope.searchContact = function (keyword){

            var controllerScope = $('div[ng-controller="contactSelectController"]').scope();
            controllerScope.contactSelectControllerShow = true;


            $scope.totalCount = 0;
            $scope.friendList = [];
            $scope.teamList = [];
            var friendList = myApp.yunXin.cache.getFriendslist();
            for(var i=0;i<friendList.length ; i++)
            {
                 if(friendList[i].nick.indexOf(keyword) >= 0 )
                {
                    friendList[i].avatarName = cutwords(friendList[i].nick, 2);
                    $scope.friendList.push(friendList[i]);
                }

            }


            var teamList = myApp.yunXin.cache.getTeamlist();
            for(var i=0;i<teamList.length ; i++)
            {
                if(teamList[i].name.indexOf(keyword) >= 0 )
                {
                    teamList[i].avatarName = cutwords(teamList[i].name, 2);
                    $scope.teamList.push(teamList[i]);
                }

            }


            var globalSearchRequest = new GlobalSearchRequest();
            globalSearchRequest.setKeyword(keyword);
            xn_http_post(globalSearchRequest, function(data){
                console.log(data);
                var mapObject = {};
                $scope.empoyeeList = [];
                $scope.userList = [];
                var  empoyeeList = [];
                if(data.employeeList != null && data.employeeList!= undefined)
                {
                    empoyeeList = data.employeeList;
                }

                var userList = [];
                if(data.userList != null && data.userList!= undefined)
                {
                    userList = data.userList;
                }

                for(var i=0; i<empoyeeList.length; i++)
                {
                    if(empoyeeList[i].unionId != undefined && empoyeeList[i].unionId != null )
                    {
                        empoyeeList[i].avatarName = cutwords(empoyeeList[i].name, 2);
                        $scope.empoyeeList.push(empoyeeList[i]);
                        mapObject[empoyeeList[i].unionId] = true;
                    }

                }

                for(var i=0; i<userList.length; i++)
                {
                    if(userList[i].unionId != undefined && userList[i].unionId != null && !!mapObject[userList[i].unionId]  == false)
                    {
                        userList[i].avatarName = cutwords(userList[i].name, 2);
                        $scope.userList.push(userList[i]);
                    }

                }
              $scope.$apply(function () {
                  $scope.totalCount = $scope.empoyeeList.length + $scope.userList.length + $scope.teamList.length + $scope.friendList.length;
              });
            });


        }
        $scope.objectSelectClick = function (object) {
            if(object.teamId != null && object.teamId != undefined)
            {
                myApp.yunXin.openChatBox(object.teamId,"team");
            }
            else if(object.unionId != null && object.unionId != undefined)
            {
                myApp.yunXin.openChatBox(object.unionId,"p2p");
            }

           // var thisAccount=$(this).attr("data-account");
            //     var thisScene=$(this).attr("data-scene");
            //     var thisType=$(this).attr("data-type");
            //     if(thisScene){
            //         yunXin.openChatBox(thisAccount,thisScene);
            //     }else{
            //         yunXin.openChatBox(thisAccount,thisType);
            //     }
            //
            //     $(".name-list-div").addClass("hide");
            //     $("#searchName-input").val("");
        }


        // var count1=0;
        // var count2=0;
        // var count3=0;
        // var count4=0;
        // var count5=0;
        // var count6=0;
        // var keyword=$("#searchName-input").val();
        //
        // var thisFrList=[];
        // var thisFrTxt="";
        // thisFrList=this.cache.getFriendslist();
        // for(var j= 0,len=thisFrList.length;j<len;j++){
        //     if(thisFrList[j].nick.indexOf(keyword)!=-1){
        //         count5=count5+1;
        //         thisFrTxt=thisFrTxt+'<li>'+
        //             '<div class="panel_avatar">'+cutwords(thisFrList[j].nick,2) +'</div>'+
        //             '<div class="panel_text">'+thisFrList[j].nick +'</div>'+
        //             '<div class="arrow-right" data-scene="p2p" data-account="'+thisFrList[j].account+'"></div>' +
        //             '</li>';
        //     }
        // }
        // $("#friendList").html(thisFrTxt);
        // if(thisFrTxt!=""){
        //     $(".friendFlag").removeClass("hide");
        // }else{
        //     $(".friendFlag").addClass("hide");
        //     $("#friendList").html("");
        //     count5=0;
        // }
        // //console.log(thisFrList);
        //
        // var thisTeamList=[];
        // var thisTeamTxt="";
        // thisTeamList=this.cache.getTeamlist();
        // console.log(thisTeamList);
        // for(var j= 0,len=thisTeamList.length;j<len;j++){
        //     if(thisTeamList[j].name.indexOf(keyword)!=-1){
        //         count6=count6+1;
        //         thisTeamTxt=thisTeamTxt+'<li>'+
        //             '<div class="panel_avatar">'+cutwords(thisTeamList[j].name,2) +'</div>'+
        //             '<div class="panel_text">'+thisTeamList[j].name +'</div>'+
        //             '<div class="arrow-right" data-gtype="normal" data-type="team" data-account="'+thisTeamList[j].teamId+'"></div>' +
        //             '</li>';
        //     }
        // }
        // $("#teamList").html(thisTeamTxt);
        // if(thisTeamTxt!=""){
        //     $(".teamFlag").removeClass("hide");
        // }else{
        //     $(".teamFlag").addClass("hide");
        //     $("#teamList").html("");
        //     count6=0;
        // }
        // var globalSearchRequest = new GlobalSearchRequest();
        // globalSearchRequest.setKeyword(keyword);
        // xn_http_post(globalSearchRequest, function(data){
        //     if (data.errors == null || data.errors.length > 0){
        //         alert(data.errors[0].message);
        //     }else{
        //         console.log(data);
        //         var employeeTxt="";
        //         var userTxt="";
        //         var tenantTxt="";
        //         var branchTxt="";
        //         if(data.employeeList){
        //             $(".employeeFlag").removeClass("hide");
        //             count1=data.employeeList.length;
        //             for(var i= 0;i<count1;i++){
        //                 var unionTxt="";
        //                 if(data.employeeList[i].unionId){
        //                     unionTxt='<div class="arrow-right" data-scene="p2p" data-account="'+data.employeeList[i].unionId+'"></div>';
        //                 }
        //                 employeeTxt=employeeTxt+'<li data-union="'+data.employeeList[i].unionId+'">'+
        //                     '<div class="panel_avatar">'+cutwords(data.employeeList[i].name,2) +'</div>'+
        //                     '<div class="panel_text">'+data.employeeList[i].name +'</div>'+unionTxt+
        //                     '</li>';
        //             }
        //             $("#empoyeeList").html(employeeTxt);
        //         }else{
        //             $("#empoyeeList").html("");
        //             $(".employeeFlag").addClass("hide");
        //             count1=0;
        //         }
        //         if(data.userList){
        //             count2=data.userList.length;
        //             for(var i= 0;i<count2;i++){
        //                 var unionTxt="";
        //                 if(data.userList[i].unionId){
        //                     unionTxt='<div class="arrow-right " data-scene="p2p" data-account="'+data.employeeList[i].unionId+'"></div>';
        //                 }
        //                 userTxt=userTxt+'<li data-union="'+data.userList[i].unionId+'">'+
        //                     '<div class="panel_avatar">'+cutwords(data.userList[i].name,2) +'</div>'+
        //                     '<div class="panel_text">'+data.userList[i].name +'</div>'+unionTxt+
        //                     '</li>';
        //             }
        //             $("#userList").html(userTxt);
        //         }else{
        //             $("#userList").html("");
        //             count2=0;
        //         }
        //
        //
        //     }
        //     $("#data-count").html(Number(count1)+Number(count2)+Number(count3)+Number(count4)+Number(count5)+Number(count6));
        // });


       // $("#searchName-input").on('keyup',this.clickSearchBox.bind(this));
        // $(".search-btn").on('click',this.clickSearchBox.bind(this));
        //
        // this.$searchResult.delegate('.arrow-right','click',function(){
        //     var thisAccount=$(this).attr("data-account");
        //     var thisScene=$(this).attr("data-scene");
        //     var thisType=$(this).attr("data-type");
        //     if(thisScene){
        //         yunXin.openChatBox(thisAccount,thisScene);
        //     }else{
        //         yunXin.openChatBox(thisAccount,thisType);
        //     }
        //
        //     $(".name-list-div").addClass("hide");
        //     $("#searchName-input").val("");
        // });
    };

    var myModule =  angular.module("xn.contactSelect", []);
    myModule.service('myApp', function() {
        this.yunXin = yunXin;
    });
    myModule.controller("contactSelectController", ["$rootScope", "$scope", "$http","$q", "$filter", "$timeout", "myApp", contactSelectController]);

})();