'use strict';
import {phpMinify, TransformMode} from '@cedx/gulp-php-minify';
const {dest, series, src, task} = require('gulp');

/** Compresses a given set of PHP scripts. */
task('compress:php', () => src('path/to/**/*.php', {read: false})
  .pipe(phpMinify({
    binary: process.platform == 'win32' ? String.raw`C:\Program Files\PHP\php.exe` : '/usr/bin/php',
    mode: process.platform == 'win32' ? TransformMode.safe : TransformMode.fast,
    silent: process.stdout.isTTY
  }))
  .pipe(dest('path/to/out'))
);
