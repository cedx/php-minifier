'use strict';

const {david} = require('@cedx/gulp-david');
const {spawn} = require('child_process');
const del = require('del');
const gulp = require('gulp');
const eslint = require('gulp-eslint');
const {normalize} = require('path');

/**
 * Deletes all generated files and reset any saved state.
 */
gulp.task('clean', () => del(['.nyc_output', 'doc/api', 'var/**/*', 'web']));

/**
 * Sends the results of the code coverage.
 */
gulp.task('coverage', () => _exec('node_modules/.bin/coveralls', ['var/lcov.info']));

/**
 * Checks the package dependencies.
 */
gulp.task('deps:outdated', () => gulp.src('package.json').pipe(david()));
gulp.task('deps:security', () => _exec('npm', ['audit']));
gulp.task('deps', gulp.series('deps:outdated', 'deps:security'));

/**
 * Builds the documentation.
 */
gulp.task('doc:api', () => _exec('node_modules/.bin/esdoc'));
gulp.task('doc:web', () => _exec('mkdocs', ['build']));
gulp.task('doc', gulp.series('doc:api', 'doc:web'));

/**
 * Fixes the coding standards issues.
 */
gulp.task('fix:js', () => gulp.src(['*.js', 'example/*.js', 'lib/**/*.js', 'test/**/*.js'], {base: '.'})
  .pipe(eslint({fix: true}))
  .pipe(gulp.dest('.'))
);

gulp.task('fix:security', () => _exec('npm', ['audit', 'fix']));
gulp.task('fix', gulp.series('fix:js', 'fix:security'));

/**
 * Performs static analysis of source code.
 */
gulp.task('lint', () => gulp.src(['*.js', 'example/*.js', 'lib/**/*.js', 'test/**/*.js'])
  .pipe(eslint())
  .pipe(eslint.format())
);

/**
 * Runs the unit tests.
 */
gulp.task('test', () => _exec('node_modules/.bin/nyc', [normalize('node_modules/.bin/mocha')]));

/**
 * Upgrades the project to the latest revision.
 */
gulp.task('upgrade', async () => {
  await _exec('git', ['reset', '--hard']);
  await _exec('git', ['fetch', '--all', '--prune']);
  await _exec('git', ['pull', '--rebase']);
  await _exec('npm', ['install']);
  return _exec('npm', ['update']);
});

/**
 * Watches for file changes.
 */
gulp.task('watch', () => gulp.watch(['lib/**/*.js', 'test/**/*.js'], gulp.task('test')));

/**
 * Runs the default tasks.
 */
gulp.task('default', gulp.task('test'));

/**
 * Spawns a new process using the specified command.
 * @param {string} command The command to run.
 * @param {string[]} [args] The command arguments.
 * @param {Object} [options] The settings to customize how the process is spawned.
 * @return {Promise} Completes when the command is finally terminated.
 */
function _exec(command, args = [], options = {shell: true, stdio: 'inherit'}) {
  return new Promise((resolve, reject) => spawn(normalize(command), args, options)
    .on('close', code => code ? reject(new Error(`${command}: ${code}`)) : resolve())
  );
}
