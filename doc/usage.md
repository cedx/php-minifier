# Usage
If you haven't used [Gulp](https://gulpjs.com) before, be sure to check out the [related documentation](https://github.com/gulpjs/gulp/tree/master/docs/getting-started), as it explains how to create a `gulpfile.js` as well as install and use plug-ins.
Once you're familiar with that process, you may install the plug-in.

## Programming interface
The plug-in takes a list of [PHP](https://secure.php.net) scripts as input, and removes the comments and whitespace in these files by applying the [`php_strip_whitespace()`](https://secure.php.net/manual/en/function.php-strip-whitespace.php) function on their contents:

```js
const {phpMinify} = require('@cedx/gulp-php-minify');
const {dest, src, task} = require('gulp');

task('compress:php', () => src('path/to/**/*.php', {read: false})
  .pipe(phpMinify())
  .pipe(dest('path/to/out'))
);
```

!!! tip
    The plug-in only needs the file paths, so you should specify
    the `read` option to `false` when providing the file list,
    and you should not have any other plug-in before it.

## Options

### **binary**: string = `"php"`
The plug-in relies on the availability of the [PHP](https://secure.php.net) executable on the target system. By default, the plug-in will use the `php` binary found on the system path.

If the plug-in cannot find the default `php` binary, or if you want to use a different one, you can provide the path to the `php` executable by using the `binary` option:

```js
const {phpMinify} = require('@cedx/gulp-php-minify');
const {dest, src, task} = require('gulp');

task('compress:php', () => src('path/to/**/*.php', {read: false})
  .pipe(phpMinify({binary: 'C:\\Program Files\\PHP\\php.exe'}))
  .pipe(dest('path/to/out'))
);
```

### **mode**: TransformMode = `TransformMode.safe`
The plug-in can work in two manners, which can be selected using the `mode` option:

- the `safe` mode: as its name implies, this mode is very reliable. But it is also very slow as it spawns a new PHP process for every file to be processed. This is the default mode.
- the `fast` mode: as its name implies, this mode is very fast, but it is not very reliable. It spawns a PHP web server that processes the input files, but on some systems this fails. This mode requires a [PHP](https://secure.php.net) runtime version **7.2 or later**.

```js
const {phpMinify, TransformMode} = require('@cedx/gulp-php-minify');
const {dest, src, task} = require('gulp');

task('compress:php', () => src('path/to/**/*.php', {read: false})
  .pipe(phpMinify({mode: TransformMode.fast}))
  .pipe(dest('path/to/out'))
);
```

### **silent**: boolean = `false`
By default, the plug-in prints to the standard output the paths of the minified scripts. You can disable this output by setting the `silent` option to `true`.

```js
const {phpMinify} = require('@cedx/gulp-php-minify');
const {dest, src, task} = require('gulp');

task('compress:php', () => src('path/to/**/*.php', {read: false})
  .pipe(phpMinify({silent: true}))
  .pipe(dest('path/to/out'))
);
```
