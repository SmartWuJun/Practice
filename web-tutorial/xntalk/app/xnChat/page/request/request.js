function UnionGetRequest()
{
    this.method = 'xntalk.union.get';
    this.getId = function(){
        return this.id;
    };
    this.setId = function(value) {
        this.id = value;
    };
}

function ScanLoginCreateRequest() {
    this.method = 'xntalk.scanLogin.create';

    this.getIdentityId = function(){
        return this.identityId;
    };
    this.setIdentityId= function(value) {
        this.identityId = value;
    };

    this.getUnionId = function(){
        return this.unionId;
    };
    this.setUnionId = function(value) {
        this.unionId = value;
    };
}
function ScanLoginGetRequest() {
    this.method = 'xntalk.scanLogin.get';

    this.setId = function(value) {
        this.id = value;
    };
    this.getId = function(){
        return this.id;
    };
}

function UnionGetByAccountRequest()
{
    this.method = 'xntalk.unionByAccount.get';
    this.getAccount = function() {
        return this.account;
    }

    this.setAccount = function(value){
        this.account = value;
    }

    this.getIsAllUnion = function(){
        return this.isAllUnion;
    }

    this.setIsAllUnion = function(value) {
        this.isAllUnion = value;
    }
}


function GlobalSearchRequest()
{
    this.method = 'xntalk.global.search';
    this.getKeyword = function() {
        return this.keyword;
    }

    this.setKeyword = function(value){
        this.keyword = value;
    }


}

function PassportIdGetByUnionIdAndTenantIdRequest()
{
    this.method = 'xntalk.passportIdByUnionIdAndTenantId.get';
    this.setTenantId = function(value) {
        this.tenantId = value;

    };

    this.getTenantId = function(){
        return this.tenantId;
    };


    this.setUnionId = function(value) {
        this.unionId = value;
    };

    this.getUnionId = function(){

        return this.unionId;
    };
}


function TenantGetAllListByUnionIdRequest()
{
    this.method = 'xntalk.allTenantList.get';
    this.setUnionId = function(value) {
        this.unionId = value;
    };

    this.getUnionId = function(){
        return this.unionId;
    };
}




function DiskByObjectIdRequest()
{
    this.method = 'xntalk.diskByObjectId.get';

    this.setUnionId = function(value) {
        this.unionId = value;
    };
    this.getUnionId = function(){
        return this.unionId;
    };

    this.setUserId = function(value) {
        this.userId = value;
    };
    this.getUserId = function(){
        return this.userId;
    };

    this.setTenantId = function(value) {
        this.tenantId = value;
    };
    this.getTenantId = function(){
        return this.tenantId;
    };
}



function DiskGetRequest()
{
    this.method = 'xntalk.disk.get';

    this.setId = function(value) {
        this.id = value;
    };
    this.getId = function(){
        return this.id;
    };

    this.setTenantId = function(value) {
        this.tenantId = value;
    };
    this.getTenantId = function(){
        return this.tenantId;
    };
}

function FolderFileGetRequest()
{
    this.method = 'xntalk.folderFile.get';

    this.setId = function(value) {
        this.id = value;
    };
    this.getId = function(){
        return this.id;
    };

    this.setTenantId = function(value) {
        this.tenantId = value;
    };
    this.getTenantId = function(){
        return this.tenantId;
    };
}

function FolderFileFindRequest()
{
    this.method = 'xntalk.folderFile.find';


    //private FileSortColumnEnum ;
    //
    this.setParentId = function(value) {
        this.parentId = value;
    };
    this.getParentId = function(){
        return this.parentId;
    };

    this.setTenantId = function(value) {
        this.tenantId = value;
    };
    this.getTenantId = function(){
        return this.tenantId;
    };

    this.setFileName = function(value) {
        this.fileName = value;
    };
    this.getFileName = function(){
        return this.fileName;
    };

    this.setDescription = function(value) {
        this.description = value;
    };
    this.getDescription = function(){
        return this.description;
    };

    this.setType = function(value) {
        this.type = value;
    };
    this.getType = function(){
        return this.type;
    };

    this.setSortColumn = function(value) {
        this.sortColumn = value;
    };
    this.getSortColumn = function(){
        return this.sortColumn;
    };

}



function UnionUpdateDiskIdRequest()
{
    this.method = 'xntalk.unionDiskId.update';

    this.setDiskId = function(value) {
        this.diskId = value;
    };
    this.getDiskId = function(){
        return this.diskId;
    };
}


