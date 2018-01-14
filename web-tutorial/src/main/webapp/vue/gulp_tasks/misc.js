const path = require('path');

const gulp = require('gulp');
const del = require('del');
const filter = require('gulp-filter');

const conf = require('../conf/gulp.conf');

gulp.task('clean', clean);
gulp.task('other', other);

gulp.task('copy-scripts', () => {
  return gulp.src(`${conf.paths.src}/assets/scripts/*`)
    .pipe(gulp.dest(`${conf.paths.dist}/assets/scripts`));
});

gulp.task('copy-scripts-tmp', () => {
  return gulp.src(`${conf.paths.src}/assets/scripts/*`)
      .pipe(gulp.dest(`${conf.paths.tmp}/assets/scripts`));
});


function clean() {
  return del([conf.paths.dist, conf.paths.tmp]);
}

function other() {
  const fileFilter = filter(file => file.stat.isFile());

  return gulp.src([
    path.join(conf.paths.src, '/**/*'),
    path.join(`!${conf.paths.src}`, '/**/*.{less,js,html,vue}')
  ])
    .pipe(fileFilter)
    .pipe(gulp.dest(conf.paths.dist));
}
