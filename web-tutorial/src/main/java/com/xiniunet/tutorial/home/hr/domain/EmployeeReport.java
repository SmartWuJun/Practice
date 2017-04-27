package com.xiniunet.tutorial.home.hr.domain;


/**
 * Created by DEV001 on 2014/9/2.
 */
public class EmployeeReport {

    /**
     * 姓名,
     */
    private  String   name;

    /**
     * 工号,
     */
    private  String   employeeNumber;

    /**
     * 年龄
     */
    private Integer age;

    /**
     * 司龄
     */
    private Double workAge;

    /**
     * 性别,
     */
    private  String   sex;

    /**
     * 岗位名称,
     */
    private String positionName;

    /**
     * 主管姓名,
     */
    private String managerName;

    /**
     * 备注说明,
     */
    private  String   remark;

    /**
     * 是否有效,方便对员工做状态管理
     */
    private  Boolean   isActive;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmployeeNumber() {
        return employeeNumber;
    }

    public void setEmployeeNumber(String employeeNumber) {
        this.employeeNumber = employeeNumber;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public Double getWorkAge() {
        return workAge;
    }

    public void setWorkAge(Double workAge) {
        this.workAge = workAge;
    }

    public String getPositionName() {
        return positionName;
    }

    public void setPositionName(String positionName) {
        this.positionName = positionName;
    }

    public String getManagerName() {
        return managerName;
    }

    public void setManagerName(String managerName) {
        this.managerName = managerName;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }
}
