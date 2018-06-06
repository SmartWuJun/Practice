
String.prototype.Right = function(len)
{

    if(isNaN(len)||len==null)
    {
        len = this.length;
    }
    else
    {
        if(parseInt(len)<0||parseInt(len)>this.length)
        {
            len = this.length;
        }
    }

    return this.substring(this.length-len,this.length);
}



var userUID = localStorage.getItem("uid");


var app = angular.module('myApp', []);

app.controller('myControl', function($scope)
{
    var yunXin = {
        init: function () {
            //this.initNode();
            //this.initEmoji();
            this.cache = new Cache();
            this.mysdk = new SDKBridge(this,this.cache);
            myTeam.init(this.cache,this.mysdk);
            notification.init(this.cache,this.mysdk);
            this.firstLoadSysMsg = true;
            this.totalUnread =0;
            // this.addEvent();
        },
        showMe:function()
        {
            var that = this;
            var user = that.cache.getUserById(userUID);
            $scope.$apply(function() {
                console.log("###################");
                if(user.avatar != undefined && user.avatar != null && user.avatar.length > 0)
                {
                    $scope.loginUserAvatar = ("background-image:url({{loginUserAvatar}});").replace("{{loginUserAvatar}}", user.avatar);
                    $scope.loginUserAvatarName = "";
                }
                else
                {
                    String.prototype.Right = function(len)
                    {

                        if(isNaN(len)||len==null)
                        {
                            len = this.length;
                        }
                        else
                        {
                            if(parseInt(len)<0||parseInt(len)>this.length)
                            {
                                len = this.length;
                            }
                        }

                        return this.substring(this.length-len,this.length);
                    }
                    $scope.loginUserAvatarName = String.right(user.nick);
                }
                $scope.loginUserName = user.nick;
            });
            localStorage.setItem('nickName',user.nick);
            localStorage.setItem('avatar',user.avatar);
        },
        initInfo:function(person, team)
        {

        }
    }
    yunXin.init();


     $scope.loginUserAvatar = ("background-color:%1").replace("%1", xn_utail.getCodeColor(userUID));

//background-image:url({{loginUserAvatar}});background-color:{{loginUserAvatar}}
});




