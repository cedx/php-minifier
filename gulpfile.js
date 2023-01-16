import {cp} from "node:fs/promises";
import {deleteAsync} from "del";
import {execa} from "execa";
import gulp from "gulp";
import config from "./jsconfig.json" assert {type: "json"};
import pkg from "./package.json" assert {type: "json"};

/** Builds the project. */
export function build() {
	return exec("tsc", ["--project", "src/jsconfig.json"]);
}

/** Deletes all generated files. */
export function clean() {
	return deleteAsync(["lib", "var/**/*"]);
}

/** Builds the documentation. */
export async function doc() {
	await exec("typedoc", ["--options", "etc/typedoc.json"]);
	return cp("www/favicon.ico", "docs/favicon.ico");
}

/** Performs the static analysis of source code. */
export async function lint() {
	await exec("eslint", ["--config=etc/eslint.json", ...config.include]);
	return exec("tsc", ["--project", "jsconfig.json"]);
}

/** Publishes the package. */
export async function publish() {
	await exec("npm", ["publish"]);
	for (const command of [["tag"], ["push", "origin"]]) await exec("git", [...command, `v${pkg.version}`]);
}

/** Starts the development web server. */
export function serve() {
	return exec("php", ["-S", "127.0.0.1:8000", "-t", "lib/php"]);
}

/** Runs the test suite. */
export function test() {
	return exec("c8", ["--all", "--include=src/**/*.js", "--report-dir=var", "--reporter=lcovonly", "node", "--test"]);
}

/** Runs the default task. */
export default gulp.series(
	clean,
	build
);

/**
 * Runs the specified command.
 * @param {string} command The command to run.
 * @param {string[]} [args] The command arguments.
 * @param {import("execa").Options} [options] The child process options.
 * @returns {import("execa").ExecaChildProcess} Resolves when the command is finally terminated.
 */
function exec(command, args = [], options = {}) {
	return execa(command, args, {preferLocal: true, stdio: "inherit", ...options});
}
