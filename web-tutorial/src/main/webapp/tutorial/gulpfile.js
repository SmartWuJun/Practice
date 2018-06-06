var gulp = require("gulp");
var gulpLoadPlugins = require("gulp-load-plugins");
var plugins = gulpLoadPlugins();
var cleanCss = require('gulp-clean-css');
var browserSync = require('browser-sync');
var paths = require('gulp-watch-path');

////////////////////////////////////////////////////////////////////////////////////////////////////////////版本
//版本


var demoName="tutorial";

var xnStyleCommonVersion="2.2.12";


//压缩本地的js文件路径 build-local-js
var buildLocalFiles=[
        "./scripts/"+demoName+".js",
        "./scripts/xn-"+demoName+"-filter.js",
        "./scripts/xn-"+demoName+"-service.js",
        "./node_modules/angular-translate/dist/angular-translate.js",
        "./node_modules/angular-translate-loader-static-files/angular-translate-loader-static-files.js"
];

//压缩本地的js文件路径 buildPageFiles
var buildLocalCssFiles=[
    "./spm_modules/xn-style-common/"+xnStyleCommonVersion+"/public/common.less",
    "./styles/*.less"
];

//压缩本地的js文件路径 buildPageFiles
var buildPageFiles=[
    "./scripts/controllers/*.js"
];

var copyCssImagesFiles=[
    "./styles/images/*"
];

var copyFontFiles=[
    "./styles/font/*"
];

///////////////////////////////////////////////////////////////////////////////////////////////////////版本公共的js

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


    //清除字font文件夹
    gulp.task("clean-font", function(){
        gulp.src(["./dist/styles/font/*.ttf","./dist/styles/font/*.eot","./dist/styles/font/*.svg","./dist/styles/font/*.woff"], { read:false })
            .pipe(plugins.clean());
    });



    //清除css样式
    gulp.task("clean-all-css", function(){
        gulp.src("./dist/styles/*.css",{ read:false })
            .pipe(plugins.clean());
    });

    //清除js样式
    gulp.task("clean-all-js", function(){
        gulp.src("./dist/scripts/*.js", { read:false })
            .pipe(plugins.clean());
    });

    //清除css样式
    gulp.task("clean-local-css", function(){
        gulp.src("./dist/**/local.min.css", { read:false })
            .pipe(plugins.clean());
    });

    //清除js样式
    gulp.task("clean-local-js", function(){
        gulp.src("./dist/**/local.min.js", { read:false })
            .pipe(plugins.clean());
    });

    // css合并，压缩文件
    gulp.task("build-local-less",["clean-local-css"], function() {
        gulp.src(buildLocalCssFiles)
            .pipe(plugins.concat("local.src.less"))
            .pipe(plugins.less())
            .pipe(cleanCss({compatibility:"ie8"}))
            .pipe(plugins.rename("local.min.css"))
            .pipe(gulp.dest("./dist/styles/"));

    });


    gulp.task("build-local-js",["clean-local-js"],function() {
        gulp.src(buildLocalFiles)
            .pipe(plugins.concat("local.src.js"))
            // .pipe(plugins.uglify())
            .pipe(plugins.rename("local.min.js"))
            .pipe(gulp.dest("./dist/scripts/"));
    });


    gulp.task("build-page-js",function() {
        gulp.src(buildPageFiles)
        /*    .pipe(plugins.uglify())*/
            .pipe(gulp.dest("./dist/scripts/page/"));
    });

    /*本地文件改变*/
    function changePageJs(event){
        var path= paths(event,'scripts/controllers/','dist/scripts/page/', 'node');
        console.log(path)
        gulp.src(path.srcPath)
            // .pipe( plugins.uglify())
            .pipe(gulp.dest(path.distDir))
    };

    gulp.task("watch", function() {
    // gulp.watch("scripts/*.js",["lint",browserSync.reload]);
    gulp.watch(buildLocalCssFiles, ["build-local-less",browserSync.reload]);
    gulp.watch(buildLocalFiles, ["build-local-js",browserSync.reload]);
    gulp.watch("styles/images/", ["copy-css-images",browserSync.reload]);
    gulp.watch("templates/**/*.vm", ["bs-reload"]);
    gulp.watch(buildPageFiles,changePageJs,[browserSync.reload]);


});

    //检查错误代码
    gulp.task('lint', function() {
        gulp.src('./scripts/*.js')
            .pipe(plugins.jshint())
            .pipe(plugins.jshint.reporter('default'));
    });

    //浏览器同步
    gulp.task('browser-sync', function() {
        browserSync({
            proxy: "http://local.xiniunet.com:80"
        });
    });

    // 定义develop任务在日常开发中使用
    gulp.task("clean-all",["clean-font","clean-all-css","clean-all-js"],function(){
        console.log("运行完成clean-all");
    });


    // 定义develop任务在日常开发中使用
    gulp.task("dev",["build-local-js","build-local-less","build-page-js","copy-css-images","copy-font"],function(){
        console.log("运行完成dev");
    });


    // Reload all Browsers
    gulp.task('bs-reload', function () {
        console.log("浏览器重新加载");
        browserSync.reload();
    });

    // gulp命令默认启动的就是default认为,这里将clean任务作为依赖,也就是先执行一次clean任务,流程再继续.
// gulp命令默认启动的就是default认为,这里将clean任务作为依赖,也就是先执行一次clean任务,流程再继续.
    gulp.task("default",["browser-sync","clean-all","dev"], function() {
        gulp.run("watch");
    });



