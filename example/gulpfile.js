const {phpMinify} = require('@cedx/gulp-php-minify');
const gulp = require('gulp');

/**
 * Compresses a given set of PHP scripts.
 */
gulp.task('compress:php', () => gulp.src('path/to/lib/**/*.php', {read: false})
  .pipe(phpMinify())
  .pipe(gulp.dest('path/to/out'))
);
