# Gulp plugin
If you haven't used [Gulp](https://gulpjs.com) before, be sure to check out the [related documentation](https://gulpjs.com/docs/en/getting-started/quick-start), as it explains how to create a `gulpfile.js`, as well as install and use plugins.
Once you're familiar with that process, you may install this plugin.

## Programming interface
The plugin takes a list of [PHP](https://www.php.net) scripts as input, and removes the comments and whitespace in these files by applying the [`php_strip_whitespace()`](https://www.php.net/manual/en/function.php-strip-whitespace.php) function on their contents:

<!-- tabs:start -->

#### **CommonJS module**

```js
const {dest, src} = require("gulp");
const phpMinifier = require("@cedx/php-minifier");

exports.compressPhp = function compressPhp() {
  return src("path/to/**/*.php", {read: false})
    .pipe(phpMinifier())
    .pipe(dest("path/to/out"));
}
```

#### **ECMAScript module**

```js
import gulp from "gulp";
import phpMinifier from "@cedx/php-minifier";

export function compressPhp() {
  return gulp.src("path/to/**/*.php", {read: false})
    .pipe(phpMinifier())
    .pipe(gulp.dest("path/to/out"));
}
```

<!-- tabs:end -->

> **Caution:** the plugin only needs the file paths, so you should specify the `read` option to `false` when providing the file list, and you should not have any other plugin before it.

## Options

### **binary**: string = `"php"`
The plugin relies on the availability of the [PHP](https://www.php.net) executable on the target system. By default, the plugin will use the `php` binary found on the system path.  
If the plugin cannot find the default `php` binary, or if you want to use a different one, you can provide the path to the `php` executable by using the `binary` option:

<!-- tabs:start -->

#### **CommonJS module**

```js
const {dest, src} = require("gulp");
const phpMinifier = require("@cedx/php-minifier");

exports.compressPhp = function compressPhp() {
  return src("path/to/**/*.php", {read: false})
    .pipe(phpMinifier({binary: "C:\\Program Files\\PHP\\php.exe"}))
    .pipe(dest("path/to/out"));
}
```

#### **ECMAScript module**

```js
import gulp from "gulp";
import phpMinifier from "@cedx/php-minifier";

export function compressPhp() {
  return gulp.src("path/to/**/*.php", {read: false})
    .pipe(phpMinifier({binary: "C:\\Program Files\\PHP\\php.exe"}))
    .pipe(gulp.dest("path/to/out"));
}
```

<!-- tabs:end -->

### **mode**: TransformMode = `"safe"`
The plugin can work in two manners, which can be selected using the `mode` option:

- the `safe` mode: as its name implies, this mode is very reliable. But it is also very slow as it spawns a new PHP process for every file to be processed. This is the default mode.
- the `fast` mode: as its name implies, this mode is very fast, but it is not always reliable. It spawns a PHP web server that processes the input files, but on some systems this fails.

<!-- tabs:start -->

#### **CommonJS module**

```js
const {dest, src} = require("gulp");
const phpMinifier = require("@cedx/php-minifier");

exports.compressPhp = function compressPhp() {
  return src("path/to/**/*.php", {read: false})
    .pipe(phpMinifier({mode: "fast"}))
    .pipe(dest("path/to/out"));
}
```

#### **ECMAScript module**

```js
import gulp from "gulp";
import phpMinifier from "@cedx/php-minifier";

export function compressPhp() {
  return gulp.src("path/to/**/*.php", {read: false})
    .pipe(phpMinifier({mode: "fast"}))
    .pipe(gulp.dest("path/to/out"));
}
```

<!-- tabs:end -->


> The plugin defaults to the `safe` mode, but you should really give a try to the `fast` one. The difference is very noticeable.

### **silent**: boolean = `false`
By default, the plugin prints to the standard output the paths of the minified scripts. You can disable this output by setting the `silent` option to `true`.

<!-- tabs:start -->

#### **CommonJS module**

```js
const {dest, src} = require("gulp");
const phpMinifier = require("@cedx/php-minifier");

exports.compressPhp = function compressPhp() {
  return src("path/to/**/*.php", {read: false})
    .pipe(phpMinifier({silent: true}))
    .pipe(dest("path/to/out"));
}
```

#### **ECMAScript module**

```js
import gulp from "gulp";
import phpMinifier from "@cedx/php-minifier";

export function compressPhp() {
  return gulp.src("path/to/**/*.php", {read: false})
    .pipe(phpMinifier({silent: true}))
    .pipe(gulp.dest("path/to/out"));
}
```

<!-- tabs:end -->
