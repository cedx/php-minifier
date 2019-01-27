'use strict';

const {spawn} = require('child_process');
const del = require('del');
const {promises} = require('fs');
const gulp = require('gulp');
const rename = require('gulp-rename');
const {delimiter, normalize, resolve} = require('path');

// Initialize the build system.
const _path = 'PATH' in process.env ? process.env.PATH : '';
const _vendor = resolve('node_modules/.bin');
if (!_path.includes(_vendor)) process.env.PATH = `${_vendor}${delimiter}${_path}`;

/**
 * The file patterns providing the list of source files.
 * @type {string[]}
 */
const sources = ['*.js', 'example/*.ts', 'src/**/*.ts', 'test/**/*.ts'];

/**
 * Builds the project.
 */
gulp.task('build:cjs', () => _exec('tsc'));
gulp.task('build:esm', () => _exec('tsc', ['--project', 'src/tsconfig.json']));
gulp.task('build:php', () => gulp.src('src/php/server.php').pipe(gulp.dest('lib/php')));
gulp.task('build:rename', () => gulp.src('lib/**/*.js').pipe(rename({extname: '.mjs'})).pipe(gulp.dest('lib')));
gulp.task('build', gulp.parallel(gulp.series('build:esm', 'build:rename', 'build:cjs'), 'build:php'));

/**
 * Deletes all generated files and reset any saved state.
 */
gulp.task('clean', () => del(['.nyc_output', 'doc/api', 'lib', 'var/**/*', 'web']));

/**
 * Uploads the results of the code coverage.
 */
gulp.task('coverage', () => _exec('coveralls', ['var/lcov.info']));

/**
 * Builds the documentation.
 */
gulp.task('doc', async () => {
  await promises.copyFile('CHANGELOG.md', 'doc/about/changelog.md');
  await promises.copyFile('LICENSE.md', 'doc/about/license.md');
  await _exec('typedoc');
  return _exec('mkdocs', ['build']);
});

/**
 * Fixes the coding standards issues.
 */
gulp.task('fix', () => _exec('tslint', ['--fix', ...sources]));

/**
 * Performs the static analysis of source code.
 */
gulp.task('lint', () => _exec('tslint', sources));

/**
 * Starts the development server.
 */
gulp.task('serve', () => _exec('php', ['-S', 'localhost:8000', '-t', 'src/php']));

/**
 * Runs the test suites.
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
 * @param {Partial<SpawnOptions>} [options] The settings to customize how the process is spawned.
 * @return {Promise<void>} Completes when the command is finally terminated.
 */
function _exec(command, args = [], options = {}) {
  return new Promise((fulfill, reject) => spawn(normalize(command), args, Object.assign({shell: true, stdio: 'inherit'}, options))
    .on('close', code => code ? reject(new Error(`${command}: ${code}`)) : fulfill())
  );
}
