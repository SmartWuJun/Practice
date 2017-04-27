package com.xiniunet.tutorial.home.module.screen.api;

import com.alibaba.dubbo.common.utils.StringUtils;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.xiniunet.data.domain.Clazz;
import com.xiniunet.data.domain.LanguageEnum;
import com.xiniunet.data.request.*;
import com.xiniunet.data.response.*;
import com.xiniunet.data.service.DataService;
import com.xiniunet.tutorial.home.data.domain.ClazzEx;
import com.xiniunet.tutorial.home.foundation.request.PdfExportRequest;
import com.xiniunet.tutorial.home.data.response.ClazzFindExResponse;
import com.xiniunet.foundation.request.*;
import com.xiniunet.foundation.response.*;
import com.xiniunet.foundation.service.FoundationApi;
import com.xiniunet.framework.annotation.ApiName;
import com.xiniunet.framework.base.BaseResponse;
import com.xiniunet.framework.base.BaseURLResponse;
import com.xiniunet.framework.exception.ErrorType;
import com.xiniunet.framework.log.Log;
import com.xiniunet.framework.log.LogUtil;
import com.xiniunet.framework.security.Passport;
import com.xiniunet.framework.util.DateUtil;
import com.xiniunet.framework.util.TypeTransferUtil;
import com.xiniunet.framework.util.auth.ConfigToolObject;
import com.xiniunet.framework.util.file.FileUtil;
import com.xiniunet.framework.util.pdf.GeneratePdfRequest;
import com.xiniunet.framework.util.pdf.HtmlToPdf;
import com.xiniunet.master.request.system.UserDiskUpdateRequest;
import com.xiniunet.master.request.system.UserGetRequest;
import com.xiniunet.master.response.system.UserDiskUpdateResponse;
import com.xiniunet.master.response.system.UserGetResponse;
import com.xiniunet.master.service.MasterService;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class Foundation extends FoundationApi {

    @Autowired
    public DataService dataService;
    @Autowired
    public MasterService masterService;

    @ApiName("api.foundation.filepath.get")
    public FilePathGetResponse apiFoundationFilePathGet(JSONObject jsonObject, Passport passport) {
        FilePathGetRequest filePathGetRequest = JSON.toJavaObject(jsonObject, FilePathGetRequest.class);
        FilePathGetResponse response =  foundationService.getFilePath(filePathGetRequest, passport);
        if(StringUtils.isEmpty(response.getUrl()))
        {
            response.setUrl(new ConfigToolObject().getOssUrl("common/logo_default_big.png"));
        }
        return response;
    }

    @ApiName("api.foundation.file.create")
    public BaseResponse apiFoundationFileCreate(JSONObject jsonObject, Passport passport,String jsonParam) {
        FileCreateRequest fileCreateRequest = new FileCreateRequest();
        if (jsonObject!=null) {
            fileCreateRequest = JSON.toJavaObject(jsonObject, FileCreateRequest.class);
        }
        if (jsonParam!=null){
            JSONObject obj = (JSONObject) JSONObject.parse(jsonParam);
            fileCreateRequest = JSON.toJavaObject(obj, FileCreateRequest.class);
        }
        return foundationService.createFile(fileCreateRequest,passport);
    }

    @ApiName("api.foundation.disk.apply")
    public DiskApplyResponse apiFoundationDiskApply(JSONObject jsonObject, Passport passport) {
        DiskApplyRequest diskApplyRequest = JSON.toJavaObject(jsonObject, DiskApplyRequest.class);
        DiskApplyResponse applyResponse = new DiskApplyResponse();

        UserGetRequest userGetRequest = new UserGetRequest();
        userGetRequest.setId(passport.getUserId());
        UserGetResponse userGetResponse = masterService.getUser(userGetRequest, passport);
        if(userGetResponse.getUser() != null) {
            if(userGetResponse.getUser().getDiskId() != null) {
                applyResponse.addError(ErrorType.BUSINESS_ERROR, "您的网盘已经开通");
                return applyResponse;
            }
        }
        applyResponse = foundationService.applyDisk(diskApplyRequest, passport);
        if(applyResponse.hasError()) {
            return applyResponse;
        }

        // 关联用户与磁盘
        UserDiskUpdateRequest diskUpdateRequest = new UserDiskUpdateRequest();
        diskUpdateRequest.setUserId(passport.getUserId());
        diskUpdateRequest.setDiskId(applyResponse.getId());
        diskUpdateRequest.setRowVersion(userGetResponse.getUser().getRowVersion());
        UserDiskUpdateResponse userDiskUpdateResponse = masterService.updateUserDisk(diskUpdateRequest, passport);
        return applyResponse;
    }

    @ApiName("api.foundation.attachment.uploadbyfileid")
    public BaseResponse apiFoundationAttachmentUploadByFileId(JSONObject jsonObject, Passport passport) {
        AttachmentUploadByFileIdRequest attachmentUploadByFileIdRequest = JSON.toJavaObject(jsonObject, AttachmentUploadByFileIdRequest.class);
        return foundationService.uploadAttachmentByFileId(attachmentUploadByFileIdRequest, passport);
    }

    @ApiName("api.foundation.areas.getbypid")
    public AreasGetByPidResponse apiFoundationAreasGetByPid(JSONObject jsonObject) {
        AreasGetByPidRequest areasGetByPidRequest = JSON.toJavaObject(jsonObject, AreasGetByPidRequest.class);

        return dataService.getAreaListByPid(areasGetByPidRequest);
    }

    @ApiName("api.foundation.location.get")
    public LocationGetResponse apiFoundationLocationGet(JSONObject jsonObject, Passport passport) {
        LocationGetRequest locationGetRequest = JSON.toJavaObject(jsonObject, LocationGetRequest.class);
        return foundationService.getLocation(locationGetRequest, passport);
    }

    @ApiName("api.foundation.location.create")
    public LocationCreateResponse apiFoundationLocationCreate(JSONObject jsonObject, Passport passport) {
        LocationCreateRequest locationCreateRequest = JSON.toJavaObject(jsonObject, LocationCreateRequest.class);
        return foundationService.createLocation(locationCreateRequest, passport);
    }

    @ApiName("api.foundation.location.update")
    public LocationUpdateResponse apiFoundationLocationUpdate(JSONObject jsonObject, Passport passport) {
        LocationUpdateRequest locationUpdateRequest = JSON.toJavaObject(jsonObject, LocationUpdateRequest.class);
        return foundationService.updateLocation(locationUpdateRequest, passport);
    }

    @ApiName("api.foundation.press.getlist")
    public PressGetListResponse apiFoundationPressGetList() {
        PressGetListRequest pressGetListRequest = new PressGetListRequest();
        return dataService.getPressList(pressGetListRequest);
    }

    @ApiName("api.foundation.press.search")
    public PressSearchResponse apiFoundationPressSearch(JSONObject jsonObject) {
        PressSearchRequest pressSearchRequest = JSON.toJavaObject(jsonObject, PressSearchRequest.class);
        return dataService.searchPress(pressSearchRequest);
    }

    @ApiName("api.foundation.attachment.getlist.bybizinfo")
    public AttachmentGetByBizInfoResponse apiFoundationAttachmentGetListByBizInfo(JSONObject jsonObject, Passport passport) {
        AttachmentGetByBizInfoRequest attachmentGetByBizInfoRequest = JSON.toJavaObject(jsonObject, AttachmentGetByBizInfoRequest.class);
        return foundationService.getAttachmentsByBizInfo(attachmentGetByBizInfoRequest, passport);
    }

    @ApiName("api.foundation.attachment.delete")
    public AttachmentDeleteResponse apiFoundationAttachmentDelete(JSONObject jsonObject, Passport passport) {
        AttachmentDeleteRequest attachmentDeleteRequest = JSON.toJavaObject(jsonObject, AttachmentDeleteRequest.class);
        return foundationService.deleteAttachment(attachmentDeleteRequest, passport);
    }

    @ApiName("api.foundation.bank.getalllist")
    public BankGetListResponse apiFoundationBankGetAllList() {
        return dataService.getBankList(new BankGetListRequest());
    }

    @ApiName("api.foundation.nation.getalllist")
    public NationGetListResponse apiFoundationNationGetAllList() {
        return dataService.getNationList(new NationGetListRequest());
    }

    @ApiName("api.foundation.businessnature.find")
    public BusinessNatureFindResponse apiFoundationBusinessNatureFind(JSONObject jsonObject) {
        BusinessNatureFindRequest businessNatureFindRequest = JSON.toJavaObject(jsonObject, BusinessNatureFindRequest.class);
        return dataService.findBusinessNature(businessNatureFindRequest);
    }

    @ApiName("api.foundation.businesstrade.find")
    public BusinessTradeFindResponse apiFoundationBusinessTradeFind(JSONObject jsonObject) {
        BusinessTradeFindRequest businessTradeFindRequest = JSON.toJavaObject(jsonObject, BusinessTradeFindRequest.class);
        return dataService.findBusinessTrade(businessTradeFindRequest);
    }

    @ApiName("api.foundation.bank.get")
    public BankGetResponse apiFoundationBankGet(JSONObject jsonObject){
        BankGetRequest bankGetRequest = JSON.toJavaObject(jsonObject,BankGetRequest.class);
        return dataService.getBank(bankGetRequest);
    }

    @ApiName("api.foundation.bank.find")
    public BankFindResponse apiFoundationBankFind(JSONObject jsonObject, Passport passport) {
        BankFindRequest request = JSON.toJavaObject(jsonObject,BankFindRequest.class);
        return dataService.findBank(request);
    }

    @ApiName("api.foundation.bank.update")
    public BankUpdateResponse apiFoundationBankUpdate(JSONObject jsonObject, Passport passport) {
        BankUpdateRequest request = JSON.toJavaObject(jsonObject,BankUpdateRequest.class);
        return dataService.updateBank(request, passport);
    }

    @ApiName("api.foundation.bank.delete")
    public BankDeleteResponse apiFoundationBankDelete(JSONObject jsonObject, Passport passport) {
        BankDeleteRequest request = JSON.toJavaObject(jsonObject,BankDeleteRequest.class);
        return dataService.deleteBank(request, passport);
    }

    @ApiName("api.foundation.bank.create")
    public BankCreateResponse apiFoundationBankCreate(JSONObject jsonObject, Passport passport) {
        BankCreateRequest request = JSON.toJavaObject(jsonObject,BankCreateRequest.class);
        return dataService.createBank(request, passport);
    }

    @ApiName("api.foundation.pdf.export")
    public BaseURLResponse apiFoundationPdfExport(JSONObject jsonObject, Passport passport) {
        PdfExportRequest exportRequest = JSON.toJavaObject(jsonObject, PdfExportRequest.class);
        BaseURLResponse urlResponse = new BaseURLResponse();
        if(exportRequest == null) {
            urlResponse.addError(ErrorType.INVALID_PARAMETER, "输入参数为空!");
            return urlResponse;
        }

        String commandUrl = new ConfigToolObject().getPdfCommandLocation();
        String passportCookieName = new ConfigToolObject().getPassportCookieName();
        Long passportId = passport.getId();
        String url = exportRequest.getUrl();
        if(exportRequest.getFileName() == null) {
            exportRequest.setFileName("");
        }
        String fileName = exportRequest.getFileName() + DateUtil.formatDate("-yyyy-MM-dd-HH-mm-ss") + ".pdf";
        String filePath = "/" + fileName;
        try {
            GeneratePdfRequest pdfRequest = new GeneratePdfRequest(commandUrl, passportCookieName, passportId.toString(), url, filePath, exportRequest.getLayout());
            if(exportRequest.getPrintMedia()  != null) {
                pdfRequest.setPrintMedia(exportRequest.getPrintMedia());
            }
            if(exportRequest.getPrintFooter() != null) {
                pdfRequest.setPrintFooter(exportRequest.getPrintFooter());
            }
            HtmlToPdf.go(pdfRequest);
        } catch (IOException | InterruptedException e) {
            LogUtil.writeLog(new Log("debug", "web", "", e.getMessage(), passport));
            urlResponse.addError(ErrorType.SYSTEM_ERROR, e.getMessage());
            return urlResponse;
        }

        UserGetRequest userGetRequest = new UserGetRequest(passport.getUserId());
        UserGetResponse userGetResponse = masterService.getUser(userGetRequest, passport);

        // 获取文件内容，并删除文件
        byte[] bytes;
        try {
            filePath = "/tmp" + filePath;
            bytes = FileUtil.getBytes(filePath);
            FileUtil.deleteFile(filePath);
        } catch (IOException e) {
            LogUtil.writeLog(new Log("debug", "web", "", e.getMessage(), passport));
            urlResponse.addError(ErrorType.SYSTEM_ERROR, e.getMessage());
            return urlResponse;
        }

        FolderFileCreateByPathRequest createRequest = new FolderFileCreateByPathRequest();
        createRequest.setDiskId(userGetResponse.getUser().getDiskId());
        createRequest.setFileName(fileName);
        createRequest.setFileExt("pdf");
        if(exportRequest.getType() != null && exportRequest.getType().length() > 0) {
            createRequest.setPath("导出文件/" + exportRequest.getType());
        } else {
            createRequest.setPath("导出文件");
        }
        createRequest.setFileStream(bytes);

        FolderFileCreateByPathResponse createResponse = foundationService.createFolderFileByPath(createRequest, passport);
        urlResponse.addErrors(createResponse.getErrors());
        urlResponse.setUrl(createResponse.getUrl());
        return urlResponse;
    }

    @ApiName("api.foundation.food.category.get")
    public FoodCategoryGetResponse apiFoundationFoodCategoryGet(JSONObject jsonObject,Passport passport ){
        FoodCategoryGetRequest foodCategoryGetRequest = JSON.toJavaObject(jsonObject,FoodCategoryGetRequest.class);
        return dataService.getFoodCategory(foodCategoryGetRequest, passport);
    }

    @ApiName("api.foundation.food.category.find")
    public FoodCategoryFindResponse apiFoundationFoodCategoryFind(JSONObject jsonObject,Passport passport){
        FoodCategoryFindRequest foodCategoryFindRequest = JSON.toJavaObject(jsonObject,FoodCategoryFindRequest.class);
        return dataService.findFoodCategory(foodCategoryFindRequest, passport);
    }

    @ApiName("api.foundation.food.category.search")
    public FoodCategorySearchResponse apiFoundationFoodCategorySearch(JSONObject jsonObject,Passport passport){
        FoodCategorySearchRequest foodCategorySearchRequest = JSON.toJavaObject(jsonObject,FoodCategorySearchRequest.class);
        return dataService.searchFoodCategory(foodCategorySearchRequest, passport);
    }

    @ApiName("api.foundation.clazz.find")
    public BaseResponse findClazz(JSONObject jsonObject, Passport passport) {
        ClazzFindRequest request = JSON.toJavaObject(jsonObject, ClazzFindRequest.class);
        request.setLanguage(LanguageEnum.ZH_CN);
        ClazzFindResponse clazzResponse = dataService.findClazz(request, passport);
        ClazzFindExResponse response = new ClazzFindExResponse();
        List<ClazzEx> result = new ArrayList();
        for (Clazz clazz : clazzResponse.getResult()) {
            ClazzEx transfer = new TypeTransferUtil<ClazzEx>().transfer(clazz, ClazzEx.class);
            ClassAttributeFindRequest classAttributeFindRequest = new ClassAttributeFindRequest();
            classAttributeFindRequest.setClassId(clazz.getId());
            ClassAttributeFindResponse classAttribute = dataService.findClassAttribute(classAttributeFindRequest, passport);
            transfer.setClassAttribute(classAttribute.getResult());
            result.add(transfer);
        }
        response.setTotalCount(clazzResponse.getTotalCount());
        response.setResult(result);
        return response;
    }

    @ApiName("api.foundation.clazz.get")
    public BaseResponse getClazz(JSONObject jsonObject, Passport passport) {
        ClazzGetRequest request = JSON.toJavaObject(jsonObject, ClazzGetRequest.class);
        request.setLanguage(LanguageEnum.ZH_CN);
        return dataService.getClazz(request, passport);
    }

    @ApiName("api.foundation.clazz.create")
    public BaseResponse createClazz(JSONObject jsonObject, Passport passport) {
        ClazzCreateRequest request = JSON.toJavaObject(jsonObject, ClazzCreateRequest.class);
        return dataService.createClazz(request, passport);
    }

    @ApiName("api.foundation.attribute.find")
    public BaseResponse findAttribute(JSONObject jsonObject, Passport passport) {
        AttributeFindRequest request = JSON.toJavaObject(jsonObject, AttributeFindRequest.class);
        request.setLanguage(LanguageEnum.ZH_CN);
        return dataService.findAttribute(request, passport);
    }

    @ApiName("api.foundation.clazz.delete")
    public ClazzDeleteResponse apiFoundationClazzDelete(JSONObject jsonObject, Passport passport) {
        ClazzDeleteRequest clazzDeleteRequest = JSON.toJavaObject(jsonObject, ClazzDeleteRequest.class);
        return dataService.deleteClazz(clazzDeleteRequest, passport);
    }

    @ApiName("api.foundation.clazz.update")
    public ClazzUpdateResponse apiFoundationClazzUpdate(JSONObject jsonObject, Passport passport) {
        ClazzUpdateRequest clazzUpdateRequest = JSON.toJavaObject(jsonObject, ClazzUpdateRequest.class);
        return dataService.updateClazz(clazzUpdateRequest, passport);
    }

    @ApiName("api.foundation.attribute.update")
    public BaseResponse apiFoundationAttributeUpdate(JSONObject jsonObject, Passport passport) {
        AttributeUpdateRequest attributeUpdateRequest = JSON.toJavaObject(jsonObject, AttributeUpdateRequest.class);
        return dataService.updateAttribute(attributeUpdateRequest, passport);
    }

    @ApiName("api.foundation.attribute.delete")
    public BaseResponse apiFoundationAttributeDelete(JSONObject jsonObject, Passport passport) {
        AttributeDeleteRequest attributeDeleteRequest = JSON.toJavaObject(jsonObject, AttributeDeleteRequest.class);
        return dataService.deleteAttribute(attributeDeleteRequest, passport);
    }

    @ApiName("api.foundation.attribute.create")
    public BaseResponse apiFoundationAttributeCreate(JSONObject jsonObject, Passport passport) {
        AttributeCreateRequest attributeCreateRequest = JSON.toJavaObject(jsonObject, AttributeCreateRequest.class);
        return dataService.createAttribute(attributeCreateRequest, passport);
    }

    @ApiName("api.foundation.attributevalue.batch")
    public BaseResponse apiFoundationAttributeValueBatch(JSONObject jsonObject, Passport passport) {
        AttributeValueUpdateBatchRequest attributeValueBatchRequest = JSON.toJavaObject(jsonObject, AttributeValueUpdateBatchRequest.class);
        return dataService.updateBatchAttributeValue(attributeValueBatchRequest, passport);
    }

    @ApiName("api.foundation.class.attribute.find")
    public ClassAttributeFindResponse apiFoundationClassAttributeFind(JSONObject jsonObject, Passport passport) {
        ClassAttributeFindRequest classAttributeFindRequest = JSON.toJavaObject(jsonObject, ClassAttributeFindRequest.class);
        return dataService.findClassAttribute(classAttributeFindRequest, passport);
    }

    @ApiName("api.foundation.class.attribute.common.update")
    public BaseResponse apiFoundationClassAttributeCommonUpdate(JSONObject jsonObject, Passport passport) {
        ClassAttributeSpecialUpdateRequest classAttributeSpecialUpdateRequest = JSON.toJavaObject(jsonObject, ClassAttributeSpecialUpdateRequest.class);
        return dataService.updateClassAttributeCommon(classAttributeSpecialUpdateRequest, passport);
    }

    @ApiName("api.foundation.attribute.value.find")
    public AttributeValueFindResponse apiFoundationAttributeValueFind(JSONObject jsonObject, Passport passport) {
        AttributeValueFindRequest attributeValueFindRequest = JSON.toJavaObject(jsonObject, AttributeValueFindRequest.class);
        return dataService.findAttributeValue(attributeValueFindRequest, passport);
    }

    @ApiName("api.foundation.class.attribute.videourl.update")
    public BaseResponse apiFoundationClassAttributeVideoUrlUpdate(JSONObject jsonObject, Passport passport) {
        ClassAttributeVideoUrlUpdateRequest request = JSON.toJavaObject(jsonObject, ClassAttributeVideoUrlUpdateRequest.class);
        return dataService.updateClassAttributeVideoUrl(request, passport);
    }

    @ApiName("api.foundation.attribute.info.find")
    public AttributeInfoFindResponse apiFoundationAttributeInfoFind(JSONObject jsonObject, Passport passport) {
        AttributeInfoFindRequest attributeInfoFindRequest = JSON.toJavaObject(jsonObject, AttributeInfoFindRequest.class);
        return dataService.findAttributeInfo(attributeInfoFindRequest, passport);
    }

    @ApiName("api.foundation.press.create")
    public PressCreateResponse apiFoundationPressCreate(JSONObject jsonObject, Passport passport) {
        PressCreateRequest request = JSON.toJavaObject(jsonObject, PressCreateRequest.class);
        return dataService.createPress(request, passport);
    }
    @ApiName("api.foundation.press.update")
    public PressUpdateResponse apiFoundationPressUpdate(JSONObject jsonObject, Passport passport) {
        PressUpdateRequest request = JSON.toJavaObject(jsonObject, PressUpdateRequest.class);
        return dataService.updatePress(request, passport);
    }
    @ApiName("api.foundation.press.delete")
    public PressDeleteResponse apiFoundationPressDelete(JSONObject jsonObject, Passport passport) {
        PressDeleteRequest request = JSON.toJavaObject(jsonObject, PressDeleteRequest.class);
        return dataService.deletePress(request, passport);
    }
    @ApiName("api.foundation.press.get")
    public PressGetResponse apiFoundationPressGet(JSONObject jsonObject) {
        PressGetRequest request = JSON.toJavaObject(jsonObject, PressGetRequest.class);
        return dataService.getPress(request);
    }

    //地址相关
    @ApiName("api.foundation.country.create")
    public CountryCreateResponse apiFoundationCountryCreate(JSONObject jsonObject,Passport passport) {
        CountryCreateRequest request = JSON.toJavaObject(jsonObject, CountryCreateRequest.class);
        return dataService.createCountry(request, passport);
    }
    @ApiName("api.foundation.country.search")
    public CountrySearchResponse apiFoundationCountrySearch(JSONObject jsonObject) {
        CountrySearchRequest request = JSON.toJavaObject(jsonObject, CountrySearchRequest.class);
        return dataService.searchCountry(request);
    }
    @ApiName("api.foundation.country.update")
    public CountryUpdateResponse apiFoundationCountryUpdate(JSONObject jsonObject,Passport passport) {
        CountryUpdateRequest request = JSON.toJavaObject(jsonObject, CountryUpdateRequest.class);
        return dataService.updateCountry(request, passport);
    }
    @ApiName("api.foundation.country.get")
    public CountryGetResponse apiFoundationCountryGet(JSONObject jsonObject,Passport passport) {
        CountryGetRequest request = JSON.toJavaObject(jsonObject, CountryGetRequest.class);
        return dataService.getCountry(request);
    }

    @ApiName("api.foundation.province.create")
    public ProvinceCreateResponse apiFoundationProvinceCreate(JSONObject jsonObject,Passport passport) {
        ProvinceCreateRequest request = JSON.toJavaObject(jsonObject, ProvinceCreateRequest.class);
        return dataService.createProvince(request, passport);
    }
    @ApiName("api.foundation.province.search")
    public ProvinceSearchResponse apiFoundationProvinceSearch(JSONObject jsonObject,Passport passport) {
        ProvinceSearchRequest request = JSON.toJavaObject(jsonObject, ProvinceSearchRequest.class);
        return dataService.searchProvince(request);
    }
    @ApiName("api.foundation.province.update")
    public ProvinceUpdateResponse apiFoundationProvinceUpdate(JSONObject jsonObject,Passport passport) {
        ProvinceUpdateRequest request = JSON.toJavaObject(jsonObject, ProvinceUpdateRequest.class);
        return dataService.updateProvince(request, passport);
    }
    @ApiName("api.foundation.province.get")
    public ProvinceGetResponse apiFoundationProvinceGet(JSONObject jsonObject,Passport passport) {
        ProvinceGetRequest request = JSON.toJavaObject(jsonObject, ProvinceGetRequest.class);
        return dataService.getProvince(request);
    }

    @ApiName("api.foundation.city.create")
    public CityCreateResponse apiFoundationCityCreate(JSONObject jsonObject,Passport passport) {
        CityCreateRequest request = JSON.toJavaObject(jsonObject, CityCreateRequest.class);
        return dataService.createCity(request, passport);
    }
    @ApiName("api.foundation.city.search")
    public CitySearchResponse apiFoundationCitySearch(JSONObject jsonObject,Passport passport) {
        CitySearchRequest request = JSON.toJavaObject(jsonObject, CitySearchRequest.class);
        return dataService.searchCity(request);
    }
    @ApiName("api.foundation.city.update")
    public CityUpdateResponse apiFoundationCityUpdate(JSONObject jsonObject,Passport passport) {
        CityUpdateRequest request = JSON.toJavaObject(jsonObject, CityUpdateRequest.class);
        return dataService.updateCity(request, passport);
    }
    @ApiName("api.foundation.city.get")
    public CityGetResponse apiFoundationCityGet(JSONObject jsonObject,Passport passport) {
        CityGetRequest request = JSON.toJavaObject(jsonObject, CityGetRequest.class);
        return dataService.getCity(request);
    }

    @ApiName("api.foundation.district.create")
    public DistrictCreateResponse apiFoundationDistrictCreate(JSONObject jsonObject,Passport passport) {
        DistrictCreateRequest request = JSON.toJavaObject(jsonObject, DistrictCreateRequest.class);
        return dataService.createDistrict(request, passport);
    }
    @ApiName("api.foundation.district.search")
    public DistrictSearchResponse apiFoundationDistrictSearch(JSONObject jsonObject,Passport passport) {
        DistrictSearchRequest request = JSON.toJavaObject(jsonObject, DistrictSearchRequest.class);
        return dataService.searchDistrict(request);
    }
    @ApiName("api.foundation.district.update")
    public DistrictUpdateResponse apiFoundationDistrictUpdate(JSONObject jsonObject,Passport passport) {
        DistrictUpdateRequest request = JSON.toJavaObject(jsonObject, DistrictUpdateRequest.class);
        return dataService.updateDistrict(request, passport);
    }
    @ApiName("api.foundation.district.get")
    public DistrictGetResponse apiFoundationDistrictGet(JSONObject jsonObject,Passport passport) {
        DistrictGetRequest request = JSON.toJavaObject(jsonObject, DistrictGetRequest.class);
        return dataService.getDistrict(request);
    }

    @ApiName("api.foundation.town.create")
    public TownCreateResponse apiFoundationTownCreate(JSONObject jsonObject,Passport passport) {
        TownCreateRequest request = JSON.toJavaObject(jsonObject, TownCreateRequest.class);
        return dataService.createTown(request, passport);
    }
    @ApiName("api.foundation.town.search")
    public TownSearchResponse apiFoundationTownSearch(JSONObject jsonObject,Passport passport) {
        TownSearchRequest request = JSON.toJavaObject(jsonObject, TownSearchRequest.class);
        return dataService.searchTown(request);
    }
    @ApiName("api.foundation.town.update")
    public TownUpdateResponse apiFoundationTownUpdate(JSONObject jsonObject,Passport passport) {
        TownUpdateRequest request = JSON.toJavaObject(jsonObject, TownUpdateRequest.class);
        return dataService.updateTown(request, passport);
    }
    @ApiName("api.foundation.town.get")
    public TownGetResponse apiFoundationTownGet(JSONObject jsonObject,Passport passport) {
        TownGetRequest request = JSON.toJavaObject(jsonObject, TownGetRequest.class);
        return dataService.getTown(request);
    }

}
