"use strict";

const args = require("yargs").argv;
const fs = require("fs");

import gulp from "gulp";
import pug from "gulp-pug";
import sass from "gulp-sass";
import contact from "gulp-concat";
import rename from "gulp-rename";
import cleanCss from "gulp-clean-css";
import autoprefixer from "gulp-autoprefixer";
import babel from "gulp-babel";
import uglify from "gulp-uglify";

gulp.task("build-pages", function () {
  return gulp.src("src/pages/**/*.pug")
    .pipe(pug({
      pretty: true,
      cache: false
    }))
    .pipe(gulp.dest("static"))
});

/**
 * This task create block (https://ru.bem.info)
 * Example: gulp task --block my-block
 */
gulp.task("create", function () {
  const blockName = args.block;

  if ((typeof blockName !== "string") || blockName.length <= 0) {
    return console.log("[Invalid parameter] Block name is string. Example: create --block example-block");
  }

  const fileTypes = [
    "sass",
    "pug",
    "js"
  ];

  fs.mkdirSync(`src/blocks/${blockName}`);

  fileTypes.forEach(file => {
    let content = '';

    if (file === "sass" || file === "pug") {
      content = `.${blockName}`;
    } else if (file === 'js') {
      content = `$(document).ready(() => { /* ${blockName} */ });`;
    }

    fs.writeFile(`src/blocks/${blockName}/${blockName}.${file}`, content, (error) => {
      if (error) throw error;
    });
  });
});

/**
 * This task build blocks style
 */
gulp.task("build:blocks-style", () => {
  const cleanCssSettings = {
    level: {
      1: { specialComments: 0 }
    }
  };

  return gulp.src("src/blocks/**/*.sass")
    .pipe(sass().on("error", sass.logError))
    .pipe(contact("blocks.css"))
    .pipe(gulp.dest("static/css"))
    .pipe(autoprefixer(["last 15 versions"]))
    .pipe(cleanCss(cleanCssSettings))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("static/css"))
});

/**
 * This task build main style
 */
gulp.task("build:main-style", () => {
  const cleanCssSettings = {
    level: {
      1: { specialComments: 0 }
    }
  };

  return gulp.src("src/sass/main.sass")
    .pipe(sass().on("error", sass.logError))
    .pipe(contact("main.css"))
    .pipe(gulp.dest("static/css"))
    .pipe(autoprefixer(["last 15 versions"]))
    .pipe(cleanCss(cleanCssSettings))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("static/css"))
});

/**
 * This task build vendor style
 */
gulp.task("build:vendor-style", () => {
  const cleanCssSettings = {
    level: {
      1: { specialComments: 0 }
    }
  };

  return gulp.src([
    "node_modules/normalize.css/normalize.css"
  ])
    .pipe(contact("vendor.css"))
    .pipe(gulp.dest("static/css"))
    .pipe(autoprefixer(["last 15 versions"]))
    .pipe(cleanCss(cleanCssSettings))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("static/css"))
});

/**
 * This task build site styles
 */
gulp.task("build:site-style", () => {
  const cleanCssSettings = {
    level: {
      1: { specialComments: 0 }
    }
  };

  return gulp.src([
    "static/css/main.css",
    "static/css/blocks.css"
  ])
    .pipe(contact("styles.css"))
    .pipe(gulp.dest("static/css"))
    .pipe(autoprefixer(["last 15 versions"]))
    .pipe(cleanCss(cleanCssSettings))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("static/css"))
});

/**
 * This task build blocks scripts
 */
gulp.task("build:blocks-script", () => {
  const babelSettings = {
    presets: ["@babel/preset-env"]
  };

  return gulp.src("src/blocks/**/*.js")
    .pipe(babel(babelSettings))
    .pipe(contact("blocks.js"))
    .pipe(gulp.dest("static/js"))
    .pipe(uglify())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("static/js"))
});

/**
 * This task build vendors script
 */
gulp.task("build:vendors-script", () => {
  return gulp.src([
    "node_modules/jquery/dist/jquery.js"
  ])
    .pipe(contact("vendor.js"))
    .pipe(gulp.dest("static/js"))
    .pipe(uglify())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("static/js"))
});

/**
 * This task build bundle style
 */
gulp.task("bundle:style", () => {
  const cleanCssSettings = {
    level: {
      1: { specialComments: 0 }
    }
  };

  return gulp.src([
    "static/css/vendor.css",
    "static/css/styles.css"
  ])
    .pipe(contact("bundle.css"))
    .pipe(gulp.dest("static/css"))
    .pipe(autoprefixer(["last 15 versions"]))
    .pipe(cleanCss(cleanCssSettings))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("static/css"))
});

/**
 * This task build bundle script
 */
gulp.task("bundle:script", () => {
  return gulp.src([
    "static/js/vendor.js",
    "static/js/blocks.js"
  ])
    .pipe(contact("bundle.js"))
    .pipe(gulp.dest("static/js"))
    .pipe(uglify())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("static/js"))
});
