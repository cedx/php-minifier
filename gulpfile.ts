import {spawn, SpawnOptions} from 'child_process';
import * as del from 'del';
import {promises} from 'fs';
import * as gulp from 'gulp';
import {delimiter, normalize, resolve} from 'path';

// Initialize the build system.
const _path = 'PATH' in process.env ? process.env.PATH! : '';
const _vendor = resolve('node_modules/.bin');
if (!_path.includes(_vendor)) process.env.PATH = `${_vendor}${delimiter}${_path}`;

/**
 * The file patterns providing the list of source files.
 */
const sources: string[] = ['*.ts', 'example/*.ts', 'src/**/*.ts', 'test/**/*.ts'];

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
 * @param command The command to run.
 * @param args The command arguments.
 * @param options The settings to customize how the process is spawned.
 * @return Completes when the command is finally terminated.
 */
function _exec(command: string, args: string[] = [], options: SpawnOptions = {}): Promise<void> {
  return new Promise((fulfill, reject) => spawn(normalize(command), args, Object.assign({shell: true, stdio: 'inherit'}, options))
    .on('close', code => code ? reject(new Error(`${command}: ${code}`)) : fulfill())
  );
}
