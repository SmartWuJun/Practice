/**
 * SDK连接 功能相关
 */
var electron = require("electron");
var SDKBridge = function (ctr,data) {
	var sdktoken = localStorage.getItem('sdktoken'),
		userUID = localStorage.getItem('uid'),
		that = this;

	if(!sdktoken){
     	// window.location.href = '/login.html';
		window.location.href=remote.getGlobal('dirname')+"/xnLogin/page/login.html";
    	return;
	}
	//缓存需要获取的用户信息账号
	this.person = {};
	//缓存需要获取的群组账号
	this.team =[];
	this.person[userUID] = true;
	this.controller = ctr;
	this.cache = data;
	var appKey;
	if(require('electron').remote.getGlobal('isDev') != true)
	{
		appKey = '708e73e559eb1c86b6573f72c47afbdc';
	}
	else
	{
		appKey = '232b9bc7c221f25576e3b80458fb812f';
	}
	window.nim = this.nim = new NIM({
		//控制台日志，上线时应该关掉
		debug: false || { api: 'info', style: 'font-size:14px;color:blue;background-color:rgba(0,0,0,0.1)' },
        // appKey: 'fe416640c8e8a72734219e1847ad2547',//测试
        appKey:appKey,//'708e73e559eb1c86b6573f72c47afbdc',// '232b9bc7c221f25576e3b80458fb812f',
        account: userUID,
        token: sdktoken,
        //连接
        onconnect: onConnect.bind(this),
        ondisconnect: onDisconnect.bind(this),
        onerror: onError.bind(this),
       	onwillreconnect: onWillReconnect.bind(this),
        // 多端登录变化
        onloginportschange:onLoginPortsChange.bind(this),
        // 群
        onteams: onTeams.bind(this),
        onteammembers: onTeamMembers.bind(this),
        //消息
        onmsg: onMsg.bind(this), 
        onroamingmsgs: saveMsgs.bind(this),
        onofflinemsgs: saveMsgs.bind(this),
        //会话
        onsessions: onSessions.bind(this),
        onupdatesession: onUpdatesession.bind(this),
     	//同步完成
        onsyncteammembersdone: onSyncTeamMembersDone.bind(this),
        onsyncdone: onSyncDone.bind(this),
       
        //个人信息
        onmyinfo:onMyInfo.bind(this),
        onupdatemyinfo:onMyInfo.bind(this),
        //系统通知
        onsysmsg: onSysMsg.bind(this,1),
     	onofflinesysmsgs: onOfflineSysmsgs.bind(this),
     	onupdatesysmsg:onSysMsg.bind(this,0),
     	oncustomsysmsg:onCustomSysMsg.bind(this),
     	onofflinecustomsysmsgs:onOfflineCustomSysMsgs.bind(this),
        // 静音，黑名单，好友
        onmutelist:onMutelist.bind(this),
        onblacklist: onBlacklist.bind(this),
        onfriends:onFriends.bind(this),
        onsynccreateteam:onSyncCreateteam.bind(this),
        onsyncmarkinblacklist:onSyncMarkinBlacklist.bind(this),
        onsyncmarkinmutelist:onSyncMarkinMutelist.bind(this),
        onsyncfriendaction:onSyncFriendAction.bind(this)
    });
	function onConnect() {
		$('#j-errorNetwork').addClass('hide');
		this.teamMemberDone = false;
		this.sysMsgDone = false;
	    console&&console.log('连接成功');
	};
	function onKicked(obj) {
	    this.iskicked = true;
		
	};

	function onWillReconnect(obj){
		// 此时说明 `SDK` 已经断开连接，请开发者在界面上提示用户连接已断开，而且正在重新建立连接
		$('#j-errorNetwork').removeClass('hide');
	};

	function onError(error) {
	    console.log('错误信息' + error);
	};
	function onDisconnect(error) {
		// 此时说明 `SDK` 处于断开状态，开发者此时应该根据错误码提示相应的错误信息，并且跳转到登录页面
		var that = this;
		console.log('连接断开');
	    if (error) {
	        switch (error.code) {
	        // 账号或者密码错误, 请跳转到登录页面并提示错误
	        case 302:
		        alert(error.message);
				localStorage.removeItem('uid');
				localStorage.removeItem('sdktoken');
				window.location.href=remote.getGlobal('dirname')+"/xnLogin/page/login.html";
	            break;
	        // 被踢, 请提示错误后跳转到登录页面
	        case 'kicked':
		        var map={
					PC:"电脑版",
					Web:"网页版",
					Android:"手机版",
					iOS:"手机版",
					WindowsPhone:"手机版"
				};
				var str =error.from;
        		alert("你的帐号于"+dateFormat(+new Date(),"HH:mm")+"被"+(map[str]||"其他端")+"踢出下线，请确定帐号信息安全!");
				localStorage.removeItem('uid');
				localStorage.removeItem('sdktoken');
				window.location.href=remote.getGlobal('dirname')+"/xnLogin/page/login.html";
	            break;
	        default:
	            break;
	        }
	    }
	};
	function onLoginPortsChange(loginPorts) {
	    console.log('当前登录帐号在其它端的状态发生改变了', loginPorts);
     	this.controller.loginPorts(loginPorts);
	};
	function onTeams(teams) {
		var teamlist = this.cache.getTeamlist();
		teamlist = this.nim.mergeTeams(teamlist, teams);    
		teamlist = this.nim.cutTeams(teamlist, teams.invalid);
		this.cache.setTeamList(teamlist);
	};
	function onFriends(friends){
		var friendlist = this.cache.getFriends();
		friendlist = this.nim.mergeFriends(friendlist, friends);    
		friendlist = this.nim.cutFriends(friendlist, friends.invalid);
		this.cache.setFriends(friendlist);
		for(var i = 0;i<friendlist.length;i++){
			this.person[friendlist[i].account] = true;
		}		
	};
	function onSessions(sessions){
		var old = this.cache.getSessions();
		this.cache.setSessions(this.nim.mergeSessions(old, sessions));
		for(var i = 0;i<sessions.length;i++){
	    	if(sessions[i].scene==="p2p"){
	    		this.person[sessions[i].to] = true;
	    	}else{
	    		this.team.push(sessions[i].to);
	    	}
		}
	};
	function onUpdatesession(session){
		var id = session.id||"";
		var old = this.cache.getSessions();
		this.cache.setSessions(this.nim.mergeSessions(old, session));
		this.controller.buildConversations(id);			
	};

	function saveMsgs(msgs) {
		msgs = msgs.msgs;
	    this.cache.addMsgs(msgs);
	    for(var i = 0;i<msgs.length;i++){
	    	if(msgs[i].scene==="p2p"){
	    		this.person[msgs[i].from!==userUID?msgs[i].from:msgs[i].to] = true;
	    	}
		}
	};
	function onSyncDone() {
		console.log('消息同步完成');	
 		var ctr = this.controller;
 		this.sysMsgDone = true;
	    //如果用户数据拉取完毕，UI开始呈现
	    if(this.teamMemberDone){
	    	ctr.initInfo(this.person,this.team);
	    }
	};
	function onSyncTeamMembersDone() {
		console.log('群成员同步完成');
		var ctr = this.controller;
	    this.teamMemberDone = true;
	    //如果用户消息等拉取完毕，UI开始呈现
	    if(this.sysMsgDone){
	    	ctr.initInfo(this.person,this.team);
	    }
	};
	function onTeamMembers(obj) {
		this.cache.setTeamMembers(obj.teamId,obj.members);
		var members = obj.members;
	    for(var i = 0;i<members.length;i++){
    		this.person[members[i].account] = true;	
		}
	};
	function onMsg(msg) {
		console.log("------------------------------------------------------------------------------------onMsg收到信息：");
		console.log('收到消息', msg.scene, msg.type, msg);
		if(electron != undefined && electron != null)
		{
			electron.ipcRenderer.send("xntalkMessage", msg, "new");
		}
		//涉及UI太多放到main.js里去处理了
	    this.controller.doMsg(msg);
	};
	function onOfflineSysmsgs(sysMsgs){
		var data = this.cache.getSysMsgs();
		data =this.nim.mergeSysMsgs(data, sysMsgs).sort(function(a,b){
			return b.time-a.time;
		});
		this.cache.setSysMsgs(data);
		this.cache.addSysMsgCount(data.length);
	}
	function onSysMsg(newMsg,msg) {
		if(electron != undefined && electron != null)
		{
			electron.ipcRenderer.send("xntalkMessage", msg, "new");
		}
           var type = msg.type,
			ctr = this.controller,
			cache = this.cache;
			data = cache.getSysMsgs();
		data =this.nim.mergeSysMsgs(data, msg).sort(function(a,b){
			return b.time-a.time;
		});
		this.cache.setSysMsgs(data);
		console.log("------------------------------------------------------------------------------------收到信息：");
		console.log(type);
		if(msg.category!=="team"){
			switch (type) {
	            case 'deleteFriend':
	                cache.removeFriend(msg.from);
	                ctr.buildContacts();
	                break;
	            case 'addFriend':
	                if(!this.cache.getUserById(msg.from)){
	                    this.getUser(msg.from,function(err,data){
	                    	if(!err){
		                    	cache.addFriend(data);
		                        cache.updatePersonlist(data);
		                        ctr.buildContacts();	
	                    	}
	                    })
	                }else{
	                	cache.addFriend(msg.friend);
	                    ctr.buildContacts();   
	                }
	                break;
				case 'applyFriend':
					var html = appUI.buildSysMsgs(data,this.cache);
					$('.j-sysMsg').html(html);
					ctr.buildContacts();
					break;
	            default:
	            	console.log("系统消息---->"+msg);
	                break;
	        }			
		}else{
			if(newMsg){
				this.cache.addSysMsgCount(1);
				ctr.showSysMsgCount();
			}
			ctr.buildSysNotice();
		}
	};

	function onCustomSysMsg(msg){
		//多端同步 正在输入自定义消息类型需要过滤
		console.log("#######################################################################");
		console.log(msg);
		var id = JSON.parse(msg.content).id;
		if(id==1){
			return;
		}
		var ctr = this.controller;
		this.cache.addCustomSysMsgs([msg]);
		this.cache.addSysMsgCount(1);
		ctr.showSysMsgCount();
		ctr.buildCustomSysNotice();
	};
	function onOfflineCustomSysMsgs(msgs){
		this.cache.addCustomSysMsgs(msgs);
		this.cache.addSysMsgCount(msgs.length);
	};
	// 黑名单
	function onBlacklist(blacklist){
		var list = this.cache.getBlacklist();
	 	list = this.nim.mergeRelations(list, blacklist);
    	list = this.nim.cutRelations(list, blacklist.invalid);
		this.cache.setBlacklist(list);
		
		for(var i = 0;i<data.length;i++){
			this.person[data[i]] = true;
		}
	};
	//静音
	function onMutelist(mutelist){
		var list = this.cache.getMutelist();
		list = this.nim.mergeRelations(list, mutelist);
    	list = this.nim.cutRelations(list, mutelist.invalid);
		this.cache.setMutelist(list);
		for(var i = 0;i<data.length;i++){
			this.person[data[i]] = true;
		}
	};

	function onMyInfo(data){
		//require('electron').ipcRenderer.send('onMyInfo', data);
		this.cache.updatePersonlist(data);
		if(this.controller != undefined && this.controller != null )
		{
			if(this.controller.showMe != undefined && this.controller.showMe != null)
			{
				this.controller.showMe();
			}

		}

	};

	function onSyncCreateteam(data){
		this.cache.addTeam(data);
		this.controller.buildTeams();
	};
	// 多端同步好友关系
	function onSyncFriendAction(data){
		ctr.doSyncFriendAction(data);
	};

	function onSyncMarkinBlacklist(param){
		if(param.isAdd){
			this.cache.addToBlacklist(param.record);
		}else {
			this.cache.removeFromBlacklist(param.account);
		}
		this.controller.buildConversations();
        this.controller.buildContacts();     
	};

	function onSyncMarkinMutelist(param){
		if(param.isAdd){
			this.cache.addToMutelist(param.record);
		}else {
			this.cache.removeFromMutelist(param.account);
		}
	};
}

