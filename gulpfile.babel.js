"use strict";

const args = require("yargs").argv;
const fs = require("fs");

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

gulp.task("create", function () {
  const blockName = args.block;

  if ((typeof blockName !== "string") || blockName.length <= 0) {
    return console.log("[Invalid parameter] Block name is string. Example: create --block example-block");
  }

  const fileTypes = [
    "sass",
    "pug"
  ];

  fs.mkdirSync(`src/blocks/${blockName}`);

  fileTypes.forEach(file => {
    fs.writeFile(`src/blocks/${blockName}/${blockName}.${file}`, `.${blockName}`, (error) => {
      if (error) throw error;
    });
  });

  fs.appendFileSync("src/blocks/autoload.sass", `\n@import "${blockName}/${blockName}"`, (error) => {
    if (error) throw error;
  });

});
