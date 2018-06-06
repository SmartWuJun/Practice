/**
 * 主要业务逻辑相关
 */

var remote =  require('electron').remote;

var userUID = localStorage.getItem("uid");
var userObject={};
userObject=localStorage.getItem("user");
console.log("user");
console.log(userObject);
var timeout = 0;
var freHeight=0;
var myApplicationList=[];
var unionList=[];
var disk={};
var diskId="";
var tenantDisk={};
var tenantId="";
var yunXin = null;
     yunXin = {
        init: function () {
            this.initNode();
            this.initEmoji();

            this.cache = new Cache();
            this.mysdk = new SDKBridge(this,this.cache);
            myTeam.init(this.cache,this.mysdk);
            notification.init(this.cache,this.mysdk);
            this.firstLoadSysMsg = true;
            this.totalUnread =0;
            this.addEvent();
        },
        initUI:function(){
            this.buildConversations();
            this.showSysMsgCount();

        },
        initNode: function () {
            this.$logout = $('#j-logout');
            this.$userPic = $('#j-userPic');
            this.$userName = $('#j-userName');
            this.$contacts = $('#j-contacts');
            this.$contactsFriends = $('#j-right-friends-ul');
            this.$conversations = $('#j-conversations');
            this.$loadConversations = $('#j-loadConversations');
            this.$loadContacts = $('#j-loadContacts');
            this.$loadTeams = $('#j-loadTeams');

            this.$switchPanel = $('#j-switchPanel');
            this.$rightPanel = $('#j-rightPanel');
            this.$chatVernier = $('#j-chatVernier span');
            this.$chatTitle = $('#j-chatTitle');
            this.$chatEditor = $('#j-chatEditor');
            this.$chatContent = $('#j-chatContent');
            this.$sendBtn = $('#j-sendBtn');
            this.$messageText = $('#j-messageText');
            this.$nickName = $('#j-nickName');
            this.$logoutDialog = $('#j-logoutDialog');
            this.$closeDialog = $('#j-closeDialog');
            this.$cancelBtn = $('#j-cancelBtn');
            this.$okBtn = $('#j-okBtn');
            this.$quitBtn = $('#j-quitBtn');
            this.$miniBtn = $('#j-miniBtn');
            this.$maxBtn = $('#j-maxBtn');
            this.$quitBtnDarwin = $('#j-quitBtn-darwin');
            this.$miniBtnDarwin = $('#j-miniBtn-darwin');
            this.$maxBtnDarwin = $('#j-maxBtn-darwin');

            this.$mask = $('#j-mask');
            this.$friendList = $('.friends');
            //添加好友
            this.$addFriend = $('#addFriend');
            this.$addFriendBox = $('#addFriendBox');
            //个人信息
            this.$myInfo = $("#myInfo");
            //修改头像
            this.$modifyAvatar = $("#modifyAvatar");
            //用户信息
            this.$personCard = $('#personCard');

            //消息中心
            this.$notice = $('#notice');

            //黑名单
            this.$blacklist = $('#blacklist');

            this.$teamInfo = $('#j-teamInfo');
            this.$chooseFileBtn = $('#j-msgType');
            this.$fileInput = $('#j-uploadFile');
            this.$showEmoji = $('#j-showEmoji');
            this.$cloudMsg = $('#j-cloudMsg');
            this.$cloudMsgContainer = $('#j-cloudMsgContainer');
            this.$devices = $("#j-devices");
            this.$searchData=$(".search-name-div");
            this.$searchResult=$(".name-list-ul");
            this.$applocationDiv=$("#application-div");

            this.$union=$(".xn-talk-logo");

        },
        initEmoji:function(){
            var that = this,
                emojiConfig = {
                    'emojiList':emojiList,  //普通表情
                    'pinupList':pinupList,  //贴图
                    'width': 500,
                    'height':300,
                    'imgpath':'./images/',
                    'callback':function(result){
                        that.cbShowEmoji(result);
                    }
                }
            this.$emNode = new CEmojiEngine($('#emojiTag')[0],emojiConfig);
        },
         //承租人
         initUnion:function(deferred){
             var tenantGetRequest = new TenantGetAllListByUnionIdRequest();
             tenantGetRequest.setUnionId(userUID);
             xn_http_post(tenantGetRequest, function(data){
                 if (data.errors == null || data.errors.length > 0){
                     alert(data.errors[0].message);
                 }else{
                     unionList=data.result;
                     console.log("承租人");
                     console.log(unionList);
                     var tenantLength=unionList.length;
                     var tenantTxt="";
                     if(require('electron').remote.getGlobal('isDev') == true)
                     {
                         var avatarUrl = "http://img-dev.xiniunet.com/#id#/logo.jpg@100w_100h_100q.jpg";
                     }
                     else
                     {
                         var avatarUrl = "https://img-xiniunet-com.alikunlun.com/#id#/logo.jpg@100w_100h_100q.jpg";
                     }

                     var img = "<img class='panel_image' src='#url#' alt='#name#' onerror=\"this.src='images/advanced.png'\" />";
                     
                     for(var k=0;k<tenantLength;k++){
                         var name = unionList[k].name;
                         if(unionList[k].nameAlt && unionList[k].nameAlt.length > 0)
                         {
                             name = unionList[k].nameAlt;
                         }

                         var textTemp ='<div class="panel_item" data-id="'+unionList[k].id+'">'+
                         '<div class="panel_avatar">#avatar#</div>'+
                         '  <div class="panel_text">'+
                         '  	<p class="panel_single-row">'+name+'</p>'+
                         '  </div>'+
                         '</div>';
                         textTemp = textTemp.replace("#avatar#", img.replace("#url#", avatarUrl.replace('#id#', unionList[k].id)).replace("#name#", unionList[k].name));
                         tenantTxt = tenantTxt + textTemp;
                     }
                     $("#addressListDiv").html(tenantTxt);
                     var unionTxt="";
                     var unionName="";
                     var unionNameOn="";
                     var unionLen=unionList.length;
                     if(unionLen>1){
                         $(".xn-talk-logo").find(".triangle-down").removeClass("xn-hidden");
                         for(var i= 0,len=unionLen;i<len;i++){
                             if(unionList[i].nameAlt){
                                 unionName= unionList[i].nameAlt;
                             }else{
                                 unionName= unionList[i].name;
                             }
                             unionTxt=unionTxt+'<li>'+
                             '<img src="images/default-logo.png" class="logo-img f-left">'+
                             '<span class="logo-name f-left ml_10" data-id="'+ unionList[i].id+'">'+unionName +'</span>'+
                             '</li>';
                         }
                         $(".union-ul").html(unionTxt);

                     }else{
                         $(".xn-talk-logo").find(".triangle-down").addClass("xn-hidden");
                     }
                     if(unionList[0].nameAlt){
                         if(unionList[0].nameAlt.length>6){
                             unionList[0].nameAlt=unionList[0].nameAlt.substr(0,5)+"...";
                         }
                         unionNameOn= unionList[0].nameAlt;

                     }else{
                         if(unionList[0].name.length>6){
                             unionList[0].name=unionList[0].name.substr(0,5)+"...";
                         }
                         unionNameOn= unionList[0].name;
                     }
                     $("#unionName").html(unionNameOn);
                     $("#unionName").attr("data-id",unionList[0].id);
                     tenantId=$("#unionName").attr("data-id");

                     deferred.resolve(tenantId);
                     //网盘
                     var diskByObjectIdRequest = new DiskByObjectIdRequest();
                     diskByObjectIdRequest.setUnionId(userUID);
                     diskByObjectIdRequest.setTenantId(tenantId);
                     xn_http_post(diskByObjectIdRequest, function(data){
                         if (data.errors == null || data.errors.length > 0){
                             alert(data.errors[0].message);
                         }else{
                             console.log("网盘id");
                             disk=data.disk;
                             diskId=disk.id;
                             console.log(diskId);
                         }
                     });
                 }
             });
        },

         addEvent: function () {
            this.myApplicationGet();
            this.$chatContent.delegate('.j-img','click',this.showInfoInChat);
            this.$logout.on('click', this.showDialog.bind(this));
            this.$closeDialog.on('click', this.hideDialog.bind(this));
            this.$cancelBtn.on('click', this.hideDialog.bind(this));
            this.$okBtn.on('click', this.logout.bind(this));
            this.$quitBtn.on('click', this.logout.bind(this));
            this.$miniBtn.on('click', this.miniApp.bind(this));
            this.$maxBtn.on('click', this.maxApp.bind(this));
            this.$quitBtnDarwin.on('click', this.logout.bind(this));
            this.$miniBtnDarwin.on('click', this.miniApp.bind(this));
            this.$maxBtnDarwin.on('click', this.maxApp.bind(this));
            this.$switchPanel.on('click', 'a', this.switchPanel);
            this.$sendBtn.on('click', this.sendTextMessage.bind(this));
            this.$messageText.on('keydown', this.inputMessage);
            this.$chooseFileBtn.on('click', 'a', this.chooseFile.bind(this));
            this.$showEmoji.on('click', this.showEmoji.bind(this));
            this.$fileInput.on('change', this.uploadFile.bind(this));
            $('.friends .list').on('scroll', this.setVernierPosition);
            //云记录
            this.$cloudMsg.on('click', this.showCloudMsg.bind(this, this.$cloudMsg));
            $("#j-cloudMsgContainer").delegate('.j-backBtn', 'click', this.closeCloudMsgContainer.bind(this));
            $("#j-cloudMsgContainer").delegate('.j-loadMore', 'click', this.loadMoreCloudMsg.bind(this));
            // 踢人 0：移动端 1：pc端
            $("#j-devices .j-kickMoblie").on('click',this.mysdk.kick.bind(this.mysdk,0));
            $("#j-devices .j-kickPc").on('click',this.mysdk.kick.bind(this.mysdk,1));
            $("#j-backBtn2").on('click',this.hideDevices.bind(this));
            $(".m-devices").on('click',this.showDevices.bind(this));

            this.$addFriend.on('click',this.showAddFriend.bind(this));
            this.$addFriendBox.delegate('.j-close', 'click', this.hideAddFriend.bind(this));
           // this.$addFriendBox.delegate('.j-search','click',this.searchFriend.bind(this));
            this.$addFriendBox.delegate('.j-back','click',this.resetSearchFriend.bind(this));
            this.$addFriendBox.delegate('.j-add','click',this.applyFriend.bind(this));
            this.$addFriendBox.delegate('.j-blacklist','click',this.rmBlacklist.bind(this));
            this.$addFriendBox.delegate('.j-chat','click',this.beginChat.bind(this));
            this.$addFriendBox.delegate('.j-account','keydown',this.inputAddFriend.bind(this));

            this.$personCard.delegate('.j-close', 'click', this.hideInfoBox.bind(this));
            this.$personCard.delegate('.j-saveAlias', 'click', this.addFriendAlias.bind(this));
            this.$personCard.delegate('.j-add', 'click', this.addFriendInBox.bind(this));
            this.$personCard.delegate('.j-del', 'click', this.removeFriend.bind(this));
            this.$personCard.delegate('.j-chat', 'click', this.doChat.bind(this));
            this.$personCard.delegate('.mutelist>.u-switch', 'click', this.doMutelist.bind(this));
            this.$personCard.delegate('.blacklist>.u-switch', 'click', this.doBlacklist.bind(this));
            $("#headImg").on('click',this.showInfo2.bind(this));

            $("#showBlacklist").on('click',this.showBlacklist.bind(this));
            this.$blacklist.delegate('.j-close', 'click', this.hideBlacklist.bind(this));
            this.$blacklist.delegate('.items .j-rm', 'click', this.removeFromBlacklist);

            //我的手机
            $("#myPhone").on('click',this.sendToMyPhone.bind(this));
            $("#myApplication").on('click',this.toMyApplication.bind(this));


            //我的应用
            $("#myApplication").on("click",this.myApplicationShow.bind(this));
            this.$applocationDiv.delegate('.panel_item', 'click', this.toNewApplication);

            //企业通讯录
            $("#addressList").on('click',this.toAddressList.bind(this));



            $("#j-cloudMsgContainer").delegate('.j-mbox','click',this.playAudio);
            $("#j-chatContent").delegate('.j-mbox','click',this.playAudio);

            //我的好友
            $("#myFriends").on("click",this.myFriendsShow.bind(this));
            $("#j-loadContacts .panel_item").on("click",function(){
                $("#j-loadContacts .panel_item").removeClass("active");

                $(this).addClass("active");
            });

             $("#addressListDiv ").on("click",".panel_item",function(){
                 $("#addressListDiv").find(".panel_item").removeClass("active");
                 $("#addressList").removeClass("active");
                 $(this).addClass("active");
             });

            //消息中心
            $("#showNotice").on('click',this.clickNotice.bind(this));
            this.$notice.delegate('.j-close', 'click', this.hideNotice.bind(this));
            this.$notice.delegate('.j-reject', 'click', this.rejectNotice);
            this.$notice.delegate('.j-apply', 'click', this.acceptNotice);
            this.$notice.delegate('.f-apply', 'click', this.passFriendApply);
            this.$notice.delegate('.f-reject', 'click', this.rejectFriendApply);
            this.$notice.delegate('.j-rmAllSysNotice', 'click', this.rmAllSysNotice.bind(this));
            this.$notice.delegate('.tab li', 'click', this.changeNotice);

            //搜索联系人
            // $("#searchName-input").on('keyup',this.clickSearchBox.bind(this));
            // $(".search-btn").on('click',this.clickSearchBox.bind(this));
            //
            // this.$searchResult.delegate('.arrow-right','click',function(){
            //     var thisAccount=$(this).attr("data-account");
            //     var thisScene=$(this).attr("data-scene");
            //     var thisType=$(this).attr("data-type");
            //     if(thisScene){
            //         yunXin.openChatBox(thisAccount,thisScene);
            //     }else{
            //         yunXin.openChatBox(thisAccount,thisType);
            //     }
            //
            //     $(".name-list-div").addClass("hide");
            //     $("#searchName-input").val("");
            // });

            //我的信息

        //    $("#j-userName").on('click',this.showMyInfo.bind(this));
        //    $("#j-userPic").on('click',this.showMyInfo.bind(this));
            this.$myInfo.delegate('.j-close', 'click', this.hideMyInfoBox.bind(this));
            this.$myInfo.delegate('.operate .j-edit', 'click', this.showEditMyInfo.bind(this));
            this.$myInfo.delegate('.operate .j-cancel', 'click', this.hideEditMyInfo.bind(this));
            this.$myInfo.delegate('.operate .j-save', 'click', this.saveEditMyInfo.bind(this));
            this.$myInfo.delegate('.j-modifyAvatar', 'click', this.showModifyAvatar.bind(this));
            //修改头像
            this.$modifyAvatar.delegate('.j-close', 'click', this.hideModifyAvatar.bind(this));
            this.$modifyAvatar.delegate('.j-choseFile, .j-reupload', 'click', this.doClickModifyAvatar.bind(this));
            this.$modifyAvatar.delegate('.j-save', 'click', this.doSaveAvatar.bind(this));
            this.$modifyAvatar.delegate('.j-upload','change', this.viewAvatar.bind(this));
            $("#datepicker").datepicker({yearRange:"1900:2015"});
        },

        //获取用户信息
        initInfo:function(obj,team){
            this.lockPerson = true;
            this.lockTeam = true;
            var array = Object.keys(obj),
                teamArray=[];
            for (var i = team.length - 1; i >= 0; i--) {
                if(!this.cache.hasTeam(team[i])){
                    teamArray.push(team[i]);
                }
            };
            if(teamArray.length>0){
                this.mysdk.getLocalTeams(teamArray,this.cbInitLocakTeamInfo.bind(this));
            }else{
                this.lockTeam = false;
            }
            this.mysdk.getUsers(array,this.cbInitInfo.bind(this));
        },

        cbInitInfo:function(error,data){
            if(!error){
                this.cache.setPersonlist(data);
                this.lockPerson = false;
                if(this.lockTeam===false){
                    this.initUI();
                }
            }else{
                alert("获取用户信息失败")
            }

        },
        cbInitLocakTeamInfo:function(err,data){
            if(!err){
                this.cache.addTeamMap(data.teams);
                this.lockTeam = false;
                if(this.lockPerson===false){
                    this.initUI();
                }
            }else{
                alert("获取本地群组失败")
            }
        },
        //左栏上方自己的信息
        showMe:function(){
            var user = this.cache.getUserById(userUID);
            this.$userName.text(user.nick);

            this.$userPic.attr('src', getAvatar(user.avatar));
            localStorage.setItem('nickName',user.nick);
            localStorage.setItem('avatar',user.avatar);
        },
        showMyInfo:function(){
            var user = this.cache.getUserById(userUID);
            console.log(user);


            var electron = require('electron'); // 控制应用生命周期的模块。
            var BrowserWindow = electron.remote.BrowserWindow;  // 创建原生浏览器窗口的模块

            mainWindow = new BrowserWindow({ frame: false, resizable: false,center:true,modal:true, useContentSize:true, class:'Main',width:400, height: 560, webPreferences:
            {webSecurity: false,allowDisplayingInsecureContent:true, allowRunningInsecureContent:true}});

            mainWindow.setMenuBarVisibility(false);

            if(require('electron').remote.getGlobal('isDebug') == true)
            {
                mainWindow.openDevTools();
            }
            mainWindow.class = 'PersonCard';
            console.log(__dirname);
            mainWindow.setSize(400, 560);

            if(require('electron').remote.getGlobal('isDebug')  == true)
            {
                mainWindow.loadURL(("http://127.0.0.1:#port#/xntalk/personCard.html?unionId=#unionId#&avatar=#avatar#")
                    .replace("#port#", require('electron').remote.getGlobal('port'))
                    .replace('#unionId#',userUID))
                    .replace('#avatar#',getAvatar(user.avatar));
            }
            else
            {

                mainWindow.loadURL(("http://127.0.0.1:#port#/xntalk/personCard.html?unionId=#unionId#&avatar=#avatar#")
                    .replace("#port#", require('electron').remote.getGlobal('port'))
                    .replace('#unionId#',userUID)
                    .replace('#avatar#',getAvatar(user.avatar))
                );
            }
     
            alert(getAvatar(user.avatar));

            //if(freHeight<600){
            //    window.resizeTo(1015,660);//改变大小
            //}



            var $node = this.$myInfo.data({info:user});
            $node.find(".u-icon").attr('src', getAvatar(user.avatar));
            $node.find(".j-nick").text(user.nick);
            $node.find(".j-nickname").text(user.nick);
            var avatarSrc="";
            if(user.gender&&user.gender!=="unknown"){
                avatarSrc = 'images/'+user.gender+'.png';
                $node.find(".j-gender").removeClass("hide");
            }else{
                $node.find(".j-gender").addClass("hide");
            }
            $node.find(".j-gender").attr('src',avatarSrc);
            $node.find(".j-username").text("帐号："+user.account);
            $node.find(".j-birth").text(user.birth ===undefined?"--":user.birth||"--")
            $node.find(".j-tel").text(user.tel ===undefined?"--":user.tel||"--")
            $node.find(".j-email").text(user.email ===undefined?"--":user.email||"--")
            $node.find(".j-sign").text(user.sign ===undefined?"--":user.sign||"--")
            $node.removeClass('hide');
            this.$mask.removeClass('hide');
        },
        hideMyInfoBox:function(){
            this.$myInfo.addClass('hide');
            this.$myInfo.removeClass('edit');
            this.$mask.addClass('hide');
        },
        showEditMyInfo:function(){
            //if(freHeight<600) {
            //    window.resizeTo(1015, 660);//改变大小
            //}
            var $node = this.$myInfo,
                user = $node.data("info");
            $node.find(".e-nick").val(user.nick);
            $node.find(".e-gender").val(user.gender);
            if(user.birth !==undefined){
                $node.find(".e-birth").val(user.birth)
            }
            if(user.tel !==undefined){
                $node.find(".e-tel").val(user.tel)
            }
            if(user.email !==undefined){
                $node.find(".e-email").val(user.email)
            }
            if(user.sign !==undefined){
                $node.find(".e-sign").val(user.sign)
            }
            this.$myInfo.addClass('edit');
        },
        hideEditMyInfo:function(){
            this.$myInfo.removeClass('edit');
        },
        saveEditMyInfo:function(){
            var $node = this.$myInfo;
            var nick = $node.find(".e-nick").val().trim();
            if(!nick){
                alert("昵称不能为空");
                return;
            }
            var gender = $node.find(".e-gender").val();
            var birth = $node.find(".e-birth").val().trim();
            var tel = $node.find(".e-tel").val().trim();
            var email = $node.find(".e-email").val().trim();
            if(email&&!/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(email)){
                alert("email格式不正确");
                return;
            }
            var sign  = $node.find(".e-sign").val().trim();
            this.mysdk.updateMyInfo(nick,gender,birth,tel,email,sign,this.cbSaveMyInfo.bind(this));
        },
        cbSaveMyInfo:function(err,data){
            if(err){
                alert(err);
            }else{
                data.account = userUID;
                this.cache.updatePersonlist(data);
                this.showMe();
                this.$myInfo.removeClass("edit");
                this.showMyInfo();

            }
        },
        //修改头像相关
        showModifyAvatar:function(){
            this.$myInfo.addClass("hide");
            this.$modifyAvatar.removeClass("hide");
        },
        hideModifyAvatar:function(){
            this.resetCorpAvatar();
            this.$modifyAvatar.addClass("hide");
            this.$myInfo.removeClass("hide");
        },
        resetCorpAvatar:function(){
            this.corpParameters = null;
            this.avatarUrl = null;
            if(!!this.modifyAvatar){
                this.modifyAvatar.disable();
            }
            this.$modifyAvatar.find(".big img").attr("src","").addClass("hide");
            this.$modifyAvatar.find(".small img").attr("src","").addClass("hide");
            $('#cropImg img').attr("src","").addClass("hide");
            this.$modifyAvatar.find(".choseFileCtn").removeClass("hide");
        },
        viewAvatar:function(){
            var fileInput = this.$modifyAvatar.find(".j-upload").get(0);
            if(fileInput.files.length === 0){
                return;
            }
            this.mysdk.previewImage({fileInput:fileInput,callback:this.cbUploadAvatar.bind(this)})
        },
        cbUploadAvatar:function(err,data){
            if(err){
                alert(err);
                return;
            }else{
                if(data.w<300||data.h<300){
                    alert("图片长宽不能小于300")
                    return;
                }
                this.showPreAvatar(data.url);
            }
        },
        showPreAvatar:function(url){
            var that = this,
                preUrl,
                $choseFileCtn = this.$modifyAvatar.find(".choseFileCtn"),
                $preBig = this.$modifyAvatar.find(".big img"),
                $preSmall = this.$modifyAvatar.find(".small img"),
                $cropImgContainer = $('#cropImg'),
                $cropImg = $cropImgContainer.find("img");
            $choseFileCtn.addClass("hide");
            this.avatarUrl =url;
            preUrl = url+"?imageView&thumbnail=300y300";
            $preBig.attr("src",preUrl).removeClass("hide");
            $preSmall.attr("src",preUrl).removeClass("hide");
            $cropImg.attr("src",preUrl).removeClass("hide");
            $preBig.css({
                width:160,
                height:160
            });
            $preSmall.css({
                width:40,
                height:40
            });
        },
        doClickModifyAvatar:function(){
            //置空节点避免2次上传无响应
            this.$modifyAvatar.find(".j-uploadForm").get(0).reset();
            this.$modifyAvatar.find(".j-choseFile").val(null);
            this.$modifyAvatar.find(".j-upload").click();

        },
        doSaveAvatar:function(){
            var url;
            if(!!this.avatarUrl){
                this.mysdk.updateMyAvatar(this.avatarUrl,this.cbSaveMyAvatar.bind(this))
            }else{
                alert("请上传一张头像");
            }
        },
        cbSaveMyAvatar:function(err,data){
            if(err){
                alert("修改头像失败");
                console.log(err);
            }else{
                this.cache.updateAvatar(data.avatar);
                this.hideModifyAvatar();
                this.showMyInfo();
                this.showMe();
            }
        },
        /**
         * 多端登录管理
         * @param  {object} devices 设备
         * @return {void}
         */
        loginPorts:function(devices){
            var pc,mobile;
            for (var i = devices.length - 1; i >= 0; i--) {
                if(/iOS|Android|WindowsPhone/i.test(devices[i].type)){
                    mobile=devices[i];
                }else if(/PC/i.test(devices[i].type)){
                    pc = devices[i];
                }
            };
            if((pc&&pc.online)||(mobile&&mobile.online)){
                if((pc&&pc.online)&&(mobile&&mobile.online)){
                    $(".m-devices").html("正在使用犀牛手机版，电脑版")
                    $("#j-devices .pc").removeClass("hide");
                    $("#j-devices .mobile").removeClass("hide");
                    this.mysdk.mobileDeviceId = mobile.deviceId;
                    this.mysdk.pcDeviceId = pc.deviceId;
                }else if(pc&&pc.online){
                    $(".m-devices").html("正在使用犀牛电脑版")
                    $("#j-devices .pc").removeClass("hide");
                    $("#j-devices .mobile").addClass("hide");
                    this.mysdk.mobileDeviceId = false;
                    this.mysdk.pcDeviceId = pc.deviceId;
                }else{
                    $(".m-devices").html("正在使用犀牛手机版")
                    $("#j-devices .mobile").removeClass("hide");
                    $("#j-devices .pc").addClass("hide");
                    this.mysdk.mobileDeviceId = mobile.deviceId;
                    this.mysdk.pcDeviceId = false;
                }
                $(".m-devices").removeClass("hide");
                $(".friends").height(463);
                $("#j-chatVernier").css({marginTop:'41px'});
            }else{
                $(".m-devices").addClass("hide");
                $("#j-devices").addClass("hide");
                $("#j-devices .pc").addClass("hide");
                $("#j-devices .mobile").addClass("hide");
                this.mysdk.mobileDeviceId = false;
                this.mysdk.pcDeviceId = false;
                $(".friends").height(504);
                $("#j-chatVernier").css({marginTop:'0'});
            }
        },
        /**
         * 多端登录面板UI
         */
        showDevices:function(){
            this.$devices.removeClass("hide");
        },
        hideDevices:function(){
            this.$devices.addClass("hide");
        },

        /**
         * 添加好友窗口
         */
        showAddFriend:function(){
            //if(freHeight<600) {
            //    window.resizeTo(1015, 660);//改变大小
            //}
            this.friendData = null;
            this.$addFriendBox.removeClass("hide");
            this.$mask.removeClass('hide');
            this.$addFriendBox.find(".j-account").focus();
        },
        hideAddFriend:function(){
            this.resetSearchFriend();
            this.$addFriendBox.addClass("hide");
            this.$mask.addClass('hide');
        },
        searchFriend:function(){
            var $this=this;
            //var account =  $.trim(this.$addFriendBox.find(".j-account").val().toLowerCase());
            var controllerScope = $('div[ng-controller="addFriendController"]').scope();
            yunXin.mysdk.getUser(controllerScope.lookup.unionId, yunXin.cbGetUserInfo.bind(yunXin));
            // if(account!==""){
            //     var unionGetByAccountRequest = new UnionGetByAccountRequest();
            //     unionGetByAccountRequest.setAccount(account);
            //     xn_http_post(unionGetByAccountRequest, function(data){
            //         if(data.result=="0"){
            //             $this.$addFriendBox.find(".tip").html("该帐号不存在，请检查你输入的帐号是否正确");
            //             $this.$addFriendBox.attr('class',"m-dialog done");
            //         }
            //         if(data != "error" && data.union != null &&  data.union.id != null){
            //             yunXin.mysdk.getUser(data.union.id,yunXin.cbGetUserInfo.bind(yunXin));
            //         }else if(data.errors != null){
            //             if(data.errors.length!=0){
            //                 $this.$addFriendBox.find(".tip").html(data.errors[0].message);
            //                 $this.$addFriendBox.attr('class',"m-dialog done");
            //             }
            //         }else {
            //             $this.$addFriendBox.find(".tip").html("登录错误");
            //             $this.$addFriendBox.attr('class',"m-dialog done");
            //         }
            //     });
            //
            // }
        },
        beginChat:function(){
            //if(freHeight<600) {
            //    window.resizeTo(1015, 660);//改变大小
            //}
            var account = $.trim(this.$addFriendBox.find(".j-account").val().toLowerCase());
            this.hideAddFriend();
            this.openChatBox(account,"p2p");
        },
        resetSearchFriend:function(){
            this.$addFriendBox.attr('class',"m-dialog");
            this.$addFriendBox.find(".j-account").val("");
        },
        addFriend:function(){
            var id  = $.trim(this.$addFriendBox.find(".j-account").val().toLowerCase());
            this.mysdk.addFriend(id,this.cbAddFriend.bind(this));
        },
        applyFriend:function(){
            var id  = $.trim(this.$addFriendBox.find(".j-username").attr("data-id").toLowerCase());
            this.mysdk.applyFriend(id,this.cbAddFriend.bind(this));
        },
        rmBlacklist:function(){
            var id  = $.trim(this.$addFriendBox.find(".j-account").val().toLowerCase());
            this.mysdk.markInBlacklist(id,false,this.cbRmBlacklist.bind(this))
        },
        cbRmBlacklist:function(err,data){
            if(!err){
                var account = data.account;
                this.cache.removeFromBlacklist(account);
                this.buildContacts();
                var isFriend = this.cache.isFriend(account);
                if(!isFriend){
                    this.friendData = data;
                }
                this.$addFriendBox.removeClass('blacklist');
                this.$addFriendBox.addClass(isFriend?"friend":"noFriend");
            }
        },
        inputAddFriend:function(evt){
            if(evt.keyCode==13){
                $("#addFriendBox .j-account").blur();
                this.searchFriend();
            }
        },
        cbAddFriend:function(error, params) {
            console.log("加好友信息………………………………………………………………………………………………");
            console.log(error);
            if(!error){
                this.$addFriendBox.find(".tip").html("消息发送成功！");
                this.$addFriendBox.attr('class',"m-dialog done");
                this.cache.updatePersonlist(this.friendData);
                this.buildContacts();
            }else{
                this.$addFriendBox.find(".tip").html("该帐号不存在，请检查你输入的帐号是否正确");
                this.$addFriendBox.attr('class',"m-dialog done");
            }

        },
        cbGetUserInfo:function(err,data){
            if(err){
                alert(err);
            }
            if(!!data){
                var $info = this.$addFriendBox.find(".info"),
                    user = data,
                    account = data.account;
                $info.find("img").attr("src",getAvatar(user.avatar));
                $info.find(".j-nickname").html(user.nick);
                {
                    var unionGetRequest =  new UnionGetRequest();
                    unionGetRequest.setId(account);
                    xn_http_post(unionGetRequest, function (data) {
                        $info.find(".j-username").html("帐号："+ data.union.account);
                    });

                }

                $info.find(".j-username").html("帐号："+ account);
                $info.find(".j-username").attr("data-id",account);
                if(account == userUID){
                    this.$addFriendBox.find(".tip").html("别看了就是你自己");
                    this.$addFriendBox.attr('class',"m-dialog done");
                }else{
                    var isFriend = this.cache.isFriend(account),
                        inBlacklist = this.cache.inBlacklist(account);
                    if(!isFriend){
                        this.friendData = data;
                    }
                    if(inBlacklist){
                        this.$addFriendBox.addClass("blacklist");
                    }else{
                        this.$addFriendBox.addClass(isFriend?"friend":"noFriend");
                    }
                }

            }else{
                this.$addFriendBox.find(".tip").html("该帐号不存在，请检查你输入的帐号是否正确");
                this.$addFriendBox.attr('class',"m-dialog done");
            }
        },
        /**
         * 用户名片
         */
        showInfo:function(account,type){
            if(type=="p2p"){
                var user = yunXin.cache.getUserById(account);
                this.showInfoBox(user);
            }

        },
        //从聊天面板点进去
        showInfo2:function(){
            if($('#j-chatEditor').data('type') =="p2p"){
                var account = $('#j-chatEditor').data('to');
                var user = yunXin.cache.getUserById(account);
                this.showInfoBox(user);
            }
        },
        showInfoBox:function(user){

            if(user.account === userUID){
                this.showMyInfo();
                return;
            }
            var isFriend = this.cache.isFriend(user.account);
            var inMutelist = this.cache.inMutelist(user.account);
            var inBlacklist = this.cache.inBlacklist(user.account);
            var $node = this.$personCard.data({account:user.account,inMutelist:inMutelist?true:false,inBlacklist:inBlacklist?true:false});
            $node.find(".u-icon").attr('src', getAvatar(user.avatar));
            $node.find(".j-nickname").text("昵称："+user.nick);
            $node.find(".j-nick").text(getNick(user.account));
            var avatarSrc ="";
            if(user.gender&&user.gender!=="unknown"){
                avatarSrc = 'images/'+user.gender+'.png'
            }else{
                $node.find(".j-gender").addClass("hide");
            }
            $node.find(".j-gender").attr('src',avatarSrc);
            $node.find(".j-username").text("帐号："+user.account);
            $node.find(".j-username").attr("data-id",user.account);
            $node.find(".j-birth").text(user.birth ===undefined?"--":user.birth)
            $node.find(".j-tel").text(user.tel ===undefined?"--":user.tel)
            $node.find(".j-email").text(user.email ===undefined?"--":user.email)
            $node.find(".j-sign").text(user.sign ===undefined?"--":user.sign)
            if(inMutelist){
                $node.find(".mutelist>.u-switch").addClass('off');
            }
            if(!inBlacklist){
                $node.find(".blacklist>.u-switch").addClass('off');
            }else{
                $node.addClass('blacklist');
            }
            if(!isFriend){
                $node.addClass("notFriend");
            }else{
                var alias = this.cache.getFriendAlias(user.account);
                $node.find(".e-alias").val(alias);
            }

            var controllerScope = $('div[ng-controller="personCardController"]').scope();  // Get controller's scope

            console.log(user);
           // alert(isFriend);
            controllerScope.isBuddy = isFriend;
            controllerScope.showPersonCard(user, isFriend);

           




           // $node.removeClass('hide');
           // this.$mask.removeClass('hide');
        },
        showInfoInChat:function(account,type){
            var account = $(this).attr('data-account'),
                user = yunXin.cache.getUserById(account);
            if(account==userUID){
                return;
            }
            yunXin.showInfoBox(user);
        },
        hideInfoBox:function(){
            this.$personCard.addClass('hide');
            this.$mask.addClass('hide');
            this.$personCard.removeClass('notFriend');
            this.$personCard.removeClass('blacklist');
            this.$personCard.find(".mutelist .u-switch").removeClass('off');
            this.$personCard.find(".blacklist .u-switch").removeClass('off');

        },
        // 好友备注
        addFriendAlias:function(){
            var account = this.$personCard.data("account");
            var alias = this.$personCard.find(".e-alias").val().trim();
            this.mysdk.updateFriend(account,alias,this.cbAddFriendAlias.bind(this));
        },
        cbAddFriendAlias:function(err,data){
            if(!err){
                alert("修改备注成功");
                this.$personCard.find(".e-alias").val(data.alias);
                this.cache.updateFriendAlias(data.account,data.alias);
                this.$personCard.find(".j-nick").text(getNick(data.account));
                if ($('#j-chatEditor').data('to') === data.account) {
                    this.$nickName.text(getNick(data.account));
                }
                this.buildConversations();
                this.buildContacts();
            }else{
                alert("修改备注失败");
            }
        },
        addFriendInBox:function(){
            // if(this.$personCard.is(".blacklist")){
            //     return;
            // }
            var account=this.$personCard.find(".j-username").attr("data-id");
            //this.mysdk.addFriend(account,this.cbAddFriendInBox.bind(this));
            this.mysdk.applyFriend(account,this.cbAddFriendInBox.bind(this));
        },
        cbAddFriendInBox:function(error, params){
            // if(!error){
            //    this.hideInfoBox();
            //    this.cache.addFriend(params.friend);
            //    this.buildContacts();
            //}else{
            //     alert("添加好友失败")
            //}
            if(!error){
                alert("消息发送成功！");
                this.cache.updatePersonlist(this.friendData);
                this.buildContacts();
            }else{
                this.$addFriendBox.find(".tip").html("该帐号不存在，请检查你输入的帐号是否正确");
                this.$addFriendBox.attr('class',"m-dialog done");
            }
        },
        removeFriend:function(){
            if(window.confirm("确定要删除")){
                var account = this.$personCard.data("account");
                this.mysdk.deleteFriend(account,this.cbRemoveFriend.bind(this));
            }

        },
        cbRemoveFriend:function(error, params){
            if(!error){
                this.hideInfoBox();
                this.cache.removeFriend(params.account);
                if ($('#j-chatEditor').data('to') === params.account) {
                    this.$nickName.text(getNick(params.account));
                }
                this.buildContacts();
            }else{
                alert("删除好友失败")
            }
        },
        doChat:function(){
            var account = this.$personCard.data("account");
            this.hideInfoBox();
            var $container;
            if(!this.$loadConversations.is('.hide')){
                $container = this.$loadConversations;
            }else if(!this.$loadContacts.is('.hide')){
                $container = this.$loadContacts;
            }else{
                this.openChatBox(account,"p2p");
                return;
            }
            var $li = $container.find('.m-panel li[data-account="'+account+'"]');
            if($li.length>0){
                $li.find(".count").addClass("hide");
                $li.find(".count").text(0);
            }

            this.openChatBox(account,"p2p");
        },
        doMutelist:function(){
            if(this.$personCard.is(".blacklist")){
                return;
            }
            var account = this.$personCard.data("account"),
                status = !this.$personCard.data("inMutelist");
            this.mysdk.markInMutelist(account,status,this.cbDoMutelist.bind(this))

        },
        cbDoMutelist:function(err,data){
            if(!err){
                if(data.isAdd){
                    this.cache.addToMutelist(data.record);
                    this.$personCard.data("inMutelist",true);
                }else{
                    this.cache.removeFromMutelist(data.account);
                    this.$personCard.data("inMutelist",false);
                }
                this.$personCard.find(".mutelist .u-switch").toggleClass("off");
            }else{
                alert("操作失败");
            }
        },
        doBlacklist:function(){

            var account = this.$personCard.data("account"),
                status = !this.$personCard.data("inBlacklist");
            this.mysdk.markInBlacklist(account,status,this.cbDoBlacklist.bind(this))
        },
        cbDoBlacklist:function(err,data){
            if(!err){
                if(data.isAdd){
                    this.cache.addToBlacklist(data.record);
                    this.$personCard.data("inBlacklist",true);
                    this.$personCard.addClass("blacklist");
                }else{
                    this.cache.removeFromBlacklist(data.account);
                    this.$personCard.data("inBlacklist",false);
                    this.$personCard.removeClass("blacklist");
                }
                this.$personCard.find(".blacklist .u-switch").toggleClass("off");
                this.buildConversations();
                this.buildContacts();
            }else{
                alert("操作失败");
            }
        },
        /**
         * 我的手机
         */
        sendToMyPhone:function(){
            //if(freHeight<600) {
            //    window.resizeTo(1015, 660);//改变大小
            //}
            this.openChatBox(userUID,"p2p");
        },
        /**
         * 我的应用
         */
        toMyApplication:function(){
            //嵌入代码
        },

        /**
         * 搜索
         * ***/
        searchList:function(){
            var count1=0;
            var count2=0;
            var count3=0;
            var count4=0;
            var count5=0;
            var count6=0;
            var keyword=$("#searchName-input").val();

            var thisFrList=[];
            var thisFrTxt="";
            thisFrList=this.cache.getFriendslist();
            for(var j= 0,len=thisFrList.length;j<len;j++){
                if(thisFrList[j].nick.indexOf(keyword)!=-1){
                    count5=count5+1;
                    thisFrTxt=thisFrTxt+'<li>'+
                        '<div class="panel_avatar">'+cutwords(thisFrList[j].nick,2) +'</div>'+
                        '<div class="panel_text">'+thisFrList[j].nick +'</div>'+
                        '<div class="arrow-right" data-scene="p2p" data-account="'+thisFrList[j].account+'"></div>' +
                        '</li>';
                }
            }
            $("#friendList").html(thisFrTxt);
            if(thisFrTxt!=""){
                $(".friendFlag").removeClass("hide");
            }else{
                $(".friendFlag").addClass("hide");
                $("#friendList").html("");
                count5=0;
            }
            //console.log(thisFrList);

            var thisTeamList=[];
            var thisTeamTxt="";
            thisTeamList=this.cache.getTeamlist();
            console.log(thisTeamList);
            for(var j= 0,len=thisTeamList.length;j<len;j++){
                if(thisTeamList[j].name.indexOf(keyword)!=-1){
                    count6=count6+1;
                    thisTeamTxt=thisTeamTxt+'<li>'+
                        '<div class="panel_avatar">'+cutwords(thisTeamList[j].name,2) +'</div>'+
                        '<div class="panel_text">'+thisTeamList[j].name +'</div>'+
                        '<div class="arrow-right" data-gtype="normal" data-type="team" data-account="'+thisTeamList[j].teamId+'"></div>' +
                        '</li>';
                }
            }
            $("#teamList").html(thisTeamTxt);
            if(thisTeamTxt!=""){
                $(".teamFlag").removeClass("hide");
            }else{
                $(".teamFlag").addClass("hide");
                $("#teamList").html("");
                count6=0;
            }
            var globalSearchRequest = new GlobalSearchRequest();
            globalSearchRequest.setKeyword(keyword);
            xn_http_post(globalSearchRequest, function(data){
                if (data.errors == null || data.errors.length > 0){
                    alert(data.errors[0].message);
                }else{
                    console.log(data);
                    var employeeTxt="";
                    var userTxt="";
                    var tenantTxt="";
                    var branchTxt="";
                    if(data.employeeList){
                        $(".employeeFlag").removeClass("hide");
                        count1=data.employeeList.length;
                        for(var i= 0;i<count1;i++){
                            var unionTxt="";
                            if(data.employeeList[i].unionId){
                                unionTxt='<div class="arrow-right" data-scene="p2p" data-account="'+data.employeeList[i].unionId+'"></div>';
                            }
                            employeeTxt=employeeTxt+'<li data-union="'+data.employeeList[i].unionId+'">'+
                                '<div class="panel_avatar">'+cutwords(data.employeeList[i].name,2) +'</div>'+
                                '<div class="panel_text">'+data.employeeList[i].name +'</div>'+unionTxt+
                                '</li>';
                        }
                        $("#empoyeeList").html(employeeTxt);
                    }else{
                        $("#empoyeeList").html("");
                        $(".employeeFlag").addClass("hide");
                        count1=0;
                    }
                    if(data.userList){
                        count2=data.userList.length;
                        for(var i= 0;i<count2;i++){
                            var unionTxt="";
                            if(data.userList[i].unionId){
                                unionTxt='<div class="arrow-right " data-scene="p2p" data-account="'+data.employeeList[i].unionId+'"></div>';
                            }
                            userTxt=userTxt+'<li data-union="'+data.userList[i].unionId+'">'+
                                '<div class="panel_avatar">'+cutwords(data.userList[i].name,2) +'</div>'+
                                '<div class="panel_text">'+data.userList[i].name +'</div>'+unionTxt+
                                '</li>';
                        }
                        $("#userList").html(userTxt);
                    }else{
                        $("#userList").html("");
                        count2=0;
                    }


                }
                $("#data-count").html(Number(count1)+Number(count2)+Number(count3)+Number(count4)+Number(count5)+Number(count6));
            });
        },
        clickSearchBox:function(){
            $(".name-list-div").removeClass('hide');
            var that=this;
            clearTimeout(timeout);
            timeout = setTimeout(function(){
                that.searchList();
            },200);
        },
         myApplicationGet:function(){
             var tenantGetAllListByUnionIdRequest = new TenantGetAllListByUnionIdRequest();
             tenantGetAllListByUnionIdRequest.setUnionId(userUID);
             xn_http_post(tenantGetAllListByUnionIdRequest, function(data){
                 if (data.errors == null || data.errors.length > 0){
                     alert(data.errors[0].message);
                 }else {
                     console.log(data);
                     myApplicationList=data.result;
                     var applicationTxt="";
                     var nameAlt="";
                     if(myApplicationList.length>0){
                         for(var j= 0,len=myApplicationList.length;j<len;j++){
                             if(myApplicationList[j].nameAlt){
                                 nameAlt=myApplicationList[j].nameAlt;
                             }else{
                                 nameAlt=myApplicationList[j].name;
                             }
                             applicationTxt=applicationTxt+('<div  class="panel_item" data-json="'+encodeURI(JSON.stringify(myApplicationList[j]))+'">'+
                             '		<div class="panel_avatar">'+
                             '			<img class="panel_image" src="images/advanced.png" alt="'+myApplicationList[j].name+'"/>'+
                             '		</div>'+
                             '		<div class="panel_text">'+
                             '			<p class="panel_single-row">'+nameAlt+'</p>'+
                             '		</div>'+
                             '	</div>');

                         }
                         $("#application-div").html(applicationTxt);

                     }

                 }
             });
        },
         myApplicationShow:function(){
             if($("#application-div").hasClass("hide")){
                 $("#application-div").removeClass("hide");
             }else{
                 $("#application-div").addClass("hide");
             }
        },
         toAddressList:function(){
             if($("#addressListDiv").hasClass("hide")){
                 $("#addressListDiv").removeClass("hide");
             }else{
                 $("#addressListDiv").addClass("hide");
             }
         },
         toAddressShow:function(){
            var tenantId=$(this).attr("data-id");

         },

         myFriendsShow:function(){
             $(".right-panel").addClass("hide");
             $("#j-right-friends").removeClass("hide");
         },
         toNewApplication:function(){
             var thisData=$(this).attr("data-json");
             console.log(decodeURI(thisData));
             var tenant = JSON.parse(decodeURI(thisData));
             var passportIdGetByUnionIdAndTenantIdRequest = new PassportIdGetByUnionIdAndTenantIdRequest();
             passportIdGetByUnionIdAndTenantIdRequest.setTenantId(tenant.id);
             passportIdGetByUnionIdAndTenantIdRequest.setUnionId(localStorage.getItem('uid'));
             console.log(passportIdGetByUnionIdAndTenantIdRequest);
             xn_http_post(passportIdGetByUnionIdAndTenantIdRequest, function(data){
                 console.log(data);
                 var electron = require('electron'); // 控制应用生命周期的模块。
                 var BrowserWindow = electron.remote.BrowserWindow;  // 创建原生浏览器窗口的模块
                 //
                 mainWindow = new BrowserWindow({ useContentSize:true,center:true, webPreferences :{allowDisplayingInsecureContent:true, allowRunningInsecureContent:true, webSecurity:false}});
                 mainWindow.setProgressBar(1.0);
               //  mainWindow.setMenuBarVisibility(false);
                 if(require('electron').remote.getGlobal('isDebug') == true)
                 {
                  //   mainWindow.openDevTools();
                 }

                 var url = ('https://auth-plat.xiniunet.com/sso/autoLogin.do?token=#passportId#&returnUrl=' + encodeURI('https://employee-plat.xiniunet.com/application.htm')).replace('#passportId#',data.passportId);
                 if(require('electron').remote.getGlobal('isDev') != true)
                 {
                     url = ('https://auth.xiniunet.com/sso/autoLogin.do?token=#passportId#&returnUrl=' + encodeURI('https://employee.xiniunet.com/application.htm')).replace('#passportId#',data.passportId);
                 }

                 //注意 生产passportId不行
                    console.log(url);
                 mainWindow.loadURL(url);

             });

         },

        /**
         * 消息中心
         */
        showSysMsgCount:function(){
            var $node = $("#showNotice .count");
            var count = this.cache.getSysMsgCount();
            if(this.$notice.hasClass("hide")){
                if(count>0){
                    //$(".nav-message").removeClass("xn-hidden");
                    $node.removeClass("hide").text(count);
                }else{
                    $node.addClass("hide").text(count);
                    //$(".nav-message").addClass("xn-hidden");
                }
            }else{
                this.cache.setSysMsgCount(0);
            }
        },
        clickNotice:function(){
            //if(freHeight<600) {
            //    window.resizeTo(1015, 660);
            //}
            var that = this;
            this.cache.setSysMsgCount(0);
            this.showSysMsgCount();
            if(this.firstLoadSysMsg){
                this.mysdk.getLocalSysMsgs(function(error, obj){
                    if(!error){
                        if(obj.sysMsgs.length>0){
                            that.cache.setSysMsgs(obj.sysMsgs);
                        }
                        that.firstLoadSysMsg = false;
                        that.showNotice();
                    }else{
                        alert("获取系统消息失败");
                    }
                });
            }else{
                this.showNotice();
            }

        },
        showNotice:function(){
            this.buildSysNotice();
            this.buildCustomSysNotice();
            this.$notice.removeClass('hide');
            this.$mask.removeClass("hide");
            document.documentElement.style.overflow='hidden';
        },
        buildSysNotice: function(){
            var data = this.cache.getSysMsgs(),
                array = [],
                that = this;
            console.log("信息内容&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
            console.log(data);
            //确保用户信息存在缓存中
            for(var i=0;i<data.length;i++){
                if(!this.cache.getUserById(data[i].from)){
                    array.push(data[i].from);
                }
            }
            if(array.length>0){
                this.mysdk.getUsers(array,function(err,data){
                    for (var i = data.length - 1; i >= 0; i--) {
                        that.cache.setPersonlist(data[i]);
                    };
                })
            }
            var html = appUI.buildSysMsgs(data,this.cache);

            this.$notice.find('.j-sysMsg').html(html);
        },
        buildCustomSysNotice:function(){
            var data = this.cache.getCustomSysMsgs(),
                array = [],
                that = this;
            //确保用户信息存在缓存中
            for(var i=0;i<data.length;i++){
                if(!this.cache.getUserById(data[i].from)){
                    array.push(data[i].from);
                }
            }
            if(array.length>0){
                this.mysdk.getUsers(array,function(err,data){
                    for (var i = data.length - 1; i >= 0; i--) {
                        that.cache.setPersonlist(data[i]);
                    };
                })
            }
            console.log("自定义通知缓存内容*******************************");
            console.log(data);
            var html = appUI.buildCustomSysMsgs(data,this.cache);
            this.$notice.find('.j-customSysMsg').html(html);
        },
        hideNotice:function() {
            this.$notice.addClass('hide');
            this.$mask.addClass("hide");
            document.documentElement.style.overflow='';
        },
        changeNotice:function(){
            var $node = yunXin.$notice;
            $node.find(".tab li").removeClass("crt");
            $(this).addClass("crt");
            if($(this).attr("data-value")==="sys"){
                $node.find(".j-sysMsg").removeClass("hide");
                $node.find(".j-customSysMsg").addClass("hide");
            }else{
                $node.find(".j-sysMsg").addClass("hide");
                $node.find(".j-customSysMsg").removeClass("hide");
            }
        },
        acceptNotice:function() {
            var $this = $(this),
                $node = $this.parent(),
                teamId = $node.attr("data-id"),
                from = $node.attr("data-from"),
                type = $node.attr("data-type"),
                idServer = $node.attr("data-idServer");
            if(type ==="teamInvite"){
                yunXin.mysdk.acceptTeamInvite(teamId,from,idServer);
            }else{
                yunXin.mysdk.passTeamApply(teamId,from,idServer);
            }

        },
        passFriendApply:function() {
            var $this = $(this),
                $node = $this.parent(),
                account = $node.attr("data-from"),
                idServer = $node.attr("data-idServer");
            var data={
                account:account,
                idServer:idServer
            };
            yunXin.mysdk.passFriendApply(idServer,account);
            yunXin.mysdk.updateLocalSysMsg(idServer);
            yunXin.cache.addFriend(data);
            yunXin.cache.updatePersonlist(data);
            yunXin.buildContacts();

            //nim.getFriends({
            //    done: getFriendsDone
            //});
            //function getFriendsDone(error, friends) {
            //    console.log('获取好友列表' + (!error?'成功':'失败'), error, friends);
            //}
        },

        rejectFriendApply:function() {
            var $this = $(this),
                $node = $this.parent(),
                account = $node.attr("data-from"),
                idServer = $node.attr("data-idServer");
            yunXin.mysdk.rejectFriendApply(idServer,account);
            yunXin.mysdk.updateLocalSysMsg(idServer);

        },
        rejectNotice:function() {
            var $this = $(this),
                $node = $this.parent(),
                teamId = $node.attr("data-id"),
                from = $node.attr("data-from"),
                type = $node.attr("data-type"),
                idServer = $node.attr("data-idServer");
            if(type ==="teamInvite"){
                yunXin.mysdk.rejectTeamInvite(teamId,from,idServer);
            }else{
                yunXin.mysdk.rejectTeamApply(teamId,from,idServer);
            }
        },
        rmAllSysNotice:function(){
            var that = this;
            var type = this.$notice.find(".tab .crt").attr("data-value");
            if(type ==="sys"){
                this.mysdk.deleteAllLocalSysMsgs(function(err,obj){
                    if(err){
                        alert("删除失败");
                    }else{
                        that.cache.setSysMsgs([]);
                        that.buildSysNotice();
                    }
                })
            }else{
                this.cache.deleteCustomSysMsgs();
                this.buildCustomSysNotice();
            }
        },
        /**
         * 显示黑名单列表
         */
        showBlacklist:function() {
            //if(freHeight<600) {
            //    window.resizeTo(1015, 660);//改变大小
            //}
            var data = this.cache.getBlacklist();
            var html = appUI.buildBlacklist(data,this.cache);
            this.$blacklist.find('.list').html(html);
            this.$blacklist.removeClass('hide');
            this.$mask.removeClass("hide");
            document.documentElement.style.overflow='hidden';
        },
        hideBlacklist:function() {
            $("#blacklist").addClass('hide');
            this.$mask.addClass("hide");
            document.documentElement.style.overflow='';
        },
        removeFromBlacklist:function(){
            var id = $(this).attr("data-id");
            yunXin.mysdk.markInBlacklist(id,false, yunXin.cbRemoveFromBlacklist.bind(yunXin))
        },
        cbRemoveFromBlacklist:function(err,data){
            if(!err){
                this.cache.removeFromBlacklist(data.account);
                var html = appUI.buildBlacklist(this.cache.getBlacklist(),this.cache);
                this.$blacklist.find('.list').html(html);
                this.buildContacts();
            }else{
                alert("操作失败");
            }
        },
        /**
         * 查看云记录
         */
        showCloudMsg: function() {
            var that = this;
            if(this.$chatEditor.data("type")==="team"){
                var teamId = this.$teamInfo.data("team-id");
                var teamInfo = that.cache.getTeamById(teamId);
                if(!teamInfo){
                    return;
                }
            }
            this.$cloudMsgContainer.load('/xntalk/cloud-msg.html', function() {
                that.$cloudMsgContainer.removeClass('hide');
                var id = that.$chatEditor.data('to'),
                    scene = that.$chatEditor.data('type'),
                    param ={
                        scene:scene,
                        to:id,
                        lastMsgId:0,
                        limit:20,
                        reverse:false,
                        done:that.cbCloudMsg.bind(that)
                    }
                that.mysdk.getHistoryMsgs(param);
            });
        },
        /**
         * 云记录面板显示
         * @return {[type]} [description]
         */
        closeCloudMsgContainer:function(){
            $('#j-cloudMsgContainer').addClass('hide');
        },

        /**
         * 加载更多云记录
         */
        loadMoreCloudMsg:function(){
            var id = this.$chatEditor.data('to'),
                scene = this.$chatEditor.data('type'),
                lastItem = $("#j-cloudMsgList .item").first(),
                param ={
                    scene:scene,
                    to:id,
                    beginTime:0,
                    endTime:parseInt(lastItem.attr('data-time')),
                    lastMsgId:parseInt(lastItem.attr('data-idServer')),//idServer 服务器用于区分消息用的ID，主要用于获取历史消息
                    limit:20,
                    reverse:false,
                    done:this.cbCloudMsg.bind(this)
                }
            this.mysdk.getHistoryMsgs(param);
        },

        /**
         * 云记录获取回调
         * @param  {boolean} error
         * @param  {object} obj 云记录对象
         */
        cbCloudMsg:function(error,obj){
            var node = $("#j-cloudMsgList"),
                tip = $("#j-cloudMsgContainer .u-status span");
            if (!error) {
                if (obj.msgs.length === 0) {
                    tip.html('没有更早的聊天记录');
                } else {
                    if(obj.msgs.length<20){
                        tip.html('没有更早的聊天记录');
                    }else{
                        tip.html('<a class="j-loadMore">加载更多记录</a>')
                    }
                    var msgHtml = appUI.buildCloudMsgUI(obj.msgs,this.cache);
                    $(msgHtml).prependTo(node);
                }
            } else {
                console && console.error('获取历史消息失败');
                tip.html('获取历史消息失败');
            }
        },
        //滚动监听圆点
        setVernierPosition: function () {
            var $active = $(this).find('.active'),
                type = $active.parents('.friends').data('type'),
                $container = '',
                that = yunXin;
            if (type == 'contacts') {
                $container = that.$loadContacts;
            } else if (type == 'teams') {
                $container = that.$loadTeams;
            } else {
                $container = that.$loadConversations;
            }
            if ($active.length) {
                var top = $active.offset().top - $container.offset().top + 60;
                that.$chatVernier.css('top', top);
            }
        },

        uploadFile: function () {
            var that = this,
                scene = that.$chatEditor.data('type'),
                to = that.$chatEditor.data('to'),
                fileInput = this.$fileInput.get(0);
            if(fileInput.files[0].size==0){
                alert("不能传空文件");
                return;
            }
            this.mysdk.sendFileMessage(scene, to, fileInput,this.sendMsgDone.bind(this));
        },

        chooseFile: function () {
            this.$fileInput.click();
        },

         /**
         * 通讯录列表显示
         * @param  {object} 数据对象
         * @return {void}
         */
        buildContacts: function () {
            var data = {
                friends:this.cache.getFriendslistOnShow(),
                account:userUID
            };
            //console.log("原来的数组"+data.friends);
            //console.log(data.friends);
            data.friends.sort(compare("nick"));
            //console.log("排序的数组"+data.friends);
            //console.log(data.friends);
            if(!this.friend){
                var options = {
                    data:data,
                    onclickavatar:this.showInfo.bind(this),
                    onclickitem:this.openChatBox.bind(this),
                    infoprovider:this.infoProvider.bind(this)

                };
                this.friends = new NIMUIKit.FriendList(options);
                this.friends.inject(this.$contactsFriends.get(0));
            }else{
                this.friends.update(data);
            }
            this.doPoint();
        },

        //获取好友备注名或者昵称
        getNick:function(account){
            // 使用util中的工具方法
            return getNick(account,this.cache);
        },
        /**
         * 列表想内容提供方法（用于ui组件）
         * @param  {Object} data 数据
         * @param  {String} type 类型
         * @return {Object} info 需要呈现的数据
         */
        infoProvider:function(data,type){
            var info = {};
            switch(type){
                case "session":
                    var msg = data.lastMsg,
                        scene = msg.scene;
                    info.scene = msg.scene;
                    info.account = msg.target;
                    info.target = msg.scene+"-"+msg.target;
                    info.time =  transTime2(msg.time);
                    info.crtSession = this.crtSession;
                    info.unread = data.unread>99?"99+":data.unread;
                    info.text = buildSessionMsg(msg);
                    if(scene==="p2p"){
                        //点对点
                        if(msg.target === userUID){
                            info.nick = "我的手机";
                            info.avatar = "images/myPhone.png";
                        }else{
                            var userInfo = this.cache.getUserById(msg.target);
                            info.nick = this.getNick(msg.target);
                            info.avatar = getAvatar(userInfo.avatar);
                        }

                    }else{
                        //群组
                        var teamInfo = this.cache.getTeamById(msg.target);
                        if(teamInfo){
                            if(teamInfo.avatar){
                                info.avatar = teamInfo.avatar;
                            }else{
                                info.avatar = "images/advanced.png";
                            }

                            info.nick = teamInfo.name;

                        }else{
                            info.nick = msg.target;
                            info.avatar = "images/advanced.png";
                        }
                    }
                    break;
                case "friend":
                    info.target = "p2p-"+data.account;
                    info.account = data.account;
                    info.nick = this.getNick(info.account);
                    info.avatar = getAvatar(data.avatar);
                    info.crtSession = this.crtSession;
                    break;
                case "team":
                    info.type = data.type;
                    info.nick = data.name;
                    info.target = "team-"+data.teamId;
                    info.teamId = data.teamId;
                    if (data.avatar != null && data.avatar != undefined) {
                        info.avatar = data.avatar;
                    } else {
                        info.avatar = "images/advanced.png";
                    }
                    info.crtSession = this.crtSession;
                    break;
            }
            return info;
        },
        /**
         * 最近联系人显示
         * @return {void}
         */
        buildConversations: function(id) {
            var data = {
                sessions:this.cache.getSessions()
            }
            if(!this.sessions){
                var options = {
                    data:data,
                    onclickavatar:this.showInfo.bind(this),
                    onclickitem:this.openChatBox.bind(this),
                    infoprovider:this.infoProvider.bind(this)
                }
                this.sessions = new NIMUIKit.SessionList(options);
                this.sessions.inject(this.$conversations.get(0));
            }else{
                this.sessions.update(data);
            }
            //导航上加未读示例
            this.showUnread();
            this.doPoint();
            //已读回执处理
            this.markMsgRead(id);
        },
        /**
         * 我的群组显示
         * @return {void}
         */
        buildTeams: function() {
            var data = {
                teams:this.cache.getTeamlist()
            }
            if(!this.teams){
                var options = {
                    data:data,
                    infoprovider:this.infoProvider.bind(this),
                    onclickavatar:this.clickTeamAvatar.bind(this),
                    onclickitem:this.openChatBox.bind(this)

                }
                this.teams = new NIMUIKit.TeamList(options);
                this.teams.inject($('#j-teams').get(0));
            }else{
                this.teams.update(data);
            }
            this.doPoint();
        },
        /**
         * 点击群组列表头像
         * demo里跟点击列表处理一致了
         */
        clickTeamAvatar:function(account,type) {
            $("#j-teams").find("li.active").removeClass("active");
            this.openChatBox(account, type)
        },
        /**
         * 导航圆点显示
         */
        doPoint:function(){
            var $container;
            if(!this.$loadConversations.is('.hide')){
                $container = this.$loadConversations;
            }else if(!this.$loadContacts.is('.hide')){
                $container = this.$loadContacts;
            }else{
                $container = this.$loadTeams;
            }
            var $li = $container.find(".m-panel li");
            var $active = $li.map(function(){
                $(this).removeClass("active");
                if($(this).attr('data-account')==$('#j-chatEditor').data('to')){
                    $(this).addClass("active");
                    return this;
                }});
            if ($active.length) {
                var top = $active.offset().top - $container.offset().top + 105;
                this.$chatVernier.css('top', top).removeClass("hide");
            }else{
                this.$chatVernier.addClass("hide");
            }
        },
        // 导航上加未读数
        showUnread:function(){
            var counts = $("#j-conversations .panel_count");
            this.totalUnread = 0;
            if(counts.length!==0){
                console.log($("#nav-message"));
                if(this.totalUnread !=="99+"){
                    for (var i = counts.length - 1; i >= 0; i--) {
                        if($(counts[i]).text()==="99+"){
                            this.totalUnread = "99+";
                            break;
                        }
                        this.totalUnread +=parseInt($(counts[i]).text(),10);
                    }
                }
            }
            var $node = $(".m-unread .u-unread");
            var $showNum=$(".nav-message");
            $node.text(this.totalUnread);
            this.totalUnread?$node.removeClass("hide"):$node.addClass("hide");
            this.totalUnread?$showNum.removeClass("xn-hidden"):$showNum.addClass("xn-hidden");
        },
        sendTextMessage: function () {
            var scene = this.$chatEditor.data('type'),
                to = this.$chatEditor.data('to'),
                text = this.$messageText.val().trim();
            if ( !! to && !! text) {
                if (text.length > 500) {
                    alert('消息长度最大为500字符');
                }else if(text.length===0){
                    return;
                } else {
                    this.mysdk.sendTextMessage(scene, to, text, this.sendMsgDone.bind(this));
                }
            }
        },
        /**
         * 发送消息完毕后的回调
         * @param error：消息发送失败时，error != null
         * @param msg：消息主体，类型分为文本、文件、图片、地理位置、语音、视频、自定义消息，通知等
         */
        sendMsgDone: function (error, msg) {
            this.cache.addMsgs(msg);
            this.$messageText.val('');
            this.$chatContent.find('.no-msg').remove();
            var msgHtml = appUI.updateChatContentUI(msg,this.cache);
            this.$chatContent.append(msgHtml).scrollTop(99999);
            $('#j-uploadForm').get(0).reset();
        },

        inputMessage: function (e) {
            var ev = e || window.event,
                $this = $(this);
            if ( ev.shiftKey && ev.keyCode == 50) {
//@功能开发中


                // var scene = yunXin.$chatEditor.data('type'),
                //     to = yunXin.$chatEditor.data('to'),
                //     text = yunXin.$messageText.val().trim();
                // if(scene == 'team')
                // {
                //     var memberList = yunXin.cache.getTeamMembers(to);
                //     var controllerScope = $('div[ng-controller="atGroupMemberController"]').scope();
                //     controllerScope.$apply(function () {
                //         var position =   $('#j-messageText').caret('offset');
                //         controllerScope.searchContact('', memberList);
                //         controllerScope.setPosition(position);
                //
                //     });
                //
                // }

            }

            if ($.trim($this.val()).length > 0)
            {
                if (ev.keyCode === 13 && ev.ctrlKey)
                {
                    $this.val($this.val() + '\r\n');
                }
                else if (ev.keyCode === 13 && !ev.ctrlKey)
                {
                    yunXin.sendTextMessage();
                }

            }
        },

        /**
         * 点击左边面板，打开聊天框
         */
        openChatBox: function (account,scene) {
            //if(freHeight<600) {
            //    window.resizeTo(1015, 660);//改变大小
            //}
            var info;
            this.mysdk.setCurrSession(scene,account);
            this.crtSession = scene+"-"+account;
            //根据帐号跟消息类型获取消息数据
            if(scene=="p2p"){
                info = this.cache.getUserById(account);
            }else{
                info = this.cache.getTeamById(account);
            }
            //隐藏其他窗口
            $('#j-teamInfoContainer').addClass('hide');
            this.$devices.addClass('hide');
            this.$cloudMsgContainer.addClass('hide');
            //退群的特殊UI
            this.$rightPanel.find(".u-chat-notice").addClass("hide");
            this.$rightPanel.find(".chat-mask").addClass("hide");

            //设置聊天面板
            if (scene === 'p2p') {
                if(info.account == userUID){
                    this.$nickName.text("我的手机");
                    this.$chatTitle.find('img').attr('src', "images/myPhone.png");
                }else{
                    this.$nickName.text(this.getNick(account));
                    this.$chatTitle.find('img').attr('src', getAvatar(info.avatar));
                }
            }else{
                if(info){
                    if(info.avatar)
                    {
                        this.$chatTitle.find('img').attr('src', info.avatar);
                    }else{
                        this.$chatTitle.find('img').attr('src', "images/advanced.png");
                    }

                    this.$nickName.text(info.name);

                }else{
                    this.$rightPanel.find(".u-chat-notice").removeClass("hide");
                    this.$rightPanel.find(".chat-mask").removeClass("hide");
                    this.$chatTitle.find('img').attr('src', "images/advanced.png");
                    this.$nickName.text(account);
                }
                this.$chatTitle.find('img').attr('onerror',  'this.src=\'images/advanced.png\'');

            }
            //显示面板
            this.$rightPanel.removeClass('hide');
            this.$messageText.val('');

            //群信息
            if (scene === 'p2p') {
                this.$teamInfo.addClass('hide').data({
                    teamId: '',
                    gtype: ''
                });
            } else {
                this.$teamInfo.removeClass('hide').data({
                    teamId: account,
                    gtype: info?info.type:"normal"
                });
            }
            //会话信息
            this.$chatEditor.data({
                to: account,
                type: scene
            });
            this.doPoint();
            // 根据或取聊天记录
            this.getHistoryMsgs(scene,account);
        },

        /**
         * 获取当前会话消息
         * @return {void}
         */
        getHistoryMsgs: function (scene,account) {
            var id = scene+"-"+account;
            var sessions = this.cache.findSession(id);
            var msgs = this.cache.getMsgs(id);
            //标记已读回执
            this.sendMsgRead(account,scene);
            if(!!sessions){
                if(sessions.unread>=msgs.length){
                    var msgid = (msgs.length>0)?msgs[0].idClient:false;
                    this.mysdk.getLocalMsgs(scene,account,msgid,this.getLocalMsgsDone.bind(this));
                    return;
                }
            }
            var temp = appUI.buildChatContentUI(id,this.cache);
            this.$chatContent.html(temp);
            this.$chatContent.scrollTop(9999);
            //已读回执UI处理
            this.markMsgRead(id);
        },

        getLocalMsgsDone:function(err,data){
            if(!err){
                this.cache.addMsgsByReverse(data.msgs);
                var id = data.scene +"-"+data.to;
                var temp = appUI.buildChatContentUI(id,this.cache);
                this.$chatContent.html(temp);
                this.$chatContent.scrollTop(9999);
                this.markMsgRead(id);
            }else{
                alert("获取历史消息失败");
            }
        },
        //发送已读回执
        sendMsgRead:function(account,scene){
            if(scene==="p2p"){
                var id = scene+"-"+account;
                var sessions = this.cache.findSession(id);
                this.mysdk.sendMsgReceipt(sessions.lastMsg,function(err,data){
                    console.log(err);
                    if(err){
                        console.log(err);
                    }
                });
            }
        },
        //UI上标记消息已读
        markMsgRead:function(id){

            if(!id||this.crtSession!==id){
                return;
            }
            var msgs = this.cache.getMsgs(id);
            for (var i = msgs.length-1;i>=0; i--) {
                var message = msgs[i];
                // 目前不支持群已读回执
                if(message.scene==="team"){
                    return;
                }
                if(nim.isMsgRemoteRead(message)){
                    //$(".item.item-me.read").removeClass("read");
                    $("#"+message.idClient).addClass("read");
                   // break;
                }
            }
        },
        /**
         * 处理收到的消息
         * @param  {Object} msg
         * @return
         */
        doMsg:function(msg){
            var that = this,
                who = msg.to === userUID ? msg.from : msg.to,
                updateContentUI = function(){
                    //如果当前消息对象的会话面板打开
                    if ($('#j-chatEditor').data('to') === who) {
                        that.sendMsgRead(who,msg.scene);
                        var msgHtml = appUI.updateChatContentUI(msg,that.cache);
                        that.$chatContent.find('.no-msg').remove();
                        that.$chatContent.append(msgHtml).scrollTop(99999);
                    }
                };
            //非群通知消息处理
            if (/text|image|file|audio|video|geo|custom|tip/i.test(msg.type)) {
                this.cache.addMsgs(msg);
                var account = (msg.scene==="p2p"?who:msg.from);
                //用户信息本地没有缓存，需存储
                if(!this.cache.getUserById(account)){
                    this.mysdk.getUser(account,function(err,data){
                        if(!err){
                            that.cache.updatePersonlist(data);
                            updateContentUI();
                        }
                    })
                }else{
                    this.buildConversations();
                    updateContentUI();
                }
            }else{
                // 群消息处理
                notification.messageHandler(msg,updateContentUI);
            }
        },

        /**
         * 切换左边面板上方tab
         */
        switchPanel: function () {
            var $this = $(this),
                $thisIcon = $this.find('.icon'),
                type = $this.data('type'),
                panels = $('.friends');
            yunXin.$chatVernier.addClass('hide');
            $thisIcon.addClass('cur');
            $this.siblings().find('.icon').removeClass('cur');
            $('.friends[data-type="' + type + '"]').removeClass('hide').siblings('.friends').addClass('hide');
            if (type === 'conversations') {
                yunXin.buildConversations();
            } else if (type === 'contacts') {
                yunXin.buildContacts();
            } else {
                yunXin.buildTeams();
            }
        },

        logout: function () {

            localStorage.clear();
            // window.location.href = '/index.html';

            const dialog = require('electron').remote.dialog;
            var dialogOption = {
                type:'question',
                title:'退出',
                buttons:['确定', '取消'],
                defaultId:0,
                message:'确定要退出XNTALK吗？',
                detail:'',
                cancelId:1
            };

            dialog.showMessageBox(dialogOption,function(e){

                // e 是选择的目录
                if(e == 0)
                {
                    require('electron').remote.app.quit();
                }
                console.log(e);
            });
        },
         miniApp: function () {
            require('electron').remote.BrowserWindow.getFocusedWindow().minimize();
        },

        maxApp: function () {
            // require('electron').remote.BrowserWindow.getFocusedWindow().maximize();
            // require('electron').remote.BrowserWindow.getFocusedWindow().unmaximize();
            if (require('electron').remote.getCurrentWindow().isMaximized()) {
                require('electron').remote.getCurrentWindow().restore();
            } else {
                require('electron').remote.getCurrentWindow().maximize();
            }
        },

        showDialog: function () {
            this.$logoutDialog.removeClass('hide');
            this.$mask.removeClass('hide');
        },

        hideDialog: function () {
            this.$logoutDialog.addClass('hide');
            this.$mask.addClass('hide');
        },
        showEmoji:function(){
            this.$emNode._$show();
        },
        // 语音播放
        playAudio:function(){
            if(!!window.Audio){
                var node = $(this),
                    btn = $(this).children(".j-play");
                node.addClass("play");
                setTimeout(function(){node.removeClass("play");},parseInt(btn.attr("data-dur")))
                new window.Audio(btn.attr("data-src")+"?audioTrans&type=mp3").play();
            }
        },
        /**
         * 选择表情回调
         * @param  {objcet} result 点击表情/贴图返回的数据
         */
        cbShowEmoji:function(result){
            if(!!result){
                var scene = this.$chatEditor.data('type'),
                    to = this.$chatEditor.data('to');
                // 贴图，发送自定义消息体
                if(result.type ==="pinup"){
                    var index =Number(result.emoji)+1;
                    content = {
                        type: 3,
                        data: {
                            catalog: result.category,
                            chartlet:result.category+'0'+ (index>=10?index:'0'+index)
                        }
                    };
                    this.mysdk.sendCustomMessage(scene, to, content,this.sendMsgDone.bind(this));
                }else{
                    // 表情，内容直接加到输入框
                    this.$messageText[0].value=this.$messageText[0].value+result.emoji;
                }
            }
        },
        /**
         * 多端同步好友信息处理
         * @param  {Object} data
         * @return {Void}
         */
        doSyncFriendAction : function(data){
            var that =  this,
                type = data.type;
            switch (type) {
                case 'deleteFriend':
                    this.cache.removeFriend(data.account);
                    this.buildContacts();
                    break;
                case 'addFriend':
                    this.cache.addFriend(data.friend);
                    if(!this.cache.getUserById(data.account)){
                        this.mysdk.getUser(account,function(err,data){
                            if(!err){
                                that.cache.updatePersonlist(data);
                                that.buildContacts();
                            }
                        })
                    }else{
                        this.buildContacts();
                    }
                    break;
                case 'applyFriend':
                    this.cache.applyFriend(data.friend);
                    if(!this.cache.getUserById(data.account)){
                        this.mysdk.getUser(account,function(err,data){
                            if(!err){
                                that.cache.updatePersonlist(data);
                                that.buildContacts();
                            }
                        })
                    }else{
                        this.buildContacts();
                    }
                    break;
                default:
                    console.log(data);
                    break;
            }
        },
        cloudDisk:function(){
             $("#con-left").addClass("xn-hidden");
             $("#j-rightPanel").addClass("xn-hidden");
             $("#j-devices").addClass("xn-hidden");
             $("#j-file").removeClass("xn-hidden");
            $("#j-tenantHome").addClass("xn-hidden");
            var controllerScope = $('div[ng-controller="PanIndexController"]').scope();
            controllerScope.doMenu(0);

        },
         tenantHome:function () {
             $("#con-left").addClass("xn-hidden");
             $("#j-rightPanel").addClass("xn-hidden");
             $("#j-devices").addClass("xn-hidden");
             $("#j-file").addClass("xn-hidden");
             $("#j-tenantHome").removeClass("xn-hidden");


             {

         


                 var passportIdGetByUnionIdAndTenantIdRequest = new PassportIdGetByUnionIdAndTenantIdRequest();
                 passportIdGetByUnionIdAndTenantIdRequest.setTenantId($('#unionName').attr('data-id'));
                 passportIdGetByUnionIdAndTenantIdRequest.setUnionId(localStorage.getItem('uid'));
                 console.log(passportIdGetByUnionIdAndTenantIdRequest);
                 xn_http_post(passportIdGetByUnionIdAndTenantIdRequest, function(data){
                     var url = ('https://auth-plat.xiniunet.com/sso/autoLogin.do?token=#passportId#&returnUrl=' + encodeURI('http://site-plat.xiniunet.com/route.do?method=goto.employee.portal')).replace('#passportId#',data.passportId);
                     if(require('electron').remote.getGlobal('isDev') != true)
                     {
                         url = ('https://auth.xiniunet.com/sso/autoLogin.do?token=#passportId#&returnUrl=' + encodeURI('https://site.xiniunet.com/route.do?method=goto.employee.portal')).replace('#passportId#',data.passportId);
                     }
                     $('#j-tenantHome2').attr('src', url);

                     var oFrm = document.getElementById('j-tenantHome2');
                     oFrm.onload = oFrm.onreadystatechange = function() {
                         if (this.readyState && this.readyState != 'complete') return;
                         else {

                             var shell = require('electron').shell;
                             // //open links externally by default
                             $($('#j-tenantHome2').prop('contentWindow').document).on('click', 'a', function(event) {

                                 var openUrl = this.href;
                                 if(this.href.indexOf("xiniunet.com/employee/detail") >= 0)
                                 {
                                     var url = ('https://auth-plat.xiniunet.com/sso/autoLogin.do?token=#passportId#&returnUrl=' + encodeURI(this.href)).replace('#passportId#',data.passportId);
                                     if(require('electron').remote.getGlobal('isDev') != true)
                                     {
                                         url = ('https://auth.xiniunet.com/sso/autoLogin.do?token=#passportId#&returnUrl=' + encodeURI(this.href) ).replace('#passportId#',data.passportId);
                                     }

                                     event.preventDefault();
                                     shell.openExternal(url);

                                 }

                             });
                         }
                     }


                 });



             }

         }

    };
    yunXin.init();


    //非当前区域点击隐藏
    var count=0;
    var getPar = function(tar) {
        if(tar.className=="search-name-div"){
            count++;
        }
        // if(tar.id=="personQrcode" ||　tar.id == "personQrcode2"){
        //     count++;
        // }
        if(tar.parentNode){
            getPar(tar.parentNode);
        }
    };

    // $("body").on("click", function(e) {
    //     count=0;
    //     getPar(e.target);
    //     if(count == 0) {
    //         $(".name-list-div").addClass('hide');
    //         $("#searchName-input").val("");
    //
    //     }
    // });


$(document).on('click', 'a', function(event) {
    if(this.href.indexOf("http://") >= 0 || this.href.indexOf("https://") >= 0)
    {
        var shell = require('electron').shell;
        event.preventDefault();
        var url = this.href;
        if(this.href.indexOf("xiniunet.com/mobileContent/articleDetail?id=") >= 0)
        {
            var articleId = this.href.substr(this.href.indexOf('articleDetail?id=') +('articleDetail?id=').length );
            var passportIdGetByUnionIdAndTenantIdRequest = new PassportIdGetByUnionIdAndTenantIdRequest();
            passportIdGetByUnionIdAndTenantIdRequest.setTenantId(this.getAttribute('data-tenantId'));
            passportIdGetByUnionIdAndTenantIdRequest.setUnionId(localStorage.getItem('uid'));
            xn_http_post(passportIdGetByUnionIdAndTenantIdRequest, function(data){
                console.log(data);
                var articleUrl = ('https://site-plat.xiniunet.com/content/index/article.htm?id=#articleId#').replace('#articleId#', articleId);
                var url = ('https://auth-plat.xiniunet.com/sso/autoLogin.do?token=#passportId#&returnUrl=' + encodeURI(articleUrl)).replace('#passportId#',data.passportId);
                if(require('electron').remote.getGlobal('isDev') != true)
                {
                    articleUrl = ('https://site.xiniunet.com/content/index/article.htm?id=#articleId#').replace('#articleId#', articleId);
                    url = ('https://auth.xiniunet.com/sso/autoLogin.do?token=#passportId#&returnUrl=' + encodeURI(articleUrl)).replace('#passportId#',data.passportId);
                }
                shell.openExternal(url);
            });

        }
        else
        {
            shell.openExternal(url);
        }


    }

});

        //非当前区域点击隐藏承租人选项
        var count1=0;
        var getPar1 = function(tar) {
            if(tar.className=="logo-div"){
                count1++;
            }
            if(tar.parentNode){
                getPar1(tar.parentNode);
            }
        };

        $("body").on("click", function(e) {
            count1=0;
            getPar1(e.target);
            if(count1 == 0) {
                $(".more-content").addClass('xn-hidden');
            }
        });



    var cutwords=function(input,num) {
        var cutNum = num || 2;
        if(input.length>cutNum) {
            return input.substr(input.length-cutNum,cutNum);
        } else {
            return input;
        }
    };

window.onload = function(){
    window.onresize();
}

window.onresize=function(){
        var winHeight=0;
       // 获取窗口高度
        if (window.innerHeight){
            winHeight = window.innerHeight-60;
        } else if ((document.body) && (document.body.clientHeight)){
            winHeight = document.body.clientHeight-60;
        }

        freHeight=winHeight*480/600;
        $("#content").css("height",winHeight+"px");
        $(".friends").css("height",freHeight+"px");
    };

     //logo切换承租人
    $(".xn-talk-logo").on("click",function(){
        if(unionList.length>1){
            var id=$("#unionName").attr("data-id");
            $(".more-content").removeClass("xn-hidden");
            $(".union-ul li").each(function(){
                if($(this).find(".logo-name").attr("data-id")==id){
                    $(this).addClass("li-on").siblings().removeClass("li-on");
                }
            })

        }else{
            $(".more-content").addClass("xn-hidden");
        }

    });

        //tab
        $(".xn-app-nav .app-nav").on("click",function(){


            $('#j-teamInfoContainer').addClass('hide');
            $(this).addClass("app-nav-active").siblings().removeClass("app-nav-active");
            var index=$(this).attr("data-index");
            if(index==6){
                window.location.href =remote.getGlobal('dirname')+"/xnLayout/page/main.html";
            }
            if(index==5){
                yunXin.cloudDisk();
            }
            else if(index == 2)
            {
                yunXin.tenantHome();
            }else if(index==1){
                $("#con-left").removeClass("xn-hidden");
                $("#j-rightPanel").removeClass("xn-hidden");
                $("#j-devices").removeClass("xn-hidden");
                $("#j-file").addClass("xn-hidden");
                $("#no-message-con").addClass("xn-hidden");
                $("#j-tenantHome").addClass("xn-hidden");
            }else{
                $("#con-left").addClass("xn-hidden");
                $("#j-rightPanel").addClass("xn-hidden");
                $("#j-devices").addClass("xn-hidden");
                $("#j-file").addClass("xn-hidden");
                $("#no-message-con").removeClass("xn-hidden");
                $("#j-tenantHome").addClass("xn-hidden");
                //var ifm= $("#iframepage");
                //ifm.src="www.baidu.com";
            }
        });
//拼音首字母比较
function compare(propertyName) {
    return function (object1, object2) {
        var value1 = object1[propertyName];
        var value2 = object2[propertyName];
        var val1 = Pinyin.getFullChars(value1).toLowerCase();
        var val2 = Pinyin.getFullChars(value2).toLowerCase();
        val1=Pinyin.getCamelChars(val1).toLowerCase();
        val2=Pinyin.getCamelChars(val2).toLowerCase();
        if (val1 < val2) {
            return -1;
        }
        else if (val1 > val2) {
            return 1;
        }
        else {
            return 0;
        }

    }
}


var initApp = function(){
    var remote=require('electron').remote;
    var electron = require('electron'); // 控制应用生命周期的模块。
    "use strict";

    var ref = [
        // "createTenantGroupModule",
        "xn.directive.common",
        "xn.filter.common",
        "xn.service.common",
        "xn.directive.navigation",
        "xn.my.filter",
        "xn.my.pan",
        "xn.my.list",
        "ui.bootstrap",
        "xn.directive.form",
        "xn.personCard",
        "xn.cloudFileSelect",
        "xn.directive.location",
        "xn.addFriend",
        "xn.groupMemberAdd",
        "xn.directive.select",
        "xn.sendFile",
        "xn.createTenantGroup",
        "xn.contactSelect",
        "xn.atGroupMember"

    ];


    // var module = angular.module("xn", ref);
    var myApp = angular.module('xn', ref);

    myApp.controller("BodyController",["$scope",function($scope){
        $("#j-messageText").on('paste', contentHandler);
        function contentHandler(e){
            var clipboard = require('electron').clipboard;
            var fs = require("fs");
            if(clipboard.readImage() && !clipboard.readImage().isEmpty())
            {
                var controllerScope = $('div[ng-controller="sendFileController"]').scope();
                controllerScope.nativeImage = clipboard.readImage();
                var buffer =  controllerScope.nativeImage.toJPEG(80);


                controllerScope.$apply(function () {
                    controllerScope.dataBase64 = controllerScope.nativeImage.toDataURL();
                    controllerScope.eleSendFileIsShow = true;
                    controllerScope.setFile("粘贴图片.jpg", buffer.length);
                });


                // var that = yunXin,
                //     scene = that.$chatEditor.data('type'),
                //     to = that.$chatEditor.data('to');
                // var blob = new Blob(buffer, {type:"application/octet-stream"});
                // {
                //     yunXin.mysdk.nim.sendFile({
                //         scene: scene,
                //         to: to,
                //         type: 'image',
                //         dataURL:clipboard.readImage().toDataURL(),
                //         uploadprogress: function (data) {
                //             console && console.log(data.percentageText);
                //         },
                //         uploaderror: function () {
                //             console && console.log('上传失败');
                //         },
                //         uploaddone: function (file) {
                //             console && console.log('上传完成，服务器处理中...');
                //         },
                //         beforesend: function (msgId) {
                //             console && console.log('正在发送消息, id=' + msgId);
                //         },
                //         done: yunXin.sendMsgDone.bind(yunXin)
                //     });
                // }

            }
            // var textArea = $(this);
            // setTimeout(function(){
            //     console.log(textArea.val());
            // }, 200);
        };

       $scope.global={
           platform:require('electron').remote.getGlobal('platform') //系统环境
       }
        $scope.screenShot= function () {
            var electron = require("electron");
            var Application = electron.remote.app;
            var AppPath = Application.getAppPath() + '/';
            var screenshot = require('electron').remote.require('desktop-screenshot');
            console.log(__dirname);
            screenshot(AppPath + "/screenshot.png", function(error, complete) {
                if(error)
                    console.log("Screenshot failed", error);
                else
                {
                    var electron = require('electron'); // 控制应用生命周期的模块。
                    var BrowserWindow = electron.remote.BrowserWindow;  // 创建原生浏览器窗口的模块
                    var size = require('electron').screen.getPrimaryDisplay().size;
                    var mainWindow = new BrowserWindow({fullscreen:true, alwaysOnTop:false, //transparent:true,thickFrame:false,  frame: false,  x:0, y:0, width:size.width, height:size.height,
                        webPreferences:
                        {webSecurity: false,allowDisplayingInsecureContent:true, allowRunningInsecureContent:true}});

                    mainWindow.setMenuBarVisibility(false);

                    if(require('electron').remote.getGlobal('isDebug') == true)
                    {
                        mainWindow.openDevTools();
                    }
                    mainWindow.class = 'screenShot';
                    console.log(__dirname);
                    mainWindow.loadURL(("http://127.0.0.1:#port#/xntalk/screenShot.html").replace("#port#", require('electron').remote.getGlobal('port')));
                    mainWindow.on('closed', function () {

                        var clipboard = require('electron').clipboard;
                        var fs = require("fs");
                        if(clipboard.readImage() && !clipboard.readImage().isEmpty())
                        {
                            //   var buffer = clipboard.readImage().toJPEG(80);

                            var controllerScope = $('div[ng-controller="sendFileController"]').scope();
                            controllerScope.nativeImage = clipboard.readImage();
                            var buffer =  controllerScope.nativeImage.toJPEG(80);
                            controllerScope.setFile("粘贴图片.jpg", buffer.length);

                            controllerScope.$apply(function () {

                                controllerScope.dataBase64 = controllerScope.nativeImage.toDataURL();
                                controllerScope.eleSendFileIsShow = true;
                            })
                            //
                            //
                            // var that = yunXin,
                            //     scene = that.$chatEditor.data('type'),
                            //     to = that.$chatEditor.data('to');
                            // var blob = new Blob(buffer, {type:"application/octet-stream"});
                            // {
                            //     yunXin.mysdk.nim.sendFile({
                            //         scene: scene,
                            //         to: to,
                            //         type: 'image',
                            //         dataURL:clipboard.readImage().toDataURL(),
                            //         uploadprogress: function (data) {
                            //             console && console.log(data.percentageText);
                            //         },
                            //         uploaderror: function () {
                            //             console && console.log('上传失败');
                            //         },
                            //         uploaddone: function (file) {
                            //             console && console.log('上传完成，服务器处理中...');
                            //         },
                            //         beforesend: function (msgId) {
                            //             console && console.log('正在发送消息, id=' + msgId);
                            //         },
                            //         done: yunXin.sendMsgDone.bind(yunXin)
                            //     });
                            // }

                        }
                    } );

                }
            });

        };

        $scope.tabNav=function (name,router) {

            window.location.href=remote.getGlobal('dirname')+"/"+name+"/page/main.html#/"+router;
        }

    }]);
    myApp.directive('createTenantGroup',function () {
        return {
            restrict:'EAC',
            templateUrl:'createTenantGroup.html',
            replace:true

        };
    });

    myApp.directive('contactSelect',function () {
        return {
            restrict:'EAC',
            templateUrl:'contactSelect.html',
            replace:true,
            scope:true

        };
    });


    myApp.directive('atGroupMember',function () {
        return {
            restrict:'EAC',
            templateUrl:'atGroupMember.html',
            replace:true

        };
    });
};