/********** 这里通过原型链封装了sdk的方法，主要是为了方便快速阅读sdkAPI的使用 *********/


/**
 * 设置当前会话，当前会话未读数会被置为0，同时开发者会收到 onupdatesession回调
 * @param {String} scene 
 * @param {String} to    
 */
SDKBridge.prototype.setCurrSession = function(scene,to){
	this.nim.setCurrSession(scene+"-"+to);
}

/**
* 发送普通文本消息
* @param scene：场景，分为：P2P点对点对话，team群对话
* @param to：消息的接收方
* @param text：发送的消息文本
* @param callback：回调
*/
SDKBridge.prototype.sendTextMessage = function (scene, to, text , callback) {
    this.nim.sendText({
        scene: scene || 'p2p',
        to: to,
        text: text,
        done: callback
    });
};

/**
* 发送自定义消息
* @param scene：场景，分为：P2P点对点对话，team群对话
* @param to：消息的接收方
* @param content：消息内容对象
* @param callback：回调
*/
SDKBridge.prototype.sendCustomMessage = function (scene, to, content , callback) {
  	this.nim.sendCustomMsg({
        scene: scene || 'p2p',
        to: to,
        content: JSON.stringify(content),
        done: callback
    });
};

/**
* 发送文件消息
* @param scene：场景，分为：P2P点对点对话，team群对话,callback回调
* @param to：消息的接收方
* @param text：发送的消息文本
* @param callback：回调
*/
SDKBridge.prototype.sendFileMessage = function (scene, to, fileInput , callback) {
	var that = this,
		value = fileInput.value,
		ext = value.substring(value.lastIndexOf('.') + 1, value.length),
		type = /png|jpg|bmp|jpeg|gif/i.test(ext) ? 'image' : 'file';
    this.nim.sendFile({
        scene: scene,
        to: to,
		type: type,
        fileInput: fileInput,
        uploadprogress: function (data) {
           console && console.log(data.percentageText);
        },
        uploaderror: function () {
            console && console.log('上传失败');
        },
        uploaddone: function (file) {
            console && console.log('上传完成，服务器处理中...');
        },
        beforesend: function (msgId) {
            console && console.log('正在发送消息, id=' + msgId);
        },
        done: callback
    });
}
/**
 * 获取云记录消息
 * @param  {Object} param 数据对象
 * @return {void}       
 */
