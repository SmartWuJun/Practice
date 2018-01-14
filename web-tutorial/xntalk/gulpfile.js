// 获取依赖

const childProcess  = require('child_process');
const electron      = require('electron-prebuilt');
var less = require('gulp-less');
    //代码压缩
const gulp = require('gulp');
const gulpLoadPlugins = require( "gulp-load-plugins");
const plugins = gulpLoadPlugins();
const cleanCss = require('gulp-clean-css');
const path= "./app";
const outPutPath= "./app";
const demoName="app";



    //版本控制
    var bootstrapCssVersion = "1.0.0";
    var xnCommonVersion="1.1.7";
    var xnFormVersion="1.0.5";
    var xnCalendarVersion="1.0.9";
    var xnLocationVersion="1.3.1";
    var xnSelectVersion="1.3.1";
    var loadingVersion="0.0.2";
    var styleCommonVersion="2.0.4";

var angularTreeVersion="1.0.0";
var angularMaterialVersion="1.3.11";


var xnAngularAnimateVersion="1.3.9";
var angularAriaVersion="1.3.9";



//压缩依赖进来的js文件路径  build-global-js
var buildBaseFiles = [
    "./app/vender/base/jquery.js",
    "./app/vender/base/angular.js",
    "./app/vender/base/bootstraptpls.js",
    "./app/vender/base/browser.js",
    "./app/vender/base/method.js",
    "./app/vender/base/underscore.js"
];

//压缩依赖进来的js文件路径  build-global-js
var buildGlobalFiles = [

    "./spm_modules/xn-angular-animate/" + xnAngularAnimateVersion + "/angular-animate.js",
    "./spm_modules/angular-aria/" + angularAriaVersion + "/angular-aria.js",
    "./spm_modules/angular-material/" + angularMaterialVersion + "/angular-material.js",

    "./spm_modules/xn-common/" + xnCommonVersion + "/directive/commons.js",
    "./spm_modules/xn-directive-form/" + xnFormVersion + "/directive/forms.js",
    "./spm_modules/xn-directive-calendar/" + xnCalendarVersion + "/directive/calendars.js",
    "./spm_modules/xn-directive-location/" + xnLocationVersion + "/directive/locations.js",
    "./spm_modules/xn-directive-select/" + xnSelectVersion + "/directive/selects.js",
    "./spm_modules/xn-directive-loading/" + loadingVersion + "/directive/nprogress.js",
    "./spm_modules/xn-directive-loading/" + loadingVersion + "/directive/loading.js",
    "./spm_modules/angular-tree/" + angularTreeVersion + "/angular-tree-control.js",


];

//指令里的css
var buildGlobalCssFiles = [
     "./spm_modules/bootstrap-css/" + bootstrapCssVersion + "/bootstrap.css",
     "./spm_modules/xn-style-common/" + styleCommonVersion + "/xn-style-common.less",
    "./spm_modules/xn-common/" + xnCommonVersion + "/directive/style.css",
    "./spm_modules/xn-directive-calendar/" + xnCalendarVersion + "/directive/style.css",
    "./spm_modules/xn-directive-location/" + xnLocationVersion + "/directive/style.css",
    "./spm_modules/xn-directive-select/" + xnSelectVersion + "/directive/style.css",
    "./spm_modules/xn-directive-select/" + loadingVersion + "/directive/style.css",
    "./spm_modules/angular-tree/" + angularTreeVersion + "/css/tree-control.css",
    "./spm_modules/angular-material/" + angularMaterialVersion + "/angular-material.css",

];



//图片处理
var copyCssImagesFiles = [
    "./spm_modules/xn-directive-select/" + xnSelectVersion + "/directive/images/*",
    "./spm_modules/angular-tree/" + angularTreeVersion + "/css/images/*",
];

