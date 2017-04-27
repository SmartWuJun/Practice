package com.xiniunet.tutorial.home.data.domain;


import com.xiniunet.data.domain.ClassAttribute;
import com.xiniunet.data.domain.Clazz;

import java.util.List;

/**
 * Created by wangbing on 16/1/26.
 */
public class ClazzEx extends Clazz {
    private List<ClassAttribute> classAttribute;

    public List<ClassAttribute> getClassAttribute() {
        return classAttribute;
    }

    public void setClassAttribute(List<ClassAttribute> classAttribute) {
        this.classAttribute = classAttribute;
    }
}
