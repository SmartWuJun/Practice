/**
 * Created by DEV005 on 2017/3/28.
 */
(function () {
    "user strict";
    var contractIndexController = function ($scope, $http, $location, ContractService, dialogService) {
        $scope.$emit('navShow', 0);
        $scope.$emit('subNavShow', 0);

        $scope.vm = {
            pageNumber: 1,
            pageSize: 10
        };

        $scope.type = {status: 'AGREED'};
        if (!$scope.type.status) {
            status:'OTHER'
        }

        $scope.contractList = [];
        $scope.getList = function () {
            ContractService.apiContractContractSearch($scope.vm).success(function (data) {
                if (data.errors == null || data.errors.length > 0) {
                    dialogService.tip(data.errors, null, null)
                } else {
                    $scope.contractList = data.result;
                    $scope.vm.contractTotalCount = data.totalCount;
                }
            })
        };

        $scope.doSearch = function () {
            $scope.vm.pageNumber = 1;
            $scope.getList();
        };

        $scope.doSearch();

    };

    var xnPage = angular.module("xn.page", ["xn.directive.form"])
        .config(["xnValidatorProvider", function (xnValidatorProvider) {
        // 全局配置
        xnValidatorProvider.config({
            blurTrig   : false,
            showError  : false,
            removeError: false
        });
        xnValidatorProvider.setRules({
            name:{
                required: "名称不能为空！"
            },
            applicantDate:{
                required: "申请日期不能为空！"
            },
            applicantUserName:{
                required: "申请人不能为空！"
            },
            categoryName:{
                required:"类别名称不能为空"
            },
            categoryDescription:{
                maxlength:"合同类别描述最大长度不能超过500"
            },
            //合同主体
            bodyUserName:{
                required:"联系人不能为空"

            },
            bodyCellphone:{
                required:"手机号不能为空",
                pattern:"手机格式不正确！"
            },
            contractNumber:{
                required:"合同编号不能为空",
                maxlength:"合同编号最大长度不能超过50"
            },
            contractName:{
                required:"合同名称不能为空",
                maxlength:"合同名称最大长度不能超过100"
            },
            AType:{
                required:"甲方主体不能为空",
                maxlength:"甲方主体大长度不能超过100"
            },
            BType:{
                required:"乙方主体不能为空",
                maxlength:"乙方主体最大长度不能超过50"
            },
            partyAOwner:{
                required:"甲方负责人不能为空",
                maxlength:"甲方负责人最大长度不能超过50"
            },
            partyBOwner:{
                required:"乙方负责人不能为空",
                maxlength:"乙方负责人最大长度不能超过50"
            },
            partyName:{
                required:"主体不能为空",
                maxlength:"主体最大长度不能超过50"
            },
            partyOwner:{
                required:"负责人不能为空",
                maxlength:"负责人最大长度不能超过50"
            },
            contractAmount:{
                required:"合同金额不能为空",
                pattern:"合同金额只能输入数字,并且最多只能保留两位小数！"
            },
            organizationName:{
                required:"所属部门不能为空",
                maxlength:"组织名称最大长度不能超过50"
            },
            accountUserName:{
                required:"业务员不能为空",
                maxlength:"业务员最大长度不能超过50"
            },
            projectName:{
                required:"所属项目名不能为空",
                maxlength:"项目名称最大长度不能超过50"
            },
            signDate:{
                required:"签订日期不能为空"
            },
            beginDate:{
                required:"开始日期不能为空"
            },
            endDate:{
                required:"结束日期不能为空"
            },
            contentDescription:{
                maxlength:"合同主要内容最大长度不能超过4000"
            },
            exceptionDescription:{
                maxlength:"合同异常描述最大长度不能超过4000"
            },
            description:{
                maxlength:"备注最大长度不能超过4000"
            },
            changeReason:{
                required:"变更理由不能为空",
                maxlength:"变更理由最大长度不能超过50"
            },
            contractCurrencyCode:{
                required:"币种不能为空"
            },

            //设置部分
            bodyName:{
                required:"名称不能为空",
                maxlength:"名称长度不能超过100"
            },
            bodyDescription:{
                maxlength:"合同主体描述长度不能超过500"
            },
            locationName:{
                maxlength:"地址名称长度不能超过50"
            },
            contactUserName:{
                maxlength:"变更理由最大长度不能超过50"
            },
            cellphone:{
                pattern:"手机格式不正确！"
            },
            phone:{
                pattern:"办公室电话格式不正确！"
            },
            code:{
                maxlength:"编码长度不能超过50"
            }

        });

    }])
        .controller("ContractIndexController", ["$scope", "$http", "$location", "ContractService", "dialogService", contractIndexController])

})();
