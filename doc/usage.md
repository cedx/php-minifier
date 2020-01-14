# Usage
If you haven't used [Gulp](https://gulpjs.com) before, be sure to check out the [related documentation](https://gulpjs.com/docs/en/getting-started/quick-start), as it explains how to create a `gulpfile.js`, as well as install and use plug-ins.
Once you're familiar with that process, you may install the plug-in.

## Requirements
As of version 10, this plug-in uses the syntax of [ECMAScript modules](https://nodejs.org/api/esm.html). This is a major change: your Gulp script will probably not work as usual.
 
If you don't modify it, you can encounter this kind of errors:

```
SyntaxError: Unexpected token {
```

You have two possibles choices:

- Continue to use version 9: as long as ES modules are marked as experimental, this is the recommended solution.
- Upgrade your Gulp script to use ES modules.

If you choose the second option, as long as Gulp does not natively support ES modules, you must load this package using an [`import` expression](https://nodejs.org/api/esm.html#esm_import_expressions):

```js
const {dest, series, src, task} = require('gulp');

let phpMinify;
task('phpMinify:import', () => import('@cedx/gulp-php-minify').then(mod => phpMinify = mod.phpMinify));
task('phpMinify:run', () => src('*.php').pipe(phpMinify()).pipe(dest('out')));
task('compressPhp', series('phpMinify:import', 'phpMinify:run'));
```

## Programming interface
The plug-in takes a list of [PHP](https://www.php.net) scripts as input, and removes the comments and whitespace in these files by applying the [`php_strip_whitespace()`](https://www.php.net/manual/en/function.php-strip-whitespace.php) function on their contents:

```js
import {phpMinify} from '@cedx/gulp-php-minify';
import gulp from 'gulp';

gulp.task('compressPhp', () => gulp.src('path/to/**/*.php', {read: false})
  .pipe(phpMinify())
  .pipe(gulp.dest('path/to/out'))
);
```

!!! tip
    The plug-in only needs the file paths, so you should specify
    the `read` option to `false` when providing the file list,
    and you should not have any other plug-in before it.

## Options

### **binary**: string = `"php"`
The plug-in relies on the availability of the [PHP](https://www.php.net) executable on the target system. By default, the plug-in will use the `php` binary found on the system path.

If the plug-in cannot find the default `php` binary, or if you want to use a different one, you can provide the path to the `php` executable by using the `binary` option:

```js
import {phpMinify} from '@cedx/gulp-php-minify';
import gulp from 'gulp';

gulp.task('compressPhp', () => gulp.src('path/to/**/*.php', {read: false})
  .pipe(phpMinify({binary: 'C:\\Program Files\\PHP\\php.exe'}))
  .pipe(gulp.dest('path/to/out'))
);
```

### **mode**: TransformMode = `TransformMode.safe`
The plug-in can work in two manners, which can be selected using the `mode` option:

- the `safe` mode: as its name implies, this mode is very reliable. But it is also very slow as it spawns a new PHP process for every file to be processed. This is the default mode.
- the `fast` mode: as its name implies, this mode is very fast, but it is not very reliable. It spawns a PHP web server that processes the input files, but on some systems this fails. This mode requires a [PHP](https://www.php.net) runtime version **7.2 or later**.

```js
import {phpMinify, TransformMode} from '@cedx/gulp-php-minify';
import gulp from 'gulp';

gulp.task('compressPhp', () => gulp.src('path/to/**/*.php', {read: false})
  .pipe(phpMinify({mode: TransformMode.fast}))
  .pipe(gulp.dest('path/to/out'))
);
```

### **silent**: boolean = `false`
By default, the plug-in prints to the standard output the paths of the minified scripts. You can disable this output by setting the `silent` option to `true`.

```js
import {phpMinify} from '@cedx/gulp-php-minify';
import gulp from 'gulp';

gulp.task('compressPhp', () => gulp.src('path/to/**/*.php', {read: false})
  .pipe(phpMinify({silent: true}))
  .pipe(gulp.dest('path/to/out'))
);
```
