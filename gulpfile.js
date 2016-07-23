/**
 * Provides tasks for [Gulp.js](http://gulpjs.com) build system.
 * @module gulpfile
 */
'use strict';

const child = require('child_process');
const del = require('del');
const fs = require('fs');
const gulp = require('gulp');
const loadPlugins = require('gulp-load-plugins');
const path = require('path');
const pkg = require('./package.json');

/**
 * The task settings.
 * @type {object}
 */
const config = {
  output: `${pkg.name}-${pkg.version}.zip`,
  sources: ['*.json', '*.md', '*.txt', 'lib/*.js']
};

/**
 * The task plugins.
 * @type {object}
 */
const plugins = loadPlugins({
  pattern: ['gulp-*', '@*/gulp-*'],
  replaceString: /^gulp-/
});

/**
 * Runs the default tasks.
 */
gulp.task('default', ['lint']);

/**
 * Checks the package dependencies.
 */
gulp.task('check', () => gulp.src('package.json')
  .pipe(plugins.cedx.david()).on('error', function(err) {
    console.error(err);
    this.emit('end');
  })
);

/**
 * Deletes all generated files and reset any saved state.
 */
gulp.task('clean', () =>
  del([`var/${config.output}`, 'var/*.info'])
);

/**
 * Sends the results of the code coverage.
 */
gulp.task('coverage', ['test'], () => {
  let command = path.join('node_modules/.bin', process.platform == 'win32' ? 'codacy-coverage.cmd' : 'codacy-coverage');
  return _exec(`${command} < var/lcov.info`);
});

/**
 * Creates a distribution file for this program.
 */
gulp.task('dist', () => gulp.src(config.sources, {base: '.'})
  .pipe(plugins.zip(config.output))
  .pipe(gulp.dest('var'))
);

/**
 * Builds the documentation.
 */
gulp.task('doc', ['doc:assets']);

gulp.task('doc:assets', ['doc:rename'], () => gulp.src(['web/apple-touch-icon.png', 'web/favicon.ico'], {base: 'web'})
  .pipe(gulp.dest('doc/api'))
);

gulp.task('doc:build', () => {
  let command = path.join('node_modules/.bin', process.platform == 'win32' ? 'jsdoc.cmd' : 'jsdoc');
  return del('doc/api').then(() => _exec(`${command} --configure doc/conf.json`));
});

gulp.task('doc:rename', ['doc:build'], () => new Promise((resolve, reject) =>
  fs.rename(`doc/${pkg.name}/${pkg.version}`, 'doc/api', err => {
    if(err) reject(err);
    else del('doc/@aquafadas').then(resolve, reject);
  })
));

/**
 * Performs static analysis of source code.
 */
gulp.task('lint', () => gulp.src(['*.js', 'lib/*.js', 'test/*.js'])
  .pipe(plugins.jshint(pkg.jshintConfig))
  .pipe(plugins.jshint.reporter('default', {verbose: true}))
);

/**
 * Runs the unit tests.
 */
gulp.task('test', ['test:coverage'], () => gulp.src(['test/*.js'], {read: false})
  .pipe(plugins.mocha())
  .pipe(plugins.istanbul.writeReports({dir: 'var', reporters: ['lcovonly']}))
);

gulp.task('test:coverage', () => gulp.src(['lib/*.js'])
  .pipe(plugins.istanbul())
  .pipe(plugins.istanbul.hookRequire())
);

/**
 * Runs a command and prints its output.
 * @param {string} command The command to run, with space-separated arguments.
 * @param {object} [options] The settings to customize how the process is spawned.
 * @returns {Promise.<string>} The command output when it is finally terminated.
 * @private
 */
function _exec(command, options = {}) {
  return new Promise((resolve, reject) => child.exec(command, options, (err, stdout) => {
    if(err) reject(err);
    else resolve(stdout.trim());
  }));
}
