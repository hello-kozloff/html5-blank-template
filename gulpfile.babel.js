"use strict";

import gulp from "gulp";
import pug from "gulp-pug";

gulp.task("build-pages", function () {
  return gulp.src("src/pages/**/*.pug")
  .pipe(pug({
    pretty: true,
    cache: false
  }))
  .pipe(gulp.dest("static"))
});
