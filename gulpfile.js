'use strict';

const {spawn} = require('child_process');
const del = require('del');
const gulp = require('gulp');
const {delimiter, normalize, resolve} = require('path');

/**
 * The file patterns providing the list of source files.
 * @type {string[]}
 */
const sources = ['*.js', 'example/*.ts', 'src/**/*.ts', 'test/**/*.ts'];

/**
 * Builds the project.
 */
gulp.task('build:js', () => _exec('tsc'));
gulp.task('build:php', () => gulp.src('src/php/server.php').pipe(gulp.dest('lib/php')));
gulp.task('build', gulp.series('build:js', 'build:php'));

/**
 * Deletes all generated files and reset any saved state.
 */
gulp.task('clean', () => del(['.nyc_output', 'doc/api', 'lib', 'var/**/*', 'web']));

/**
 * Sends the results of the code coverage.
 */
gulp.task('coverage', () => _exec('coveralls', ['var/lcov.info']));

/**
 * Builds the documentation.
 */
gulp.task('doc:api', () => _exec('typedoc'));
gulp.task('doc:web', () => _exec('mkdocs', ['build']));
gulp.task('doc', gulp.series('doc:api', 'doc:web'));

/**
 * Fixes the coding standards issues.
 */
gulp.task('fix', () => _exec('tslint', ['--fix', ...sources]));

/**
 * Performs static analysis of source code.
 */
gulp.task('lint', () => _exec('tslint', sources));

/**
 * Runs the unit tests.
 */
gulp.task('test', () => _exec('nyc', [normalize('node_modules/.bin/mocha')]));

/**
 * Upgrades the project to the latest revision.
 */
gulp.task('upgrade', async () => {
  await _exec('git', ['reset', '--hard']);
  await _exec('git', ['fetch', '--all', '--prune']);
  await _exec('git', ['pull', '--rebase']);
  await _exec('npm', ['install', '--ignore-scripts']);
  return _exec('npm', ['update', '--dev']);
});

/**
 * Watches for file changes.
 */
gulp.task('watch', () => {
  gulp.watch('src/**/*.ts', {ignoreInitial: false}, gulp.task('build'));
  gulp.watch('test/**/*.ts', gulp.task('test'));
});

/**
 * Runs the default tasks.
 */
gulp.task('default', gulp.task('build'));

/**
 * Spawns a new process using the specified command.
 * @param {string} command The command to run.
 * @param {string[]} [args] The command arguments.
 * @param {Object} [options] The settings to customize how the process is spawned.
 * @return {Promise} Completes when the command is finally terminated.
 */
function _exec(command, args = [], options = {shell: true, stdio: 'inherit'}) {
  if (!process.env.PATH.includes(normalize('node_modules/.bin'))) process.env.PATH = `${resolve('node_modules/.bin')}${delimiter}${process.env.PATH}`;
  return new Promise((fulfill, reject) => spawn(normalize(command), args, options)
    .on('close', code => code ? reject(new Error(`${command}: ${code}`)) : fulfill())
  );
}
