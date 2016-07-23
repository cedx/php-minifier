# Gulp-PHP-Minify
![Release](http://img.shields.io/npm/v/@aquafadas/gulp-php-minify.svg) ![License](http://img.shields.io/npm/l/@aquafadas/gulp-php-minify.svg) ![Downloads](http://img.shields.io/npm/dt/@aquafadas/gulp-php-minify.svg) ![Dependencies](http://img.shields.io/david/aquafadas-com/gulp-php-minify.svg) ![Code quality](https://img.shields.io/codacy/grade/7a9f7db5e0174d139641bcc3905cbfed.svg)

[Gulp.js](http://gulpjs.com) plugin minifying [PHP](http://php.net) source code by removing comments and whitespace.

## Getting Started
If you haven't used [Gulp.js](http://gulpjs.com) before, be sure to check out the [related documentation](https://github.com/gulpjs/gulp/blob/master/docs/README.md), as it explains how to create a `gulpfile.js` as well as install and use plugins.
Once you're familiar with that process, you may install this plugin with this command:

```shell
$ npm install --save-dev @aquafadas/gulp-php-minify
```

Once the plugin has been installed, it may be enabled inside your `gulpfile.js`.

## Usage
The plugin takes a list of [PHP](http://php.net) scripts as input, and removes the comments and whitespace in these files by applying the [`php_strip_whitespace()`](http://php.net/manual/en/function.php-strip-whitespace.php) function on their contents:

```javascript
const gulp = require('gulp');
const phpMinify = require('@aquafadas/gulp-php-minify');

gulp.task('minify:php', () => gulp.src('path/to/lib/**/*.php', {read: false})
  .pipe(phpMinify())
  .pipe(gulp.dest('path/to/out'))
);
```

The plugin needs the file paths, so you should specify the `read` option to `false` when providing the file list, and you should not have any other plugin before it.

## Options
The plugin relies on the availability of the [PHP](http://php.net) executable on the target system. By default, the plugin will use the `php` binary found on the system path.

If the plugin cannot find the default `php` binary, or if you want to use a different one, you can provide the path to the `php` executable using the `binary` option:

```javascript
gulp.task('minify:php', () => gulp.src('path/to/lib/**/*.php', {read: false})
  .pipe(phpMinify({binary: 'C:\\Program Files\\PHP\\php.exe'}))
  .pipe(gulp.dest('path/to/out'))
);
```

## See Also
- [Code Quality](https://www.codacy.com/app/aquafadas/gulp-php-minify)

## License
[Gulp-PHP-Minify](https://github.com/aquafadas-com/gulp-php-minify) is distributed under the Apache License, version 2.0.
