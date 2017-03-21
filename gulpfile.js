'use strict';

const babel = require('gulp-babel');
const child_process = require('child_process');
const {david} = require('@cedx/gulp-david');
const del = require('del');
const eslint = require('gulp-eslint');
const gulp = require('gulp');
const path = require('path');

/**
 * Runs the default tasks.
 */
gulp.task('default', ['build']);

/**
 * Builds the sources.
 */
gulp.task('build', () => gulp.src('src/**/*.js')
  .pipe(babel())
  .pipe(gulp.dest('lib'))
);

/**
 * Deletes all generated files and reset any saved state.
 */
gulp.task('clean', () => del('var/**/*'));

/**
 * Sends the results of the code coverage.
 */
gulp.task('coverage', ['test'], () => _exec('node_modules/.bin/coveralls', ['--file=var/lcov.info']));

/**
 * Builds the documentation.
 */
gulp.task('doc', async () => {
  await del('doc/api');
  return _exec('node_modules/.bin/esdoc');
});

/**
 * Fixes the coding standards issues.
 */
gulp.task('fix', () => gulp.src(['*.js', 'src/**/*.js', 'test/**/*.js'], {base: '.'})
  .pipe(eslint({fix: true}))
  .pipe(gulp.dest('.'))
);

/**
 * Performs static analysis of source code.
 */
gulp.task('lint', () => gulp.src(['*.js', 'src/**/*.js', 'test/**/*.js'])
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError())
);

/**
 * Checks the package dependencies.
 */
gulp.task('outdated', () => gulp.src('package.json').pipe(david()));

/**
 * Runs the unit tests.
 */
gulp.task('test', () => _exec('node_modules/.bin/nyc', [
  '--report-dir=var',
  '--reporter=lcovonly',
  path.normalize('node_modules/.bin/mocha'),
  '--compilers=js:babel-register',
  '--recursive'
]));

/**
 * Spawns a new process using the specified command.
 * @param {string} command The command to run.
 * @param {string[]} [args] The command arguments.
 * @param {object} [options] The settings to customize how the process is spawned.
 * @return {Promise} Completes when the command is finally terminated.
 */
async function _exec(command, args = [], options = {shell: true, stdio: 'inherit'}) {
  return new Promise((resolve, reject) => child_process
    .spawn(path.normalize(command), args, options)
    .on('close', code => code ? reject(new Error(`${command}: ${code}`)) : resolve())
  );
}
