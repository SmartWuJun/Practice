var appUI = {
    /**
     * 当前会话聊天面板UI
     */
    buildChatContentUI:function(id,cache){
    	var msgHtml = "",
    		msgs = cache.getMsgs(id);
    	if(msgs.length===0){
    		 msgHtml = '<div class="no-msg tc"><span class="radius5px">暂无消息</span></div>';
    	}else{
    		for (var i = 0, l = msgs.length; i < l; ++i) {
			 	var message = msgs[i],
					user = cache.getUserById(message.from);
				//消息时间显示
			 	if(i == 0){
                        msgHtml += this.makeTimeTag(transTime(message.time));
                }else{
                    if(message.time-msgs[i-1].time>5*60*1000){
                        msgHtml += this.makeTimeTag(transTime(message.time));
                    }
                }
                msgHtml += this.makeChatContent(message,user, cache);
            }
        }
        return msgHtml;
    },

    /**
     * 更新当前会话聊天面板UI
     */
    updateChatContentUI:function(msg,cache){
	 	var lastItem =$("#j-chatContent .item").last(),
        	msgHtml="",
        	user =cache.getUserById(msg.from);
        if(lastItem.length==0){
            msgHtml += this.makeTimeTag(transTime(msg.time));
        }else{
            if(msg.time-parseInt(lastItem.attr('data-time'))>5*60*1000){
                msgHtml += this.makeTimeTag(transTime(msg.time));
            }
        }
        msgHtml += this.makeChatContent(msg,user, cache);
        return msgHtml;
    },

    /**
     * 通用消息内容UI
     */
    makeChatContent:function(message,user, cache){
    	var msgHtml;
    	//通知类消息
		if (message.attach && message.attach.type) {
                var notificationText = transNotification(message);
                msgHtml =  '<p class="u-notice tc item" data-time="'+ message.time +'" data-id="'+ message.idClient +'" data-idServer="'+ message.idServer +'"><span class="radius5px">'+notificationText+'</span></p>';
        }else{	
			//聊天消息
            console.log(message);
			var type = message.type,
				from = message.from,
                avatar = user.avatar,
				showNick = message.scene === 'team' && from !== userUID,
                msgHtml;
            if(type==="tip"){
                msgHtml ='<p class="u-notice tc item" data-time="'+ message.time +'" data-id="'+ message.idClient +'" data-idServer="'+ message.idServer +'"><span class="radius5px">'+getMessage(message)+'</span></p>'; 
            }else{

                var isTenant = false;
                try
                {
                    if(message.scene == "team")
                    {
                        var team = cache.getTeamById(message.to);

                        if(JSON.parse(team.serverCustom).type == "tenant")
                        {
                            isTenant = true;
                        }
                    }

                }
                catch (e)
                {
                    isTenant = false;
                }
                var name = getNick(from);
                if(isTenant == true)
                {
                    name = getRealName(from);
                }
    			msgHtml = ['<div data-time="'+ message.time +'" data-id="'+ message.idClient +'" id="'+ message.idClient +'" data-idServer="'+ message.idServer +'" class="item item-' + buildSender(message) + '">',
    						'<img class="img j-img" src="'+getAvatar(avatar)+'" data-account="' + from + '"/>',
    						showNick?'<p class="nick">' + name + '</p>':'',
    						'<div class="msg msg-text">',
    							'<div class="box">',
    								'<div class="cnt">',
    									getMessage(message),
    								'</div>',
    							'</div>',
    						'</div>',
    						message.status === "fail"?'<span class="error"><i class="icon icon-error"></i>发送失败</span>':'',
                           '<span class="readMsg"><i></i>已读</span>',
    					'</div>'].join('');           
            }
        }
        return msgHtml;
			
    },

    /**
     * 云记录面板UI
     */
    buildCloudMsgUI:function(msg,cache){
         var msgHtml = '',
            len = msg.length,
            meessage;
        for (var i = len - 1; i >= 0; --i) {
            message = msg[i];
            if(i == (len -1)){
                msgHtml += this.makeTimeTag(transTime(message.time));
            }else{
                if(message.time-msg[i+1].time>5*60*1000){
                    msgHtml += this.makeTimeTag(transTime(message.time));
                }
            }
            msgHtml += this.makeChatContent(message,cache.getUserById(message.from), cache)
        }
        return msgHtml;
    },

    /**
     * 群成员列表
     */
    buildTeamMemberList:function(list){
        return ['<li data-icon="' + list.avatar + '" data-uid="' + list.account + '" data-account="' + list.nick + '">',
                    '<i class="icon icon-radio"></i>',
                    '<img src="'+getAvatar(list.avatar)+'">',
                    '<span class="name">' + getNick(list.account) + '</span>',
                '</li>'].join('');
    },

    /**
     * 黑名单
     */
    buildBlacklist:function(data,cache){
        var html="";
        if(data.length===0){
            return '';
        }
        for(var i = 0;i<data.length;i++){
            var user = cache.getUserById(data[i].account); 
            html += ['<li class="items f-cb">',
                        '<img src="'+getAvatar(user.avatar)+'" class="head">',
                        '<span class="nick">'+user.nick+'</span>',
                        '<button class="btn radius4px btn-ok j-rm" data-id="'+user.account+'">解除</button>',
                    '</li>'].join('');
        }
        return html;
    },

    /**
     * 系统消息
     */
    buildSysMsgs:function(data,cache){
        var html="",
            item,
            team,
            action,
            content;
        if(data.length===0){
            return '';
        }
        for(var i = 0;i<data.length;i++){
            item = data[i];
            //console.log("消息通知……………………………………………………………………………………………………………………");
            //console.log(item);
            if(item.category=="team"){     
                team = item.attach?item.attach.team:cache.getTeamMapById(item.to);
                //拿不到群信息就过滤吧
                if(!team){
                    continue;
                }
                if(item.type==="teamInvite"){
                    content = getNick(item.from) + "邀请你入群";
                    if(item.state ==="init"){
                        action = '<a class="j-apply">同意</a><a class="j-reject">拒绝</a>';
                    }else if(item.state==="rejected"){
                        action = '已拒绝'; 
                    }else if(item.state==="passed"){
                        action = '已同意';
                    }else{
                        action = '已失效';
                    }
                }else if(item.type==="applyTeam"){
                    content = getNick(item.from)+ "申请加入群";
                    if(item.state ==="init"){
                        action = '<a class="j-apply">同意</a><a class="j-reject">拒绝</a>';
                    }else if(item.state==="rejected"){
                        action = '已拒绝'; 
                    }else if(item.state==="passed"){
                        action = '已同意';
                    }else{
                        action = '已失效';
                    }
                }else if(item.type==="rejectTeamApply"||item.type==="rejectTeamInvite"){
                    content = getNick(item.from) + "拒绝了你的入群邀请";
                    action = '已拒绝';;
                }else{
                     content ="未知";
                     action = "";
                }
                html += ['<div class="item">',
                            '<img src="images/advanced.png">',
                            '<div class="text">',
                                '<p><span>'+(team?team.name:item.to)+'</span><b class="time">'+transTime2(item.time)+'</b></p>',
                                '<p><span class="first-msg">'+content+'</span><b class="action" data-type="'+item.type+'" data-idServer="'+item.idServer+'" data-id="'+team.teamId+'" data-from="'+item.from+'">'+action+'</b></p>',
                            '</div>',
                        '</div>'].join('');            
            }else if(item.category=="friend"){
                //处理好友的系统通知
                  if(item.type==="applyFriend"){
                    content = getNick(item.from)+ "申请加你为好友";
                    if(item.state ==="init"){
                        action = '<a class="f-apply">同意</a><a class="f-reject">拒绝</a>';
                    }else if(item.state==="rejected"){
                        action = '已拒绝';
                    }else if(item.state==="passed"){
                        action = '已同意';
                    }else{
                        action = '已失效';
                    }
                }else if(item.type==="rejectFriendApply"){
                    content = getNick(item.from) + "拒绝了你的好友申请";
                    action = '已拒绝';
                }else if(item.type=="passFriendApply"){
                      content = getNick(item.from) + "同意了你的好友申请";
                      action = '已同意';
                 }else if(item.type=="deleteFriend"){
                      content = getNick(item.from) + "解除了与你的好友关系";
                      action = '已删除';
                  }else{
                    content ="未知";
                    action = "";
                }
                html += ['<div class="item">',
                    '<img src="images/notice.png">',
                    '<div class="text">',
                    '<p><span>系统通知</span><b class="time">'+transTime2(item.time)+'</b></p>',
                    '<p><span class="first-msg">'+content+'</span><b class="action" data-type="'+item.type+'" data-idServer="'+item.idServer+'"  data-from="'+item.from+'">'+action+'</b></p>',
                    '</div>',
                    '</div>'].join('');
            }
        }
        return html;
    },
    // 自定义系统通知
    buildCustomSysMsgs:function(data,cache){
        var html = "",
            content,
            txt,
            from,
            scene,
            to,
            nick,
            avatar;
        console.log("自定义系统信息…………………………………………………………………………");
        console.log(data);
        if(data.length===0){
            return html;
        }
        data = data.sort(function(a,b){
            return b.time-a.time;
        });
        for(var i = 0;i<data.length;i++){
            scene = data[i].scene;
            content = JSON.parse(JSON.parse(data[i].content).myattach);
            txt="作者："+" "+content.author+"标题："+content.title+" "+"简要："+content.summary;
            from = data[i].from;
            to = data[i].to;
            if(scene==="p2p"){
                nick = getNick(from);
                avatar = getAvatar(cache.getUserById(from)?cache.getUserById(from).avatar:"");
            }else{
                var teamInfo = cache.getTeamById(to+"");
                if(teamInfo){
                    nick = teamInfo.name+"-->"+getNick(from);
                    avatar = "images/"+teamInfo.type+".png";
                }else{
                    nick = to+"-->"+getNick(from);
                    avatar = "images/advanced.png";
                }   
            }
            html += ['<div class="item" data-url="'+content.url +'">',
                            '<img src="'+avatar+'">',
                            '<div class="text">',
                                '<p><span>'+content.applicationType+'</span><b class="time">'+transTime2(data[i].time)+'</b></p>',
                                '<p><span class="first-msg">'+txt+'</span></p>',
                            '</div>',
                        '</div>'].join('');    
        }
        return html;
    },
    //聊天消息中的时间显示
    makeTimeTag : function(time){
    	return '<p class="u-msgTime">- - - - -&nbsp;'+time+'&nbsp;- -- - -</p>';
	}

}