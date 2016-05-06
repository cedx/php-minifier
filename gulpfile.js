/**
 * Provides tasks for [Gulp.js](http://gulpjs.com) build system.
 * @module gulpfile
 */
'use strict';

// Module dependencies.
const child = require('child_process');
const del = require('del');
const fs = require('fs');
const gulp = require('gulp');
const path = require('path');
const plugins = require('gulp-load-plugins')();
const pkg = require('./package.json');

/**
 * Runs the default tasks.
 */
gulp.task('default', ['lint']);

/**
 * Checks the package dependencies.
 */
gulp.task('check', () => gulp.src('package.json')
  .pipe(plugins.david()).on('error', function(err) {
    console.error(err);
    this.emit('end');
  })
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
  return _exec(`${command} --configure doc/conf.json`);
});

gulp.task('doc:rename', ['doc:build'], () => new Promise((resolve, reject) =>
  fs.rename(`doc/${pkg.name}/${pkg.version}`, 'doc/api', err => {
    if(err) reject(err);
    else del(`doc/${pkg.name}`, err => err ? reject(err) : resolve());
  })
));

/**
 * Performs static analysis of source code.
 */
gulp.task('lint', () => gulp.src(['*.js', 'lib/*.js'])
  .pipe(plugins.jshint(pkg.jshintConfig))
  .pipe(plugins.jshint.reporter('default', {verbose: true}))
);

/**
 * Runs a command and prints its output.
 * @param {string} command The command to run, with space-separated arguments.
 * @return {Promise} Completes when the command is finally terminated.
 * @private
 */
function _exec(command) {
  return new Promise((resolve, reject) => child.exec(command, (err, stdout) => {
    let output = stdout.trim();
    if(output.length) console.log(output);
    if(err) reject(err);
    else resolve();
  }));
}
