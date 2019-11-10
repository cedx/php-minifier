import {spawn, SpawnOptions} from 'child_process';
import * as del from 'del';
import {promises} from 'fs';
import * as gulp from 'gulp';
import * as replace from 'gulp-replace';
import {delimiter, normalize, resolve} from 'path';

/** The file patterns providing the list of source files. */
const sources: string[] = ['*.ts', 'example/*.{js,ts}', 'src/**/*.ts', 'test/**/*.ts'];

// Shortcuts.
const {dest, parallel, series, src, task, watch} = gulp;
const {copyFile} = promises;

// Initialize the build system.
const _path = process.env.PATH ?? '';
const _vendor = resolve('node_modules/.bin');
if (!_path.includes(_vendor)) process.env.PATH = `${_vendor}${delimiter}${_path}`;

/** Builds the project. */
task('build:fix', () => src('lib/**/*.js')
  .pipe(replace(/(export|import)\s+(.+)\s+from\s+'(\.[^']+)'/g, "$1 $2 from '$3.js'"))
  .pipe(replace('// const {__dirname}', 'const {__dirname}'))
  .pipe(dest('lib')));

task('build:js', () => _exec('tsc', ['--project', 'src/tsconfig.json']));
task('build:php', () => src('src/php/*.php').pipe(dest('lib/php')));
task('build', parallel(series('build:js', 'build:fix'), 'build:php'));

/** Deletes all generated files and reset any saved state. */
task('clean', () => del(['.nyc_output', 'doc/api', 'lib', 'var/**/*', 'web']));

/** Uploads the results of the code coverage. */
task('coverage', () => _exec('coveralls', ['var/lcov.info']));

/** Builds the documentation. */
task('doc', async () => {
  for (const path of ['CHANGELOG.md', 'LICENSE.md']) await copyFile(path, `doc/about/${path.toLowerCase()}`);
  await _exec('typedoc', ['--gaID', process.env.GOOGLE_ANALYTICS_ID!, '--options', 'etc/typedoc.json', '--tsconfig', 'src/tsconfig.json']);
  await _exec('mkdocs', ['build', '--config-file=doc/mkdocs.yaml']);
  return del(['doc/about/changelog.md', 'doc/about/license.md', 'web/mkdocs.yaml']);
});

/** Fixes the coding standards issues. */
task('fix', () => _exec('eslint', ['--config=etc/eslint.json', '--fix', ...sources]));

/** Performs the static analysis of source code. */
task('lint', () => _exec('eslint', ['--config=etc/eslint.json', ...sources]));

/** Publishes the package to the registry. */
task('publish:github', () => _exec('npm', ['publish', '--registry=https://npm.pkg.github.com']));
task('publish:npm', () => _exec('npm', ['publish', '--registry=https://registry.npmjs.org']));
task('publish', series('clean', 'publish:github', 'publish:npm'));

/** Starts the development server. */
task('serve', () => _exec('php', ['-S', '127.0.0.1:8000', '-t', 'src/php']));

/** Runs the test suites. */
task('test', () => {
  process.env.TS_NODE_PROJECT = 'test/tsconfig.json';
  return _exec('nyc', ['--nycrc-path=etc/nyc.json', 'node_modules/.bin/mocha', '--config=etc/mocha.json', '"test/**/*.ts"']);
});

/** Upgrades the project to the latest revision. */
task('upgrade', async () => {
  await _exec('git', ['reset', '--hard']);
  await _exec('git', ['fetch', '--all', '--prune']);
  await _exec('git', ['pull', '--rebase']);
  await _exec('npm', ['install', '--ignore-scripts']);
  return _exec('npm', ['update', '--dev']);
});

/** Watches for file changes. */
task('watch', () => {
  watch('src/**/*.ts', {ignoreInitial: false}, task('build'));
  watch('test/**/*.ts', task('test'));
});

/** Runs the default tasks. */
task('default', task('build'));

/**
 * Spawns a new process using the specified command.
 * @param command The command to run.
 * @param args The command arguments.
 * @param options The settings to customize how the process is spawned.
 * @return Completes when the command is finally terminated.
 */
function _exec(command: string, args: string[] = [], options: SpawnOptions = {}): Promise<void> {
  return new Promise((fulfill, reject) => spawn(normalize(command), args, {shell: true, stdio: 'inherit', ...options})
    .on('close', code => code ? reject(new Error(`${command}: ${code}`)) : fulfill())
  );
}
