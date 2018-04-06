

    //代码压缩
const gulp = require('gulp');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var less = require('gulp-less');
var gzip = require('gulp-gzip');
var clean = require('gulp-clean');
const browserSync = require('browser-sync');
const cleanCss = require('gulp-clean-css');

    var demeName="xnMain";

    var xnStyleCommonVersion="2.0.4";



var buildLocalFiles=[
    "scripts/main.js",
    "scripts/*.js",
    "scripts/controllers/*.js"
];


var buildLocalLess=[
    "../../spm_modules/xn-style-common/"+xnStyleCommonVersion+"/xn-style-common.less",
    "styles/base.css",
    "styles/xntalk.less",
];


    //图片处理
var copyCssImagesFiles = [
     "styles/images/*"
];

gulp.task("build-local-js",["clean-local-js"],function () {
    gulp.src(buildLocalFiles)
        .pipe(concat("local.src.js"))
       .pipe(uglify())
        .pipe(rename("local.min.js"))
        .pipe(gulp.dest("dist/scripts/"))
        // .pipe(gzip())
        // .pipe(gulp.dest("dist/scripts/"));
});



// css合并，压缩文件
gulp.task("build-local-less", function () {
    gulp.src(buildLocalLess)
        .pipe(concat("local.src.less"))
        .pipe(less())
        .pipe(cleanCss({compatibility:"ie8"}))
        .pipe(rename("local.min.css"))
        .pipe(gulp.dest("dist/styles/"))
        .pipe(gzip())
        .pipe(gulp.dest("dist/styles/"));
    // ["clean-local-css"],
});

// 图片处理
gulp.task('copy-css-images', function () {
    gulp.src(copyCssImagesFiles)
        .pipe(gulp.dest("dist/styles/images/"));
});


//清除js样式
gulp.task("clean-local-js", function () {
    gulp.src("dist/styles/local.min.js", {read: false})
        .pipe(clean());
});

//清除css样式
gulp.task("clean-local-css", function () {
    gulp.src("/dist/styles/local.min.css", {read: false})
        .pipe(clean());
});


gulp.task("watch", function () {
    // gulp.watch("scripts/*.js",["lint",browserSync.reload]);
    gulp.watch(buildLocalLess, ["build-local-less", browserSync.reload]);
    gulp.watch(buildLocalFiles, ["build-local-js", browserSync.reload]);
    gulp.watch("styles/images/", ["copy-css-images", browserSync.reload]);
    gulp.watch("page/*.html");
});


// 定义develop任务在日常开发中使用
gulp.task("dev", ["build-local-js", "build-local-less","copy-css-images"], function () {
    console.log("运行完成dev");
});


// gulp命令默认启动的就是default认为,这里将clean任务作为依赖,也就是先执行一次clean任务,流程再继续.
gulp.task("default", ["dev"], function () {
    console.log("开始监听")
    gulp.run("watch");
});

