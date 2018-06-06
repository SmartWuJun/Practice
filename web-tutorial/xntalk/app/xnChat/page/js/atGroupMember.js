/**
 * Created by YQ on 2016/9/26.
 */
(function () {

    $("body").on("click", function(e) {

        if(e.target.id !="atGroupMemberController" && e.target.id != 'searchName-input')
        {
            var controllerScope = $('div[ng-controller="atGroupMemberController"]').scope();
            controllerScope.$apply(function () {

              //  controllerScope.contactSelectControllerShow = false;
            })

        }
    });

    $('#atGroupMemberController').on('click', function (e) {
        var ev = e || window.event;
        if(ev.stopPropagation){
        }
        else if(window.event){
            window.event.cancelBubble = true;//兼容IE
        }
    });

    var atGroupMemberController = function($rootScope, $scope, $http, $q, $filter, $timeout, myApp){
        $scope.left = 0;
        $scope.top = 0;
        $scope.memberList = [];
        $scope.totalCount = 0;
        $scope.searchContact2 = function (keyword,teamMemberList){
            $scope.memberList = [];
            for(var i=0; i<teamMemberList.length; i++)
            {


                var user = myApp.yunXin.cache.getUserById(teamMemberList[i].account);
                teamMemberList[i].avatar = user.avatar;
                teamMemberList[i].name = user.nick;
                $scope.memberList.push(teamMemberList[i]);
            }

        }
        $scope.setPosition = function (position) {
            $scope.left = position.left;
            $scope.top = position.top - $scope.memberList.length * 25;
        }
        $scope.objectSelectClick = function (object) {

            // if(object.teamId != null && object.teamId != undefined)
            // {
            //     myApp.yunXin.openChatBox(object.teamId,"team");
            // }
            // else if(object.unionId != null && object.unionId != undefined)
            // {
            //     myApp.yunXin.openChatBox(object.unionId,"p2p");
            // }


        }



    };

    var myModule =  angular.module("xn.atGroupMember", []);
    myModule.service('myApp', function() {
        this.yunXin = yunXin;
    });
    myModule.controller("atGroupMemberController", ["$rootScope", "$scope", "$http","$q", "$filter", "$timeout", "myApp", atGroupMemberController]);

})();