function FolderFileCreateRequest()
{
    this.method = 'xntalk.folderFile.create';


    this.setTenantId = function(value) {
        this.tenantId = value;
    };
    this.getTenantId = function(){
        return this.tenantId;
    };

    this.setFileData = function(value) {
        this.fileData = value;
    };
    this.getFileData = function(){
        return this.fileData;
    };

    this.setDiskId = function(value) {
        this.diskId = value;
    };
    this.getDiskId = function(){
        return this.diskId;
    };

    this.setFileExt = function(value) {
        this.fileExt = value;
    };
    this.getFileExt = function(){
        return this.fileExt;
    };

    this.setFileName = function(value) {
        this.fileName = value;
    };
    this.getFileName = function(){
        return this.fileName;
    };


    this.setFolderId = function(value) {
        this.folderId = value;
    };
    this.getFolderId = function(){
        return this.folderId;
    };

    this.setFileStream = function(value) {
        this.fileStream = value;
    };
    this.getFileStream = function(){
        return this.fileStream;
    };
}

function FolderFileCreateByPathRequest()
{
    this.method = 'xntalk.folderFileByPath.create';

    this.setDiskId = function(value) {
        this.diskId = value;
    };
    this.getDiskId = function(){
        return this.diskId;
    };

    this.setTenantId = function(value) {
        this.tenantId = value;
    };
    this.getTenantId = function(){
        return this.tenantId;
    };


    this.setFileExt = function(value) {
        this.fileExt = value;
    };
    this.getFileExt = function(){
        return this.fileExt;
    };


    this.setFileStream = function(value) {
        this.fileStream = value;
    };
    this.getFileStream = function(){
        return this.fileStream;
    };


    this.setFileName = function(value) {
        this.fileName = value;
    };
    this.getFileName = function(){
        return this.fileName;
    };

    this.setPath = function(value) {
        this.path = value;
    };
    this.getPath = function(){
        return this.path;
    };

}




function FolderFileUpdateRequest()
{
    this.method = 'xntalk.folderFile.update';

    this.setId = function(value) {
        this.id = value;
    };
    this.getId = function(){
        return this.id;
    };

    this.setTenantId = function(value) {
        this.tenantId = value;
    };
    this.getTenantId = function(){
        return this.tenantId;
    };

    this.setFileName = function(value) {
        this.fileName = value;
    };
    this.getFileName = function(){
        return this.fileName;
    };

    this.setRowVersion=function(value){
        this.rowVersion = value;
    };
    this.getRowVersion=function(){
        return this.rowVersion;
    };



}



function FolderFileMoveRequest()
{
    this.method = 'xntalk.folderFile.move';

    this.setId = function(value) {
        this.id = value;
    };
    this.getId = function(){
        return this.id;
    };

    this.setTenantId = function(value) {
        this.tenantId = value;
    };
    this.getTenantId = function(){
        return this.tenantId;
    };
    this.setRowVersion=function(value){
        this.rowVersion = value;
    };
    this.getRowVersion=function(){
        return this.rowVersion;
    };
    this.setTargetId = function(value) {
        this.targetId = value;
    };
    this.getTargetId = function(){
        return this.targetId;
    };




}




function FolderFileDeleteRequest()
{
    this.method = 'xntalk.folderFile.delete';

    this.setId = function(value) {
        this.id = value;
    };
    this.getId = function(){
        return this.id;
    };

    this.setTenantId = function(value) {
        this.tenantId = value;
    };
    this.getTenantId = function(){
        return this.tenantId;
    };

}



function FolderFileDeleteByIdsRequest()
{
    this.method = 'xntalk.folderFileByIds.delete';



    this.setTenantId = function(value) {
        this.tenantId = value;
    };
    this.getTenantId = function(){
        return this.tenantId;
    };

    this.setFolderIdList = function(value) {
        this.folderIdList = value;
    };
    this.getFolderIdList = function(){
        return this.folderIdList;
    };

    this.setFolderFileIdList = function(value) {
        this.folderFileIdList = value;
    };
    this.getFolderFileIdList = function(){
        return this.folderFileIdList;
    };


}



function FolderGetRequest()
{
    this.method = 'xntalk.folder.get';



    this.setTenantId = function(value) {
        this.tenantId = value;
    };
    this.getTenantId = function(){
        return this.tenantId;
    };

    this.setId = function(value) {
        this.id = value;
    };
    this.getId = function(){
        return this.id;
    };



}


function FolderSearchRequest()
{
    this.method = 'xntalk.folder.search';



    this.setTenantId = function(value) {
        this.tenantId = value;
    };
    this.getTenantId = function(){
        return this.tenantId;
    };

}



