;!window["xnI18n"]&&(function (global) {
  var prompts={};

  /**
   * 获取当前要显示的语言
   */
  var getLanguage = function () {
    // 优先从URL中获取语言配置
    var lang = getUrlParam("lang");
    if(!lang) {
      // 如果URL中不存在语言信息，从Cookie中获取语言
      lang = getCookie("FOREIGN_LANGUAGE");
    }
    if(!lang) {
      // 如果Cookie中也不存在语言信息，获取非IE浏览器默认的语言设置
      lang = navigator.language;
      if(!lang) {
        // 获取IE浏览器中的语言
        lang = navigator.browserLanguage;
      }
    }
    if(!lang) {
      lang = "ZH_CN";
    } else {
      lang = lang.replace("-", "_").toUpperCase();
    }
    setLanguage(lang);
    return lang;
  };

  /**
   * 设置当前语言
   * @param language  语言
   */
  var setLanguage = function (language) {
    setCookie("FOREIGN_LANGUAGE", language, 60*60*24*365);
  };

  /**
   * 加载所有要显示的语言信息
   */
  var loadData = function() {
    var lang = getLanguage();
    $.post("/lang/" + lang + ".json", function (data) {
      prompts = data;
    })
  };
  loadData();

  /**
   * 获取
   * @param code
   * @param params
   */
  var get = function(code, params) {
    var lang = getLanguage();
    var message = prompts[code];
    if(message == undefined || message == null) {
      $.post("/lang/" + lang + ".json?code=" + code);
      message = code;
    } else {
      if(params) {
        $.each(params, function (key, value) {
          message = message.replace("{"+key+"}",value);
        })
      }
    }
    return message;
  };

  var core={
    get : get,
    getLanguage : getLanguage,
    setLanguage : setLanguage
  };
  global.xnI18n = core;


  // 获取url中的参数
  function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
  }

  // 获取Cookie的值
  function getCookie(name) {
    if (document.cookie.length>0) {
      var c_start=document.cookie.indexOf(name + "=");
      if (c_start!=-1) {
        c_start=c_start + name.length+1;
        var c_end=document.cookie.indexOf(";",c_start);
        if (c_end==-1) c_end=document.cookie.length;
        return unescape(document.cookie.substring(c_start,c_end));
      }
    }
  }

  // 设置Cookie的值
  function setCookie(name, value, duration) {
    var newDate=new Date();
    var expires = "";
    if(duration) {
      newDate.setDate(newDate.getTime() + duration);
      expires = ";expires=" + newDate.toGMTString();
    }
    document.cookie=name + "=" + escape(value) +";path=/;domain="+ window.location.host + expires;
  }

})(window);