package com.xiniunet.tutorial.home.hr.request;

import com.xiniunet.foundation.request.LocationUpdateRequest;
import com.xiniunet.framework.base.BaseRequest;

/**
 * Created on 2014/9/23.
 *
 * @author 吕浩
 * @version v1.0.0.0
 */
public class LocationUpdateRequestVO extends BaseRequest {
	/**
	 * ID,
	 */
	private  Long   id;

	/**
	 * 地址简称,
	 */
	private  String   name;

	/**
	 * 是否有效,
	 */
	private  Boolean   isActive;

	/**
	 * 是否可以发货,
	 */
	private  Boolean   isShipping;

	/**
	 * 是否可以收货,
	 */
	private  Boolean   isReceiving;

	/**
	 * 位置对象
	 */
	private LocationUpdateRequest location;

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

	public LocationUpdateRequest getLocation() {
		return location;
	}

	public void setLocation(LocationUpdateRequest location) {
		this.location = location;
	}
}