SDKBridge.prototype.getHistoryMsgs = function(param){
	this.nim.getHistoryMsgs (param);
}
/**
 * 获取本地历史记录消息  
 */
SDKBridge.prototype.getLocalMsgs = function(scene,to,lastMsgId,done){
	if(lastMsgId){
		this.nim.getLocalMsgs ({
			scene:scene,
			to:to,
			lastMsgIdClient:lastMsgId,
			limit:20,
			done:done
		});
	}else{
		this.nim.getLocalMsgs ({
			scene:scene,
			to:to,
			limit:20,
			done:done
		});
	}
	
}
SDKBridge.prototype.getLocalTeams = function(teamIds,done){
	this.nim.getLocalTeams ({
		teamIds:teamIds,
		done:done
	});
}
/**
 * 获取本地系统消息记录
 * @param  {Funciton} done 回调
 * @return {void}       
 */
SDKBridge.prototype.getLocalSysMsgs = function(done){
	this.nim.getLocalSysMsgs({
		done:done
	});
}

/**
 * 获取删除本地系统消息记录
 * @param  {Funciton} done 回调
 * @return {void}       
 */
SDKBridge.prototype.deleteAllLocalSysMsgs = function(done){
	this.nim.deleteAllLocalSysMsgs({
        done: done
    });
}

