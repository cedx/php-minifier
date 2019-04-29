import {spawn} from 'child_process';
import del from 'del';
import {promises} from 'fs';
import gulp from 'gulp';
import {delimiter, normalize, resolve} from 'path';

/**
 * The file patterns providing the list of source files.
 * @type {string[]}
 */
const sources = ['*.js', 'example/*.js', 'lib/**/*.js', 'test/**/*.js'];

// Shortcuts.
const {task, watch} = gulp;
const {copyFile} = promises;

// Initialize the build system.
const _path = 'PATH' in process.env ? process.env.PATH : '';
const _vendor = resolve('node_modules/.bin');
if (!_path.includes(_vendor)) process.env.PATH = `${_vendor}${delimiter}${_path}`;

/** Deletes all generated files and reset any saved state. */
task('clean', () => del(['.nyc_output', 'doc/api', 'var/**/*', 'web']));

/** Uploads the results of the code coverage. */
task('coverage', () => _exec('coveralls', ['var/lcov.info']));

/** Builds the documentation. */
task('doc', async () => {
  for (const path of ['CHANGELOG.md', 'LICENSE.md']) await copyFile(path, `doc/about/${path.toLowerCase()}`);
  await _exec('esdoc', ['-c', 'etc/esdoc.json']);
  await _exec('mkdocs', ['build', '--config-file=etc/mkdocs.yaml']);
  return del(['doc/about/changelog.md', 'doc/about/license.md']);
});

/** Fixes the coding standards issues. */
task('fix', () => _exec('tslint', ['--config', 'etc/tslint.yaml', '--fix', ...sources]));

/** Performs the static analysis of source code. */
task('lint', () => _exec('tslint', ['--config', 'etc/tslint.yaml', ...sources]));

/** Starts the development server. */
task('serve', () => _exec('php', ['-S', '127.0.0.1:8000', '-t', 'lib/php']));

/** Runs the test suites. */
task('test', () => _exec('nyc', ['--nycrc-path=etc/nyc.json', 'node_modules/.bin/mocha', '--config=etc/mocha.json']));

/** Upgrades the project to the latest revision. */
task('upgrade', async () => {
  await _exec('git', ['reset', '--hard']);
  await _exec('git', ['fetch', '--all', '--prune']);
  await _exec('git', ['pull', '--rebase']);
  await _exec('npm', ['install']);
  return _exec('npm', ['update', '--dev']);
});

/** Watches for file changes. */
task('watch', () => watch('test/**/*.js', task('test')));

/** Runs the default tasks. */
task('default', task('build'));

/**
 * Spawns a new process using the specified command.
 * @param {string} command The command to run.
 * @param {string[]} [args] The command arguments.
 * @param {Partial<SpawnOptions>} [options] The settings to customize how the process is spawned.
 * @return {Promise<void>} Completes when the command is finally terminated.
 */
function _exec(command, args = [], options = {}) {
  return new Promise((fulfill, reject) => spawn(normalize(command), args, {shell: true, stdio: 'inherit', ...options})
    .on('close', code => code ? reject(new Error(`${command}: ${code}`)) : fulfill())
  );
}
