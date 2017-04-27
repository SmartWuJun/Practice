package com.xiniunet.tutorial.util;

import com.xiniunet.framework.base.CacheKey;
import com.xiniunet.framework.cache.CacheManagerImpl;
import com.xiniunet.framework.constant.CacheTimeEnum;
import com.xiniunet.framework.util.SettingUtil;

import java.util.List;
import java.util.Map;

/**
 * Created by 范智凝 on 2014-10-24 13:00:30.
 *
 * @author 范智凝
 */
public class CacheUtil {

    private final static String DEPLOY_MODE = "deploy.mode";
    private final static String CACHE_HOST = "aliyun.ocs.host";
    private final static String CACHE_PORT = "aliyun.ocs.port";
    private final static String CACHE_USERNAME = "aliyun.ocs.username";
    private final static String CACHE_PASSWORD = "aliyun.ocs.password";
    private final static String MODULE_NAME = "auth";

    private final static String deployMode = SettingUtil.getProperty("", DEPLOY_MODE);
    private final static String cacheHost = SettingUtil.getProperty("", CACHE_HOST);
    private final static String cachePort = SettingUtil.getProperty("", CACHE_PORT);
    private final static String cacheUsername = SettingUtil.getProperty("", CACHE_USERNAME);
    private final static String cachePassword = SettingUtil.getProperty("", CACHE_PASSWORD);

    private final static CacheManagerImpl cacheManager = new CacheManagerImpl(cacheHost,cachePort,deployMode,cacheUsername,cachePassword);

    /**
     * 获取Key对应的value
     *
     * @param key 查找关键字
     */
    public static Object get(CacheKey key) {
        key.setModuleName(MODULE_NAME);
        return cacheManager.get(key);
    }

    /**
     * 获取Keys对应的values
     *
     * @param keys 查找关键字
     */
    public static Map<String, Object> getList(List<CacheKey> keys) {
        return cacheManager.getList(keys);
    }

    /**
     * 删除Key对应的内容
     *
     * @param key 查找关键字
     */
    public static boolean delete(CacheKey key) {
        key.setModuleName(MODULE_NAME);
        return cacheManager.delete(key);
    }

    /**
     * 设定key对应的value
     *
     * @param key        查找关键字
     * @param value      存储的数据块（可直接理解为key-value结构中的value）
     * @param expireTime 该数据的存活时间（分钟）
     */
    public static boolean set(CacheKey key, Object value, CacheTimeEnum expireTime) {
        key.setModuleName(MODULE_NAME);
        return cacheManager.set(key, value, expireTime);
    }

    /**
     * 设定缓存对象方法
     * @param name 缓存对象名称
     * @param tenantId 企业ID
     * @param key 缓存对象Key
     * @param value 缓存对象内容
     * @param expireTime 过期时间（枚举）
     * @return 设定缓存结果
     */
    public static boolean set(String name,Long tenantId, String key ,Object value, CacheTimeEnum expireTime){
        CacheKey cacheKey = new CacheKey();
        cacheKey.setModelName(name);
        cacheKey.setModelKey(key);
        cacheKey.setTenantId(tenantId);
        return set(cacheKey, value, expireTime);
    }

    /**
     * 设定缓存对象方法（无企业ID）
     * @param name 缓存对象名称
     * @param key 缓存对象Key
     * @param value 缓存对象内容
     * @param expireTime 过期时间（枚举）
     * @return 设定缓存结果
     */
    public static boolean set(String name, String key ,Object value, CacheTimeEnum expireTime){
        CacheKey cacheKey = new CacheKey();
        cacheKey.setModelName(name);
        cacheKey.setModelKey(key);
        return set(cacheKey,value,expireTime);
    }

    /**
     * 获取缓存对象方法
     * @param name 缓存对象名称
     * @param tenantId 企业ID
     * @param key 缓存对象Key
     * @return 缓存对象
     */
    public static Object get(String name,Long tenantId, String key){
        CacheKey cacheKey = new CacheKey();
        cacheKey.setModelName(name);
        cacheKey.setModelKey(key);
        cacheKey.setTenantId(tenantId);
        return get(cacheKey);
    }

    /**
     * 获取缓存对象方法（无企业ID）
     * @param name 缓存对象名称
     * @param key 缓存对象Key
     * @return 缓存对象
     */
    public static Object get(String name, String key){
        CacheKey cacheKey = new CacheKey();
        cacheKey.setModelName(name);
        cacheKey.setModelKey(key);
        return get(cacheKey);
    }

    /**
     * 删除缓存对象方法
     * @param name 缓存对象名称
     * @param tenantId 企业ID
     * @param key 缓存对象Key
     * @return 删除结果
     */
    public static boolean delete(String name,Long tenantId, String key){
        CacheKey cacheKey = new CacheKey();
        cacheKey.setModelName(name);
        cacheKey.setModelKey(key);
        cacheKey.setTenantId(tenantId);
        return delete(cacheKey);
    }

    /**
     * 删除缓存对象方法(无企业ID)
     * @param name 缓存对象名称
     * @param key 缓存对象Key
     * @return 删除结果
     */
    public static boolean delete(String name, String key){
        CacheKey cacheKey = new CacheKey();
        cacheKey.setModelName(name);
        cacheKey.setModelKey(key);
        return delete(cacheKey);
    }
}
