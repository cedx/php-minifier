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
task('fix', () => _exec('eslint', ['--config=etc/eslint.json', '--fix', ...sources]));

/** Performs the static analysis of source code. */
task('lint', () => _exec('eslint', ['--config=etc/eslint.json', ...sources]));

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
task('default', task('test'));

/**
 * Spawns a new process using the specified command.
 * @param {string} command The command to run.
 * @param {string[]} [args] The command arguments.
 * @param {SpawnOptions} [options] The settings to customize how the process is spawned.
 * @return {Promise<void>} Completes when the command is finally terminated.
 */
function _exec(command, args = [], options = {}) {
  return new Promise((fulfill, reject) => spawn(normalize(command), args, {shell: true, stdio: 'inherit', ...options})
    .on('close', code => code ? reject(new Error(`${command}: ${code}`)) : fulfill())
  );
}

/**
 * @typedef {object} SpawnOptions
 * @property {string} [argv0] Explicitly set the value of `argv[0]` sent to the child process.
 * @property {string} [cwd] Current working directory of the child process.
 * @property {boolean} [detached] Prepare child to run independently of its parent process.
 * @property {Object<string, string>} [env] Environment key-value pairs.
 * @property {number} [gid] Sets the group identity of the process.
 * @property {boolean|string} [shell] If `true`, runs command inside of a shell. A different shell can be specified as a string.
 * @property {Array|string} [stdio] Child's stdio configuration.
 * @property {number} [timeout] In milliseconds the maximum amount of time the process is allowed to run.
 * @property {number} [uid] Sets the user identity of the process.
 * @property {boolean} [windowsHide] Hide the subprocess console window that would normally be created on Windows systems.
 * @property {boolean} [windowsVerbatimArguments] No quoting or escaping of arguments is done on Windows.
 */
