var gulp = require("gulp");
var gulpLoadPlugins = require("gulp-load-plugins");
var plugins = gulpLoadPlugins();

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var less = require('gulp-less');
var gzip = require('gulp-gzip');
var clean = require('gulp-clean');
const browserSync = require('browser-sync');
const cleanCss = require('gulp-clean-css');

////////////////////////////////////////////////////////////////////////////////////////////////////////////版本
//版本


var demoName="xntalk_pc";

//css
var bootstrapCssVersion="1.0.0";
var fontVersion="1.0.13";

var fontPanVersion="1.0.5";
var xnStyleCommonCommonVersion="2.0.4";


//js
var angularVersion="1.0.0";
var angularRouteVersion="1.3.9";
var angularUiVersion="1.0.0";
var underscoreVersion="1.0.0";
var browserVersion="1.0.0";
var xnDirectiveCommonVersion="2.0.7";
var xnDirectiveNavigationVersion="1.0.0";
var xnFilterCommonVersion="1.0.0";
var xnServiceCommonVersion="1.0.0";
var xnServiceFoundationVersion="1.0.0";
var xnServiceMethodVersion="1.0.0";
var xnDirectiveFormVersion="1.0.5";
var xnDirectiveCalendarVersion="1.0.9";
var xnDirectiveLocationVersion="1.3.1";
var xnDirectiveSelectVersion="1.1.1";

//测试版本
var angularMocksVersion="1.3.14";

//路径
var fontFiles=[
    "spm_modules/xn-icon-common/"+fontVersion+"/font/iconfont.eot",
    "spm_modules/xn-icon-common/"+fontVersion +"/font/iconfont.ttf",
    "spm_modules/xn-icon-common/"+fontVersion+"/font/iconfont.woff"
];

var buildBaseFiles=[
        "spm_modules/xn-angular/"+angularVersion+"/angular.js",
        "spm_modules/angular-route/" + angularRouteVersion + "/angular-route.js",
        "spm_modules/xn-browser/"+browserVersion+"/browser.js",
        "spm_modules/xn-underscore/"+underscoreVersion+"/underscore.js",
        "spm_modules/angular-ui/"+angularUiVersion+"/bootstraptpls.js"];



//压缩本地的js文件路径 build-local-js
var buildLocalFiles=[
        "page/js/"+demoName+".js",
        "page/js/3rd/*.js",
        "page/js/widget/*.js"];

var mainFile=[
    "page/js/pinyin.js",
    "page/js/main.js",
    "page/js/pan.js",
    "page/js/personCard.js",
    "page/js/cloudFileSelect.js",
    "page/js/addFriend.js",
    "page/js/addressList.js"

];



//压缩依赖进来的js文件路径  build-global-js
var buildGlobalFiles=[
       "./spm_modules/xn-service-common/"+xnServiceCommonVersion+"/service/commons.js",
        "./spm_modules/xn-service-foundation/"+xnServiceFoundationVersion+"/service/foundations.js",
        "./spm_modules/xn-service-method/"+xnServiceMethodVersion+"/service/method.js",
        "./spm_modules/xn-filter-common/"+xnFilterCommonVersion+"/filter/commons.js",
        "./spm_modules/xn-directive-common/"+xnDirectiveCommonVersion+"/directive/commons.js",
        "./spm_modules/xn-directive-navigation/"+xnDirectiveNavigationVersion+"/directive/navigations.js",
        "./spm_modules/xn-directive-form/"+xnDirectiveFormVersion+"/directive/forms.js"
         ,"./spm_modules/xn-directive-location/"+xnDirectiveLocationVersion+"/directive/locations.js"
         ,"./spm_modules/xn-directive-calendar/"+xnDirectiveCalendarVersion+"/directive/calendars.js"
    , "./spm_modules/xn-directive-select/"+xnDirectiveSelectVersion+"/directive/selects.js"
];


//指令里的css
var buildGlobalCssFiles=[
        "./spm_modules/bootstrap-css/"+bootstrapCssVersion+"/bootstrap.css",
        "./spm_modules/xn-icon-common/"+fontVersion+"/iconfont.css",
        "./spm_modules/xn-icon-pan/"+fontPanVersion+"/iconpanfont.css",
        "./spm_modules/xn-directive-common/"+xnDirectiveCommonVersion+"/directive/style.css"
         ,"./spm_modules/xn-directive-location/"+xnDirectiveLocationVersion+"/directive/style.css"
         ,"./spm_modules/xn-directive-calendar/"+xnDirectiveCalendarVersion+"/directive/style.css"
    ,"./spm_modules/xn-directive-select/"+xnDirectiveSelectVersion+"/directive/style.css"
];


var copyCssImagesFiles=[
    "./page/css/images/*",
    "./spm_modules/xn-style-common/"+xnStyleCommonCommonVersion+"/images/*"
];


