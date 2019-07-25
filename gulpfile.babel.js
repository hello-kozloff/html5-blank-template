"use strict";

const args = require("yargs").argv;
const fs = require("fs");

import gulp from "gulp";
import pug from "gulp-pug";
import sass from "gulp-sass";
import contact from "gulp-concat";

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

  fs.appendFileSync("src/blocks/autoload.sass", `\n@import "${blockName}/${blockName}"`, (error) => {
    if (error) throw error;
  });

});

/**
 * This task build blocks style
 */
gulp.task("build:blocks-style", () => {
  return gulp.src("src/blocks/**/*.sass")
  .pipe(sass().on("error", sass.logError))
  .pipe(contact("blocks.css"))
  .pipe(gulp.dest("static/css"))
});
