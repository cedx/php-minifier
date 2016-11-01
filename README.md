# Gulp-PHP-Minify
![Release](https://img.shields.io/npm/v/@aquafadas/gulp-php-minify.svg) ![License](https://img.shields.io/npm/l/@aquafadas/gulp-php-minify.svg) ![Downloads](https://img.shields.io/npm/dt/@aquafadas/gulp-php-minify.svg) ![Dependencies](https://img.shields.io/david/aquafadas-com/gulp-php-minify.svg) ![Code quality](https://img.shields.io/codacy/grade/7a9f7db5e0174d139641bcc3905cbfed.svg)

[Gulp.js](http://gulpjs.com) plug-in minifying [PHP](https://secure.php.net) source code by removing comments and whitespace.

## Getting Started
If you haven't used [Gulp.js](http://gulpjs.com) before, be sure to check out the [related documentation](https://github.com/gulpjs/gulp/blob/master/docs/README.md), as it explains how to create a `gulpfile.js` as well as install and use plug-ins.
Once you're familiar with that process, you may install this plug-in with this command:

```shell
$ npm install --save-dev @aquafadas/gulp-php-minify
```

Once the plug-in has been installed, it may be enabled inside your `gulpfile.js`.

## Usage
The plug-in takes a list of [PHP](https://secure.php.net) scripts as input, and removes the comments and whitespace in these files by applying the [`php_strip_whitespace()`](https://secure.php.net/manual/en/function.php-strip-whitespace.php) function on their contents:

```javascript
const gulp = require('gulp');
const {phpMinify} = require('@aquafadas/gulp-php-minify');

gulp.task('minify:php', () => gulp.src('path/to/lib/**/*.php', {read: false})
  .pipe(phpMinify())
  .pipe(gulp.dest('path/to/out'))
);
```

The plug-in only needs the file paths, so you should specify the `read` option to `false` when providing the file list, and you should not have any other plug-in before it.

## Options

### `binary`
The plug-in relies on the availability of the [PHP](https://secure.php.net) executable on the target system: it requires a version **5.5 or later**. By default, the plug-in will use the `php` binary found on the system path.

If the plug-in cannot find the default `php` binary, or if you want to use a different one, you can provide the path to the `php` executable by using the `binary` option:

```javascript
return gulp.src('path/to/lib/**/*.php', {read: false})
  .pipe(phpMinify({binary: 'C:\\Program Files\\PHP\\php.exe'}))
  .pipe(gulp.dest('path/to/out'));
```

### `silent`
By default, the plug-in prints to the standard output the paths of the minified scripts. You can disable this output by setting the `silent` option to `true`.

```javascript
return gulp.src('path/to/lib/**/*.php', {read: false})
  .pipe(phpMinify({silent: true}))
  .pipe(gulp.dest('path/to/out'));
```

## See Also
- [API Reference](https://aquafadas-com.github.io/gulp-php-minify)
- [Code Quality](https://www.codacy.com/app/aquafadas/gulp-php-minify)
- [Continuous Integration](https://travis-ci.org/aquafadas-com/gulp-php-minify)

## License
[Gulp-PHP-Minify](https://github.com/aquafadas-com/gulp-php-minify) is distributed under the Apache License, version 2.0.
