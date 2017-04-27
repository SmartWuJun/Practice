package com.xiniunet.tutorial.home.foundation.request;

import com.xiniunet.framework.base.BaseRequest;
import com.xiniunet.framework.util.pdf.Layout;

/**
 *
 * Created on 2015/1/15.
 * @author 吕浩
 * @version 2.0.0
 */
public class PdfExportRequest extends BaseRequest {
    /**
     * 要导出页面
     */
    private String url;

    /**
     * 文件的类型
     */
    private String type;

    /**
     * 要生成的文件的名称
     */
    private String fileName;

    /**
     * 是否需要旋转
     */
    private Layout layout;

    /**
     * 打印媒体
     */
    private Boolean printMedia;

    /**
     * 打印脚注
     */
    private Boolean printFooter;

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public Layout getLayout() {
        return layout;
    }

    public void setLayout(Layout layout) {
        this.layout = layout;
    }

    public Boolean getPrintMedia() {
        return printMedia;
    }

    public void setPrintMedia(Boolean printMedia) {
        this.printMedia = printMedia;
    }

    public Boolean getPrintFooter() {
        return printFooter;
    }

    public void setPrintFooter(Boolean printFooter) {
        this.printFooter = printFooter;
    }
}