/**
 * 通过入群申请
 */
SDKBridge.prototype.passTeamApply = function(teamId,from,idServer){
	this.nim.passTeamApply({
		teamId:teamId,
		from:from,
		idServer:idServer,
		done:function(err,data){

		}
	});
}
/**
 * 通过好友申请
 */
SDKBridge.prototype.passFriendApply = function(idServer,account){
	this.nim.passFriendApply({
		account:account,
		idServer:idServer,
		done:function(err,data){
         alert("您同意了"+data.account+"好友申请！");
		}
	});
}
/**
 * 拒绝好友申请
 */
SDKBridge.prototype.rejectFriendApply = function(idServer,account){
	this.nim.rejectFriendApply({
		account:account,
		idServer:idServer,
		done:function(err,data){
			alert("您拒绝了"+data.account+"好友申请！");
		}
	});
}

/**
 * 拒绝入群申请
 */
SDKBridge.prototype.rejectTeamApply = function(teamId,from,idServer){
	this.nim.rejectTeamApply({
		teamId:teamId,
		from:from,
		idServer:idServer,
		done:function(err,data){
			
		}
	});
}
/**
 *更新系统通知
 */
SDKBridge.prototype.updateLocalSysMsg = function(idServer){
	this.nim.updateLocalSysMsg({
		idServer:idServer,
		done:function(err,data){
			//alert("信息更新成功！");
		}
	});
}

