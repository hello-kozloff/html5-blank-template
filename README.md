# html5-blank-template
Universal procurement project.

## Stack
- gulp-4
- pug.js
- sass
- BEM
- Babel

## Installation
1. Install globally `yarn`
2. Open folder in terminal and clone project - `git clone https://github.com/hello-kozloff/html5-blank-template.git`
3. After use clone - `yarn install`

## File structure
```
html5-blank-template
├── build
├── static
├── src
│   ├── blocks
│   ├── fonts
│   ├── pages
│   ├── sass
├── gulpfile.babel.js
├── package.json
├── .babelrc.js
└── .gitignore
```

* Root:
    * ```.babelrc.js``` — Babel settings
    * ```.gitignore``` – Git ignore
    * ```gulpfile.babel.js``` — Gulp tasks
    * ```package.json``` — Dependencies
* Work ```src``` - All files in project:
    * BEM: ```src/blocks```
    * Fonts: ```src/fonts```
    * Pages: ```src/pages```
    * Sass: ```src/sass```
* Folder ```static``` - folder from which the local development server is launched (```yarn run```)

## How to use
- If you want create new block - `gulp create --black example-block`
