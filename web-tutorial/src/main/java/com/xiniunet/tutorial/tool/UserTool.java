
/*
 * Copyright (c) 2002-2012 Alibaba Group Holding Limited.
 * All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.xiniunet.tutorial.tool;

import com.alibaba.citrus.service.pull.ToolFactory;


/*
应用工具类
 */
public class UserTool implements ToolFactory {
	/**
	 * Factory所创建的tool是不是singleton？
	 */
	@Override
	public boolean isSingleton() {
		return true;
	}

	/**
	 * 取得tool实例。
	 * <p>
	 * 对于非singleton类型，该方法在每次请求时，至多被调用一次。
	 * </p>
	 * <p>
	 * 如返回<code>null</code>，则表示该tool不可用。
	 * </p>
	 * <p>
	 * 注意：对于非singleton类型，<strong>必须</strong>每次返回不同的对象。
	 * </p>
	 */
	@Override
	public Object createTool() throws Exception {
		return new UserToolObject();
	}
}