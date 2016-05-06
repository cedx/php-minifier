# PHP-Minify.gulp
![Release](http://img.shields.io/npm/v/gulp-phpminify.svg) ![License](http://img.shields.io/npm/l/gulp-phpminify.svg) ![Downloads](http://img.shields.io/npm/dm/gulp-phpminify.svg) ![Dependencies](http://img.shields.io/david/aquafadas-com/smartling.gulp.svg)

[Gulp.js](http://gulpjs.com) plugin minifying [PHP](http://php.net) source code by removing comments and whitespace.

## Getting Started
If you haven't used [Gulp.js](http://gulpjs.com) before, be sure to check out the [related documentation](https://github.com/gulpjs/gulp/blob/master/docs/README.md), as it explains how to create a `gulpfile.js` as well as install and use plugins.
Once you're familiar with that process, you may install this plugin with this command:

```shell
$ npm install gulp-phpminify --save-dev
```

Once the plugin has been installed, it may be enabled inside your `gulpfile.js`.

## Usage
The plugin takes a list of PHP scripts as input, and removes the comments and whitespace in these files by applying the [`php_strip_whitespace()`](http://php.net/manual/en/function.php-strip-whitespace.php) function on their contents:

```javascript
const gulp = require('gulp');
const phpMinify = require('gulp-phpminify');

gulp.task('minify:php', () => gulp.src('path/to/lib/**/*.php')
  .pipe(phpMinify())
  .pipe(gulp.dest('path/to/out'))
);
```

## Options
The plugin can be customized using these settings:

- `binary: String = "php"` : The path to the PHP executable. Defaults to the `php` binary found on the system path.

## License
[PHP-Minify.gulp](https://github.com/aquafadas-com/php-minify.gulp) is distributed under a proprietary license.
