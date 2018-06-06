package com.xiniunet.tutorial.tutorial.module.screen.video;

import com.alibaba.citrus.turbine.Context;
import com.alibaba.citrus.turbine.dataresolver.Param;
import com.alibaba.fastjson.JSON;
import com.xiniunet.framework.security.Passport;
import com.xiniunet.framework.util.auth.LocalData;
import com.xiniunet.tutorial.request.VideoPlayAuthGetRequest;
import com.xiniunet.tutorial.response.VideoPlayAuthGetResponse;
import com.xiniunet.tutorial.service.TutorialService;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * Created on 2017-04-25.
 *
 * @author 吕浩
 * @since 1.0.0
 */
public class Play {
    @Autowired
    private TutorialService tutorialService;

    public void execute(Context context, @Param("id")Long videoId, @Param("playId")Long playId) {
        Passport passport = LocalData.getCurrentPassport();

        VideoPlayAuthGetRequest request = new VideoPlayAuthGetRequest();
        request.setVideoId(videoId);
        request.setPlayId(playId);
        VideoPlayAuthGetResponse response = tutorialService.getVideoPlayAuth(request, passport);

        context.put("title", response.getTitle());
        context.put("region", response.getRegion());
        context.put("vid", response.getVid());
        context.put("acId", response.getAccessKeyId());
        context.put("acKey", response.getAccessKeySecret());
        context.put("stsToken", response.getSecurityToken());
        context.put("authInfo", JSON.toJSONString(response.getAuthInfo()));
        context.put("source", response.getVideoUrl());
    }
}