/**
 * 拒绝入群邀请
 */
SDKBridge.prototype.rejectTeamInvite = function(teamId,from,idServer){
	this.nim.rejectTeamInvite({
		teamId:teamId,
		from:from,
		idServer:idServer,
		done:function(err,data){
			debugger;
		}
	});
}

/**
 * 接受入群邀请
 */
SDKBridge.prototype.acceptTeamInvite = function(teamId,from,idServer){
	this.nim.acceptTeamInvite({
		teamId:teamId,
		from:from,
		idServer:idServer,
		done:function(err,data){
			
		}
	});
}
/**
 * 踢人
 * @param  {int} type  设备端
 * @return {void}     
 */
SDKBridge.prototype.kick = function(type){
	var deviceIds = (type ===0?this.mobileDeviceId:this.pcDeviceId);
	this.nim.kick({
	    deviceIds: [deviceIds],
	    done: function(error, obj){
	    	alert('踢'+(type===0?'移动':'PC')+'端' + (!error?'成功':'失败'));
		    console.log(error);
		    console.log(obj);
	    }
	});
}
// 获取群信息
SDKBridge.prototype.getTeam = function(account,done){
	this.nim.getTeam({
		teamId: account,
		done: done
	});
}
//申请加入高级群
SDKBridge.prototype.applyTeam = function(account){
	this.nim.applyTeam({
		teamId: account,
		done: function(err,data){
			if(err){
				alert(err.message);
			}else{
				alert("入群申请已发出");
			}
		}
	});
}

SDKBridge.prototype.createTeam = function(param){
	//this.nim.createTeam(param);

    // this.sdk.createTeam({
    //     type: 'advanced',
    //     name: names + '等人',
    //     accounts: accounts,
    //     joinMode: 'needVerify',
    //     done: function(error, t) {
    //         if (!error) {
    //             that.cache.addTeam(t.team);
    //             yunXin.buildTeams();
    //             $('#j-loadTeams .j-advanceTeam li[data-account="'+t.team.teamId+'"]').click();
    //
    //         }else{
    //             alert(error.message);
    //         }
    //     }
    // });

    var that = this;

    var user = that.cache.getUserById(localStorage.getItem("uid"));
    var groupCreateRequest = new GroupCreateRequest();
    //groupCreateRequest.setType("tenant");//
    //groupCreateRequest.setDescription()
    groupCreateRequest.setName(param.name);
    groupCreateRequest.setGroupMemberUnionIds(param.accounts);
    groupCreateRequest.setOwnerUnionName(user.nick);
    var name = "";
    try
    {
        name = JSON.parse(user.custom).realName;
    }
    catch (e)
    {
        name = user.nick;
    }

    if(!name || name.length == 0)
    {
        name = user.nick;
    }
    groupCreateRequest.setOwnerUnionId(localStorage.getItem("uid"))
    groupCreateRequest.setOwnerUnionName(name);

    xn_http_post(groupCreateRequest, function(data){
        if (data.errors == null || data.errors.length > 0){
            param.done(data.errors[0]);
        }else{
            that.getTeam(data.id, function (error, t) {
                t.team = t;
                param.done(error, t);
            });
        }
    });


}	
SDKBridge.prototype.getTeamMembers = function(param){
	this.nim.getTeamMembers(param);
}
SDKBridge.prototype.updateTeam = function(param){
	this.nim.updateTeam(param);
    //
    // var that = this;
    // //
    //
    // var group = that.cache.getTeamById(param.teamId);
    // var owner = that.cache.getUserById(group.owner);
    //
    // var name = "";
    // try
    // {
    //     name = JSON.parse(user.custom).realName;
    // }
    // catch (e)
    // {
    //     name = user.nick;
    // }
    //
    // if(!name || name.length == 0)
    // {
    //     name = user.nick;
    // }
    //
    // var groupUpdateRequest = new GroupUpdateRequest();
    // groupUpdateRequest.setId(param.teamId);
    // groupUpdateRequest.setType(group.type);
    // groupUpdateRequest.setOwnerUnionId(group.owner);
    // groupUpdateRequest.setOwnerUnionName(name);
    // groupUpdateRequest.setIconUrl(group.avatar);
    // groupUpdateRequest.setName(group.name);
    //
    // groupUpdateRequest.setDescription(group.intro);
    // groupUpdateRequest.setNotice(group.announcement);
    //
    // xn_http_post(groupUpdateRequest, function(data){
    //     if (data.errors == null || data.errors.length > 0){
    //         param.done(data.errors[0]);
    //     }else{
    //         that.getTeam(data.id, function (error, t) {
    //             t.team = t;
    //             param.done(error, t);
    //         });
    //     }
    // });


}
SDKBridge.prototype.leaveTeam = function(param){
	this.nim.leaveTeam(param);
}
SDKBridge.prototype.dismissTeam = function(param){
	this.nim.dismissTeam(param);
}
SDKBridge.prototype.addTeamMembers= function(param){
	this.nim.addTeamMembers(param);
}
SDKBridge.prototype.removeTeamMembers = function(param){
	this.nim.removeTeamMembers(param);
}


