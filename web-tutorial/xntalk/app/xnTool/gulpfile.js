// 获取依赖
var gulp        = require('gulp'),
    childProcess  = require('child_process'),
    electron      = require('electron-prebuilt');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var less = require('gulp-less');
var gzip = require('gulp-gzip');
var clean = require('gulp-clean');
const browserSync = require('browser-sync');
const cleanCss = require('gulp-clean-css');




        var path= "";
        var demoName="app";


    //版本控制
    var bootstrapCssVersion = "1.0.0";
    var angularUiVersion="1.0.1";


    var angularVersion="1.3.9";
    var xnAngularAnimateVersion="1.3.9";
    var angularAriaVersion="1.3.9";
    var angularMaterialVersion="1.3.11";
    var angularRouteVersion="1.3.11";

    var angularTreeVersion="1.0.0";
    var rightMenuVersion="1.0.0";

    var xnStyleCommonVersion="1.1.17";
    var fontVersion="1.0.13";
    var ngSortableVersion="1.0.0";
    var loadingVersion="0.0.2";


var buildBaseFiles = [
     "./spm_modules/angular/" + angularVersion + "/angular.js",
     "./spm_modules/xn-angular-animate/" + xnAngularAnimateVersion + "/angular-animate.js",
     "./spm_modules/angular-aria/" + angularAriaVersion + "/angular-aria.js",
     "./spm_modules/angular-material/" + angularMaterialVersion + "/angular-material.js",
     "./spm_modules/angular-route/" + angularRouteVersion + "/angular-route.js",
     "./spm_modules/angular-ui/" + angularUiVersion + "/bootstraptpls.js"
];



//压缩依赖进来的js文件路径  build-global-js
var buildGlobalFiles = [
    "./spm_modules/angular-tree/" + angularTreeVersion + "/angular-tree-control.js",
    "./spm_modules/right-menu/" + rightMenuVersion + "/ng-context-menu.min.js",
    "./spm_modules/xn-directive-loading/" + loadingVersion + "/directive/nprogress.js"
];



var buildLocalFiles=[
  "scripts/" + demoName + ".js",
  "scripts/" + demoName + "-directive.js",
  "scripts/" + demoName + "-filter.js",
  "scripts/" + demoName + "-service.js",
  "scripts/" + demoName + "-router.js",
  "scripts/" + demoName + "-template.js",
  "scripts/controllers/*.js",

];

//图片处理

var copyCssImagesFiles = [
     path+"/styles/images/*"
];

//字体
var fontFiles = [
    "spm_modules/xn-icon-common/" + fontVersion + "/font/iconfont.eot",
    "spm_modules/xn-icon-common/" + fontVersion + "/font/iconfont.ttf",
    "spm_modules/xn-icon-common/" + fontVersion + "/font/iconfont.woff",
    "spm_modules/bootstrap-css/" + bootstrapCssVersion + "/font/glyphicons-halflings-regular.eot",
    "spm_modules/bootstrap-css/" + bootstrapCssVersion + "/font/glyphicons-halflings-regular.ttf",
    "spm_modules/bootstrap-css/" + bootstrapCssVersion + "/font/glyphicons-halflings-regular.woff",
    "spm_modules/bootstrap-css/" + bootstrapCssVersion + "/font/glyphicons-halflings-regular.svg"
];

///////////////////////////////////////////////////////////////////////////////////////////////////////版本公共的js

gulp.task("build-base-js", function () {
    gulp.src(buildBaseFiles)
        .pipe(concat("base.src.js"))
        // .pipe(uglify())
        .pipe(rename("base.min.js"))
        .pipe(gulp.dest(path+"/dist/scripts/"))
        .pipe(gzip())
        .pipe(gulp.dest(path+"/dist/scripts/"));
});

