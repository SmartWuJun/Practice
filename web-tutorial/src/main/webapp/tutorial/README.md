#Before you install the karma
cnpm install policyfile -g
 installation





 # tutorial模块
 
 ###基本要求
 1、所以组件及指令从cdn读取
 2、公共资源为必引内容
 ```
     #*引用公共的样式 *#
     <link rel="Shortcut Icon"  href="$config.getCdnUrl('img/favicon.ico')" type="image/x-icon">      #*图标*#
     <link rel="stylesheet" href="$config.getCdnUrl('css/xn-bootstrap/1.0.2/bootstrap.min.css')" >   #*bootstrap样式*#
     <link rel="stylesheet" href="$config.getCdnUrl("css/xn-global/1.0.0/xn-global.min.css")"  />      #*公共cdn样式*#
     <link rel="stylesheet" href="$config.getCdnUrl('font/xn-icon-common/2.0.4/iconfont.min.css')" /> #*公共字体库*#
 ```



# 卸载全局的 gulp
npm uninstall gulp -g

# 安装全局的 gulp 4.0
npm install "gulpjs/gulp#4.0" -g
npm install "gulpjs/gulp-cli#4.0" -g

# 到项目目录里删掉本地的 gulp
npm rm gulp --save-dev

# 安装本地的 gulp 4.0
npm install "gulpjs/gulp#4.0" --save-dev
