import {spawn, SpawnOptions} from 'child_process';
import del from 'del';
import {promises} from 'fs';
import gulp from 'gulp';
import {delimiter, normalize, resolve} from 'path';

/** The file patterns providing the list of source files. */
const sources: string[] = ['*.ts', 'example/*.ts', 'src/**/*.ts', 'test/**/*.ts'];

// Shortcuts.
const {task, watch} = gulp;
const {copyFile} = promises;

// Initialize the build system.
const _path = 'PATH' in process.env ? process.env.PATH! : '';
const _vendor = resolve('node_modules/.bin');
if (!_path.includes(_vendor)) process.env.PATH = `${_vendor}${delimiter}${_path}`;

/** Deletes all generated files and reset any saved state. */
task('clean', () => del(['.nyc_output', 'doc/api', 'lib', 'var/**/*', 'web']));

/** Uploads the results of the code coverage. */
task('coverage', () => _exec('coveralls', ['var/lcov.info']));

/** Builds the documentation. */
task('doc', async () => {
  for (const path of ['CHANGELOG.md', 'LICENSE.md']) await copyFile(path, `doc/about/${path.toLowerCase()}`);
  await _exec('typedoc', ['--gaID', process.env.GOOGLE_ANALYTICS_ID!, '--options', 'etc/typedoc.json', '--tsconfig', 'src/tsconfig.json']);
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
task('test', () => _exec('nyc', ['--nycrc-path=etc/nyc.json', 'node_modules/.bin/mocha', '--config=etc/mocha.json', '"test/**/*.ts"']));

/** Upgrades the project to the latest revision. */
task('upgrade', async () => {
  await _exec('git', ['reset', '--hard']);
  await _exec('git', ['fetch', '--all', '--prune']);
  await _exec('git', ['pull', '--rebase']);
  await _exec('npm', ['install', '--ignore-scripts']);
  return _exec('npm', ['update', '--dev']);
});

/** Watches for file changes. */
task('watch', () => watch('test/**/*.ts', task('test')));

/** Runs the default tasks. */
task('default', task('test'));

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