// 合并，压缩指令，过滤器，服务等js到common.min.js
gulp.task("build-global-js", function () {
    gulp.src(buildGlobalFiles)
        .pipe(concat("global.src.js"))
        .pipe(uglify())
        .pipe(rename("global.min.js"))
        .pipe(gulp.dest(path+"/dist/scripts/"))
        .pipe(gzip())
        .pipe(gulp.dest(path+"/dist/scripts/"));
    console.log(buildGlobalFiles);
});


// css合并，压缩文件
gulp.task("build-global-css", function () {
    gulp.src(buildGlobalCssFiles)
        .pipe(concat("global.src.css"))
        .pipe(cleanCss({compatibility:"ie8"}))
        .pipe(rename("global.min.css"))
        .pipe(gulp.dest(path+"/dist/styles/"))
        .pipe(gzip())
        .pipe(gulp.dest(path+"/dist/styles/"));
});


gulp.task("build-local-js", ["clean-local-js"], function () {
    gulp.src(buildLocalFiles)
        .pipe(concat("local.src.js"))
       // .pipe(uglify())
        .pipe(rename("local.min.js"))
        .pipe(gulp.dest("dist/scripts/"))
        // .pipe(gzip())
        // .pipe(gulp.dest("dist/scripts/"));
});

// css合并，压缩文件
gulp.task("build-local-less", ["clean-local-css"], function () {
    gulp.src(["styles/*.less"])
        .pipe(concat("local.src.less"))
        .pipe(less())
        .pipe(cleanCss({compatibility:"ie8"}))
        .pipe(rename("local.min.css"))
        .pipe(gulp.dest("dist/styles/"))
        .pipe(gzip())
        .pipe(gulp.dest("dist/styles/"));
});


//清除js样式
gulp.task("clean-local-js", function () {
    gulp.src(path+"/dist/**/local.min.js", {read: false})
        .pipe(clean());
});

//清除css样式
gulp.task("clean-local-css", function () {
    gulp.src(path+"/dist/**/local.min.css", {read: false})
        .pipe(clean());
});


// 图片处理
gulp.task('copy-css-images', function () {
    gulp.src(copyCssImagesFiles)
        .pipe(gulp.dest(path+"/dist/styles/images/"));
});


// 字体xn-icon
gulp.task('copy-font', function () {
    gulp.src(fontFiles)
        .pipe(gulp.dest(path+"/dist/styles/font/"));
});
//清除字font文件夹
gulp.task("clean-font", function () {
    gulp.src(["./dist/styles/font/*.ttf", "./dist/styles/font/*.eot", "./dist/styles/font/*.svg", "./dist/styles/font/*.woff"], {read: false})
        .pipe(clean());
});

gulp.task("watch", function () {
    // gulp.watch("scripts/*.js",["lint",browserSync.reload]);
    gulp.watch(path+"/styles/*.less", ["build-local-less", browserSync.reload]);
    gulp.watch(buildLocalFiles, ["build-local-js", browserSync.reload]);
    gulp.watch(path+"/styles/images/", ["copy-css-images", browserSync.reload]);
    gulp.watch(path+"/views/*.html", ["bs-reload"]);
});


//浏览器同步
gulp.task('browser-sync', function () {
    browserSync({
        proxy: "http://localhost:8080"
    });
});


// 创建 gulp 任务
gulp.task('run', function () {
    childProcess.spawn(electron, [path], { stdio: 'inherit' });
});

// 定义develop任务在日常开发中使用
gulp.task("dev1", ["build-base-js", "build-global-js", "build-local-js", "build-global-css", "build-local-less","copy-css-images", "copy-font"], function () {
    console.log("运行完成dev");
});
// 定义develop任务在日常开发中使用
gulp.task("dev", ["build-local-js", "build-local-less"], function () {
    console.log("运行完成dev");
});


// gulp命令默认启动的就是default认为,这里将clean任务作为依赖,也就是先执行一次clean任务,流程再继续.
gulp.task("default", ["browser-sync", "dev"], function () {
    gulp.run("watch");
});
