# Gulp-PHP-Minify
![Runtime](https://img.shields.io/badge/node-%3E%3D8.9-brightgreen.svg) ![Release](https://img.shields.io/npm/v/@cedx/gulp-php-minify.svg) ![License](https://img.shields.io/npm/l/@cedx/gulp-php-minify.svg) ![Downloads](https://img.shields.io/npm/dt/@cedx/gulp-php-minify.svg) ![Dependencies](https://david-dm.org/cedx/gulp-php-minify.svg) ![Coverage](https://coveralls.io/repos/github/cedx/gulp-php-minify/badge.svg) ![Build](https://travis-ci.org/cedx/gulp-php-minify.svg)

[Gulp](http://gulpjs.com) plug-in minifying [PHP](https://secure.php.net) source code by removing comments and whitespace.

## Getting started
If you haven't used [Gulp](http://gulpjs.com) before, be sure to check out the [related documentation](https://github.com/gulpjs/gulp/blob/master/docs/README.md), as it explains how to create a `gulpfile.js` as well as install and use plug-ins.
Once you're familiar with that process, you may install this plug-in with this command:

```shell
$ npm install --save-dev @cedx/gulp-php-minify
```

Once the plug-in has been installed, it may be enabled inside your `gulpfile.js` file.

## Usage
The plug-in takes a list of [PHP](https://secure.php.net) scripts as input, and removes the comments and whitespace in these files by applying the [`php_strip_whitespace()`](https://secure.php.net/manual/en/function.php-strip-whitespace.php) function on their contents:

```javascript
const {phpMinify} = require('@cedx/gulp-php-minify');
const gulp = require('gulp');

gulp.task('minify:php', () => gulp.src('path/to/lib/**/*.php', {read: false})
  .pipe(phpMinify())
  .pipe(gulp.dest('path/to/out'))
);
```

> The plug-in only needs the file paths, so you should specify the `read` option to `false` when providing the file list, and you should not have any other plug-in before it.

## Options

### `binary: string = "php"`
The plug-in relies on the availability of the [PHP](https://secure.php.net) executable on the target system. By default, the plug-in will use the `php` binary found on the system path.

If the plug-in cannot find the default `php` binary, or if you want to use a different one, you can provide the path to the `php` executable by using the `binary` option:

```javascript
return gulp.src('path/to/lib/**/*.php', {read: false})
  .pipe(phpMinify({binary: 'C:\\Program Files\\PHP\\php.exe'}))
  .pipe(gulp.dest('path/to/out'));
```

### `mode: string = TransformMode.safe`
The plug-in can work in two manners, which can be selected using the `mode` option:

- the `safe` mode: as its name implies, this mode is very reliable. But it is also very slow as it spawns a new PHP process for every file to be processed. This is the default mode.
- the `fast` mode: as its name implies, this mode is very fast, but it is not very reliable. It spawns a PHP web server that processes the input files, but on some systems this fails. This mode requires a [PHP](https://secure.php.net) runtime version **7.0 or later**.

```javascript
const {TransformMode} = require('@cedx/gulp-php-minify');

return gulp.src('path/to/lib/**/*.php', {read: false})
  .pipe(phpMinify({mode: TransformMode.fast}))
  .pipe(gulp.dest('path/to/out'));
```

### `silent: boolean = false`
By default, the plug-in prints to the standard output the paths of the minified scripts. You can disable this output by setting the `silent` option to `true`.

```javascript
return gulp.src('path/to/lib/**/*.php', {read: false})
  .pipe(phpMinify({silent: true}))
  .pipe(gulp.dest('path/to/out'));
```

## See also
- [API reference](https://cedx.github.io/gulp-php-minify)
- [Code coverage](https://coveralls.io/github/cedx/gulp-php-minify)
- [Continuous integration](https://travis-ci.org/cedx/gulp-php-minify)

## License
[Gulp-PHP-Minify](https://github.com/cedx/gulp-php-minify) is distributed under the MIT License.
