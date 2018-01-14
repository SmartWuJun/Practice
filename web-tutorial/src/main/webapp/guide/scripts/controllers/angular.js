/**
 * Created by DEV005 on 2017/3/28.
 */
(function () {
    "user strict";
    var angularIndexController = function ($scope, dialogService) {
        /*向父级控制器传递参数*/
        $scope.$emit('navShow', 10);
        $scope.$emit('subNavShow',0);
        /*数组*/
        $scope.pageNavActive=null;
        $scope.setPageActive=function (index) {
            if($scope.pageNavActive===index){
                $scope.pageNavActive=null;
            }else {
                $scope.pageNavActive=index;
            }
        };
        $scope.moduleList=[
            {
                title:"选择组件",
                link:"",
                childList:[
                    {title:"树形结构选择框",tip:"xnSelectTree",link:"/guide/angular/module/xn-select/lookup.html"},
                    {title:"树形结构多选框",tip:"xnMultipleSelectTree",link:"/guide/angular/module/xn-select/lookup.html"},
                    {title:"双向选择框", tip:"bothListSelect",link:"/guide/angular/module/xn-select/lookup.html" },
                    {title:"树形结构双向选择框",tip:"bothTreeListSelect",link:"/guide/angular/module/xn-select/lookup.html"},
                    {title:"过滤选择",tip:"xnFilterSelect",link:"/guide/angular/module/xn-select/lookup.html"},
                    {title:"创建选择输入框",tip:"xnCreateSelect",link:"/guide/angular/module/xn-select/lookup.html"},
                    {title:"过滤输入框",tip:"xnFilterInput",link:"/guide/angular/module/xn-select/lookup.html"},
                    {title:"触发选择框",tip:"triggerSelect",link:"/guide/angular/module/xn-select/lookup.html"},
                    {title:"xnLookup",tip:"xnLookup",link:"/guide/angular/module/xn-select/lookup.html"}
                ]
            },
            {
                title:"地址组件",
                link:"",
                childList:[
                    {title:"地址指令",tip:"xnLocation",link:"/guide/angular/module/xn-location/xnLocation.html"},
                    {title:"单个城市选择",tip:"xnLocationCity",link:"/guide/angular/module/xn-location/xnLocationCity.html"},
                    {title:"多选省市选择",tip:"xnLocationCityList",link:"/guide/angular/module/xn-location/xnLocationCityList.html"},
                    {title:"多选省市选择",tip:"xnProvinceCity",link:"/guide/angular/module/xn-location/xnProvinceCity.html"},
                    {title:"省市查看",tip:"xnProvinceCityView",link:"/guide/angular/module/xn-location/xnProvinceCityView.html"},
                    {title:"多选省市区",tip:"xnProvinceCityDistrict",link:"/guide/angular/module/xn-location/xnProvinceCityDistrict.html"},
                    {title:"多选省市区查看",tip:"xnProvinceCityDistrictView",link:"/guide/angular/module/xn-location/xnProvinceCityDistrictView.html"},
                    {title:"单选省市区",tip:"xnLocationDistrict",link:"/guide/angular/module/xn-location/xnLocationDistrict.html"},
                    {title:"多选省份",tip:"xnMultipleProvince",link:"/guide/angular/module/xn-location/xnMultipleProvince.html"},
                    {title:"多选省份下拉形式",tip:"xnMultipleProvinceSelect",link:"/guide/angular/module/xn-location/xnMultipleProvinceSelect.html"},
                    {title:"省市区县",tip:"xnLocationTown",link:"/guide/angular/module/xn-location/xnLocationTown.html"}
                ]
            },
            {
                title:"附件组件",
                link:"",
                childList:[
                    {title:"文件上传弹出框",tip:"xnAttachmentBox",link:"/guide/angular/module/xn-attachment/xnAttachmentBox.html"},
                    {title:"单个文件上传弹出框",tip:"xnAttachmentBoxSingle",link:"/guide/angular/module/xn-attachment/xnAttachmentBoxSingle.html"},
                    {title:"文件上传",tip:"xnFileEdit",link:"/guide/angular/module/xn-attachment/xnFileEdit.html"},
                    {title:"文件查看",tip:"xnFileView",link:"/guide/angular/module/xn-attachment/xnFileView.html"},
                    {title:"单个文件上传",tip:"xnFileEditSingle",link:"/guide/angular/module/xn-attachment/xnFileEditSingle.html"},
                    {title:"单个文件查看",tip:"xnFileViewSingle",link:"/guide/angular/module/xn-attachment/xnFileViewSingle.html"},
                    {title:"附件编辑",tip:"xnAttachmentEdit",link:"/guide/angular/module/xn-attachment/xnAttachmentEdit.html"},
                    {title:"附件查看",tip:"xnAttachmentView",link:"/guide/angular/module/xn-attachment/xnAttachmentView.html"},
                    {title:"单个附件编辑",tip:"xnAttSingleEdit",link:"/guide/angular/module/xn-attachment/xnAttSingleEdit.html"},
                    {title:"单个附件查看",tip:"xnAttSingleView",link:"/guide/angular/module/xn-attachment/xnAttSingleView.html"},
                    {title:"Google浏览器拷贝",tip:"xnImgPaste",link:"/guide/angular/module/xn-attachment/xnImgPaste.html"}
                ]
            },
            {
                title:"图片组件",
                link:"",
                childList:[
                    {title:"H5",link:""},
                    {title:"CSS3",link:""},
                    {title:"Less",link:""}
                ]
            },
            {
                title:"审批组件",
                link:"",
                childList:[
                    {title:"审批流指令",tip:"xnApprovel",link:"/guide/angular/module/xn-approve/xnApprovel.html"},
                    {title:"审批流查看",tip:"xnApprovelView",link:"/guide/angular/module/xn-approve/xnApprovelView.html"},
                    {title:"添加审批人员",tip:"xnAddApprove",link:"/guide/angular/module/xn-approve/xnAddApprove.html"}

                ]
            }
        ]
    };
    var xnPage = angular.module("xn.page", [])
        .controller("AngularIndexController", ["$scope", "dialogService", angularIndexController]);
})();
