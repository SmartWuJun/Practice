var gulp = require("gulp");
var gulpLoadPlugins = require("gulp-load-plugins");
var plugins = gulpLoadPlugins();

////////////////////////////////////////////////////////////////////////////////////////////////////////////版本
//版本



// css合并，压缩文件
gulp.task("build-variables-less", function() {
    gulp.src(["./less/variables.less"])
        .pipe(gulp.dest("./dist/"));

});

// css合并，压缩文件
gulp.task("build-local-less", function() {
    gulp.src(["./less/variables.less","./less/type.less","./less/*.less"])
        .pipe(plugins.concat("common.less"))
        .pipe(gulp.dest("./public/"));

});




// 定义develop任务在日常开发中使用
gulp.task("dev",["build-local-less"],function(){});


// gulp命令默认启动的就是default认为,这里将clean任务作为依赖,也就是先执行一次clean任务,流程再继续.
gulp.task("default",["dev"], function() {

});
