var systemModule=angular.module("xn.service.foundation",[]);

systemModule.factory("FoundationService",["$http",function($http){
    var service={};

    var url="/system/api.do";
    //用户获取
    service.getUser=function(request) {
        console.log("service invoked!");
        return $http({
            method : 'POST',
            url : url,
            params:{"method":"api.system.user.get"},
            data:request
        });
    };

    //消息明细获取
    service.getMessageDetail=function(request) {
        var url="/api/foundation.do";
        return $http({
            method : "POST",
            url : url,
            params:{"method":"api.foundation.message.get"},
            data:request
        });
    };
    //未读消息读取
    service.getMessageList=function() {
        var url="/api/foundation.do";
        return $http({
            method : "POST",
            url : url,
            params:{"method":"api.foundation.messages.get"}
        });
    };
    //已读消息读取
    service.getReadedMessageList=function() {
        var url="/api/foundation.do";
        return $http({
            method : "POST",
            url : url,
            params:{"method":"api.foundation.readedmessage.get"}
        });
    };
    //读消息
    service.doRead=function(messageIdList) {
        var url="/api/foundation.do";
        return $http({
            method : "POST",
            url : url,
            params:{"method":"api.foundation.message.read"},
            data:{"ids":messageIdList}
        });
    };

    /**
     * 创建一个地址
     * @param data
     * @returns {*}     返回一个ID
     */
    service.createLocation=function(data) {
        console.log("---------进入Foundation----------");
        var url="/api/foundation.do";
        return $http({
            method : "POST",
            url : url,
            params:{"method":"api.foundation.location.create"},
            data:data
        });
    };

    /**
     * 创建一个地址
     * @param data
     * @returns {*}
     */
    service.updateLocation=function(data) {
        var url="/api/foundation.do";
        return $http({
            method : "POST",
            url : url,
            params:{"method":"api.foundation.location.update"},
            data:data
        });
    };

    /**
     * 获取银行列表
     * @returns {*}
     */
    service.apiFoundationBankGetAllList = function(){
        var url="/api/foundation.do";
        return $http({
            method : "POST",
            url : url,
            params:{"method":"api.foundation.bank.getalllist"}
        });
    };

    /**
     * 获取附件列表
     *
     * @param data
     * @returns {*}
     */
    service.apiFoundationAttachmentGetListByBizInfo = function(data){
        var url = "/api/foundation.do";
        return $http({
            method: 'POST',
            url: url,
            params: {"method": "api.foundation.attachment.getlist.bybizinfo"},
            data: data
        });
    };

    //上传附件
    service.apiFoundationAttachmentUpload = function(file,businessId,businessType,businessCategory){
        var fileName = file.name;
        var ext =fileName.substr(fileName.lastIndexOf(".")+1,fileName.length);
        var name = fileName.substr(0,fileName.lastIndexOf("."));
        var url="/api/attachmentUpload.do";
        var fd = new FormData();
        fd.append("file",file);
        fd.append("FileName",name);
        fd.append("Ext",ext);
        fd.append("method","api.foundation.attachment.upload");
        fd.append("businessId",businessId);
        fd.append("businessType",businessType);
        fd.append("businessCategory",businessCategory);
        return($http({
            method : 'POST',
            url : url,
            headers: {'Content-Type': undefined },
            transformRequest: angular.identity,
            data:fd
        })) ;
    };


    /**
     * 上传Logo
     * @param file
     * @returns {*}
     */
    service.uploadLogo=function(file){
        var fileName = file.name;
        var ext =fileName.substr(fileName.lastIndexOf(".")+1,fileName.length);
        var url="/api/fileUpload.do";
        var fd = new FormData();
        fd.append("File",file);
        fd.append("Ext",ext);
        fd.append("Type","PHOTO");
        return($http({
            method : 'POST',
            url : url,
            headers: {'Content-Type': undefined },
            transformRequest: angular.identity,
            data:fd
        })) ;
    };


    //删除附件
    service.apiFoundationAttachmentDelete = function(data){
        var url = "/api/foundation.do";
        return $http({
            method: 'POST',
            url: url,
            params: {"method": "api.foundation.attachment.delete"},
            data: data
        });
    };

    //获取民族列表
    service.apiFoundationNationGetAllList = function(data){
        var url = "/api/foundation.do";
        return $http({
            method: 'POST',
            url: url,
            params: {"method": "api.foundation.nation.getalllist"},
            data: data
        });
    };


    //获取企业性质列表
    service.apiFoundationBusinessNatureFind = function(data){
        var url = "/api/foundation.do";
        return $http({
            method: 'POST',
            url: url,
            params: {"method": "api.foundation.businessnature.find"},
            data: data
        });
    };

    //获取行业列表
    service.apiFoundationBusinessTradeFind = function(data){
        var url = "/api/foundation.do";
        return $http({
            method: 'POST',
            url: url,
            params: {"method": "api.foundation.businesstrade.find"},
            data: data
        });
    };

    //查询出版社列表
    service.searchPressList = function(data){
        var url="/api/foundation.do";
        return $http({
            method: "POST",
            url: url,
            params: {"method": "api.foundation.press.search"},
            data : data
        });
    };

    //获取银行
    service.apiFoundationGetBank = function(data){
        var url="/api/foundation.do";
        return $http({
            method: "POST",
            url: url,
            params: {"method": "api.foundation.bank.get"},
            data : data
        });
    };

    //获取食品分类
    service.apiFoundationFoodCategoryGet = function(data){
        var url="/api/foundation.do";
        return $http({
            method: "POST",
            url: url,
            params: {"method": "api.foundation.food.category.get"},
            data : data
        });
    };
    //模糊查询食品分类
    service.apiFoundationFoodCategorySearch = function(data){
        var url="/api/foundation.do";
        return $http({
            method: "POST",
            url: url,
            params: {"method": "api.foundation.food.category.search"},
            data : data
        });
    };
    //高级查询食品分类
    service.apiFoundationFoodCategoryFind = function(data){
        var url="/api/foundation.do";
        return $http({
            method: "POST",
            url: url,
            params: {"method": "api.foundation.food.category.find"},
            data : data
        });
    };
    //获取ID列表
    service.apiFoundationIdsGet = function(data){
        var url="/api/foundation.do";
        return $http({
            method: "POST",
            url: url,
            params: {"method": "api.foundation.ids.get"},
            data : data
        });
    };
    //获取ID
    service.apiFoundationIdGet = function(data){
        var url="/api/foundation.do";
        return $http({
            method: "POST",
            url: url,
            params: {"method": "api.foundation.id.get"},
            data : data
        });
    };


    //导出报表
    service.apiFoundationPdfExport = function(data){
        var url="/api/foundation.do";
        return $http({
            method: "POST",
            url: url,
            params: {"method": "api.foundation.pdf.export"},
            data : data
        });
    };
    return service;
}]);
