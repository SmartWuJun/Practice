/**
 * Created by YQ on 2016/8/4.
 */

(function () {
  
    var addFriendController = function($rootScope, $scope, $http, $q, $filter,$timeout, myApp) {
       // alert(myApp);
        $scope.searchClick = function () {
            myApp.yunXin.searchFriend();
        };

        // $scope.friendSearchOptions = {
        //     pageSize : 10,
        //     pageNumber : 1,
        //     totalCount :0,
        //     method:'xntalk.global.search',
        //     methodName: "getFriendList"
        // };
        //
        //
        // $scope.getFriendList = function() {
        //
        //     xn_http_post($scope.friendSearchOptions, function (data) {
        //         $scope.personList = [];
        //         for(var obj in data.employeeList)
        //         {
        //             var person = new Object();
        //             person.name = obj.name;
        //             $scope.personList(obj);
        //         }
        //         console.log(data);
        //     });
        // };
        //
        //
        // $scope.selectFriend = function(line, inventory,index) {
        //
        //
        // };

        $scope.getList=function(parameter){
            if(!parameter.data.keyword)
            {
                parameter.data.keyword = "";
            }
            parameter.data.pageSize = 5;
            var request =
            {
                method:'xntalk.global.search',
                pageSize:5,
                pageNumber:parameter.data.pageNumber,
                keyword:parameter.data.keyword
            };

            xn_http_post(request, function (data) {
                var personList = [];
                var personMap = {};

                for(var i=0;data.employeeList && i<data.employeeList.length; i++)
                {
                    var person = new Object();
                    person.name = data.employeeList[i].name;
                    person.unionId = data.employeeList[i].unionId;
                    personMap[person.unionId] = person;
                }


                for(var i=0;data.userList &&  i<data.userList.length; i++)
                {
                    var person = new Object();
                    person.name = data.userList[i].name;
                    person.unionId = data.userList[i].unionId;
                    personMap[person.unionId] = person;
                }

                for(var obj in personMap)
                {
                    personList.push(personMap[obj]);
                }

                // index++;
                var itemList=[

                ];
                for(var i=parameter.data.pageSize*(parameter.data.pageNumber-1);
                    i<parameter.data.pageSize*(parameter.data.pageNumber) && i<personList.length; i++)
                {
                    itemList.push(personList[i]);
                }

                parameter.deferred.resolve({itemList:itemList,totalCount:personList.length});
            });


        };

        // //选择框
        // $scope.selectLookup=function(data) {
        //     console.log(data);
        // }


    };
    var myApp =  angular.module("xn.addFriend", []);
    myApp.service('myApp', function() {
        this.yunXin = yunXin;
    });
    myApp.controller("addFriendController", ["$rootScope", "$scope", "$http","$q", "$filter", "$timeout", "myApp", addFriendController]);

})();