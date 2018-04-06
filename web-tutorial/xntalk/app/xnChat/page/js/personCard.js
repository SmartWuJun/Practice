/**
 * Created by YQ on 2016/8/4.
 */

(function () {

    $("body").on("click", function(e) {
       // console.log(e);
        if(!$("#personQrcode").is(":hidden") && e.target.id != "personQrcode" && e.target.id != "qrcodeImg" && e.target.id != "personQrcode2" )
        {
            $("#personQrcode").addClass('hide');
        }
        // count=0;
        // getPar(e.target);
        // if(count == 0 ){
        //     $("#personQrcode").addClass('hide');
        // }
    });




  


    var personCardController = function($rootScope, $scope, $http, $q, $location, $filter, myApp) {

        var qrcode = new QRCode(document.getElementById("qrcodeImg"), {text:"https://auth.xiniunet.com/app", width: 130, height: 130});
        $scope.isSelf = false;
        //alert(myApp.yunXin.cache);
        //$scope.head = {"background": ("url('#url#')").replace("#url#",  $location.search().avatar)};
        $scope.tenants = [];
        //   $scope.head = {"background": "url('images/addTeam.png')"};
        $scope.vm = [];
        $scope.vm.name = "杨琦";

        $scope.vm.sex= "--";
        $scope.vm.birthDate= "1989";
        $scope.vm.provinceName= "-";
        $scope.vm.cityName= "-";

        $scope.vm.nick= "--";
        $scope.closePersonCard = function () {
            $('#j-mask').addClass("hide");
            $('#div_personCard').addClass("hide");
        };

        $scope.personCardQrcodeShowClick = function () {
            qrcode.makeCode("xn_union_qrcode_" + userUID);//"xn_union_qrcode_" +
            $scope.personCardQrcodeShow = true;
            $("#personQrcode").removeClass('hide');
        };
        $scope.personCardAdd = function () {

            myApp.yunXin.addFriendInBox();
            $scope.closePersonCard();
        };
        $scope.personCardRemove = function () {
            myApp.yunXin.removeFriend();
            $scope.closePersonCard();
        };

        $scope.personCardUpdateClick = function () {


            if($scope.vm.nickNew  != undefined && $scope.vm.nickNew != null && $scope.vm.nickNew != $scope.vm.nick  )
            {
                var uionUpdateNickNameRequest = new UnionUpdateNickNameRequest;
                uionUpdateNickNameRequest.setNickName($scope.vm.nickNew);
                xn_http_post(uionUpdateNickNameRequest, function (data) {});
                $scope.vm.nick = $scope.vm.nickNew;

               // alert($scope.vm.nick);
            }
            var birthDate =$("#personCardYead  option:selected").text().trim() + "-" + $("#personCardMonth  option:selected").text().trim() + "-" + $("#personCardDay  option:selected").text().trim();
           // alert(birthDate);
            if(birthDate != $scope.vm.birthDate)
            {
                var unionUpdateBirthDateRequest = new UnionUpdateBirthDateRequest();
                unionUpdateBirthDateRequest.setBirthDate(birthDate)
                xn_http_post(unionUpdateBirthDateRequest, function (data) {console.log(data);});
                $scope.vm.birthDate = birthDate;

               // alert($scope.vm.birthDate);
            }
            if($scope.vm.sexNew != undefined && $scope.vm.sexNew != null && $scope.vm.sex != $scope.vm.sexNew)
            {
                var unionUpdateGenderRequest = new UnionUpdateGenderRequest();
                if($scope.vm.sexNew == "男")
                {
                    unionUpdateGenderRequest.setGender("M");
                }
                else if($scope.vm.sexNew == "女")
                {
                    unionUpdateGenderRequest.setGender("W");
                }
                xn_http_post(unionUpdateGenderRequest, function (data) {console.log(data);});
                $scope.vm.sex = $scope.vm.sexNew;
            }
            if( $scope.vm.proviceId != $("#selectProv  option:selected").val() || $scope.vm.cityId != $("#selectCity  option:selected").val())
            {
                var unionUpdateAreaRequest = new UnionUpdateAreaRequest();
                unionUpdateAreaRequest.setCityId($("#selectCity  option:selected").val());
                unionUpdateAreaRequest.setProvinceId($("#selectProv  option:selected").val());
                unionUpdateAreaRequest.setCityName($("#selectCity  option:selected").text());
                unionUpdateAreaRequest.setProvinceName($("#selectProv  option:selected").text());
                xn_http_post(unionUpdateAreaRequest, function (data) {console.log(data);});

                $scope.vm.proviceId = $("#selectProv  option:selected").val();
                $scope.vm.cityId = $("#selectCity  option:selected").val();
                $scope.vm.provinceName = $("#selectProv  option:selected").text();
                $scope.vm.cityName = $("#selectCity  option:selected").text();
            }

            $scope.personCard.edit = false;
        };
        $scope.sendMsg = function () {
            $('#j-mask').addClass("hide");
            $('#div_personCard').addClass("hide");
            myApp.yunXin.doChat();

        };


        $rootScope.showPersonCard = function (user) {
            $scope.vm.provinceName= "-";
            $scope.vm.cityName= "-";
            $scope.personCardQrcodeShow = false;



           // alert($scope.isBuddy );
            var personUnionId = "0";
            if(user != undefined && user != null)
            {
                personUnionId = user.account;

            }
            else
            {
                personUnionId = userUID;
            }


            $('#j-mask').removeClass("hide");
            $('#div_personCard').removeClass("hide");

            var user = myApp.yunXin.cache.getUserById(personUnionId);

            console.log(getAvatar(user.avatar));
            $scope.personCard.edit= false;
            $scope.head =  getAvatar(user.avatar);
            if(personUnionId == userUID)
            {
                $scope.isSelf = true;
            }
            else
            {
                $scope.isSelf = false;
            }

            var  unionGetRequest = new UnionGetRequest();
            unionGetRequest.setId(personUnionId);
            xn_http_post(unionGetRequest, function (data) {
                $scope.$apply(function () {



                    var union = data.union;
                    if( union.gender)
                    {
                        if(union.gender == "W")
                        {
                            $scope.vm.sex = "女";
                        }
                        else if(union.gender == 'M')
                        {
                            $scope.vm.sex = "男";
                        }
                    }
                    if(union.name  != null && union.name != undefined)
                    {
                        $scope.vm.name = union.name;
                    }
                    else
                    {
                        $scope.vm.name = union.nickName;
                    }
                    if(union.nickName  != null && union.nickName != undefined)
                    {
                        $scope.vm.nick = union.nickName;
                    }



                    if(union.birthDate  != null && union.birthDate != undefined)
                    {
                        $scope.vm.birthDate =$filter('date')(new Date(union.birthDate), 'yyyy-MM-dd')   ;// $filter('dateFormat')(new Date(union.birthDate));

                        var index =  (new Date(Date.parse($scope.vm.birthDate))).getFullYear();
                        $(("#personCardYead  option[value='###']").replace("###", index)).attr("selected",true);
                        //   $("#personCardYead option[value='1999']").attr("selected",true);
                        index =  (new Date(Date.parse($scope.vm.birthDate))).getMonth();

                        $(("#personCardMonth  option[value='###'] ").replace("###", index + 1)).attr("selected",true);
                        index =  (new Date(Date.parse($scope.vm.birthDate))).getDate();
                        $(("#personCardDay  option[value='###'] ").replace("###", index)).attr("selected",true);
                    }

                    if(union.provinceId)
                    {

                        $('#selectProv').val(union.provinceId);
                        $('#selectProv').trigger('change');
                    }
                    if(union.cityId)
                    {
                        $('#selectCity').val(union.cityId);
                        $('#selectCity').trigger('change');
                    }


                    $scope.vm.provinceName = union.provinceName;
                    $scope.vm.cityName = union.cityName;

                });


            });
           // console.clear();
            var tenantGetAllListByUnionIdRequest = new TenantGetAllListByUnionIdRequest();
            tenantGetAllListByUnionIdRequest.setUnionId(personUnionId);
            xn_http_post(tenantGetAllListByUnionIdRequest, function(data){
                var tenants = [];
                if (data.errors == null || data.errors.length > 0){
                    alert(data.errors[0].message);
                }else {
                    $scope.$apply(function () {
                        tenants = data.result;
                    });
                    console.log(data);

                    var  employeeProfileGetRequest = new EmployeeProfileGetRequest();
                    employeeProfileGetRequest.setUnionId(personUnionId);
                    xn_http_post(employeeProfileGetRequest, function (data) {
                        console.log(data);
                        $scope.$apply(function () {

                            $scope.tenants = [];
                            for(var i=0; i<tenants.length; i++)
                            {
                                for(var j=0; j<data.result.length; j++)
                                {
                                    if(data.result[j].tenantId == tenants[i].id)
                                    {
                                        tenants[i].employeeDetail = data.result[j];
                                    }
                                }
                                if( tenants[i].employeeDetail == null || tenants[i].employeeDetail == undefined)
                                {
                                    tenants.splice(i, 1);
                                }
                                else 
                                {
                                    $scope.tenants.push(tenants[i]);
                                }
                            }



                            // for(var employeeDetail in data.result)
                            // {
                            //     console.log(employeeDetail);
                            //
                            // }


                        });

                    });


                }
            });


           // unionGetRequest.set
           // unionGetRequest.setTenantId()
        };


    };
    var myApp =  angular.module("xn.personCard", []);
    myApp.service('myApp', function() {
        this.yunXin = yunXin;
    });
    myApp.config(['$locationProvider', function($locationProvider) {
        $locationProvider.html5Mode(true);
    }]);
    myApp.controller("personCardController", ["$rootScope", "$scope", "$http","$q", "$location", "$filter", "myApp", personCardController])


})();