//字体
var fontFiles = [
    "spm_modules/bootstrap-css/" + bootstrapCssVersion + "/font/glyphicons-halflings-regular.eot",
    "spm_modules/bootstrap-css/" + bootstrapCssVersion + "/font/glyphicons-halflings-regular.ttf",
    "spm_modules/bootstrap-css/" + bootstrapCssVersion + "/font/glyphicons-halflings-regular.woff",
    "spm_modules/bootstrap-css/" + bootstrapCssVersion + "/font/glyphicons-halflings-regular.svg"
];

///////////////////////////////////////////////////////////////////////////////////////////////////////版本公共的js


// 合并，压缩指令，过滤器，服务等js到common.min.js
gulp.task("build-base-js", function () {
    gulp.src(buildBaseFiles)
        .pipe(plugins.concat("base.src.js"))
        .pipe(plugins.uglify())
        .pipe(plugins.rename("base.min.js"))
        .pipe(gulp.dest(outPutPath+"/dist/scripts/"))
        .pipe(plugins.gzip())
        .pipe(gulp.dest(outPutPath+"/dist/scripts/"));
    console.log(buildGlobalFiles);
});

// 合并，压缩指令，过滤器，服务等js到common.min.js
gulp.task("build-global-js", function () {
    gulp.src(buildGlobalFiles)
        .pipe(plugins.concat("global.src.js"))
        .pipe(plugins.uglify())
        .pipe(plugins.rename("global.min.js"))
        .pipe(gulp.dest(outPutPath+"/dist/scripts/"))
        .pipe(plugins.gzip())
        .pipe(gulp.dest(outPutPath+"/dist/scripts/"));
    console.log(buildGlobalFiles);
});

// css合并，压缩文件
gulp.task("build-global-css", function () {
    gulp.src(buildGlobalCssFiles)
        .pipe(plugins.concat("global.src.css"))
        .pipe(less())
        .pipe(cleanCss({compatibility:"ie8"}))
        .pipe(plugins.rename("global.min.css"))
        .pipe(gulp.dest(outPutPath+"/dist/styles/"))
        .pipe(plugins.gzip())
        .pipe(gulp.dest(outPutPath+"/dist/styles/"));
});
// css合并，压缩文件
gulp.task("build-base-css", function () {
    gulp.src(buildBaseCssFiles)
        .pipe(plugins.concat("base.src.css"))
        .pipe(cleanCss({compatibility:"ie8"}))
        .pipe(plugins.rename("base.min.css"))
        .pipe(gulp.dest(outPutPath+"/dist/styles/"))
        .pipe(plugins.gzip())
        .pipe(gulp.dest(outPutPath+"/dist/styles/"));
});

//清除js样式
gulp.task("clean-local-js", function () {
    gulp.src(path+"/dist/**/local.min.js", {read: false})
        .pipe(plugins.clean());
});

//清除css样式
gulp.task("clean-local-css", function () {
    gulp.src(path+"/dist/**/local.min.css", {read: false})
        .pipe(plugins.clean());
});

// 图片处理
gulp.task('copy-css-images', function () {
    gulp.src(copyCssImagesFiles)
        .pipe(gulp.dest(outPutPath+"/dist/styles/images/"));
});

// 字体xn-icon
gulp.task('copy-font', function () {
    gulp.src(fontFiles)
        .pipe(gulp.dest(outPutPath+"/dist/styles/font/"));
});

// 定义develop任务在日常开发中使用
gulp.task("dev", ["build-base-js","build-global-js","build-global-css","copy-font","copy-css-images"], function () {
    console.log("运行完成dev");
});

// gulp命令默认启动的就是default认为,这里将clean任务作为依赖,也就是先执行一次clean任务,流程再继续.
gulp.task("default", ["run"], function () {
});


// 创建 gulp  run  启动任务
gulp.task('run', function () {
    console.log(path);
    var process = childProcess.spawn(electron,  [path]);//, { stdio: 'inherit' }

// 捕获标准输出并将其打印到控制台
    process.stdout.on('data', function (data) {
        console.log('标准输出：' + data);
    });

// 捕获标准错误输出并将其打印到控制台
    process.stderr.on('data', function (data) {
        console.log('标准错误输出：' + data);
    });
});

