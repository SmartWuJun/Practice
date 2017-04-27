package com.xiniunet.tutorial.home.hr.response;

import com.xiniunet.foundation.domain.Location;
import com.xiniunet.framework.base.BaseResponse;

/**
 * Created on 2014/9/18.
 *
 * @author 吕浩
 * @version v1.0.0.0
 */
public class LocationVO extends BaseResponse {
	/**
	 * 完整的地址信息
	 */
	private Location fullLocation;

	/**
	 * 完整的地址信息
	 */
	private String locationPath;

	/**
	 * 页面要管理的位置功能信息
	 */
	private com.xiniunet.master.domain.humanresource.Location location;

	public String getLocationPath() {
		return locationPath;
	}

	public void setLocationPath(String locationPath) {
		this.locationPath = locationPath;
	}

	public Location getFullLocation() {
		return fullLocation;
	}

	public void setFullLocation(Location location) {
		this.fullLocation = location;
	}

	public com.xiniunet.master.domain.humanresource.Location getLocation() {
		return location;
	}

	public void setLocation(com.xiniunet.master.domain.humanresource.Location location) {
		this.location = location;
	}
}
