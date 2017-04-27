package com.xiniunet.tutorial.tool;


import org.apache.velocity.app.Velocity;

import java.util.Properties;

/**
 * Created by edward on 9/17/14.
 */
public class Constants {

    public static final String ERROR_MESSAGE_500 = "服务器走了下神，稍后再试一次";
    public static final String NOT_EXIST_METHOD = "调用的方法不存在";
    public static final String NOT_EXIST_DATA = "未找到数据,请确保数据存在于第一张Sheet表中";
    public static final String PLATFORM_NAME_SHORT="XXX";
    public static final String PLAFTFORM_NAME="XXX企业云平台";
    public static final String PLAFTFORM_DOMAIN="xxx.com";

    public static Properties getProperties() {
        Properties properties = new Properties();
        properties.setProperty("resource.loader", "class");
        properties.setProperty("class.resource.loader.class",
                "org.apache.velocity.runtime.resource.loader.ClasspathResourceLoader");
        properties.setProperty(Velocity.ENCODING_DEFAULT, "UTF-8");
        properties.setProperty(Velocity.INPUT_ENCODING, "UTF-8");
        properties.setProperty(Velocity.OUTPUT_ENCODING, "UTF-8");
        return properties;
    }
}