var copyFontFiles=[
        "./spm_modules/bootstrap-css/"+bootstrapCssVersion+"/font/*"
];
///////////////////////////////////////////////////////////////////////////////////////////////////////版本公共的js

    gulp.task("build-base-js", function() {
            gulp.src(buildBaseFiles)
                .pipe(concat("base.src.js"))
                //.pipe(uglify())
                .pipe(rename("base.min.js"))
                .pipe(gulp.dest("./dist/scripts/"));
        });
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // 图片处理
    gulp.task('copy-css-images', function(){
            gulp.src(copyCssImagesFiles)
            .pipe(gulp.dest("./dist/styles/images/"));
    });
        // 字体添加
    gulp.task('copy-font', function(){
            gulp.src(copyFontFiles)
            .pipe(gulp.dest("./dist/styles/font/"));
    });
    // 字体xn-icon
    gulp.task('copy-xn-icon', function(){
           gulp.src(fontFiles)
           .pipe(gulp.dest("dist/styles/font/")
           );
    });
    //清除字font文件夹
    gulp.task("clean-font", function(){
        gulp.src(["./dist/styles/font/*.ttf","./dist/styles/font/*.eot","./dist/styles/font/*.svg","./dist/styles/font/*.woff"], { read:false })
            .pipe(clean());
    });

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
     // 合并，压缩指令，过滤器，服务等js到common.min.js
    gulp.task("build-global-js", function() {
        gulp.src(buildGlobalFiles)
            .pipe(concat("global.src.js"))
            //.pipe(uglify())
            .pipe(rename("global.min.js"))
            .pipe(gulp.dest("./dist/scripts/"));
    });


// css合并，压缩文件
    gulp.task("build-global-css", function() {
        gulp.src(buildGlobalCssFiles)
            .pipe(concat("global.src.css"))
            .pipe(cleanCss({compatibility:"ie8"}))
            .pipe(rename("global.min.css"))
            .pipe(gulp.dest("./dist/styles/"));
    });


    //清除css样式
    gulp.task("clean-all-css", function(){
        gulp.src("./dist/styles/*.css",{ read:false })
            .pipe(clean());
    });

    //清除js样式
    gulp.task("clean-all-js", function(){
        gulp.src("./dist/scripts/*.js", { read:false })
            .pipe(clean());
    });

    //清除css样式
    gulp.task("clean-local-css", function(){
        gulp.src("./dist/**/local.min.css", { read:false })
            .pipe(clean());
    });

    //清除js样式
    gulp.task("clean-local-js", function(){
        gulp.src("./dist/**/local.min.js", { read:false })
            .pipe(clean());
    });

var buildLocalLess=["./spm_modules/xn-style-common/"+xnStyleCommonCommonVersion+"/xn-style-common.less","./page/styles/*.less"]
    // css合并，压缩文件
    gulp.task("build-local-less",["clean-local-css"], function() {
        gulp.src(buildLocalLess)
            .pipe(concat("local.src.less"))
            .pipe(less())
            .pipe(cleanCss({compatibility:"ie8"}))
            .pipe(rename("local.min.css"))
            .pipe(gulp.dest("./dist/styles/"));

    });


    gulp.task("build-local-js",["clean-local-js"],function() {
        gulp.src(buildLocalFiles)
            .pipe(concat("local.src.js"))
            //.pipe(uglify())
            .pipe(rename("local.min.js"))
            .pipe(gulp.dest("./dist/scripts/"));
    });
   gulp.task("main-js",["clean-local-js"],function() {
        gulp.src(mainFile)
            .pipe(concat("main.src.js"))
            //.pipe(uglify())
            .pipe(rename("main.min.js"))
            .pipe(gulp.dest("./dist/scripts/"));
    });

    gulp.task("watch", function() {
        gulp.watch(buildLocalLess, ["build-local-less",browserSync.reload]);
        gulp.watch("scripts/**/*.js", ["build-local-js",browserSync.reload]);
        gulp.watch("styles/images/", ["copy-css-images",browserSync.reload]);
        gulp.watch("templates/**/*.vm", ["bs-reload"]);
    });

    //检查错误代码
    gulp.task('lint', function() {
        gulp.src('./scripts/*.js')
            .pipe(jshint())
            .pipe(jshint.reporter('default'));
    });

    //浏览器同步
    gulp.task('browser-sync', function() {
        browserSync({
            proxy: "http://localhost:80"
        });
    });

    // 定义develop任务在日常开发中使用
    gulp.task("clean-all",["clean-all-css","clean-all-js","clean-font"],function(){
        console.log("运行完成clean-all");
    });



    // 定义develop任务在日常开发中使用
    gulp.task("dev",["build-base-js","build-global-js","build-local-js","build-global-css","build-local-less","copy-css-images","copy-font","copy-xn-icon","main-js"],function(){
        console.log("运行完成dev");
    });


    // Reload all Browsers
    gulp.task('bs-reload', function () {
        console.log("浏览器重新加载");
        browserSync.reload();
    });


    // gulp命令默认启动的就是default认为,这里将clean任务作为依赖,也就是先执行一次clean任务,流程再继续.
    gulp.task("default",["browser-sync","clean-all","dev"], function() {
        gulp.run("watch");

    });