function FolderFindRequest()
{
    this.method = 'xntalk.folder.find';

    this.setTenantId = function(value) {
        this.tenantId = value;
    };
    this.getTenantId = function(){
        return this.tenantId;
    };

    this.setName = function(value) {
        this.name = value;
    };
    this.getName = function(){
        return this.name;
    };

    this.setPageSize = function(value) {
        this.pageSize = value;
    };
    this.getPageSize = function(){
        return this.pageSize;
    };

    this.setDescription = function(value) {
        this.description = value;
    };
    this.getDescription = function(){
        return this.description;
    };

    this.setDiskId = function(value) {
        this.diskId = value;
    };
    this.getDiskId = function(){
        return this.diskId;
    };

    this.setParentId = function(value) {
        this.parentId = value;
    };
    this.getParentId = function(){
        return this.parentId;
    };

    this.setSortColumn = function(value) {
        this.sortColumn = value;
    };
    this.getSortColumn = function(){
        return this.sortColumn;
    };

}



function FolderCreateRequest()
{
    this.method = 'xntalk.folder.create';

    this.setTenantId = function(value) {
        this.tenantId = value;
    };
    this.getTenantId = function(){
        return this.tenantId;
    };

    this.setName = function(value) {
        this.name = value;
    };
    this.getName = function(){
        return this.name;
    };

    this.setDiskId = function(value) {
        this.diskId = value;
    };
    this.getDiskId = function(){
        return this.diskId;
    };

    this.setDescription = function(value) {
        this.description = value;
    };
    this.getDescription = function(){
        return this.description;
    };

    this.setParentId = function(value) {
        this.parentId = value;
    };
    this.getParentId = function(){
        return this.parentId;
    };
}



function FolderUpdateRequest()
{
    this.method = 'xntalk.folder.update';

    this.setTenantId = function(value) {
        this.tenantId = value;
    };
    this.getTenantId = function(){
        return this.tenantId;
    };
    this.setId = function(value) {
        this.id = value;
    };
    this.getId = function(){
        return this.id;
    };
    this.setRowVersion=function(value){
        this.rowVersion = value;
    };
    this.getRowVersion=function(){
        return this.rowVersion;
    };

    this.setName = function(value) {
        this.name = value;
    };
    this.getName = function(){
        return this.name;
    };

    this.setDescription = function(value) {
        this.description = value;
    };
    this.getDescription = function(){
        return this.description;
    };



}


function FolderMoveRequest()
{
    this.method = 'xntalk.folder.move';

    this.setTenantId = function(value) {
        this.tenantId = value;
    };
    this.getTenantId = function(){
        return this.tenantId;
    };

    this.setFolderId = function(value) {
        this.folderId = value;
    };
    this.getFolderId = function(){
        return this.folderId;
    };

    this.setTargetId = function(value) {
        this.targetId = value;
    };
    this.getTargetId = function(){
        return this.targetId;
    };
    this.setRowVersion=function(value){
        this.rowVersion = value;
    };
    this.getRowVersion=function(){
        return this.rowVersion;
    };



}




function FolderDeleteRequest()
{
    this.method = 'xntalk.folder.delete';

    this.setTenantId = function(value) {
        this.tenantId = value;
    };
    this.getTenantId = function(){
        return this.tenantId;
    };

    this.setId = function(value) {
        this.id = value;
    };
    this.getId = function(){
        return this.id;
    };
}


function EmployeeProfileGetRequest()
{
    this.method = 'xntalk.employeeProfile.get';

    this.setTenantId = function(value) {
        this.tenantId = value;
    };
    this.getTenantId = function(){
        return this.tenantId;
    };


    this.setUnionId = function(value) {
        this.unionId = value;
    };
    this.getUnionId = function(){
        return this.unionId;
    };
}

function UnionUpdateNickNameRequest() {
    this.method = 'xntalk.unionNickName.update';
    this.setNickName = function(value) {
        this.nickName = value;
    };
    this.getUnionId = function(){
        return this.nickName;
    };
}
function UnionUpdateGenderRequest() {
    this.method = 'xntalk.unionGender.update';
    this.setGender = function(value) {
        this.gender = value;
    };
    this.getGender = function(){
        return this.gender;
    };
}

function UnionUpdateBirthDateRequest() {
    this.method = 'xntalk.unionBirthDate.update';
    this.setBirthDate = function(value) {
        this.birthDate = value;
    };
    this.getBirthDate = function(){
        return this.birthDate;
    };
};
function UnionUpdateAreaRequest() {
    this.method = 'xntalk.unionArea.update';
    this.setCountryId = function(value) {
        this.countryId = value;
    };
    this.getCountryId = function(){
        return this.countryId;
    };

    this.setCountryName = function(value) {
        this.countryName = value;
    };
    this.getCountryName = function(){
        return this.countryName;
    };

    this.setProvinceId = function(value) {
        this.provinceId = value;
    };
    this.getProvinceId = function(){
        return this.provinceId;
    };


    this.setProvinceName = function(value) {
        this.provinceName = value;
    };
    this.getProvinceName = function(){
        return this.provinceName;
    };


    this.setCityId = function(value) {
        this.cityId = value;
    };
    this.getCityId = function(){
        return this.cityId;
    };



    this.setCityName = function(value) {
        this.cityName = value;
    };
    this.getCityName = function(){
        return this.cityName;
    };

    //  * 国家名称
    //  */
    // private String ;
    // /**
    //  * 省份ID
    //  */
    // private Long ;
    //
    // /**
    //  * 省份名称
    //  */
    // private String ;
    // /**
    //  * 城市ID
    //  */
    // private Long ;
    // /**
    //  * 城市名称
    //  */
    // private String cityName;

}

