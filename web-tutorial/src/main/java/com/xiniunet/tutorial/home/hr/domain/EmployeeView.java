package com.xiniunet.tutorial.home.hr.domain;


import com.xiniunet.master.domain.humanresource.EmployeeDetail;

/**
 * Created by DEV003 on 2014/10/13.
 */
public class EmployeeView extends EmployeeDetail {


    /**
     * 图片url
     */
    private String photoUrl;

    /**
     * 职位
     */
    private String jobName;

    /**
     * 级别名称
     */
    private  String   levelName;

    /**
     * 工作地点名称
     */
    private  String  workLocationName;
    /**
     * 组织名称
     */
    private  String organizationName;

    /**
     * 上级主管名
     */
    private String managerName;

    /**
     * 上级岗位职位名称
     */
    private String managerJobName;

    /**
     * 上级岗位组织名称
     */
    private String managerOrgName;

    /**
     * 银行名称
     */
    private  String  bankName;

    /**
     * 开户行
     */
    private  String   branchName;

    /**
     * 开户名
     */
    private  String   accountName;

    /**
     * 银行账号
     */
    private  String   accountNumber;

    /**
     * 银行城市名称
     */
    private  String   bankCityName;

    /**
     * 签约实体名称
     */
    private String legalEntityName;

    /**
     * 籍贯国家
     */
    private String countryName;

    /**
     * 籍贯省份
     */
    private String provinceName;

    /**
     * 籍贯城市
     */
    private String cityName;


    /**
     * 居住国家
     */
    private  String   residenceCountryName;

    /**
     * 居住省份
     */
    private  String   residenceProvinceName;

    /**
     * 居住城市
     */
    private  String   residenceCityName;

    /**
     * 居住区县
     */
    private  String   residenceDistrictName;

    /**
     * 居住具体地址
     */
    private  String   residenceAddress;

    /**
     * 居住邮编
     */
    private  String   residencePostCode;

    /**
     * 民族名称
     */
    private String nationName;

    /**
     * 员工帐号
     */
    private String userAccount;


    public String getPhotoUrl() {
        return photoUrl;
    }

    public void setPhotoUrl(String photoUrl) {
        this.photoUrl = photoUrl;
    }

    public String getJobName() {
        return jobName;
    }

    public void setJobName(String jobName) {
        this.jobName = jobName;
    }

    public String getLevelName() {
        return levelName;
    }

    public void setLevelName(String levelName) {
        this.levelName = levelName;
    }

    public String getWorkLocationName() {
        return workLocationName;
    }

    public void setWorkLocationName(String workLocationName) {
        this.workLocationName = workLocationName;
    }

    public String getOrganizationName() {
        return organizationName;
    }

    public void setOrganizationName(String organizationName) {
        this.organizationName = organizationName;
    }

    public String getManagerName() {
        return managerName;
    }

    public void setManagerName(String managerName) {
        this.managerName = managerName;
    }

    public String getManagerJobName() {
        return managerJobName;
    }

    public void setManagerJobName(String managerJobName) {
        this.managerJobName = managerJobName;
    }

    public String getManagerOrgName() {
        return managerOrgName;
    }

    public void setManagerOrgName(String managerOrgName) {
        this.managerOrgName = managerOrgName;
    }

    public String getBankName() {
        return bankName;
    }

    public void setBankName(String bankName) {
        this.bankName = bankName;
    }

    public String getBranchName() {
        return branchName;
    }

    public void setBranchName(String branchName) {
        this.branchName = branchName;
    }

    public String getAccountName() {
        return accountName;
    }

    public void setAccountName(String accountName) {
        this.accountName = accountName;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }

    public String getBankCityName() {
        return bankCityName;
    }

    public void setBankCityName(String bankCityName) {
        this.bankCityName = bankCityName;
    }

    public String getLegalEntityName() {
        return legalEntityName;
    }

    public void setLegalEntityName(String legalEntityName) {
        this.legalEntityName = legalEntityName;
    }

    public String getResidenceCountryName() {
        return residenceCountryName;
    }

    public void setResidenceCountryName(String residenceCountryName) {
        this.residenceCountryName = residenceCountryName;
    }

    public String getResidenceProvinceName() {
        return residenceProvinceName;
    }

    public void setResidenceProvinceName(String residenceProvinceName) {
        this.residenceProvinceName = residenceProvinceName;
    }

    public String getResidenceCityName() {
        return residenceCityName;
    }

    public void setResidenceCityName(String residenceCityName) {
        this.residenceCityName = residenceCityName;
    }

    public String getResidenceDistrictName() {
        return residenceDistrictName;
    }

    public void setResidenceDistrictName(String residenceDistrictName) {
        this.residenceDistrictName = residenceDistrictName;
    }

    public String getResidenceAddress() {
        return residenceAddress;
    }

    public void setResidenceAddress(String residenceAddress) {
        this.residenceAddress = residenceAddress;
    }

    public String getCountryName() {
        return countryName;
    }

    public void setCountryName(String countryName) {
        this.countryName = countryName;
    }

    public String getProvinceName() {
        return provinceName;
    }

    public void setProvinceName(String provinceName) {
        this.provinceName = provinceName;
    }

    public String getCityName() {
        return cityName;
    }

    public void setCityName(String cityName) {
        this.cityName = cityName;
    }

    public String getNationName() {
        return nationName;
    }


    public String getResidencePostCode() {
        return residencePostCode;
    }

    public void setResidencePostCode(String residencePostCode) {
        this.residencePostCode = residencePostCode;
    }

    public void setNationName(String nationName) {
        this.nationName = nationName;
    }

    public String getUserAccount() {
        return userAccount;
    }

    public void setUserAccount(String userAccount) {
        this.userAccount = userAccount;
    }
}
