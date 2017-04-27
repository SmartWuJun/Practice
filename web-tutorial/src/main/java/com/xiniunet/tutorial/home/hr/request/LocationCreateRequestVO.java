package com.xiniunet.tutorial.home.hr.request;

import com.xiniunet.foundation.request.LocationCreateRequest;
import com.xiniunet.framework.base.BaseRequest;

/**
 * Created on 2014/9/23.
 *
 * @author 吕浩
 * @version v1.0.0.0
 */
public class LocationCreateRequestVO extends BaseRequest {
	/**
	 * 主键,
	 */
	private  Long   id;

	/**
	 * 地址简称,
	 */
	private  String   name;

	/**
	 * 是否有效,
	 */
	private  Boolean   isActive = false;

	/**
	 * 是否可以发货,
	 */
	private  Boolean   isShipping = false;

	/**
	 * 是否可以收货,
	 */
	private  Boolean   isReceiving = false;

	/**
	 * 位置信息
	 */
	private LocationCreateRequest location;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Boolean getIsActive() {
		return isActive;
	}

	public void setIsActive(Boolean isActive) {
		this.isActive = isActive;
	}

	public Boolean getIsShipping() {
		return isShipping;
	}

	public void setIsShipping(Boolean isShipping) {
		this.isShipping = isShipping;
	}

	public Boolean getIsReceiving() {
		return isReceiving;
	}

	public void setIsReceiving(Boolean isReceiving) {
		this.isReceiving = isReceiving;
	}

	public LocationCreateRequest getLocation() {
		return location;
	}

	public void setLocation(LocationCreateRequest location) {
		this.location = location;
	}
}