/**
 * 加好友（不需要验证）
 * @param  {String}   uid       
 * @param  {Function} callback 
 * @return             
 */
SDKBridge.prototype.addFriend = function(account,callback){
	this.nim.addFriend({
		account: account,
		done: callback
	});
}
/**
 * 加好友（需要验证）
 * @param  {String}   uid
 * @param  {Function} callback
 * @return
 */
SDKBridge.prototype.applyFriend = function(account,callback){
	this.nim.applyFriend({
		account: account,
		done: callback
	});
}
/**
 * 删好友
 * @param  {[type]}   account  [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
SDKBridge.prototype.deleteFriend = function(account,callback){
	this.nim.deleteFriend({
		account: account,
		done: callback
	});
}

/**
 * 静音
 */
SDKBridge.prototype.markInMutelist = function(account,isAdd,callback){
	this.nim.markInMutelist({
	    account: account,
	    isAdd:isAdd,
	    done: callback
	});
}

/**
 * 黑名单
 */
SDKBridge.prototype.markInBlacklist = function(account,isAdd,callback){
	this.nim.markInBlacklist({
		account: account,
		// true表示加入黑名单，false表示从黑名单移除
		isAdd: isAdd,
		done: callback
	});
}


/**
 * 获取用户信息（如果用户信息让SDK托管）
 */
SDKBridge.prototype.getUsers = function(accounts,callback){
	this.nim.getUsers({
		accounts: accounts,
		done: callback
	});
};
SDKBridge.prototype.getUser = function(account,callback){
	this.nim.getUser({
		account: account,
		done: callback
	});
};

SDKBridge.prototype.updateMyInfo = function(nick,gender,birth,tel,email,sign,callback){
	this.nim.updateMyInfo({
		nick:nick,
		gender:gender,
		birth:birth,
		tel:tel,
		email:email,
		sign:sign,
		done: callback
	});
}
SDKBridge.prototype.updateMyAvatar = function(avatar,callback){
	this.nim.updateMyInfo({
		avatar:avatar,
		done: callback
	});
}
SDKBridge.prototype.updateFriend = function(account,alias,callback){
	this.nim.updateFriend({
	    account: account,
	    alias: alias,
	    done: callback
	});
}
// SDKBridge.prototype.thumbnailImage = function (options) {
// 	return this.nim.thumbnailImage({
// 		url:options.url,
// 		mode:options.mode,
// 		width:options.width,
// 		height:options.height
// 	})
// }

// SDKBridge.prototype.cropImage = function(option){
// 	return this.nim.cropImage(option);
// }

SDKBridge.prototype.previewImage = function(option){
	this.nim.previewFile({
	    type: 'image',
	    fileInput: option.fileInput,
	    uploadprogress: function(obj) {
	        console.log('文件总大小: ' + obj.total + 'bytes');
	        console.log('已经上传的大小: ' + obj.loaded + 'bytes');
	        console.log('上传进度: ' + obj.percentage);
	        console.log('上传进度文本: ' + obj.percentageText);
	    },
	    done: option.callback
	});
}
/**
 * 已读回执
 */
SDKBridge.prototype.sendMsgReceipt = function(msg,done){
	this.nim.sendMsgReceipt({
	    msg:msg,
	    done: done
	});
}