function BranchQueryRequest() {
// @NotNull(message = "承租人ID不能为空")
//     private Long tenantId;
//     /**
//      * 父级组织ID
//      */


    this.setParentId = function(value) {
        this.parentId = value;
    };
    this.getParentId = function(){
        return this.parentId;
    };

    this.method = 'xntalk.organization.query';

    this.setTenantId = function(value) {
        this.tenantId = value;
    };
    this.getTenantId = function(){
        return this.tenantId;
    };
}

function BranchQueryRequest() {
// @NotNull(message = "承租人ID不能为空")
//     private Long tenantId;
//     /**
//      * 父级组织ID
//      */


    this.setParentId = function(value) {
        this.parentId = value;
    };
    this.getParentId = function(){
        return this.parentId;
    };

    this.method = 'xntalk.organization.query';

    this.setTenantId = function(value) {
        this.tenantId = value;
    };
    this.getTenantId = function(){
        return this.tenantId;
    };
}

function GlobalSearchRequest() {
    this.method = 'xntalk.global.search';

    this.setKeyword = function(value) {
        this.keyword = value;
    };
    this.getKeyword = function(){
        return this.keyword;
    };
}

function  MessageBatchSendRequest() {
    this.method = 'xntalk.batchMessage.send';

    this.setSendUnionId = function(value) {
        this.sendUnionId = value;
    };
    this.setreceiveUnionIds = function(value) {
        this.receiveUnionIds = value;
    };

    this.setMessageType = function(value) {
        this.messageType = value;
    };
    this.setMessageData = function(value) {
        this.messageData = value;
    };
    // private Long ;
    // private List<Long> ;
    // private String ;
    // private String ;
}

function UserFindByOrganizationsRequest()
{
    this.method = 'xntalk.userByOrganizations.find';

    this.setOrganizationIds = function(value) {
        this.organizationIds = value;
    };


    this.setIsDuplicate = function(value) {
        this.isDuplicate = value;
    };

    this.setFlag = function(value) {
        this.flag = value;
    };

    this.setTenantId = function(value) {
        this.tenantId = value;
    };

}



function  GroupCreateRequest  () {
    this.method = 'xntalk.group.create';

    this.setIconId = function(value) {
        this.icon = value;
    };

    this.setIconUrl = function(value) {
        this.iconUrl = value;
    };

    this.setGroupMemberUnionIds = function(value) {
        this.groupMemberUnionIds = value;
    };

    this.setDescription = function(value) {
        this.description = value;
    };

    this.setName = function(value) {
        this.name = value;
    };

    this.setOwnerUnionName = function(value) {
        this.ownerUnionName = value;
    };


    this.setOwnerUnionId = function(value) {
        this.ownerUnionId = value;
    };


    this.setType = function(value) {
        this.type = value;
    };


    this.setTenantId = function(value) {
        this.tenantId = value;
    };
}

function  GroupGetRequest() {
    this.method = 'xntalk.group.get';

    this.setId = function(value) {
        this.id = value;
    };

}

function GroupUpdateRequest() {
    this.method = 'xntalk.group.update';

    this.setId = function(value) {
        this.id = value;
    };

    this.setIconId = function(value) {
        this.icon = value;
    };

    this.setIconUrl = function(value) {
        this.iconUrl = value;
    };


    this.setDescription = function(value) {
        this.description = value;
    };

    this.setName = function(value) {
        this.name = value;
    };

    this.setOwnerUnionName = function(value) {
        this.ownerUnionName = value;
    };


    this.setOwnerUnionId = function(value) {
        this.ownerUnionId = value;
    };


    this.setType = function(value) {
        this.type = value;
    };

    this.setNotice = function(value) {
        this.notice = value;
    };

    this.setDiskId = function(value) {
        this.diskId = value;
    };
    this.setConversationId = function(value) {
        this.conversationId = value;
    };


}



function PersonFindByBranchRequest()
{
    this.method = 'xntalk.personByBranch.find';
    this.setBranchList = function(value) {
        this.branchList = value;
    };

}
